from fastapi import APIRouter
from database import users

router = APIRouter()

@router.post("/login")
def login(data: dict):
    email = data["email"]
    user = users.find_one({"email": email}, {"_id": 0})
    if user:
        return {"success": True, "user": user}
    return {"success": False}