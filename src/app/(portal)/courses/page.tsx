'use client';

import React from 'react';

import { CourseCard } from '@/components/CourseCard';

import { coursesList } from '@/features/courses/constants/courses-list';

import styles from './page.module.scss';

export default function CoursesPage() {
  const handleEnroll = (courseId: string) => {
    // TODO: Implement enrollment logic
    console.log('Enrolling in course:', courseId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Курсы</h1>
        <p className={styles.subtitle}>
          Выберите курс, который подходит вам по уровню и целям обучения
        </p>
      </div>

      <div className={styles.courses}>
        {coursesList.map((course) => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
    </div>
  );
}
