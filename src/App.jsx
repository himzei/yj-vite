import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const [permissionGranted, setPermissionGranged] = useState(null);
  const [videoStream, setVideoStream] = useState(null);

  // console.log(videoRef);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log(stream);
        setPermissionGranged(true);
        setVideoStream;
      } catch (error) {
        console.log(error);
      }
    };

    if (permissionGranted === null) {
      requestCameraPermission();
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [permissionGranted, videoStream]);

  return (
    <div className="max-w-xl w-full mx-auto">
      <h1 className="text-xl font-bold text-red-500 text-center py-4 border-b border-gray-300">
        hello world
      </h1>
      <div className="relative w-full h-[400px]">
        <video
          className="absolute inset-0 w-full h-full"
          id="videoElement"
          ref={videoRef}
          autoPlay
          playsInline
        ></video>
        <canvas
          id="canvasElement"
          ref={canvasRef}
          className="absolute inset-0 w-full h-full "
        ></canvas>
      </div>
    </div>
  );
}

export default App;
