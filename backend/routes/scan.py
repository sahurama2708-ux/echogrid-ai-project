
from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil
from datetime import datetime
from predict import predict_crack
from routes.history import add_to_history  # History function import karein

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Model se asli prediction lein
        prediction, confidence = predict_crack(file_path)

        # Risk level aur recommendations tay karein
        if "Crack" in prediction or confidence > 50:
            risk_level = "High Hazard"
            recommendation = "Immediate structural reinforcement required."
        else:
            risk_level = "Low Risk"
            recommendation = "Structure is safe. Regular monitoring recommended."

        scan_result = {
            "id": datetime.now().strftime("%Y%m%d%H%M%S"),
            "filename": file.filename,
            "prediction": prediction,
            "confidence": confidence,
            "risk": risk_level,
            "recommendation": recommendation,
            "image": f"http://127.0.0.1:8000/uploads/{file.filename}",
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        # 🟢 Yahan history mein data add ho raha hai
        add_to_history(scan_result)
        
        return scan_result

    except Exception as e:
        print("Prediction Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))