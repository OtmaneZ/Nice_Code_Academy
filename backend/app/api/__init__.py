"""
Module API : Point d'entrée des routes
"""
from fastapi import APIRouter
from .routes import courses, exercises, activities

api_router = APIRouter()

# Inclure les routes
api_router.include_router(courses.router)
api_router.include_router(exercises.router)
api_router.include_router(activities.router)
