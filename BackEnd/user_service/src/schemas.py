from pydantic import BaseModel, EmailStr
from enum import Enum
from typing import Optional
from datetime import date

class UserRoleEnum(str, Enum):
    admin = "admin"
    operator = "operator"
    driver = "driver"
    passenger = "passenger"

# --- Base Schemas ---
class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    address: Optional[str] = None

# --- Create Schemas ---
class AdminCreate(UserBase):
    password: str

class OperatorCreate(UserBase):
    password: str

class PassengerCreate(UserBase):
    password: str

class DriverCreate(UserBase):
    password: str
    license_number: str
    license_expiry: Optional[date] = None
    hire_date: Optional[date] = None
    city_id: Optional[int] = None
    operator_name: str

# --- Update Schemas (all fields optional for PATCH) ---
class AdminUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    password: Optional[str] = None

class OperatorUpdate(AdminUpdate):
    pass

class PassengerUpdate(AdminUpdate):
    pass

class DriverUpdate(AdminUpdate):
    license_number: Optional[str] = None
    license_expiry: Optional[date] = None
    hire_date: Optional[date] = None
    city_id: Optional[int] = None
    operator_name: Optional[str] = None

# --- Out Schemas ---
class AdminOut(UserBase):
    id: int
    class Config:
        from_attributes = True

class OperatorOut(UserBase):
    id: int
    class Config:
        from_attributes = True

class PassengerOut(UserBase):
    id: int
    class Config:
        from_attributes = True

class DriverOut(UserBase):
    id: int
    license_number: str
    license_expiry: Optional[date] = None
    hire_date: Optional[date] = None
    city_id: Optional[int] = None
    operator_name: str
    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRoleEnum

    class Config:
        orm_mode = True
        from_attributes = True

# New schema for internal authentication purposes
class UserAuthOut(UserOut):
    password_hash: str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None

# --- New Schema for Login Response ---
class TokenUserOut(BaseModel):
    access_token: str
    token_type: str
    user: UserOut
