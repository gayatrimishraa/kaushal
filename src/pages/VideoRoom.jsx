import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoRoom() {
  const { chatId } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    const appID = 1423944563;
    const serverSecret = "f132cdf04c817ebe35d0a17ddfb835a8";

    const roomID = chatId || "default-room";
    const userID = String(Math.floor(Math.random() * 10000));
    const userName = `User_${userID}`;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.protocol}//${window.location.host}/video/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }, []);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
