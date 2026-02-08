'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getExercises, Exercise } from '@/lib/api';

export default function ExercisesPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExercises() {
      const { data, error } = await getExercises();
      if (error) {
        setError(error);
      } else if (data) {
        setExercises(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    }
    fetchExercises();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement des exercices...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Erreur</p>
        <p>{error}</p>
      </div>
    );
  }

  const difficultyColors = {
    facile: 'bg-green-100 text-green-800',
    moyen: 'bg-yellow-100 text-yellow-800',
    difficile: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">💻 Exercices Python</h1>
        <p className="text-lg text-gray-600">
          Mettez en pratique vos connaissances avec nos exercices interactifs
        </p>
      </div>

      {exercises.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p className="font-bold">Aucun exercice disponible</p>
          <p>Les exercices seront bientôt ajoutés. Revenez plus tard !</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => router.push(`/exercises/${exercise.id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        difficultyColors[exercise.difficulty]
                      }`}
                    >
                      {exercise.difficulty}
                    </span>
                    <span className="text-gray-500">🏆 {exercise.points} points</span>
                  </div>
                </div>
                <span className="text-blue-600 font-semibold text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
