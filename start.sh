#!/bin/bash

# Script de démarrage pour Nice Code Academy

echo "🐍 Nice Code Academy - Démarrage"
echo "================================"

# Vérifier si l'environnement virtuel existe
if [ ! -d "venv" ]; then
    echo "📦 Création de l'environnement virtuel..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
echo "🔧 Activation de l'environnement virtuel..."
source venv/bin/activate

# Installer les dépendances
echo "📚 Installation des dépendances..."
cd backend
pip install -r requirements.txt

# Démarrer le serveur
echo ""
echo "🚀 Démarrage du serveur sur http://localhost:8000"
echo "📖 Documentation API disponible sur http://localhost:8000/docs"
echo "🎨 Interface web sur http://localhost:8000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

python main.py
