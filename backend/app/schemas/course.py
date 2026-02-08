"""
Schémas Pydantic pour les cours
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class CourseBase(BaseModel):
    """Base pour le cours"""
    title: str
    slug: str
    description: Optional[str] = None
    content: Optional[str] = None
    difficulty_level: str
    duration_minutes: Optional[int] = None
    order: int = 0


class CourseCreate(CourseBase):
    """Création de cours"""
    pass


class CourseUpdate(BaseModel):
    """Mise à jour de cours"""
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    difficulty_level: Optional[str] = None
    duration_minutes: Optional[int] = None
    order: Optional[int] = None
    is_published: Optional[bool] = None


class CourseResponse(CourseBase):
    """Réponse cours"""
    id: int
    is_published: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CourseListResponse(BaseModel):
    """Liste de cours"""
    courses: List[CourseResponse]
    total: int
