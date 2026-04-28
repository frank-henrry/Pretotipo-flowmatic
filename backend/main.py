from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

# Database initialization
def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id SERIAL PRIMARY KEY,
            restaurant_name TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            pain_point TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    cur.close()
    conn.close()
    print("Database table initialized")

@app.on_event("startup")
async def startup_event():
    init_db()

class Lead(BaseModel):
    restaurantName: str
    whatsapp: str
    painPoint: Optional[str] = None

class LeadResponse(BaseModel):
    id: int
    restaurant_name: str
    whatsapp: str
    pain_point: Optional[str]
    created_at: datetime

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/leads", response_model=LeadResponse)
def create_lead(lead: Lead):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO leads (restaurant_name, whatsapp, pain_point) VALUES (%s, %s, %s) RETURNING *",
            (lead.restaurantName, lead.whatsapp, lead.painPoint)
        )
        new_lead = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return new_lead
    except Exception as e:
        print(f"Error saving lead: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/leads", response_model=List[LeadResponse])
def get_leads():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM leads ORDER BY created_at DESC")
        leads = cur.fetchall()
        cur.close()
        conn.close()
        return leads
    except Exception as e:
        print(f"Error fetching leads: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
