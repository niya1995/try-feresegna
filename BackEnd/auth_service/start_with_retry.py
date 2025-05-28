import time
import sys
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import uvicorn

# Use your actual database URL here or import from your config
# This should match the database URL used by the auth service
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:123456@postgres:5432/microservices_db"

if __name__ == "__main__":
    max_retries = 10 # Increased retries for robustness
    retry_delay = 5 # seconds
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Attempt {attempt}: Connecting to database...")
            # Attempt to create a database engine and connect
            engine = create_engine(SQLALCHEMY_DATABASE_URL)
            conn = engine.connect()
            conn.close()
            print("Database connection successful!")
            break # Exit the loop if connection is successful
        except OperationalError as e:
            print(f"Database connection failed: {e}")
            if attempt == max_retries:
                print("Max retries reached. Exiting.")
                sys.exit(1) # Exit if max retries are reached
            print(f"Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)

    # Now start the FastAPI server for the auth service
    # Ensure 'src.main:app' is the correct entry point for your auth service FastAPI application
    # The port should be the internal container port (8000) as defined in docker-compose.yml
    print("Database connected, starting auth service...")
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True) 