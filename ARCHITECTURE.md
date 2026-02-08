# 🏗️ Architecture de Nice Code Academy

## Vue d'ensemble

Nice Code Academy suit une architecture **Full-Stack** moderne avec séparation claire des responsabilités.

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Client)                     │
│  HTML5 + Tailwind CSS + Vanilla JavaScript              │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐           │
│  │   UI     │  │  Editor  │  │   Pages    │           │
│  │Components│  │Component │  │  Manager   │           │
│  └────┬─────┘  └────┬─────┘  └─────┬──────┘           │
│       └─────────────┼──────────────┘                    │
│                     │                                    │
│              ┌──────▼────────┐                          │
│              │  API Client   │                          │
│              └──────┬────────┘                          │
└─────────────────────┼────────────────────────────────────┘
                      │ HTTP/REST
                      │ JSON
┌─────────────────────▼────────────────────────────────────┐
│                 BACKEND (Serveur)                         │
│              FastAPI + Python 3.9+                        │
│  ┌────────────────────────────────────────────────────┐  │
│  │              API Layer (Routes)                    │  │
│  │  /courses  /exercises  /activities  /execute      │  │
│  └─────────────────┬──────────────────────────────────┘  │
│                    │                                      │
│  ┌─────────────────▼──────────────────────────────────┐  │
│  │           Service Layer (Business Logic)          │  │
│  │  CodeExecutor │ AuthService │ ValidationService   │  │
│  └─────────────────┬──────────────────────────────────┘  │
│                    │                                      │
│  ┌─────────────────▼──────────────────────────────────┐  │
│  │            Data Layer (Models + DB)               │  │
│  │  SQLAlchemy ORM │ Pydantic Schemas │ SQLite      │  │
│  └────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

## 📁 Structure détaillée

### Backend (FastAPI)

```
backend/
├── main.py                      # Point d'entrée de l'application
├── requirements.txt             # Dépendances Python
├── .env.example                 # Configuration exemple
│
└── app/
    ├── __init__.py
    │
    ├── core/                    # Configuration centrale
    │   ├── __init__.py
    │   └── config.py           # Settings de l'app
    │
    ├── database/               # Gestion de la base de données
    │   ├── __init__.py
    │   └── connection.py       # SQLAlchemy setup
    │
    ├── models/                 # Modèles de données (ORM)
    │   ├── __init__.py
    │   ├── user.py            # Modèle Utilisateur
    │   ├── course.py          # Modèle Cours
    │   ├── exercise.py        # Modèle Exercice + Soumissions
    │   ├── activity.py        # Modèle Activités ludiques
    │   └── progress.py        # Modèle Progression
    │
    ├── schemas/               # Schémas de validation (Pydantic)
    │   ├── __init__.py
    │   ├── user.py
    │   ├── course.py
    │   ├── exercise.py
    │   └── activity.py
    │
    ├── services/              # Logique métier
    │   ├── __init__.py
    │   ├── code_executor.py  # Exécution de code sécurisée
    │   └── auth.py           # Authentification JWT
    │
    └── api/                   # Routes API REST
        ├── __init__.py
        └── routes/
            ├── __init__.py
            ├── courses.py     # CRUD Cours
            ├── exercises.py   # CRUD Exercices + Exécution
            └── activities.py  # CRUD Activités

scripts/                        # Scripts utilitaires
└── load_sample_data.py        # Charger données d'exemple
```

### Frontend (HTML/JS/Tailwind)

```
frontend/
├── templates/
│   └── index.html             # Page principale
│
└── static/
    ├── css/
    │   └── styles.css         # Styles personnalisés + Tailwind
    │
    ├── js/
    │   ├── api.js            # Client API REST
    │   ├── editor.js         # Composant éditeur de code
    │   └── app.js            # Application principale
    │
    └── images/               # Assets graphiques
```

### Données (JSON)

```
data/
├── courses/
│   └── sample_courses.json    # Cours d'exemple
│
├── exercises/
│   └── sample_exercises.json  # Exercices d'exemple
│
└── activities/
    └── sample_activities.json # Activités ludiques
```

## 🔄 Flux de données

### 1. Exécution de code

```
[User Interface]
      │
      │ 1. User écrit du code Python
      ▼
[CodeEditor Component]
      │
      │ 2. Click "Exécuter"
      ▼
[API Client]
      │
      │ 3. POST /api/exercises/execute
      │    Body: { "code": "print('Hello')" }
      ▼
[FastAPI Backend]
      │
      │ 4. Validation (Pydantic)
      ▼
[CodeExecutor Service]
      │
      │ 5. Exécution sécurisée
      │    - Namespace isolé
      │    - Timeout
      │    - Capture stdout/stderr
      ▼
[Response JSON]
      │
      │ 6. Résultat
      │    { "output": "Hello", "execution_time": 5 }
      ▼
[CodeEditor Component]
      │
      │ 7. Affichage du résultat
      ▼
[User Interface]
```

### 2. Soumission d'exercice

