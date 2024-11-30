from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
import os
from bson.objectid import ObjectId
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://www.mindshift.co.in"],  # Frontend URL
    allow_credentials=True,  # Allow cookies or authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(MONGO_URI)

db = client["healthcare"]
doctors_collection = db["doctors"]
appointments_collection = db["appointments"]
contact_messages_collection = db["contact_messages"]

# Pydantic models for request validation
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

# Pydantic model for doctor registration
class DoctorRegistration(BaseModel):
    name: str
    email: EmailStr
    phone: str
    specialization: str
    experience: int  # Years of experience
    qualification: str
    bio: str  # Short biography or description

# Root route for testing
@app.get("/")
async def root():
    return {"message": "Welcome to the Healthcare API!"}


# API endpoint to create an appointment
@app.post("/appointments")
async def create_appointment(appointment: Appointment):
    try:
        # Insert appointment into MongoDB
        result = await appointments_collection.insert_one(appointment.dict())
        if result.inserted_id:
            return {"message": "Appointment booked successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to save appointment.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# API endpoint to fetch all appointments (optional)
@app.get("/appointments")
async def get_appointments():
    try:
        # Fetch data from MongoDB
        appointments = await appointments_collection.find().to_list(length=100)
        
        # Convert ObjectId to string
        for appointment in appointments:
            if "_id" in appointment:
                appointment["_id"] = str(appointment["_id"])
        
        return {"appointments": appointments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# API endpoint to handle Contact Us form submissions
@app.post("/contact-us")
async def submit_contact_message(contact_message: ContactMessage):
    try:
        # Insert contact message into MongoDB
        result = await contact_messages_collection.insert_one(contact_message.dict())
        if result.inserted_id:
            return {"message": "Your message has been sent successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send your message.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# API endpoint to fetch all contact messages (optional)
@app.get("/contact-messages")
async def get_contact_messages():
    try:
        messages = await contact_messages_collection.find().to_list(length=100)
        
        # Convert ObjectId to string
        for message in messages:
            if "_id" in message:
                message["_id"] = str(message["_id"])
        
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


# API endpoint for doctor registration
@app.post("/doctors/register")
async def register_doctor(doctor: DoctorRegistration):
    try:
        # Check if the doctor already exists
        existing_doctor = await doctors_collection.find_one({"email": doctor.email})
        if existing_doctor:
            raise HTTPException(
                status_code=400,
                detail="A doctor with this email is already registered.",
            )
        
        # Insert the doctor details into MongoDB
        result = await doctors_collection.insert_one(doctor.dict())
        if result.inserted_id:
            return {"message": "Doctor registered successfully!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to register the doctor.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# API endpoint to fetch all registered doctors (optional)
@app.get("/doctors")
async def get_doctors():
    try:
        # Fetch all doctors from MongoDB
        doctors = await doctors_collection.find().to_list(length=100)
        
        # Convert ObjectId to string
        for doctor in doctors:
            if "_id" in doctor:
                doctor["_id"] = str(doctor["_id"])
        
        return {"doctors": doctors}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")