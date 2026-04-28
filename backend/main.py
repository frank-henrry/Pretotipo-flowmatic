import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Dict, Optional

# Database Setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://flowmatic:flowmatic123@db:5432/flowmatic_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Model
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    address = Column(String)
    reference = Column(String, nullable=True)
    payment_method = Column(String)
    items = Column(JSON)
    total = Column(Float)

Base.metadata.create_all(bind=engine)

# Pydantic Schemas
class OrderCreate(BaseModel):
    name: str
    address: str
    reference: Optional[str] = None
    paymentMethod: str
    selectedItems: List[str]
    customizations: Dict[str, dict]
    total: float

# FastAPI App
app = FastAPI()

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
        items={"items": order.selectedItems, "customizations": order.customizations},
        total=order.total
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return {"status": "success", "order_id": db_order.id}

@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).all()

@app.get("/")
def read_root():
    return {"message": "Flowmatic API is running"}
