"""
Schémas Pydantic pour les activités ludiques
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any


class ActivityBase(BaseModel):
    """Base pour l'activité"""
    title: str
    activity_type: str  # quiz, story, challenge, joke
    description: Optional[str] = None
    content: Dict[str, Any]
    difficulty: str
    points: int = 5


class ActivityCreate(ActivityBase):
    """Création d'activité"""
    pass


class ActivityUpdate(BaseModel):
    """Mise à jour d'activité"""
    title: Optional[str] = None
    activity_type: Optional[str] = None
    description: Optional[str] = None
    content: Optional[Dict[str, Any]] = None
    difficulty: Optional[str] = None
    points: Optional[int] = None
    is_published: Optional[bool] = None


class ActivityResponse(ActivityBase):
    """Réponse activité"""
    id: int
    is_published: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class QuizAnswerSubmit(BaseModel):
    """Soumission de réponse de quiz"""
    activity_id: int
    answer: Any


class QuizAnswerResponse(BaseModel):
    """Résultat de quiz"""
    is_correct: bool
    correct_answer: Optional[Any] = None
    explanation: Optional[str] = None
    points_earned: int
