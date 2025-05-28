from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date

class TripCreat(BaseModel):
    route_id: int
    bus_id: int
    driver_id: int
    departure_time: datetime
    arrival_time: datetime
    departure_date: date
    price: float

class TripUpdate(BaseModel):
    route_id: Optional[int] = None
    bus_id: Optional[int] = None
    driver_id: Optional[int] = None
    departure_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
    departure_date: Optional[date] = None
    price: Optional[float] = None

class Trip(BaseModel):
    trip_id: int
    bus_id: int
    driver_id: int
    departure_time: datetime
    arrival_time: datetime
    departure_date: date
    price: float
    route_id: int
    class Config:
        orm_mode = True