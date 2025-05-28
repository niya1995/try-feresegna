from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from .database import Base
import enum

class UserRoleEnum(str, enum.Enum):
    admin = "admin"
    operator = "operator"
    driver = "driver"
    passenger = "passenger"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(Text)
    address = Column(String(255))
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    role = Column(Enum(UserRoleEnum))

class Admin(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)

class Operator(Base):
    __tablename__ = "operator"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)

class Passenger(Base):
    __tablename__ = "passenger"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    license_number = Column(String(50), nullable=False)
    license_expiry = Column(Date)
    hire_date = Column(Date)
    city_id = Column(Integer)
    operator_name = Column(String(100), nullable=False)
