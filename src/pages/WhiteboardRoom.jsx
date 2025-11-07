import { useParams } from "react-router-dom";

export default function WhiteboardRoom() {
  const { id } = useParams();
  // integrate Excalidraw/Fabric.js later
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Whiteboard • {id}</h1>
      <div className="border rounded h-[70vh] grid place-items-center">Whiteboard canvas here</div>
    </div>
  );
}
