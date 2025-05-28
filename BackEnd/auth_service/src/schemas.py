from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class UserRoleEnum(str, Enum):
    admin = "admin"
    operator = "operator"
    driver = "driver"
    passenger = "passenger"

# Schemas needed for authentication
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[UserRoleEnum] = None # Added role to TokenData

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: UserRoleEnum

    class Config:
        from_attributes = True

class TokenUserOut(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# Schema for login request
class UserLogin(BaseModel):
    email: EmailStr
    password: str 