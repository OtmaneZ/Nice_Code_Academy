"""
Module schemas : Schémas Pydantic pour validation
"""
from .user import UserCreate, UserUpdate, UserResponse, Token, TokenData
from .course import CourseCreate, CourseUpdate, CourseResponse, CourseListResponse
from .exercise import (
    ExerciseCreate, ExerciseUpdate, ExerciseResponse,
    CodeSubmissionCreate, CodeExecutionResult, CodeSubmissionResponse
)
from .activity import (
    ActivityCreate, ActivityUpdate, ActivityResponse,
    QuizAnswerSubmit, QuizAnswerResponse
)

__all__ = [
    "UserCreate", "UserUpdate", "UserResponse", "Token", "TokenData",
    "CourseCreate", "CourseUpdate", "CourseResponse", "CourseListResponse",
    "ExerciseCreate", "ExerciseUpdate", "ExerciseResponse",
    "CodeSubmissionCreate", "CodeExecutionResult", "CodeSubmissionResponse",
    "ActivityCreate", "ActivityUpdate", "ActivityResponse",
    "QuizAnswerSubmit", "QuizAnswerResponse"
]
