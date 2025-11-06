'use client';

import { useRouter } from 'next/navigation';

import { coursesList } from '@/features/courses/constants/courses-list';
import { CourseCard } from '@/shared/components/CourseCard';
import { routes } from '@/shared/constants/routes';

import styles from './page.module.scss';

export default function CoursesPage() {
  const router = useRouter();

  const handleEnroll = (courseId: string) => {
    // Navigate to course page
    if (courseId === 'mental-arithmetic-level-1') {
      router.push(routes.course.mentalArithmeticLevel1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Курсы</h1>
        <p className={styles.subtitle}>Выберите курс, который подходит вам по уровню и целям обучения</p>
      </div>

      <div className={styles.courses}>
        {coursesList.map((course) => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
    </div>
  );
}
