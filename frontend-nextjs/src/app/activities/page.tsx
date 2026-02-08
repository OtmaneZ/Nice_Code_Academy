'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getActivities, Activity } from '@/lib/api';

export default function ActivitiesPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await getActivities();
      if (error) {
        setError(error);
      } else if (data) {
        setActivities(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    }
    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement des activités...</div>
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

  const typeIcons = {
    quiz: '🎯',
    story: '📖',
    joke: '😄',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎮 Activités Ludiques</h1>
        <p className="text-lg text-gray-600">
          Apprenez en vous amusant avec nos quiz, histoires et blagues de programmeur
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p className="font-bold">Aucune activité disponible</p>
          <p>Les activités seront bientôt ajoutées. Revenez plus tard !</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => router.push(`/activities/${activity.id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
            >
              <div className="text-4xl mb-3">{typeIcons[activity.type]}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {activity.title}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 capitalize">{activity.type}</span>
                <span className="text-blue-600">🏆 {activity.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
