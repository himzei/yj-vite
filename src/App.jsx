import jsQR from "jsqr";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const [permissionGranted, setPermissionGranged] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [qrData, setQrData] = useState(null);

  // console.log(videoRef);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "envirionment",
          },
        });
        console.log(stream);
        setPermissionGranged(true);
        setVideoStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
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

  useEffect(() => {
    if (qrData) {
      //
      alert(qrData);
    }
  }, [qrData]);

  useEffect(() => {
    if (videoStream) {
      const video = videoRef.current;
      const canvas = canvasRRef.current;
      const canvasContext = canvas.getContext("2d");

      const scan = () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          canvas.width = videoWidth;
          canvas.height = videoHeight;
          canvasContext.clearRect(0, 0, canvas.width, canvasHeight);
          canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight);
          const imageData = canvasContext.getImageData(
            0,
            0,
            videoWidth,
            videoHeight
          );

          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            setQrData(code.data);
          }
        }
        requestAnimationFrame(scan);
      };

      requestAnimationFrame(scan);
    }
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
