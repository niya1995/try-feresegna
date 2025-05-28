from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
# from sqlalchemy.orm import Session # Remove Session import
from typing import Annotated, Optional
import httpx # Import httpx

from . import auth
from .schemas import UserOut, TokenUserOut, TokenData
# from . import models # Remove models import
# from .database import get_db # Remove get_db import

router = APIRouter()

# Function to call user service API
async def fetch_user_from_user_service(email: str):
    # In a real scenario, use configuration for the user service URL
    user_service_url = "http://user-service:8000/api/users/by-email/" # Use service name in docker network
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{user_service_url}{email}")
            response.raise_for_status() # Raise an exception for bad status codes
            user_data = response.json()
            return UserOut(**user_data) # Use UserOut schema, will need UserAuthOut later
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                return None # User not found
            raise HTTPException(status_code=e.response.status_code, detail=f"Error fetching user from user service: {e}")
        except httpx.RequestError as e:
             raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Network error communicating with user service: {e}")

# Need a schema that includes password hash for internal communication
# Let's define it here for now, or ideally import from a shared internal schemas package
class UserAuthInternal(UserOut):
    password_hash: str

# Function to call user service API and get auth details
async def fetch_user_auth_details_from_user_service(email: str) -> Optional[UserAuthInternal]:
    user_service_url = "http://user-service:8000/api/users/by-email/" # Use service name in docker network
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{user_service_url}{email}")
            response.raise_for_status() # Raise an exception for bad status codes
            user_data = response.json()
            return UserAuthInternal(**user_data) # Use the internal schema
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                return None # User not found
            raise HTTPException(status_code=e.response.status_code, detail=f"Error fetching user from user service: {e}")
        except httpx.RequestError as e:
             raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Network error communicating with user service: {e}")


@router.post("/api/auth/login", response_model=TokenUserOut)
async def login(form_data: OAuth2PasswordRequestForm = Depends()): # Removed db dependency
    # Fetch user from user service
    user_auth_details = await fetch_user_auth_details_from_user_service(form_data.username)

    if not user_auth_details or not auth.verify_password(form_data.password, user_auth_details.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # Create access token
    access_token = auth.create_access_token(data={
        "sub": user_auth_details.email,
        "role": user_auth_details.role.value
        })

    # Return UserOut schema in the final response
    user_out = UserOut(
        id=user_auth_details.id,
        first_name=user_auth_details.first_name,
        last_name=user_auth_details.last_name,
        email=user_auth_details.email,
        role=user_auth_details.role
    )

    return {"access_token": access_token, "token_type": "bearer", "user": user_out}

# Protected endpoint to get current user details after token validation
@router.get("/api/auth/me", response_model=UserOut)
async def read_users_me(current_user: Annotated[TokenData, Depends(auth.get_current_user)]):
    # Fetch the full user object from the user service using the email from the token
    user = await fetch_user_from_user_service(current_user.email)

    if user is None:
         raise HTTPException(status_code=404, detail="User not found")

    return user 