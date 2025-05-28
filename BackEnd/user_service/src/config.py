import os

class Settings:
    DB_HOST: str = os.getenv("DB_HOST", "postgres")
    DB_USER: str = os.getenv("DB_USER", "postgres")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", "123456")
    DB_NAME: str = os.getenv("DB_NAME", "microservices_db")
    DB_PORT: str = os.getenv("DB_PORT", "5432")

settings = Settings()