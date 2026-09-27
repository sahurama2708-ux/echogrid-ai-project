def risk(confidence):
    if confidence >= 90:
        return "High"
    elif confidence >= 70:
        return "Medium"
    return "Low"