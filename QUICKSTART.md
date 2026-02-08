# 🚀 Guide de démarrage rapide

## Installation rapide

### Sur macOS/Linux

```bash
# 1. Donner les permissions au script
chmod +x start.sh

# 2. Lancer l'application
./start.sh
```

### Sur Windows

```bash
# Double-cliquer sur start.bat
# Ou dans le terminal:
start.bat
```

### Installation manuelle

```bash
# 1. Créer l'environnement virtuel
python3 -m venv venv

# 2. Activer l'environnement
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 3. Installer les dépendances
cd backend
pip install -r requirements.txt

# 4. Lancer le serveur
python main.py
```

## Accès à l'application

Une fois le serveur démarré, ouvrez votre navigateur :

- **Application web** : http://localhost:8000
- **Documentation API** : http://localhost:8000/docs
- **API Interactive** : http://localhost:8000/redoc

## Premiers pas

1. **Tester l'éditeur de code**
   - Allez sur la page d'accueil
   - Scrollez jusqu'à l'éditeur de démonstration
   - Écrivez du code Python et cliquez sur "Exécuter"

2. **Explorer les cours**
   - Cliquez sur "📚 Cours" dans la navigation
   - Parcourez les cours disponibles

3. **Essayer le Sandbox**
   - Cliquez sur "🎮 Sandbox"
   - Codez librement sans contraintes

4. **Faire des activités**
   - Cliquez sur "🎯 Activités"
   - Essayez les quiz et les histoires interactives

## Développement

### Ajouter des cours

Éditez le fichier : `data/courses/sample_courses.json`

### Ajouter des exercices

Éditez le fichier : `data/exercises/sample_exercises.json`

### Ajouter des activités

Éditez le fichier : `data/activities/sample_activities.json`

## Problèmes courants

### Port 8000 déjà utilisé

Changez le port dans `backend/main.py` :
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

### Erreur de module manquant

Réinstallez les dépendances :
```bash
pip install -r backend/requirements.txt
```

### Problème de CORS

Vérifiez `backend/.env` et ajoutez votre origine :
```
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

## Support

Pour toute question, consultez le README.md principal.

Bon apprentissage ! 🐍✨
