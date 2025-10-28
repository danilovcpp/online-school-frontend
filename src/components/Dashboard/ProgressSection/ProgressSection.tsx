import React from 'react';

import { StudentProgress } from '@/types/dashboard';

import styles from './ProgressSection.module.scss';

interface ProgressSectionProps {
  progress: StudentProgress;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({ progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{progress.currentLevel}</h1>
        <p className={styles.subtitle}>К {progress.nextLevel}</p>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Мой прогресс</span>
          <span className={styles.progressPoints}>{progress.totalPoints} баллов</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress.progressPercentage}%` }} />
        </div>
      </div>
    </div>
  );
};
