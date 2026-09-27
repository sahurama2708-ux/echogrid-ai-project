import { useState } from "react";
import { uploadImage } from "../api";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const res = await uploadImage(file);
    setData(res);
  };

  return (
    <div className="card">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn" onClick={handleUpload}>
        Scan Image
      </button>

      {data && (
        <>
          <h3>{data.prediction}</h3>
          <p>Confidence: {data.confidence}%</p>
          <p>Risk: {data.risk}</p>
        </>
      )}
    </div>
  );
}