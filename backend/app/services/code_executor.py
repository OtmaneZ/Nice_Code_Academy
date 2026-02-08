"""
Service d'exécution de code Python sécurisée
"""
import sys
import io
import time
from typing import Dict, Any, List
from contextlib import redirect_stdout, redirect_stderr
from app.core.config import settings


class CodeExecutor:
    """Exécuteur de code Python sécurisé"""
    
    def __init__(self):
        self.timeout = settings.CODE_EXECUTION_TIMEOUT
        self.max_code_length = settings.MAX_CODE_LENGTH
    
    def execute_code(self, code: str, test_cases: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Exécute du code Python de manière sécurisée
        
        Args:
            code: Le code Python à exécuter
            test_cases: Liste de cas de test optionnels
            
        Returns:
            Dictionnaire contenant le résultat de l'exécution
        """
        if len(code) > self.max_code_length:
            return {
                "success": False,
                "output": "",
                "error": f"Le code est trop long (max {self.max_code_length} caractères)",
                "execution_time": 0
            }
        
        # Capturer stdout et stderr
        stdout = io.StringIO()
        stderr = io.StringIO()
        
        start_time = time.time()
        
        try:
            # Créer un namespace isolé
            namespace = {
                '__builtins__': {
                    'print': print,
                    'len': len,
                    'range': range,
                    'str': str,
                    'int': int,
                    'float': float,
                    'list': list,
                    'dict': dict,
                    'tuple': tuple,
                    'set': set,
                    'bool': bool,
                    'sum': sum,
                    'max': max,
                    'min': min,
                    'abs': abs,
                    'round': round,
                    'sorted': sorted,
                    'enumerate': enumerate,
                    'zip': zip,
                    'map': map,
                    'filter': filter,
                }
            }
            
            # Exécuter le code
            with redirect_stdout(stdout), redirect_stderr(stderr):
                exec(code, namespace)
            
            execution_time = int((time.time() - start_time) * 1000)
            
            output = stdout.getvalue()
            error = stderr.getvalue()
            
            # Si des test cases sont fournis, les exécuter
            tests_passed = 0
            tests_total = 0
            
            if test_cases:
                tests_total = len(test_cases)
                for test in test_cases:
                    try:
                        # Évaluer le test
                        test_result = eval(test['expression'], namespace)
                        if test_result == test['expected']:
                            tests_passed += 1
                    except Exception:
                        pass
            
            return {
                "success": True,
                "output": output,
                "error": error if error else None,
                "execution_time": execution_time,
                "tests_passed": tests_passed,
                "tests_total": tests_total,
                "is_correct": tests_passed == tests_total if test_cases else True
            }
            
        except Exception as e:
            execution_time = int((time.time() - start_time) * 1000)
            return {
                "success": False,
                "output": stdout.getvalue(),
                "error": str(e),
                "execution_time": execution_time,
                "tests_passed": 0,
                "tests_total": len(test_cases) if test_cases else 0,
                "is_correct": False
            }


# Instance singleton
code_executor = CodeExecutor()
