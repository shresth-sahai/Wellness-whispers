from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, validator
from motor.motor_asyncio import AsyncIOMotorClient
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.mindshift.co.in"],  # Replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("MONGO_URI environment variable not set.")

try:
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["healthcare"]
    doctors_collection = db["doctors"]
    appointments_collection = db["appointments"]
    contact_messages_collection = db["contact_messages"]
except Exception as e:
    print(f"Failed to connect to MongoDB: {e}")
    raise

# Pydantic models
class Appointment(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str
    message: str

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

class DoctorRegistration(BaseModel):
    name: str
    email: EmailStr
    phone: str
    specialization: str
    experience: int
    qualification: str
    bio: str

    @validator("experience")
    def validate_experience(cls, value):
        if value < 0:
            raise ValueError("Experience must be a positive number.")
        return value

# Root route
@app.get("/")
async def root():
    return {"message": "Welcome to the Healthcare API!"}

# Appointments
@app.post("/appointments")
async def create_appointment(appointment: Appointment):
    try:
        result = await appointments_collection.insert_one(appointment.dict())
        if result.inserted_id:
            return {"message": "Appointment booked successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save appointment.")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

@app.get("/appointments")
async def get_appointments(skip: int = 0, limit: int = 10):
    try:
        appointments = await appointments_collection.find().skip(skip).limit(limit).to_list(length=limit)
        for appointment in appointments:
            if "_id" in appointment:
                appointment["_id"] = str(appointment["_id"])
        return {"appointments": appointments}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

# Contact Messages
@app.post("/contact-us")
async def submit_contact_message(contact_message: ContactMessage):
    try:
        result = await contact_messages_collection.insert_one(contact_message.dict())
        if result.inserted_id:
            return {"message": "Your message has been sent successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send your message.")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

@app.get("/contact-messages")
async def get_contact_messages(skip: int = 0, limit: int = 10):
    try:
        messages = await contact_messages_collection.find().skip(skip).limit(limit).to_list(length=limit)
        for message in messages:
            if "_id" in message:
                message["_id"] = str(message["_id"])
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

# Doctors
@app.post("/doctors/register")
async def register_doctor(doctor: DoctorRegistration):
    try:
        existing_doctor = await doctors_collection.find_one({"email": doctor.email})
        if existing_doctor:
            raise HTTPException(status_code=400, detail="Doctor with this email is already registered.")
        result = await doctors_collection.insert_one(doctor.dict())
        if result.inserted_id:
            return {"message": "Doctor registered successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to register the doctor.")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

@app.get("/doctors")
async def get_doctors(skip: int = 0, limit: int = 10):
    try:
        doctors = await doctors_collection.find().skip(skip).limit(limit).to_list(length=limit)
        for doctor in doctors:
            if "_id" in doctor:
                doctor["_id"] = str(doctor["_id"])
        return {"doctors": doctors}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error.")

# Health Check
@app.get("/health")
async def health_check():
    try:
        await db.command("ping")
        return {"status": "ok"}
    except Exception as e:
        return {"status": "error", "details": str(e)}