# 🐍 Nice Code Academy

Une plateforme web interactive pour apprendre Python de manière ludique et progressive.

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Technologies](#-technologies)

## 🎯 Vue d'ensemble

**Nice Code Academy** est une plateforme d'apprentissage Python moderne qui combine :
- 📚 Des cours structurés et progressifs
- 💻 Un éditeur de code intégré dans le navigateur
- 🎯 Des exercices pratiques avec validation automatique
- 🎮 Des activités ludiques (quiz, histoires, blagues)
- ✅ Un système de progression et de scoring

## ✨ Fonctionnalités

### Pour les apprenants
- **Cours interactifs** : Apprenez Python étape par étape
- **Éditeur de code en ligne** : Codez directement dans votre navigateur
- **Exécution instantanée** : Voyez les résultats de votre code immédiatement
- **Tests automatiques** : Validez vos exercices automatiquement
- **Activités ludiques** : Quiz, histoires interactives, blagues de programmeur
- **Suivi de progression** : Suivez votre avancement

### Pour les administrateurs
- **Gestion des cours** : Créez et organisez des cours
- **Création d'exercices** : Définissez des tests automatiques
- **Activités variées** : Ajoutez du contenu ludique
- **Statistiques** : Analysez les progressions

## 🏗️ Architecture

```
Nice Code Academy/
│
├── backend/                    # API FastAPI
│   ├── app/
│   │   ├── api/               # Routes API
│   │   │   └── routes/
│   │   │       ├── courses.py
│   │   │       ├── exercises.py
│   │   │       └── activities.py
│   │   ├── models/            # Modèles SQLAlchemy
│   │   ├── schemas/           # Schémas Pydantic
│   │   ├── services/          # Logique métier
│   │   ├── core/              # Configuration
│   │   └── database/          # Configuration DB
│   ├── main.py                # Point d'entrée
│   └── requirements.txt
│
├── frontend/                   # Frontend HTML/JS/Tailwind
│   ├── static/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       ├── api.js         # Client API
│   │       ├── editor.js      # Éditeur de code
│   │       └── app.js         # Application principale
│   └── templates/
│       └── index.html
│
└── data/                       # Données (cours, exercices)
    ├── courses/
    ├── exercises/
    └── activities/
```

## 🚀 Installation

### Prérequis

- Python 3.9 ou supérieur
- pip (gestionnaire de paquets Python)

### Étape 1 : Cloner le projet

```bash
cd Nice_Code_Academy
```

### Étape 2 : Créer un environnement virtuel

```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### Étape 3 : Installer les dépendances

```bash
cd backend
pip install -r requirements.txt
```

### Étape 4 : Configuration

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env avec vos paramètres
```

### Étape 5 : Initialiser la base de données

```bash
# La base de données sera créée automatiquement au premier démarrage
```

## 🎮 Utilisation

### Démarrer le serveur backend

```bash
cd backend
python main.py
```

Le serveur démarrera sur `http://localhost:8000`

### Accéder à l'application

1. Ouvrez votre navigateur
2. Allez sur `http://localhost:8000`
3. Ou consultez la documentation API : `http://localhost:8000/docs`

### Tester l'API

```bash
# Récupérer les cours
curl http://localhost:8000/api/courses

# Exécuter du code Python
curl -X POST http://localhost:8000/api/exercises/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello World\")"}'
```

## 📁 Structure du projet

### Backend (FastAPI)

#### Models (Base de données)
- `User` : Utilisateurs de la plateforme
- `Course` : Cours Python
- `Exercise` : Exercices pratiques
- `CodeSubmission` : Soumissions de code
- `Activity` : Activités ludiques
- `UserProgress` : Progression des utilisateurs

#### API Endpoints

**Cours**
- `GET /api/courses` : Liste des cours
- `GET /api/courses/{id}` : Détails d'un cours
- `GET /api/courses/slug/{slug}` : Cours par slug
- `POST /api/courses` : Créer un cours (admin)
- `PUT /api/courses/{id}` : Modifier un cours (admin)
- `DELETE /api/courses/{id}` : Supprimer un cours (admin)

**Exercices**
- `GET /api/exercises/course/{course_id}` : Exercices d'un cours
- `GET /api/exercises/{id}` : Détails d'un exercice
- `POST /api/exercises/submit` : Soumettre une solution
- `POST /api/exercises/execute` : Exécuter du code (sandbox)

**Activités**
- `GET /api/activities` : Liste des activités
- `GET /api/activities/{id}` : Détails d'une activité
- `POST /api/activities/submit-quiz` : Soumettre une réponse de quiz
- `GET /api/activities/type/joke` : Blague aléatoire

### Frontend (HTML/JS/Tailwind)

#### Composants JavaScript
- **APIClient** (`api.js`) : Gestion des appels API
- **CodeEditor** (`editor.js`) : Éditeur de code interactif
- **App** (`app.js`) : Application principale et navigation

#### Styles
- Tailwind CSS pour le design responsive
- Styles personnalisés dans `styles.css`
- Design inspiré de Google (clean et moderne)

## 🔧 Technologies

### Backend
- **FastAPI** : Framework web moderne et rapide
- **SQLAlchemy** : ORM pour la base de données
- **Pydantic** : Validation des données
- **SQLite** : Base de données (configurable)
- **RestrictedPython** : Exécution sécurisée de code

### Frontend
- **HTML5** : Structure
- **Tailwind CSS** : Framework CSS moderne
- **Vanilla JavaScript** : Interactivité (pas de framework lourd)

### DevOps
- **Uvicorn** : Serveur ASGI haute performance
- **CORS** : Configuration pour développement local

## 🎓 Exemples de cours

Structure d'un cours :

```json
{
  "title": "Introduction à Python",
  "slug": "intro-python",
  "description": "Découvrez les bases de Python",
  "difficulty_level": "beginner",
  "duration_minutes": 45,
  "content": "# Chapitre 1: Variables\\n\\nEn Python, une variable..."
}
```

Structure d'un exercice :

```json
{
  "title": "Créer une fonction addition",
  "instructions": "Créez une fonction qui additionne deux nombres",
  "starter_code": "def addition(a, b):\\n    # Votre code ici\\n    pass",
  "test_cases": [
    {
      "expression": "addition(2, 3)",
      "expected": 5
    },
    {
      "expression": "addition(10, 20)",
      "expected": 30
    }
  ]
}
```

Structure d'une activité ludique :

```json
{
  "title": "Quiz: Les bases de Python",
  "activity_type": "quiz",
  "content": {
    "question": "Quel mot-clé utilise-t-on pour définir une fonction ?",
    "options": ["func", "def", "function", "define"],
    "correct_answer": 1,
    "explanation": "On utilise 'def' pour définir une fonction en Python"
  }
}
```

## 🔒 Sécurité

- Exécution de code Python dans un environnement restreint
- Timeout configurable pour l'exécution de code
- Limitation de la longueur du code
- Validation des entrées avec Pydantic

## 📝 Développement futur

- [ ] Système d'authentification complet
- [ ] Dashboard administrateur
- [ ] Système de badges et récompenses
- [ ] Mode sombre
- [ ] Support multi-langues
- [ ] Partage de code entre utilisateurs
- [ ] Forum communautaire
- [ ] Certificats de completion

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

**Nice Code Academy Team**

---

Fait avec ❤️ et 🐍 Python
