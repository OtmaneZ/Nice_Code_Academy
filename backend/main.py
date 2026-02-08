"""
Nice Code Academy - Application principale FastAPI
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.database import init_db
from app.api import api_router

# Créer l'application FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Plateforme d'apprentissage Python interactive"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Monter les fichiers statiques
app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")

# Inclure les routes API
app.include_router(api_router, prefix="/api")


@app.on_event("startup")
async def startup_event():
    """Événement au démarrage de l'application"""
    print("🚀 Démarrage de Nice Code Academy...")
    init_db()
    print("✅ Base de données initialisée")


@app.get("/")
async def root():
    """Route racine"""
    return {
        "message": "Bienvenue sur Nice Code Academy!",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Vérification de l'état de l'application"""
    return {"status": "healthy", "app": settings.APP_NAME}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=settings.DEBUG)
