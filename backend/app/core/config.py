"""
Configuration centrale de l'application
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Configuration de l'application"""
    
    # Application
    APP_NAME: str = "Nice Code Academy"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Base de données
    DATABASE_URL: str = "sqlite:///./nice_code_academy.db"
    
    # Sécurité
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]
    
    # Limites d'exécution de code
    CODE_EXECUTION_TIMEOUT: int = 5
    MAX_CODE_LENGTH: int = 10000
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
