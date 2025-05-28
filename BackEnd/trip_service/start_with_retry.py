import time
import sys
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
import uvicorn

# Use your actual database URL here or import from your config
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:123456@postgres:5432/microservices_db"

if __name__ == "__main__":
    max_retries = 5
    for attempt in range(1, max_retries + 1):
        try:
            print(f"Attempt {attempt}: Connecting to database...")
            engine = create_engine(SQLALCHEMY_DATABASE_URL)
            conn = engine.connect()
            conn.close()
            print("Database connection successful!")
            break
        except OperationalError as e:
            print(f"Database connection failed: {e}")
            if attempt == max_retries:
                print("Max retries reached. Exiting.")
                sys.exit(1)
            print("Retrying in 5 seconds...")
            time.sleep(5)
    # Now start the FastAPI server
    uvicorn.run("src.main:app", host="0.0.0.0", port=8001, reload=True)