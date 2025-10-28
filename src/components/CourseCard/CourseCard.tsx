import React from 'react';

import type { Course } from '@/types/courses';

import styles from './CourseCard.module.scss';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const handleEnroll = () => {
    if (onEnroll && course.isAvailable) {
      onEnroll(course.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.icon}>{course.icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Уровень:</span>
            <span className={styles.infoValue}>{course.level}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Длительность:</span>
            <span className={styles.infoValue}>{course.duration}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Уроков:</span>
            <span className={styles.infoValue}>{course.lessonsCount}</span>
          </div>
        </div>

        {course.price !== undefined && (
          <div className={styles.price}>
            {course.price === 0 ? 'Бесплатно' : `${course.price} ₽`}
          </div>
        )}

        <button
          className={styles.button}
          onClick={handleEnroll}
          disabled={!course.isAvailable}
        >
          {course.isAvailable ? 'Записаться на курс' : 'Скоро'}
        </button>
      </div>
    </div>
  );
};
