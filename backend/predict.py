import tensorflow as tf
import numpy as np
from PIL import Image
import os

MODEL_PATH = "model.h5"

model = None
if os.path.exists(MODEL_PATH):
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("✅ model.h5 successfully loaded for prediction!")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

def predict_crack(image_path: str):
    if model is None:
        raise ValueError("Model is not loaded.")

    # Image ko open karke 224x224 size mein convert karein
    img = Image.open(image_path).convert("RGB").resize((224, 224))
    img_array = np.array(img) / 255.0  # Normalization
    img_array = np.expand_dims(img_array, axis=0) # Batch dimension

    # Model se prediction lein
    predictions = model.predict(img_array)
    print("🤖 Raw Model Output Array:", predictions)

    # Score aur confidence calculate karein
    score = float(np.squeeze(predictions))
    
    # Agar model sigmoid (single output 0 to 1) hai ya softmax hai uske mutabiq:
    if score > 0.5:
        prediction = "Crack Detected"
        confidence = round(score * 100, 2)
    else:
        prediction = "Safe Structure"
        confidence = round((1 - score) * 100, 2)

    return prediction, confidence