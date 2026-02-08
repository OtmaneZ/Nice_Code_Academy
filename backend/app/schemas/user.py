"""
Schémas Pydantic pour les utilisateurs
"""
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    """Base pour l'utilisateur"""
    username: str
    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Création d'utilisateur"""
    password: str


class UserUpdate(BaseModel):
    """Mise à jour d'utilisateur"""
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    """Réponse utilisateur"""
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Token d'authentification"""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Données du token"""
    username: Optional[str] = None
