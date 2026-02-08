"""
Script pour charger les données d'exemple dans la base de données
"""
import json
import sys
from pathlib import Path

# Ajouter le dossier parent au path
sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.database import init_db, SessionLocal
from app.models import Course, Exercise, Activity


def load_courses(db: Session):
    """Charge les cours d'exemple"""
    file_path = Path(__file__).parent.parent.parent / "data" / "courses" / "sample_courses.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        courses_data = json.load(f)
    
    for course_data in courses_data:
        # Vérifier si le cours existe déjà
        existing = db.query(Course).filter(Course.slug == course_data['slug']).first()
        if existing:
            print(f"⏭️  Cours '{course_data['title']}' existe déjà")
            continue
        
        course = Course(**course_data)
        db.add(course)
        print(f"✅ Cours ajouté: {course_data['title']}")
    
    db.commit()


def load_exercises(db: Session):
    """Charge les exercices d'exemple"""
    file_path = Path(__file__).parent.parent.parent / "data" / "exercises" / "sample_exercises.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        exercises_data = json.load(f)
    
    for exercise_data in exercises_data:
        # Vérifier si l'exercice existe déjà
        existing = db.query(Exercise).filter(
            Exercise.course_id == exercise_data['course_id'],
            Exercise.title == exercise_data['title']
        ).first()
        
        if existing:
            print(f"⏭️  Exercice '{exercise_data['title']}' existe déjà")
            continue
        
        exercise = Exercise(**exercise_data)
        db.add(exercise)
        print(f"✅ Exercice ajouté: {exercise_data['title']}")
    
    db.commit()


def load_activities(db: Session):
    """Charge les activités d'exemple"""
    file_path = Path(__file__).parent.parent.parent / "data" / "activities" / "sample_activities.json"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        activities_data = json.load(f)
    
    for activity_data in activities_data:
        # Vérifier si l'activité existe déjà
        existing = db.query(Activity).filter(
            Activity.title == activity_data['title']
        ).first()
        
        if existing:
            print(f"⏭️  Activité '{activity_data['title']}' existe déjà")
            continue
        
        activity = Activity(**activity_data)
        db.add(activity)
        print(f"✅ Activité ajoutée: {activity_data['title']}")
    
    db.commit()


def main():
    """Fonction principale"""
    print("🐍 Nice Code Academy - Chargement des données")
    print("=" * 50)
    
    # Initialiser la base de données
    print("\n📦 Initialisation de la base de données...")
    init_db()
    
    # Créer une session
    db = SessionLocal()
    
    try:
        print("\n📚 Chargement des cours...")
        load_courses(db)
        
        print("\n💻 Chargement des exercices...")
        load_exercises(db)
        
        print("\n🎯 Chargement des activités...")
        load_activities(db)
        
        print("\n" + "=" * 50)
        print("✅ Données chargées avec succès!")
        print("\n🚀 Vous pouvez maintenant démarrer le serveur:")
        print("   python main.py")
        
    except Exception as e:
        print(f"\n❌ Erreur: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()
