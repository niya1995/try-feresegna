from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal
from .config import settings
import httpx
from typing import List
from sqlalchemy.exc import IntegrityError
from datetime import datetime, date as date_type

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Helper functions for inter-service validation ---
async def validate_route_id(route_id: int) -> bool:
    """
    Validate route_id by calling the Route Service.
    Returns True if exists, False otherwise.
    """
    url = f"{settings.ROUTE_SERVICE_URL}/routes/{route_id}"
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, timeout=5.0)
            return resp.status_code == 200
        except Exception:
            return False

async def validate_bus_id(bus_id: int) -> bool:
    """
    Validate bus_id by calling the Bus Service.
    Returns True if exists, False otherwise.
    """
    url = f"{settings.BUS_SERVICE_URL}/buses/id/{bus_id}"
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, timeout=5.0)
            return resp.status_code == 200
        except Exception:
            return False

async def validate_driver_id(driver_id: int) -> bool:
    """
    Validate driver_id by calling the User Service.
    Returns True if exists, False otherwise.
    """
    url = f"{settings.USER_SERVICE_URL}/drivers/{driver_id}"
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(url, timeout=5.0)
            return resp.status_code == 200
        except Exception:
            return False

# --- CRUD Endpoints for Trip ---

@router.post("/trips/", response_model=schemas.Trip, status_code=status.HTTP_201_CREATED)
async def create_trip(trip: schemas.TripCreat, db: Session = Depends(get_db)) -> schemas.Trip:
    """
    Create a new trip after validating route_id, bus_id, and driver_id.
    """
    if not await validate_route_id(trip.route_id):
        raise HTTPException(status_code=404, detail="Route not found")
    if not await validate_bus_id(trip.bus_id):
        raise HTTPException(status_code=404, detail="Bus not found")
    if not await validate_driver_id(trip.driver_id):
        raise HTTPException(status_code=404, detail="Driver not found")
    # Check for duplicate trip
    existing = db.query(models.Trips).filter(
        models.Trips.bus_id == trip.bus_id,
        models.Trips.departure_time == trip.departure_time
    ).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="A trip with this bus and departure time already exists."
        )
    db_trip = models.Trips(
        route_id=trip.route_id,
        bus_id=trip.bus_id,
        driver_id=trip.driver_id,
        departure_time=trip.departure_time,
        arrival_time=trip.arrival_time,
        departure_date=trip.departure_date,
        price=trip.price,
        booked_seats=0
    )
    db.add(db_trip)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="A trip with this bus and departure time already exists."
        )
    db.refresh(db_trip)
    return db_trip

@router.get("/trips/", response_model=List[schemas.Trip])
def get_trips(db: Session = Depends(get_db)) -> List[schemas.Trip]:
    """
    Get all trips.
    """
    trips = db.query(models.Trips).all()
    results = []
    for trip in trips:
        results.append(schemas.Trip(
            trip_id=trip.id,
            bus_id=trip.bus_id,
            driver_id=trip.driver_id,
            departure_time=trip.departure_time,
            arrival_time=trip.arrival_time,
            departure_date=trip.departure_date,
            price=float(trip.price),
            route_id=trip.route_id
        ))
    return results

@router.get("/trips/{trip_id}", response_model=schemas.Trip)
def get_trip(trip_id: int, db: Session = Depends(get_db)) -> schemas.Trip:
    """
    Get a trip by its ID.
    """
    trip = db.query(models.Trips).filter(models.Trips.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return schemas.Trip(
        trip_id=trip.id,
        bus_id=trip.bus_id,
        driver_id=trip.driver_id,
        departure_time=trip.departure_time,
        arrival_time=trip.arrival_time,
        departure_date=trip.departure_date,
        price=float(trip.price),
        route_id=trip.route_id
    )

@router.put("/trips/{trip_id}", response_model=schemas.Trip)
async def update_trip(trip_id: int, trip_update: schemas.TripUpdate, db: Session = Depends(get_db)) -> schemas.Trip:
    """
    Update a trip by its ID. Validate any updated route_id, bus_id, or driver_id.
    """
    db_trip = db.query(models.Trips).filter(models.Trips.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    # Validate if fields are being updated
    if trip_update.route_id is not None:
        if not await validate_route_id(trip_update.route_id):
            raise HTTPException(status_code=404, detail="Route not found")
        db_trip.route_id = trip_update.route_id
    if trip_update.bus_id is not None:
        if not await validate_bus_id(trip_update.bus_id):
            raise HTTPException(status_code=404, detail="Bus not found")
        db_trip.bus_id = trip_update.bus_id
    if trip_update.driver_id is not None:
        if not await validate_driver_id(trip_update.driver_id):
            raise HTTPException(status_code=404, detail="Driver not found")
        db_trip.driver_id = trip_update.driver_id
    if trip_update.departure_time is not None:
        db_trip.departure_time = trip_update.departure_time
    if trip_update.arrival_time is not None:
        db_trip.arrival_time = trip_update.arrival_time
    if trip_update.price is not None:
        db_trip.price = trip_update.price
    db.commit()
    db.refresh(db_trip)
    return db_trip

@router.delete("/trips/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(trip_id: int, db: Session = Depends(get_db)) -> None:
    """
    Delete a trip by its ID.
    """
    db_trip = db.query(models.Trips).filter(models.Trips.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    db.delete(db_trip)
    db.commit()
    return None

@router.get("/trips/search/", response_model=List[schemas.Trip])
def search_trips_by_route_and_date(route_id: int, departure_date: str, db: Session = Depends(get_db)) -> List[schemas.Trip]:
    """
    Search for trips by route_id and departure_date (YYYY-MM-DD).
    Returns all trips for the given route_id and departure_date.
    """
    try:
        search_date = datetime.strptime(departure_date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    trips = db.query(models.Trips).filter(
        models.Trips.route_id == route_id,
        models.Trips.departure_date == search_date,
    ).all()
    if not trips:
        raise HTTPException(status_code=404, detail="No trips found for this route and date.")
    results = []
    for trip in trips:
        results.append(schemas.Trip(
            trip_id=trip.id,
            bus_id=trip.bus_id,
            driver_id=trip.driver_id,
            departure_time=trip.departure_time,
            arrival_time=trip.arrival_time,
            departure_date=trip.departure_date,
            price=float(trip.price),
            route_id=trip.route_id
        ))
    return results