```
[User Interface]
      │
      │ 1. Résoudre exercice
      ▼
[Exercise Component]
      │
      │ 2. Submit solution
      ▼
[API Client]
      │
      │ 3. POST /api/exercises/submit
      │    Body: { "exercise_id": 1, "code": "..." }
      ▼
[FastAPI - Exercise Route]
      │
      │ 4. Récupérer l'exercice
      ▼
[Database (SQLite)]
      │
      │ 5. Récupérer test_cases
      ▼
[CodeExecutor Service]
      │
      │ 6. Exécuter + Valider tests
      │    tests_passed / tests_total
      ▼
[Database - CodeSubmission]
      │
      │ 7. Enregistrer soumission
      ▼
[Response JSON]
      │
      │ 8. Résultat + Score
      ▼
[User Interface]
```

## 🔐 Sécurité

### Exécution de code

1. **Namespace isolé** : Seules les fonctions essentielles sont disponibles
2. **Timeout** : Limite de 5 secondes par défaut
3. **Longueur limitée** : Max 10,000 caractères
4. **Pas d'imports dangereux** : os, sys, subprocess interdits
5. **Capture des erreurs** : Gestion propre des exceptions

### API

1. **CORS configuré** : Origines autorisées définies
2. **Validation Pydantic** : Toutes les entrées validées
3. **JWT pour auth** : Tokens sécurisés (à implémenter)
4. **Rate limiting** : À ajouter en production

## 📊 Modèles de données

### Relations

```
User (Utilisateur)
  │
  ├─→ UserProgress (Progression)
  │     ├─→ Course
  │     └─→ Exercise
  │
  └─→ CodeSubmission (Soumissions)
        └─→ Exercise

Course (Cours)
  │
  └─→ Exercise (Exercices)
        └─→ CodeSubmission
```

### Schéma de base de données

```sql
-- Users
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR UNIQUE,
    email VARCHAR UNIQUE,
    hashed_password VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME
);

-- Courses
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    title VARCHAR,
    slug VARCHAR UNIQUE,
    content TEXT,
    difficulty_level VARCHAR,
    order INTEGER
);

-- Exercises
CREATE TABLE exercises (
    id INTEGER PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    title VARCHAR,
    starter_code TEXT,
    solution_code TEXT,
    test_cases JSON,
    points INTEGER
);

-- Code Submissions
CREATE TABLE code_submissions (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    exercise_id INTEGER REFERENCES exercises(id),
    code TEXT,
    is_correct BOOLEAN,
    execution_time INTEGER,
    submitted_at DATETIME
);

-- Activities
CREATE TABLE activities (
    id INTEGER PRIMARY KEY,
    title VARCHAR,
    activity_type VARCHAR,
    content JSON,
    points INTEGER
);
```

## 🔌 API Endpoints

### Cours

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/courses` | Liste des cours |
| GET | `/api/courses/{id}` | Détails d'un cours |
| GET | `/api/courses/slug/{slug}` | Cours par slug |
| POST | `/api/courses` | Créer un cours |
| PUT | `/api/courses/{id}` | Modifier un cours |
| DELETE | `/api/courses/{id}` | Supprimer un cours |

### Exercices

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/exercises/course/{id}` | Exercices d'un cours |
| GET | `/api/exercises/{id}` | Détails d'un exercice |
| POST | `/api/exercises/submit` | Soumettre une solution |
| POST | `/api/exercises/execute` | Exécuter du code (sandbox) |

### Activités

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/activities` | Liste des activités |
| GET | `/api/activities/{id}` | Détails d'une activité |
| POST | `/api/activities/submit-quiz` | Soumettre réponse quiz |
| GET | `/api/activities/type/joke` | Blague aléatoire |

## 🎨 Design Pattern utilisés

1. **MVC (Model-View-Controller)** : Séparation des préoccupations
2. **Repository Pattern** : Abstraction de la couche données
3. **Service Layer** : Logique métier centralisée
4. **Singleton** : CodeExecutor instance unique
5. **Factory Pattern** : Création des sessions DB

## 🚀 Évolutivité

### Performance

- **Base de données** : Indexation sur colonnes fréquentes
- **Cache** : Redis pour les cours populaires (futur)
- **CDN** : Assets statiques (futur)
- **Load balancing** : Multiple instances (futur)

### Scalabilité

- **Microservices** : Séparer l'exécution de code (futur)
- **Queue system** : RabbitMQ/Celery pour jobs longs (futur)
- **Container** : Docker pour déploiement (futur)
- **Cloud** : AWS/Azure/GCP ready (futur)

## 🧪 Tests (à implémenter)

```
tests/
├── unit/
│   ├── test_models.py
│   ├── test_services.py
│   └── test_code_executor.py
│
├── integration/
│   ├── test_api_courses.py
│   ├── test_api_exercises.py
│   └── test_api_activities.py
│
└── e2e/
    └── test_user_flow.py
```

## 📈 Monitoring (à ajouter)

- **Logs** : Logging structuré
- **Metrics** : Prometheus + Grafana
- **Tracing** : OpenTelemetry
- **Errors** : Sentry

---

Cette architecture est conçue pour être **simple**, **évolutive** et **maintenable**. 🚀
