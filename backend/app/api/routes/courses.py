"""
Routes pour les cours
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import Course
from app.schemas import CourseCreate, CourseUpdate, CourseResponse, CourseListResponse

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("/", response_model=CourseListResponse)
async def get_courses(
    skip: int = 0,
    limit: int = 100,
    difficulty: str = None,
    db: Session = Depends(get_db)
):
    """Récupère la liste des cours"""
    query = db.query(Course).filter(Course.is_published == True)
    
    if difficulty:
        query = query.filter(Course.difficulty_level == difficulty)
    
    courses = query.order_by(Course.order).offset(skip).limit(limit).all()
    total = query.count()
    
    return {"courses": courses, "total": total}


@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int, db: Session = Depends(get_db)):
    """Récupère un cours par son ID"""
    course = db.query(Course).filter(Course.id == course_id).first()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cours non trouvé"
        )
    
    return course


@router.get("/slug/{slug}", response_model=CourseResponse)
async def get_course_by_slug(slug: str, db: Session = Depends(get_db)):
    """Récupère un cours par son slug"""
    course = db.query(Course).filter(Course.slug == slug).first()
    
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cours non trouvé"
        )
    
    return course


@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """Crée un nouveau cours (admin uniquement)"""
    # TODO: Ajouter vérification admin
    
    # Vérifier si le slug existe déjà
    existing = db.query(Course).filter(Course.slug == course.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un cours avec ce slug existe déjà"
        )
    
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    return db_course


@router.put("/{course_id}", response_model=CourseResponse)
async def update_course(
    course_id: int,
    course_update: CourseUpdate,
    db: Session = Depends(get_db)
):
    """Met à jour un cours (admin uniquement)"""
    # TODO: Ajouter vérification admin
    
    db_course = db.query(Course).filter(Course.id == course_id).first()
    
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cours non trouvé"
        )
    
    # Mettre à jour les champs
    for field, value in course_update.model_dump(exclude_unset=True).items():
        setattr(db_course, field, value)
    
    db.commit()
    db.refresh(db_course)
    
    return db_course


@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_course(course_id: int, db: Session = Depends(get_db)):
    """Supprime un cours (admin uniquement)"""
    # TODO: Ajouter vérification admin
    
    db_course = db.query(Course).filter(Course.id == course_id).first()
    
    if not db_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cours non trouvé"
        )
    
    db.delete(db_course)
    db.commit()
