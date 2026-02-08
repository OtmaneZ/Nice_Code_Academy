import Link from 'next/link';
import { Course } from '@/lib/api';

interface CourseCardProps {
  course: Course;
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const levelLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 h-full cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              levelColors[course.difficulty_level]
            }`}
          >
            {levelLabels[course.difficulty_level]}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Leçon {course.order}</span>
          <span className="text-blue-600 font-semibold">Commencer →</span>
        </div>
      </div>
    </Link>
  );
}
