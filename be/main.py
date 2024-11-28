from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
import os
from bson.objectid import ObjectId

# Initialize FastAPI app
app = FastAPI()


# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://ShresthDB:Salesforce*1@cluster0.o0jca.mongodb.net/")  # Update this to your MongoDB URI
client = AsyncIOMotorClient(MONGO_URI)
db = client["healthcare"]
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

