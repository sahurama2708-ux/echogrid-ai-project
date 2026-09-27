import React, { useState, useRef } from "react";
import { predictImage } from "../api";

export default function UploadCamera() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 1. File Upload Handle karne ke liye
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  // 2. Backend par image bhej kar prediction laane ke liye
  const handleUpload = async (file) => {
    setLoading(true);
    try {
      const result = await predictImage(file);
      setPredictionResult(result);
    } catch (err) {
      alert("Prediction failed! Backend connection error.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Live Camera Start karne ke liye
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera permission denied or device not found!");
      setIsCameraActive(false);
    }
  };

  // 4. Live Camera se photo capture karne ke liye
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `camera_capture_${Date.now()}.jpg`, { type: "image/jpeg" });
        setSelectedFile(file);
        stopCamera();
        handleUpload(file);
      }, "image/jpeg");
    }
  };

  // 5. Camera band karne ke liye
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  return (
    <div className="p-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">AI Crack Detection & Live Scan</h1>

      {/* Action Buttons Box */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6 flex flex-wrap gap-4 items-center">
        {/* Choose File Button */}
        <div>
          <label className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg cursor-pointer font-medium transition">
            Choose File
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Live Camera Button */}
        {!isCameraActive ? (
          <button onClick={startCamera} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition">
            Open Live Camera
          </button>
        ) : (
          <button onClick={stopCamera} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition">
            Close Camera
          </button>
        )}
      </div>

      {/* Live Camera Stream View */}
      {isCameraActive && (
        <div className="mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700 inline-block">
          <video ref={videoRef} autoPlay playsInline className="w-full max-w-md rounded-lg mb-4" />
          <br />
          <button onClick={captureImage} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-medium text-black">
            Capture Photo
          </button>
        </div>
      )}

      {/* Hidden canvas for image capturing */}
      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Loading State */}
      {loading && <p className="text-blue-400 font-semibold">Analyzing structure via AI model...</p>}

      {/* Prediction & Alert Result Section */}
      {predictionResult && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-6">
          <h2 className="text-xl font-bold mb-4 text-green-400">Scan & Analysis Results</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Prediction:</strong> {predictionResult.prediction}</p>
            <p><strong>Confidence:</strong> {predictionResult.confidence}%</p>
            <p><strong>Risk Level:</strong> <span className="text-red-400 font-bold">{predictionResult.risk}</span></p>
            <p><strong>Structural Integrity:</strong> {predictionResult.structural_integrity}</p>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <p className="text-sm text-yellow-300"><strong>AI Recommendation:</strong> {predictionResult.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}