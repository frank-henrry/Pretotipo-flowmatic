import os
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Dict, Optional

# Database Setup
DATABASE_URL = os.getenv("DATABASE_URL")

Base = declarative_base()

# Database Model
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    address = Column(String)
    reference = Column(String, nullable=True)
    payment_method = Column(String)
    delivery_method = Column(String, default="delivery")
    items = Column(JSON)
    total = Column(Float)
    created_at = Column(String) # For simplicity

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    contact = Column(String)
    created_at = Column(String) # For simplicity using String

# Pydantic Schemas
class OrderCreate(BaseModel):
    name: str
    address: str
    reference: Optional[str] = None
    paymentMethod: str
    deliveryMethod: Optional[str] = "delivery"
    selectedItems: List[str]
    customizations: Dict[str, dict]
    total: float

class LeadCreate(BaseModel):
    contact: str

# FastAPI App
app = FastAPI()

def init_db():
    import time
    max_retries = 5
    for i in range(max_retries):
        try:
            engine = create_engine(DATABASE_URL)
            Base.metadata.create_all(bind=engine)
            return engine, sessionmaker(autocommit=False, autoflush=False, bind=engine)
        except Exception as e:
            print(f"Error conectando a la base de datos (intento {i+1}/{max_retries}): {e}")
            time.sleep(5)
    raise Exception("No se pudo conectar a la base de datos tras varios intentos")

engine, SessionLocal = init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(
        customer_name=order.name,
        address=order.address,
        reference=order.reference,
        payment_method=order.paymentMethod,
        delivery_method=order.deliveryMethod,
        items={"items": order.selectedItems, "customizations": order.customizations},
        total=order.total,
        created_at=datetime.now().isoformat()
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return {"status": "success", "order_id": db_order.id}

@app.post("/leads")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    db_lead = Lead(
        contact=lead.contact,
        created_at=datetime.now().isoformat()
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return {"status": "success", "lead_id": db_lead.id}

@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@app.get("/")
def read_root():
    return {"message": "Flowmatic API is running"}
