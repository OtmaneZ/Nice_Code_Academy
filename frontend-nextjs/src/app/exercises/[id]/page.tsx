'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getExerciseById, executeCode, Exercise, ExecuteCodeResponse } from '@/lib/api';
import CodeEditor from '@/components/CodeEditor';

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExecuteCodeResponse | null>(null);

  useEffect(() => {
    async function fetchExercise() {
      const { data, error } = await getExerciseById(id);
      if (error) {
        setError(error);
      } else if (data) {
        setExercise(data);
      }
      setLoading(false);
    }
    fetchExercise();
  }, [id]);

  const handleRunCode = async (code: string) => {
    setResult(null);
    const { data, error } = await executeCode(id, code);
    if (error) {
      setResult({
        success: false,
        output: '',
        errors: error,
      });
    } else if (data) {
      setResult(data);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement de l'exercice...</div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Erreur</p>
        <p>{error || 'Exercice non trouvé'}</p>
        <button
          onClick={() => router.push('/exercises')}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ← Retour aux exercices
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.push('/exercises')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Retour aux exercices
      </button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{exercise.title}</h1>
          <p className="text-gray-600 mb-6">{exercise.description}</p>
          
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {exercise.difficulty}
            </span>
            <span className="ml-2 text-gray-600">🏆 {exercise.points} points</span>
          </div>

          {exercise.hints && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="font-semibold text-yellow-800 mb-2">💡 Indice</p>
              <p className="text-yellow-700">{exercise.hints}</p>
            </div>
          )}
        </div>

        {/* Editor and Results */}
        <div className="space-y-6">
          <CodeEditor
            initialCode={exercise.starter_code}
            onRun={handleRunCode}
          />

          {/* Results */}
          {result && (
            <div className={`rounded-lg p-6 ${
              result.success 
                ? 'bg-green-50 border-2 border-green-500' 
                : 'bg-red-50 border-2 border-red-500'
            }`}>
              <h3 className={`font-bold text-lg mb-3 ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? '✅ Réussi !' : '❌ Échec'}
              </h3>
              
              {result.output && (
                <div className="mb-3">
                  <p className="font-semibold text-gray-700 mb-1">Sortie :</p>
                  <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
                    {result.output}
                  </pre>
                </div>
              )}
              
              {result.errors && (
                <div className="mb-3">
                  <p className="font-semibold text-red-700 mb-1">Erreurs :</p>
                  <pre className="bg-white p-3 rounded border overflow-x-auto text-sm text-red-600">
                    {result.errors}
                  </pre>
                </div>
              )}

              {result.test_results && (
                <div>
                  <p className="font-semibold text-gray-700 mb-2">Tests :</p>
                  {result.test_results.map((test, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <span>{test.passed ? '✅' : '❌'}</span>
                      <span className="text-sm">{test.test_name}: {test.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
