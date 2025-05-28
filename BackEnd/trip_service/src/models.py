from sqlalchemy import Column, Integer, DateTime, Numeric, Date
from sqlalchemy.orm import relationship
from .database import Base  # Assuming Base = declarative_base()


class Trips(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    route_id = Column(Integer, nullable=False)
    bus_id = Column(Integer, nullable=True)
    departure_time = Column(DateTime)
    arrival_time = Column(DateTime)
    departure_date = Column(Date)
    price = Column(Numeric(10, 2))
    booked_seats = Column(Integer)
    driver_id = Column(Integer,nullable=False)