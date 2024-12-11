import { useRef } from "react";

function App() {
  const videoRef = useRef();
  return (
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-xl font-bold text-red-500 text-center py-4 border-b border-gray-300">
        hello world
      </h1>
      <div>
        <video
          className="w-full h-[400px] bg-red-500"
          id="videoElement"
          ref={videoRef}
          autoPlay
          playsInline
        ></video>
      </div>
    </div>
  );
}

export default App;
