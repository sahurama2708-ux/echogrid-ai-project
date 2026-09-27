from pydantic import BaseModel
from datetime import datetime

class Prediction(BaseModel):
    image_name: str
    prediction: str
    confidence: float
    risk: str
    created_at: datetime