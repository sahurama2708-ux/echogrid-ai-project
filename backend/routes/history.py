from fastapi import APIRouter

router = APIRouter()

# Global list jo history ko memory mein store karegi
scan_history = []

def add_to_history(scan_item: dict):
    # Naye scan ko sabse upar add karein
    scan_history.insert(0, scan_item)

@router.get("/history")
def get_history():
    return {"history": scan_history}