"""
Routes pour les activités ludiques
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Activity
from app.schemas import (
    ActivityCreate, ActivityUpdate, ActivityResponse,
    QuizAnswerSubmit, QuizAnswerResponse
)

router = APIRouter(prefix="/activities", tags=["activities"])


@router.get("/", response_model=List[ActivityResponse])
async def get_activities(
    activity_type: str = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Récupère les activités ludiques"""
    query = db.query(Activity).filter(Activity.is_published == True)
    
    if activity_type:
        query = query.filter(Activity.activity_type == activity_type)
    
    activities = query.offset(skip).limit(limit).all()
    
    return activities


@router.get("/{activity_id}", response_model=ActivityResponse)
async def get_activity(activity_id: int, db: Session = Depends(get_db)):
    """Récupère une activité par son ID"""
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    
    if not activity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Activité non trouvée"
        )
    
    return activity


@router.post("/", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
async def create_activity(activity: ActivityCreate, db: Session = Depends(get_db)):
    """Crée une nouvelle activité (admin uniquement)"""
    # TODO: Ajouter vérification admin
    
    db_activity = Activity(**activity.model_dump())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    
    return db_activity


@router.post("/submit-quiz", response_model=QuizAnswerResponse)
async def submit_quiz_answer(
    answer_submit: QuizAnswerSubmit,
    db: Session = Depends(get_db)
):
    """Soumet une réponse à un quiz"""
    activity = db.query(Activity).filter(Activity.id == answer_submit.activity_id).first()
    
    if not activity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Activité non trouvée"
        )
    
    if activity.activity_type != "quiz":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cette activité n'est pas un quiz"
        )
    
    # Vérifier la réponse
    content = activity.content
    correct_answer = content.get("correct_answer")
    is_correct = answer_submit.answer == correct_answer
    
    points_earned = activity.points if is_correct else 0
    
    return QuizAnswerResponse(
        is_correct=is_correct,
        correct_answer=correct_answer if not is_correct else None,
        explanation=content.get("explanation"),
        points_earned=points_earned
    )


@router.get("/type/joke", response_model=List[ActivityResponse])
async def get_random_joke(db: Session = Depends(get_db)):
    """Récupère une blague aléatoire"""
    import random
    
    jokes = db.query(Activity).filter(
        Activity.activity_type == "joke",
        Activity.is_published == True
    ).all()
    
    if not jokes:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Aucune blague disponible"
        )
    
    return [random.choice(jokes)]
