from datetime import datetime, timedelta
from typing import Annotated, Optional
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
import httpx

from . import schemas
from . import models
from .database import get_db

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Password functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Function to validate token by calling the auth-service
async def validate_token_with_auth_service(token: str) -> Optional[schemas.UserAuthOut]:
    """
    Validates the token by making an internal request to the auth-service.

    Args:
        token: The JWT token string.

    Returns:
        The user object if the token is valid, otherwise None.

    Raises:
        HTTPException: If the token is invalid or the auth-service is unreachable.
    """
    # Use the service name 'auth-service' defined in docker-compose
    auth_service_url = "http://auth-service:8000/api/auth/me" # Corrected port for inter-service communication
    async with httpx.AsyncClient() as client:
        try:
            # Send the token in the Authorization header as Bearer token
            response = await client.get(auth_service_url, headers={"Authorization": f"Bearer {token}"})
            response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)

            # Assuming the auth-service /me endpoint returns the user data if the token is valid
            user_data = response.json()
            # Validate and return the user data using the UserAuthOut schema
            return schemas.UserAuthOut(**user_data)
        except httpx.HTTPStatusError as e:
            # Handle specific HTTP errors from auth-service (e.g., 401 Unauthorized)
            # If auth-service returns 401, re-raise as 401 in user-service
            if e.response.status_code == status.HTTP_401_UNAUTHORIZED:
                 raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid authentication credentials",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            # For other HTTP errors, raise a generic HTTPException
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Authentication service responded with error: {e.response.text}"
            )
        except httpx.RequestError as e:
            # Handle errors in making the request (e.g., auth-service is down)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Could not connect to authentication service: {e}"
            )
        except Exception as e:
            # Handle any other unexpected errors
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"An unexpected error occurred during token validation: {e}"
            )


# Dependency to get the current authenticated user
# Manually extract token from Authorization header
async def get_current_authenticated_user(
    authorization: str = Header(None)
) -> schemas.UserAuthOut:
    """
    FastAPI dependency to get the current authenticated user.

    Extracts the token from the Authorization header and validates it using the auth-service.

    Args:
        authorization: The Authorization header string (e.g., "Bearer <token>").

    Returns:
        The authenticated user object.

    Raises:
        HTTPException: If the token is missing or invalid.
    """
    if authorization is None:
         raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Expecting the header in the format "Bearer <token>"
    scheme, token = authorization.split()
    if scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header must be in Bearer format",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Validate the token by calling the auth-service
    user = await validate_token_with_auth_service(token)

    # validate_token_with_auth_service already raises HTTPException for invalid tokens, 
    # but we keep this check for clarity and potential future changes
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
