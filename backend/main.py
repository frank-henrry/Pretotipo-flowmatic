import os
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Dict, Optional

# Database Setup
DATABASE_URL = os.getenv("DATABASE_URL")
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "flowmatic-admin-2026")

Base = declarative_base()

# ── Models ─────────────────────────────────────────────────────────────────
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
    created_at = Column(String)

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    restaurant_type = Column(String, nullable=True)
    created_at = Column(String)

# ── Schemas ────────────────────────────────────────────────────────────────
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
    name: str
    email: str
    phone: str
    restaurant_type: Optional[str] = None

# ── App ────────────────────────────────────────────────────────────────────
app = FastAPI(title="FoodFlow API", version="2.0")

def init_db():
    import time
    max_retries = 5
    for i in range(max_retries):
        try:
            engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True,       # Test connection before using (auto-reconnect)
                pool_recycle=300,          # Recycle connections every 5 min
                pool_size=5,
                max_overflow=10,
            )
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

def verify_admin(x_admin_secret: Optional[str] = Header(None)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="No autorizado")

# ── Endpoints ──────────────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"message": "FoodFlow API v2.0 is running ✅"}

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
        name=lead.name,
        email=lead.email,
        phone=lead.phone,
        restaurant_type=lead.restaurant_type,
        created_at=datetime.now().isoformat()
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return {"status": "success", "lead_id": db_lead.id}

# ── Admin endpoints (require secret header) ────────────────────────────────
@app.get("/admin/leads", dependencies=[Depends(verify_admin)])
def get_leads(db: Session = Depends(get_db)):
    leads = db.query(Lead).order_by(Lead.id.desc()).all()
    return [
        {
            "id": l.id,
            "name": l.name,
            "email": l.email,
            "phone": l.phone,
            "restaurant_type": l.restaurant_type,
            "created_at": l.created_at,
        }
        for l in leads
    ]

@app.get("/admin/orders", dependencies=[Depends(verify_admin)])
def get_orders(db: Session = Depends(get_db)):
    return db.query(Order).order_by(Order.id.desc()).all()

@app.get("/admin/stats", dependencies=[Depends(verify_admin)])
def get_stats(db: Session = Depends(get_db)):
    total_leads = db.query(Lead).count()
    total_orders = db.query(Order).count()
    return {
        "total_leads": total_leads,
        "total_orders": total_orders,
    }
