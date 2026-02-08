"""
Script pour réinitialiser complètement la base de données
"""
import os
import sys
from pathlib import Path

# Ajouter le dossier parent au path
sys.path.append(str(Path(__file__).parent))

from app.database import Base, engine

def reset_database():
    """Supprime et recrée toutes les tables"""
    print("🗑️  Suppression des tables existantes...")
    Base.metadata.drop_all(bind=engine)
    
    print("🏗️  Création des nouvelles tables...")
    Base.metadata.create_all(bind=engine)
    
    print("✅ Base de données réinitialisée!")
    print("\n📝 Prochaine étape: Chargez les données avec:")
    print("   python scripts/load_sample_data.py")

if __name__ == "__main__":
    confirm = input("⚠️  Êtes-vous sûr de vouloir réinitialiser la base de données? (oui/non): ")
    if confirm.lower() == "oui":
        reset_database()
    else:
        print("❌ Opération annulée")
