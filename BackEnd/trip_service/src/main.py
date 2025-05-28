"""
FastAPI main entrypoint for Auth API.
Handles app creation, CORS, and router inclusion.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import status, Request

from . import models
from . import database
from .routes import router

# Create the database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Auth API")

# Global exception handler for password too short
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    for error in exc.errors():
        if error["loc"][-1] == "password" and error["type"] == "string_too_short":
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"detail": "Password is too short. Please use at least 6 characters."}
            )
    # Default validation error response
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()}
    )

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
