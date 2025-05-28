"""
FastAPI main entrypoint for User API.
Handles app creation, CORS, and router inclusion.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
import uvicorn

from . import models
from . import database
from .routes import router

# Create the database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="User Services")

# Configure OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost"],# Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(router, prefix="/api", tags=["users"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
