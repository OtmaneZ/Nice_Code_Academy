'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseBySlug, Course } from '@/lib/api';
import ReactMarkdown from 'react-markdown';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      const { data, error } = await getCourseBySlug(slug);
      if (error) {
        setError(error);
      } else if (data) {
        setCourse(data);
      }
      setLoading(false);
    }
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Chargement du cours...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Erreur</p>
        <p>{error || 'Cours non trouvé'}</p>
        <button
          onClick={() => router.push('/courses')}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ← Retour aux cours
        </button>
      </div>
    );
  }

  const levelColors = {
    debutant: 'bg-green-100 text-green-800',
    intermediaire: 'bg-yellow-100 text-yellow-800',
    avance: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <button
        onClick={() => router.push('/courses')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Retour aux cours
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              levelColors[course.level]
            }`}
          >
            {course.level}
          </span>
        </div>

        <div className="prose max-w-none">
          <ReactMarkdown>{course.content}</ReactMarkdown>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => router.push('/exercises')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Passer aux exercices →
          </button>
        </div>
      </div>
    </div>
  );
}
