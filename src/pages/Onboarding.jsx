import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import SkillForm from "../components/SkillForm";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [learn, setLearn] = useState([{ domain: "", subdomain: "", level: "Beginner" }]);
  const [teach, setTeach] = useState([{ domain: "", subdomain: "", level: "Intermediate" }]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(firestore, "users", user.uid));
      if (snap.exists()) {
        const d = snap.data();
        if (d.location) setLocation(d.location);
        if (d.language) setLanguage(d.language);
        if (d.learnSkills) setLearn(d.learnSkills);
        if (d.teachSkills) setTeach(d.teachSkills);
      }
    };

    load();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "users", user.uid), {
      location,
      language,
      learnSkills: learn.filter((s) => s.domain && s.subdomain),
      teachSkills: teach.filter((s) => s.domain && s.subdomain),
      onboardingComplete: true,
    });

    nav("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Complete your profile</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <SkillForm title="Skills you want to learn" items={learn} setItems={setLearn} />
        <SkillForm title="Skills you can teach" items={teach} setItems={setTeach} />

        <button className="bg-black text-white px-4 py-2 rounded">Save & Continue</button>
      </form>
    </div>
  );
}
