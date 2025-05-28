from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .database import get_db
from .models import User, Admin, Operator, Passenger, Driver, UserRoleEnum
from .schemas import (
    UserOut,
    AdminCreate, OperatorCreate, PassengerCreate, DriverCreate,
    AdminOut, OperatorOut, PassengerOut, DriverOut,
    AdminUpdate, OperatorUpdate, PassengerUpdate, DriverUpdate,
    UserAuthOut
)
from .auth import verify_password, get_password_hash, get_current_authenticated_user

router = APIRouter()

@router.post("/api/users/register/admin", response_model=UserOut)
def register_admin(user: AdminCreate, db: Session = Depends(get_db)):
    return register_user(user, db, UserRoleEnum.admin)

@router.post("/api/users/register/operator", response_model=UserOut)
def register_operator(user: OperatorCreate, db: Session = Depends(get_db)):
    return register_user(user, db, UserRoleEnum.operator)

@router.post("/api/users/register", response_model=UserOut)
def register_passenger(user: PassengerCreate, db: Session = Depends(get_db)):
    return register_user(user, db, UserRoleEnum.passenger)

@router.post("/api/users/register/driver", response_model=UserOut)
def register_driver(user: DriverCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password_hash=get_password_hash(user.password),
        address=user.address,
        role=UserRoleEnum.driver
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    driver = Driver(
        user_id=db_user.id,
        license_number=user.license_number,
        license_expiry=user.license_expiry,
        hire_date=user.hire_date,
        city_id=user.city_id,
        operator_name=user.operator_name
    )
    db.add(driver)
    db.commit()

    return db_user

def register_user(user_data, db: Session, role: UserRoleEnum):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    db_user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        address=user_data.address,
        role=role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    table_map = {
        UserRoleEnum.admin: Admin,
        UserRoleEnum.operator: Operator,
        UserRoleEnum.passenger: Passenger,
    }
    db.add(table_map[role](user_id=db_user.id))
    db.commit()
    return db_user

@router.get("/api/admins", response_model=List[AdminOut])
def list_admins(db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    admins = db.query(Admin).all()
    result = []
    for admin in admins:
        user = db.query(User).filter(User.id == admin.user_id).first()
        if user:
            result.append(AdminOut(
                id=admin.id,
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                address=user.address
            ))
    return result

@router.get("/api/admins/{admin_id}", response_model=AdminOut)
def get_admin(admin_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    user = db.query(User).filter(User.id == admin.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return AdminOut(
        id=admin.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.patch("/api/admins/{admin_id}", response_model=AdminOut)
def patch_admin(admin_id: int, admin_update: AdminUpdate, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    user = db.query(User).filter(User.id == admin.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in admin_update.dict(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return AdminOut(
        id=admin.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.delete("/api/admins/{admin_id}", status_code=204)
def delete_admin(admin_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    user = db.query(User).filter(User.id == admin.user_id).first()
    if user:
        db.delete(user)
    db.delete(admin)
    db.commit()
    return

@router.get("/api/operators", response_model=List[OperatorOut])
def list_operators(db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    operators = db.query(Operator).all()
    result = []
    for operator in operators:
        user = db.query(User).filter(User.id == operator.user_id).first()
        if user:
            result.append(OperatorOut(
                id=operator.id,
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                address=user.address
            ))
    return result

@router.get("/api/operators/{operator_id}", response_model=OperatorOut)
def get_operator(operator_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    operator = db.query(Operator).filter(Operator.id == operator_id).first()
    if not operator:
        raise HTTPException(status_code=404, detail="Operator not found")
    user = db.query(User).filter(User.id == operator.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return OperatorOut(
        id=operator.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.patch("/api/operators/{operator_id}", response_model=OperatorOut)
def patch_operator(operator_id: int, operator_update: OperatorUpdate, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    operator = db.query(Operator).filter(Operator.id == operator_id).first()
    if not operator:
        raise HTTPException(status_code=404, detail="Operator not found")
    user = db.query(User).filter(User.id == operator.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in operator_update.dict(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return OperatorOut(
        id=operator.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.delete("/api/operators/{operator_id}", status_code=204)
def delete_operator(operator_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    operator = db.query(Operator).filter(Operator.id == operator_id).first()
    if not operator:
        raise HTTPException(status_code=404, detail="Operator not found")
    user = db.query(User).filter(User.id == operator.user_id).first()
    if user:
        db.delete(user)
    db.delete(operator)
    db.commit()
    return

@router.get("/api/passengers", response_model=List[PassengerOut])
def list_passengers(db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    passengers = db.query(Passenger).all()
    result = []
    for passenger in passengers:
        user = db.query(User).filter(User.id == passenger.user_id).first()
        if user:
            result.append(PassengerOut(
                id=passenger.id,
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                address=user.address
            ))
    return result

@router.get("/api/passengers/{passenger_id}", response_model=PassengerOut)
def get_passenger(passenger_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    passenger = db.query(Passenger).filter(Passenger.id == passenger_id).first()
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    user = db.query(User).filter(User.id == passenger.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return PassengerOut(
        id=passenger.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.patch("/api/passengers/{passenger_id}", response_model=PassengerOut)
def patch_passenger(passenger_id: int, passenger_update: PassengerUpdate, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    passenger = db.query(Passenger).filter(Passenger.id == passenger_id).first()
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    user = db.query(User).filter(User.id == passenger.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in passenger_update.dict(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return PassengerOut(
        id=passenger.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address
    )

@router.delete("/api/passengers/{passenger_id}", status_code=204)
def delete_passenger(passenger_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    passenger = db.query(Passenger).filter(Passenger.id == passenger_id).first()
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    user = db.query(User).filter(User.id == passenger.user_id).first()
    if user:
        db.delete(user)
    db.delete(passenger)
    db.commit()
    return

@router.get("/api/drivers", response_model=List[DriverOut])
def list_drivers(db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    drivers = db.query(Driver).all()
    result = []
    for driver in drivers:
        user = db.query(User).filter(User.id == driver.user_id).first()
        if user:
            result.append(DriverOut(
                id=driver.id,
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                address=user.address,
                license_number=driver.license_number,
                license_expiry=driver.license_expiry,
                hire_date=driver.hire_date,
                city_id=driver.city_id,
                operator_name=driver.operator_name
            ))
    return result

@router.get("/api/drivers/{driver_id}", response_model=DriverOut)
def get_driver(driver_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    user = db.query(User).filter(User.id == driver.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return DriverOut(
        id=driver.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address,
        license_number=driver.license_number,
        license_expiry=driver.license_expiry,
        hire_date=driver.hire_date,
        city_id=driver.city_id,
        operator_name=driver.operator_name
    )

@router.patch("/api/drivers/{driver_id}", response_model=DriverOut)
def patch_driver(driver_id: int, driver_update: DriverUpdate, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    user = db.query(User).filter(User.id == driver.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in driver_update.dict(exclude_unset=True).items():
        if hasattr(driver, key):
            setattr(driver, key, value)
        else:
            setattr(user, key, value)
    db.commit()
    db.refresh(driver)
    db.refresh(user)
    return DriverOut(
        id=driver.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        address=user.address,
        license_number=driver.license_number,
        license_expiry=driver.license_expiry,
        hire_date=driver.hire_date,
        city_id=driver.city_id,
        operator_name=driver.operator_name
    )

@router.delete("/api/drivers/{driver_id}", status_code=204)
def delete_driver(driver_id: int, db: Session = Depends(get_db), user: UserAuthOut = Depends(get_current_authenticated_user)):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    user = db.query(User).filter(User.id == driver.user_id).first()
    if user:
        db.delete(user)
    db.delete(driver)
    db.commit()
    return

@router.get("/api/users/by-email/{email}", response_model=UserAuthOut)
def get_user_by_email_for_auth(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
