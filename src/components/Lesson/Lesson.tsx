'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { Accordion, AccordionContent, AccordionControl } from '@/components/accordion';

import type { Lesson as LessonType } from '@/types/courses';

import styles from './Lesson.module.scss';

interface LessonProps {
  lesson: LessonType;
  onComplete?: (lessonId: string) => void;
}

export const Lesson: React.FC<LessonProps> = ({ lesson, onComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComplete = () => {
    if (onComplete && !lesson.isCompleted) {
      onComplete(lesson.id);
    }
  };

  return (
    <Accordion
      className={clsx(styles.lesson, lesson.isLocked && styles.locked, lesson.isCompleted && styles.completed)}
      disabled={lesson.isLocked}
      expanded={isExpanded}
      onChange={setIsExpanded}
    >
      <AccordionControl icon={lesson.isLocked ? <span className={styles.lockIcon}>🔒</span> : undefined}>
        <div className={styles.headerContent}>
          <div className={styles.orderBadge}>{lesson.isCompleted ? '✓' : lesson.order}</div>
          <h3 className={styles.title}>{lesson.title}</h3>
        </div>
      </AccordionControl>
      <AccordionContent className={styles.content}>
        <div className={styles.theory}>
          <h4 className={styles.sectionTitle}>📚 {lesson.theory.title}</h4>
          <div className={styles.theoryContent}>{lesson.theory.content}</div>
        </div>

        <div className={styles.practice}>
          <h4 className={styles.sectionTitle}>🎯 Практика</h4>
          {lesson.practice.description && <p className={styles.practiceDescription}>{lesson.practice.description}</p>}
          {lesson.practice.requirements && (
            <div className={styles.requirements}>
              <strong>Требования:</strong> {lesson.practice.requirements}
            </div>
          )}
          <div className={styles.practiceActions}>
            <Link href={lesson.practice.trainerPath} className={styles.trainerLink}>
              Перейти к тренажеру
            </Link>
            {!lesson.isCompleted && (
              <button onClick={handleComplete} className={styles.completeButton}>
                Отметить как выполненное
              </button>
            )}
          </div>
        </div>
      </AccordionContent>
    </Accordion>
  );
};
