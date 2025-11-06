'use client';

import { useState } from 'react';
import Link from 'next/link';

import { mentalArithmeticLevel1Lessons } from '@/features/courses/data/mental-arithmetic-level-1';
import { Lesson } from '@/shared/components/Lesson/Lesson';
import { routes } from '@/shared/constants/routes';

import styles from './page.module.scss';

export default function MentalArithmeticLevel1Page() {
  const [lessons, setLessons] = useState(mentalArithmeticLevel1Lessons);

  const handleLessonComplete = (lessonId: string) => {
    setLessons((prevLessons) => prevLessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson)));
  };

  const completedCount = lessons.filter((lesson) => lesson.isCompleted).length;
  const progress = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href={routes.courses} className={styles.backLink}>
          ← Назад к курсам
        </Link>
        <h1 className={styles.title}>Ментальная арифметика (уровень 1)</h1>
        <p className={styles.description}>
          Базовый курс ментальной арифметики. Освойте основы счёта на абакусе и развивайте навыки ментального счёта.
        </p>

        <div className={styles.progressBlock}>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>Прогресс курса:</span>
            <span className={styles.progressValue}>
              {completedCount} из {lessons.length} уроков
            </span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.lessons}>
        {lessons.map((lesson) => (
          <Lesson key={lesson.id} lesson={lesson} onComplete={handleLessonComplete} />
        ))}
      </div>
    </div>
  );
}
