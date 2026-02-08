@echo off
REM Script de démarrage pour Nice Code Academy (Windows)

echo 🐍 Nice Code Academy - Démarrage
echo ================================

REM Vérifier si l'environnement virtuel existe
if not exist "venv" (
    echo 📦 Création de l'environnement virtuel...
    python -m venv venv
)

REM Activer l'environnement virtuel
echo 🔧 Activation de l'environnement virtuel...
call venv\Scripts\activate

REM Installer les dépendances
echo 📚 Installation des dépendances...
cd backend
pip install -r requirements.txt

REM Démarrer le serveur
echo.
echo 🚀 Démarrage du serveur sur http://localhost:8000
echo 📖 Documentation API disponible sur http://localhost:8000/docs
echo 🎨 Interface web sur http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.

python main.py
