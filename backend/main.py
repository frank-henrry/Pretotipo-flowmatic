import os
import re
import html as html_module
from datetime import datetime, timezone
from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import List, Dict, Optional
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# ── Config ─────────────────────────────────────────────────────────────────
DATABASE_URL = os.getenv("DATABASE_URL")
ADMIN_SECRET  = os.getenv("ADMIN_SECRET")
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")]
DOCS_ENABLED  = os.getenv("DOCS_ENABLED", "false").lower() == "true"

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL env var must be set")
if not ADMIN_SECRET:
    raise RuntimeError("ADMIN_SECRET env var must be set")

# ── Database ───────────────────────────────────────────────────────────────
Base = declarative_base()

# ── Models ─────────────────────────────────────────────────────────────────
class Order(Base):
    __tablename__ = "orders"
    id              = Column(Integer, primary_key=True, index=True)
    customer_name   = Column(String(100))
    address         = Column(String(300))
    reference       = Column(String(300), nullable=True)
    payment_method  = Column(String(20))
    delivery_method = Column(String(20), default="delivery")
    items           = Column(JSON)
    total           = Column(Float)
    created_at      = Column(String)

class Lead(Base):
    __tablename__ = "leads"
    id              = Column(Integer, primary_key=True, index=True)
    name            = Column(String(100))
    email           = Column(String(254))
    phone           = Column(String(20))
    restaurant_type = Column(String(50), nullable=True)
    created_at      = Column(String)

# ── Sanitization helpers ───────────────────────────────────────────────────
_HTML_TAG_RE  = re.compile(r"<[^>]+>", re.IGNORECASE)
_CTRL_CHAR_RE = re.compile(r"[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]")

def sanitize(value: str) -> str:
    value = _HTML_TAG_RE.sub("", value)
    value = _CTRL_CHAR_RE.sub("", value)
    return html_module.unescape(value).strip()

# ── Enums ──────────────────────────────────────────────────────────────────
_VALID_PAYMENT  = {"cash", "card", "transfer", "efectivo", "tarjeta", "transferencia"}
_VALID_DELIVERY = {"delivery", "pickup", "recogida"}

# ── Schemas ────────────────────────────────────────────────────────────────
class OrderCreate(BaseModel):
    name:           str           = Field(min_length=2, max_length=100)
    address:        str           = Field(min_length=5, max_length=300)
    reference:      Optional[str] = Field(default=None, max_length=300)
    paymentMethod:  str           = Field(min_length=2, max_length=30)
    deliveryMethod: Optional[str] = Field(default="delivery", max_length=20)
    selectedItems:  List[str]     = Field(min_length=1, max_length=20)
    customizations: Dict[str, dict] = Field(default_factory=dict)
    total:          float         = Field(gt=0, le=100_000)

    @field_validator("name", "address", mode="before")
    @classmethod
    def clean_text(cls, v):
        if not isinstance(v, str):
            raise ValueError("Debe ser texto")
        cleaned = sanitize(v)
        if not cleaned:
            raise ValueError("El campo no puede estar vacío")
        return cleaned

    @field_validator("reference", mode="before")
    @classmethod
    def clean_reference(cls, v):
        if v is None:
            return v
        if not isinstance(v, str):
            raise ValueError("Debe ser texto")
        return sanitize(v) or None

    @field_validator("paymentMethod", mode="before")
    @classmethod
    def validate_payment(cls, v):
        if not isinstance(v, str):
            raise ValueError("Método de pago inválido")
        v = sanitize(v).lower()
        if v not in _VALID_PAYMENT:
            raise ValueError("Método de pago inválido")
        return v

    @field_validator("deliveryMethod", mode="before")
    @classmethod
    def validate_delivery(cls, v):
        if v is None:
            return "delivery"
        if not isinstance(v, str):
            raise ValueError("Método de entrega inválido")
        v = sanitize(v).lower()
        if v not in _VALID_DELIVERY:
            raise ValueError("Método de entrega inválido")
        return v

    @field_validator("selectedItems", mode="before")
    @classmethod
    def validate_items(cls, v):
        if not isinstance(v, list) or len(v) == 0:
            raise ValueError("Se requiere al menos un producto")
        if len(v) > 20:
            raise ValueError("Demasiados productos")
        result = []
        for item in v:
            if not isinstance(item, str):
                raise ValueError("Los productos deben ser texto")
            cleaned = sanitize(item)
            if not cleaned or len(cleaned) > 100:
                raise ValueError("Nombre de producto inválido")
            result.append(cleaned)
        return result

    @field_validator("customizations")
    @classmethod
    def validate_customizations(cls, v):
        if len(v) > 20:
            raise ValueError("Demasiadas personalizaciones")
        return v


