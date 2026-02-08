'use client';

import { useEffect, useState } from 'react';
import { getCourses, Course } from '@/lib/api';
import CourseCard from '@/components/CourseCard';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await getCourses();
      if (error) {
        setError(error);
      } else if (data) {
        // S'assurer que data est un tableau
        setCourses(Array.isArray(data) ? data : []);
      }
      setLoading(false);
    }
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement des cours...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Erreur</p>
        <p>{error}</p>
        <p className="text-sm mt-2">
          Assurez-vous que le backend est démarré sur http://localhost:8000
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">📚 Nos Cours Python</h1>
        <p className="text-lg text-gray-600">
          Apprenez Python de manière progressive avec nos cours structurés
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
          <p className="font-bold">Aucun cours disponible</p>
          <p>Les cours seront bientôt ajoutés. Revenez plus tard !</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
