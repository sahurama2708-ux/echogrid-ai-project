from datetime import datetime

# Global Analytics State (Predictions ke mutabiq live update hoga)
analytics_state = {
    "total_scanned": 124,
    "cracks_detected": 32,
    "high_risk": 8,
    "safe_structures": 84,
    "timestamps": ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    "stress_levels": [45, 52, 68, 62, 78, 85],
    "cracks_graph": [2, 4, 7, 5, 9, 12]
}

def record_prediction(is_crack: bool, final_score: float):
    """Jab bhi /predict call hoga, yeh function analytics ko update karega"""
    analytics_state["total_scanned"] += 1
    if is_crack:
        analytics_state["cracks_detected"] += 1
        analytics_state["high_risk"] += 1
    else:
        analytics_state["safe_structures"] += 1

    current_time = datetime.now().strftime("%H:%M:%S")
    analytics_state["timestamps"].append(current_time)
    analytics_state["stress_levels"].append(int(final_score * 100))
    analytics_state["cracks_graph"].append(analytics_state["cracks_detected"])

    # List size ko limit rakhein taaki graph clean rahe
    if len(analytics_state["timestamps"]) > 10:
        analytics_state["timestamps"].pop(0)
        analytics_state["stress_levels"].pop(0)
        analytics_state["cracks_graph"].pop(0)

def get_analytics_payload():
    return {
        "success": True,
        "stats": {
            "total_scanned": analytics_state["total_scanned"],
            "cracks_detected": analytics_state["cracks_detected"],
            "high_risk": analytics_state["high_risk"],
            "safe_structures": analytics_state["safe_structures"]
        },
        "graph": {
            "timestamps": analytics_state["timestamps"],
            "stress_levels": analytics_state["stress_levels"],
            "cracks_detected": analytics_state["cracks_graph"]
        }
    }

def get_risk_map_payload():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    zones_data = [
        {"id": 1, "zone": "North Wing (Pillar 1)", "status": "High Risk", "load_stress": "88.4%", "scanned": 45, "cracks": 12, "last_update": current_time},
        {"id": 2, "zone": "South Wing (Beam 3)", "status": "Safe", "load_stress": "32.1%", "scanned": 38, "cracks": 2, "last_update": current_time},
        {"id": 3, "zone": "East Block (Foundation)", "status": "Moderate Risk", "load_stress": "64.7%", "scanned": 25, "cracks": 8, "last_update": current_time},
        {"id": 4, "zone": "West Wing (Slab 2)", "status": "Safe", "load_stress": "24.5%", "scanned": 16, "cracks": 1, "last_update": current_time},
    ]
    return {"success": True, "zones": zones_data}