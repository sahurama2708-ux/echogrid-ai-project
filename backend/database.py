from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME", "echogrid_ai")]

users = db["users"]
predictions = db["predictions"]
digital_twin = db["digital_twin"]