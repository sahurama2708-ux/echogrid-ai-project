from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/digital-twin")
def get_digital_twin():
    return {
        "status": "Synchronized",
        "mesh_nodes": 1420,
        "active_sensors": 48,
        "stress_level": "Moderate-High",
        "temperature": f"{random.uniform(32.0, 36.5):.1f}°C",
        "vibration_hz": f"{random.uniform(1.2, 1.8):.2f} Hz",
        "structural_integrity": "78.4%",
        "nodes_status": [
            {"id": "Node-01", "status": "Normal", "stress": "45 MPa"},
            {"id": "Node-02", "status": "Warning", "stress": "112 MPa"},
            {"id": "Node-03", "status": "Normal", "stress": "52 MPa"},
        ]
    }