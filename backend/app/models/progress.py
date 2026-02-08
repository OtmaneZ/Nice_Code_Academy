"""
Modèle Progression Utilisateur
"""
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base


class UserProgress(Base):
    """Table de progression des utilisateurs"""
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=True)
    is_completed = Column(Boolean, default=False)
    completion_date = Column(DateTime, nullable=True)
    score = Column(Integer, default=0)
    attempts = Column(Integer, default=0)
    last_attempt = Column(DateTime, default=datetime.utcnow)
    
    # Relations
    user = relationship("User", back_populates="progress")
