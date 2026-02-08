"""
Modèle Exercice
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base


class Exercise(Base):
    """Table des exercices"""
    __tablename__ = "exercises"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String, nullable=False)
    description = Column(Text)
    instructions = Column(Text)
    starter_code = Column(Text)
    solution_code = Column(Text)
    test_cases = Column(JSON)  # Liste de tests à exécuter
    difficulty = Column(String)
    points = Column(Integer, default=10)
    order = Column(Integer, default=0)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relations
    course = relationship("Course", back_populates="exercises")
    submissions = relationship("CodeSubmission", back_populates="exercise")


class CodeSubmission(Base):
    """Table des soumissions de code"""
    __tablename__ = "code_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    exercise_id = Column(Integer, ForeignKey("exercises.id"))
    code = Column(Text, nullable=False)
    is_correct = Column(Boolean, default=False)
    execution_output = Column(Text)
    error_message = Column(Text)
    execution_time = Column(Integer)  # en millisecondes
    submitted_at = Column(DateTime, default=datetime.utcnow)
    
    # Relations
    user = relationship("User", back_populates="submissions")
    exercise = relationship("Exercise", back_populates="submissions")
