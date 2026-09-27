import React from "react";
import { Download, AlertTriangle } from "lucide-react";

export default function Result({ setActiveTab }) {
  const result = JSON.parse(localStorage.getItem("scanResult"));

  if (!result) {
    return (
      <div className="text-center text-white mt-20">
        <h2 className="text-2xl font-bold">No Scan Found</h2>
        <button
          onClick={() => setActiveTab("Upload")}
          className="mt-4 bg-blue-600 px-5 py-2 rounded-xl"
        >
          Go to Upload
        </button>
      </div>
    );
  }

  const { prediction, confidence, risk, image } = result;

  const downloadReport = () => {
    const report = `EchoGrid AI Report

Prediction : ${prediction}
Confidence : ${confidence}%
Risk : ${risk}`;

    const blob = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "EchoGrid_Report.txt";
    a.click();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">AI Scan Result</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-4">
          <img
            src={image}
            alt="scan"
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-red-400 mb-5">
            <AlertTriangle />
            <span className="font-bold">{risk} Risk</span>
          </div>

          <h1 className="text-5xl text-white font-bold">{confidence}%</h1>
          <p className="text-slate-400 mb-5">Confidence</p>

          <div className="space-y-3 text-white">
            <div>Prediction: {prediction}</div>
            <div>Risk: {risk}</div>
          </div>

          <button
            onClick={downloadReport}
            className="w-full mt-6 bg-blue-600 py-3 rounded-xl text-white"
          >
            <Download className="inline mr-2" size={16}/>
            Download Report
          </button>

          <button
            onClick={() => setActiveTab("Upload")}
            className="w-full mt-3 border border-slate-700 py-3 rounded-xl text-white"
          >
            Scan Again
          </button>
        </div>
      </div>
    </div>
  );
}