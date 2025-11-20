from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import requests
import os
from pydantic import BaseModel
from typing import List, Optional
import ipaddress
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from datetime import datetime
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://user:password@localhost/threatcheck_portal")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password_hash = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    api_responses = relationship("APIResponse", back_populates="user")

class APIResponse(Base):
    __tablename__ = "api_responses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    data_type = Column(String(20))
    input_data = Column(Text)
    response_data = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="api_responses")

# Create tables
Base.metadata.create_all(bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Auth helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

# Security scheme
security = HTTPBearer()
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CheckRequest(BaseModel):
    data: List[str]
    data_type: str  # e.g., "ip"

# Auth models
class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

ABUSEIPDB_URL = "https://api.abuseipdb.com/api/v2/check"
ABUSEIPDB_KEY = os.getenv("ABUSEIPDB_KEY")
VT_API_KEY = os.getenv("VT_API_KEY")
VT_URL = "https://www.virustotal.com/api/v3/domains"
VT_URL_SUBMIT = "https://www.virustotal.com/api/v3/urls"
VT_ANALYSES_URL = "https://www.virustotal.com/api/v3/analyses"

# Auth endpoints
@app.post("/signup", response_model=Token)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Hash password and create user
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create access token
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Dependency to get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user

@app.post("/check")
async def check_data(request: CheckRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):


    results = []
    for item in request.data:
        if request.data_type == "ip":
            params = {"ipAddress": item, "maxAgeInDays": 90}
            headers = {"Key": ABUSEIPDB_KEY, "Accept": "application/json"}
            response = requests.get(ABUSEIPDB_URL, headers=headers, params=params)
            if response.status_code == 200:
                results.append(response.json())
            else:
                results.append({"error": f"Failed for {item}: {response.text}"})
        elif request.data_type == "domain":
            url = f"{VT_URL}/{item}"
            headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                results.append(response.json())
            else:
                results.append({"error": f"Failed for {item}: {response.text}"})
        elif request.data_type == "url":
            # Submit URL for analysis
            headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
            data = {"url": item}
            submit_response = requests.post(VT_URL_SUBMIT, headers=headers, data=data)
            if submit_response.status_code == 200:
                submit_data = submit_response.json()
                analysis_id = submit_data["data"]["id"]
                # Get analysis report
                analysis_url = f"{VT_ANALYSES_URL}/{analysis_id}"
                analysis_response = requests.get(analysis_url, headers=headers)
                if analysis_response.status_code == 200:
                    analysis_data = analysis_response.json()
                    stats = analysis_data["data"]["attributes"]["stats"]
                    malicious = stats.get("malicious", 0)
                    suspicious = stats.get("suspicious", 0)
                    if malicious > 0:
                        status = "malicious"
                    elif suspicious > 0:
                        status = "suspicious"
                    else:
                        status = "clean"
                    results.append({"url": item, "status": status, "stats": stats})
                else:
                    results.append({"error": f"Failed to get analysis for {item}: {analysis_response.text}"})
            else:
                results.append({"error": f"Failed to submit {item}: {submit_response.text}"})
        elif request.data_type == "autodetect":
            try:
                ipaddress.ip_address(item)
                # IP, use AbuseIPDB
                params = {"ipAddress": item, "maxAgeInDays": 90}
                headers = {"Key": ABUSEIPDB_KEY, "Accept": "application/json"}
                response = requests.get(ABUSEIPDB_URL, headers=headers, params=params)
                if response.status_code == 200:
                    results.append(response.json())
                else:
                    results.append({"error": f"Failed for {item}: {response.text}"})
            except ValueError:
                # Treat as domain or URL, use VirusTotal
                # For simplicity, assume domain; if URL, user should select url type
                url = f"{VT_URL}/{item}"
                headers = {"x-apikey": VT_API_KEY, "Accept": "application/json"}
                response = requests.get(url, headers=headers)
                if response.status_code == 200:
                    results.append(response.json())
                else:
                    results.append({"error": f"Failed for {item}: {response.text}"})
        else:
            results.append({"error": f"Unsupported data type: {request.data_type} for {item}"})

    # Save results to database
    for i, item in enumerate(request.data):
        if i < len(results):
            api_response = APIResponse(
                user_id=current_user.id,
                data_type=request.data_type,
                input_data=item,
                response_data=results[i]
            )
            db.add(api_response)
    db.commit()

    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
