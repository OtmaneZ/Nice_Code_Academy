"""
Schémas Pydantic pour les exercices
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict, Any


class ExerciseBase(BaseModel):
    """Base pour l'exercice"""
    course_id: int
    title: str
    description: Optional[str] = None
    instructions: Optional[str] = None
    starter_code: Optional[str] = None
    difficulty: str
    points: int = 10
    order: int = 0


class ExerciseCreate(ExerciseBase):
    """Création d'exercice"""
    solution_code: str
    test_cases: List[Dict[str, Any]]


class ExerciseUpdate(BaseModel):
    """Mise à jour d'exercice"""
    title: Optional[str] = None
    description: Optional[str] = None
    instructions: Optional[str] = None
    starter_code: Optional[str] = None
    solution_code: Optional[str] = None
    test_cases: Optional[List[Dict[str, Any]]] = None
    difficulty: Optional[str] = None
    points: Optional[int] = None
    order: Optional[int] = None
    is_published: Optional[bool] = None


class ExerciseResponse(ExerciseBase):
    """Réponse exercice (sans solution)"""
    id: int
    is_published: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class CodeSubmissionCreate(BaseModel):
    """Soumission de code"""
    exercise_id: int
    code: str


class CodeExecutionResult(BaseModel):
    """Résultat d'exécution de code"""
    is_correct: bool
    output: str
    error_message: Optional[str] = None
    execution_time: int
    tests_passed: int
    tests_total: int


class CodeSubmissionResponse(BaseModel):
    """Réponse soumission"""
    id: int
    exercise_id: int
    is_correct: bool
    execution_output: Optional[str]
    error_message: Optional[str]
    execution_time: Optional[int]
    submitted_at: datetime
    
    class Config:
        from_attributes = True
