"""
Modèle Activité Ludique
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from datetime import datetime
from app.database.connection import Base


class Activity(Base):
    """Table des activités ludiques"""
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    activity_type = Column(String)  # quiz, story, challenge, joke
    description = Column(Text)
    content = Column(JSON)  # Contenu flexible selon le type
    difficulty = Column(String)
    points = Column(Integer, default=5)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    """
    Exemples de content JSON:
    - Quiz: {"question": "...", "options": [...], "correct_answer": 0}
    - Story: {"text": "...", "choices": [...], "outcomes": [...]}
    - Joke: {"setup": "...", "punchline": "..."}
    """
