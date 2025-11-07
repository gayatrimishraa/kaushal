import { useState } from "react";
import { auth, rtdb } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      await setDoc(doc(rtdb, "users", cred.user.uid), {
        name,
        email,
        onboardingComplete: false,
        trustScore: 0,
      });

      nav("/onboarding");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 border p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">Create account</h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2 rounded">Sign up</button>

        <p className="text-sm">
          Have an account?{" "}
          <Link className="underline" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