class LeadCreate(BaseModel):
    name:            str           = Field(min_length=2, max_length=100)
    email:           EmailStr
    phone:           str           = Field(min_length=7, max_length=20)
    restaurant_type: Optional[str] = Field(default=None, max_length=50)

    @field_validator("name", mode="before")
    @classmethod
    def clean_name(cls, v):
        if not isinstance(v, str):
            raise ValueError("Debe ser texto")
        cleaned = sanitize(v)
        if not cleaned:
            raise ValueError("El nombre no puede estar vacío")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        # Only digits, spaces, hyphens, plus sign, parentheses
        if not re.match(r"^[\d\s\-\+\(\)]{7,20}$", v):
            raise ValueError("Formato de teléfono inválido. Use dígitos, espacios, -, +, ()")
        return v.strip()

    @field_validator("restaurant_type", mode="before")
    @classmethod
    def clean_restaurant_type(cls, v):
        if v is None:
            return v
        if not isinstance(v, str):
            raise ValueError("Debe ser texto")
        return sanitize(v)[:50] or None


# ── Rate limiter ───────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── App ────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="FoodFlow API",
    version="2.0",
    docs_url="/docs"  if DOCS_ENABLED else None,
    redoc_url="/redoc" if DOCS_ENABLED else None,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


def init_db():
    import time
    for i in range(5):
        try:
            engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True,
                pool_recycle=300,
                pool_size=5,
                max_overflow=10,
            )
            Base.metadata.create_all(bind=engine)
            return engine, sessionmaker(autocommit=False, autoflush=False, bind=engine)
        except Exception as e:
            print(f"Error conectando a DB (intento {i+1}/5): {e}")
            time.sleep(5)
    raise Exception("No se pudo conectar a la base de datos")

engine, SessionLocal = init_db()

# ── Middleware ─────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-Admin-Secret"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"]  = "nosniff"
    response.headers["X-Frame-Options"]         = "DENY"
    response.headers["X-XSS-Protection"]        = "1; mode=block"
    response.headers["Referrer-Policy"]         = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"]      = "geolocation=(), microphone=(), camera=()"
    return response

@app.middleware("http")
async def limit_body_size(request: Request, call_next):
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > 64 * 1024:  # 64 KB
        return JSONResponse(status_code=413, content={"detail": "Payload demasiado grande"})
    return await call_next(request)

# ── Helpers ────────────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_admin(x_admin_secret: Optional[str] = Header(None)):
    if not x_admin_secret or x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="No autorizado")

# ── Public endpoints ───────────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {"status": "ok"}

@app.post("/orders", status_code=201)
@limiter.limit("10/minute")
def create_order(request: Request, order: OrderCreate, db: Session = Depends(get_db)):
    db_order = Order(
        customer_name   = order.name,
        address         = order.address,
        reference       = order.reference,
        payment_method  = order.paymentMethod,
        delivery_method = order.deliveryMethod,
        items           = {"items": order.selectedItems, "customizations": order.customizations},
        total           = order.total,
        created_at      = datetime.now(timezone.utc).isoformat(),
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return {"status": "success", "order_id": db_order.id}

@app.post("/leads", status_code=201)
@limiter.limit("5/minute")
def create_lead(request: Request, lead: LeadCreate, db: Session = Depends(get_db)):
    db_lead = Lead(
        name            = lead.name,
        email           = str(lead.email),
        phone           = lead.phone,
        restaurant_type = lead.restaurant_type,
        created_at      = datetime.now(timezone.utc).isoformat(),
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return {"status": "success", "lead_id": db_lead.id}

# ── Admin endpoints (require X-Admin-Secret header) ────────────────────────
@app.get("/admin/leads", dependencies=[Depends(verify_admin)])
def get_leads(db: Session = Depends(get_db)):
    leads = db.query(Lead).order_by(Lead.id.desc()).all()
    return [
        {
            "id":              l.id,
            "name":            l.name,
            "email":           l.email,
            "phone":           l.phone,
            "restaurant_type": l.restaurant_type,
            "created_at":      l.created_at,
        }
        for l in leads
    ]

@app.get("/admin/orders", dependencies=[Depends(verify_admin)])
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).order_by(Order.id.desc()).all()
    return [
        {
            "id":              o.id,
            "customer_name":   o.customer_name,
            "address":         o.address,
            "reference":       o.reference,
            "payment_method":  o.payment_method,
            "delivery_method": o.delivery_method,
            "items":           o.items,
            "total":           o.total,
            "created_at":      o.created_at,
        }
        for o in orders
    ]

@app.get("/admin/stats", dependencies=[Depends(verify_admin)])
def get_stats(db: Session = Depends(get_db)):
    return {
        "total_leads":  db.query(Lead).count(),
        "total_orders": db.query(Order).count(),
    }
