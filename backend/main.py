"""
Nice Code Academy - Application principale FastAPI
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from app.core.config import settings
from app.database import init_db
from app.api import api_router
from app.services import code_executor


class CodeExecuteRequest(BaseModel):
    """Request pour exécuter du code"""
    code: str


class CodeExecuteResponse(BaseModel):
    """Response pour l'exécution de code"""
    success: bool
    output: str
    errors: str | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gestion du cycle de vie de l'application"""
    # Startup
    print("🚀 Démarrage de Nice Code Academy...")
    init_db()
    print("✅ Base de données initialisée")
    yield
    # Shutdown
    print("👋 Arrêt de Nice Code Academy...")


# Créer l'application FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Plateforme d'apprentissage Python interactive",
    lifespan=lifespan
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


@app.post("/api/execute", response_model=CodeExecuteResponse)
async def execute_code(request: CodeExecuteRequest):
    """
    Route d'exécution de code pour le sandbox
    """
    result = code_executor.execute_code(code=request.code)
    
    return CodeExecuteResponse(
        success=result.get("success", False),
        output=result.get("output", ""),
        errors=result.get("error")
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
