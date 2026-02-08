"""
Routes pour les exercices et l'exécution de code
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app.database import get_db
from app.models import Exercise, CodeSubmission
from app.schemas import (
    ExerciseCreate, ExerciseUpdate, ExerciseResponse,
    CodeSubmissionCreate, CodeExecutionResult, CodeSubmissionResponse
)
from app.services import code_executor


class CodeExecuteRequest(BaseModel):
    """Request pour exécuter du code"""
    code: str


router = APIRouter(prefix="/exercises", tags=["exercises"])


@router.get("/", response_model=List[ExerciseResponse])
async def get_all_exercises(db: Session = Depends(get_db)):
    """Récupère tous les exercices publiés"""
    exercises = db.query(Exercise).filter(
        Exercise.is_published == True
    ).order_by(Exercise.order).all()
    
    return exercises


@router.get("/course/{course_id}", response_model=List[ExerciseResponse])
async def get_exercises_by_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    """Récupère les exercices d'un cours"""
    exercises = db.query(Exercise).filter(
        Exercise.course_id == course_id,
        Exercise.is_published == True
    ).order_by(Exercise.order).all()
    
    return exercises


@router.get("/{exercise_id}", response_model=ExerciseResponse)
async def get_exercise(exercise_id: int, db: Session = Depends(get_db)):
    """Récupère un exercice par son ID"""
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercice non trouvé"
        )
    
    return exercise


@router.post("/{exercise_id}/execute")
async def execute_exercise_code(
    exercise_id: int,
    request: CodeExecuteRequest,
    db: Session = Depends(get_db)
):
    """
    Exécute du code pour un exercice spécifique
    """
    # Récupérer l'exercice
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercice non trouvé"
        )
    
    # Exécuter le code avec les tests de l'exercice
    result = code_executor.execute_code(
        code=request.code,
        test_cases=exercise.test_cases if hasattr(exercise, 'test_cases') else None
    )
    
    return {
        "success": result.get("success", False),
        "output": result.get("output", ""),
        "errors": result.get("error"),
        "test_results": result.get("test_results", [])
    }


@router.post("/", response_model=ExerciseResponse, status_code=status.HTTP_201_CREATED)
async def create_exercise(exercise: ExerciseCreate, db: Session = Depends(get_db)):
    """Crée un nouvel exercice (admin uniquement)"""
    # TODO: Ajouter vérification admin
    
    db_exercise = Exercise(**exercise.model_dump())
    db.add(db_exercise)
    db.commit()
    db.refresh(db_exercise)
    
    return db_exercise


@router.post("/submit", response_model=CodeExecutionResult)
async def submit_code(
    submission: CodeSubmissionCreate,
    db: Session = Depends(get_db)
):
    """
    Soumet du code pour exécution et évaluation
    """
    # Récupérer l'exercice
    exercise = db.query(Exercise).filter(Exercise.id == submission.exercise_id).first()
    
    if not exercise:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Exercice non trouvé"
        )
    
    # Exécuter le code
    result = code_executor.execute_code(
        code=submission.code,
        test_cases=exercise.test_cases
    )
    
    # Sauvegarder la soumission
    # TODO: Ajouter user_id quand l'authentification sera implémentée
    db_submission = CodeSubmission(
        user_id=1,  # Temporaire
        exercise_id=submission.exercise_id,
        code=submission.code,
        is_correct=result.get("is_correct", False),
        execution_output=result.get("output"),
        error_message=result.get("error"),
        execution_time=result.get("execution_time")
    )
    
    db.add(db_submission)
    db.commit()
    
    return CodeExecutionResult(
        is_correct=result["is_correct"],
        output=result.get("output", ""),
        error_message=result.get("error"),
        execution_time=result["execution_time"],
        tests_passed=result.get("tests_passed", 0),
        tests_total=result.get("tests_total", 0)
    )


@router.post("/execute", response_model=CodeExecutionResult)
async def execute_code_sandbox(request: CodeExecuteRequest):
    """
    Exécute du code Python sans le lier à un exercice (mode sandbox)
    """
    result = code_executor.execute_code(code=request.code)
    
    return CodeExecutionResult(
        is_correct=result.get("success", False),
        output=result.get("output", ""),
        error_message=result.get("error"),
        execution_time=result.get("execution_time", 0),
        tests_passed=0,
        tests_total=0
    )
