import { StroopTestStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: StroopTestStats;
}

export const Stats = ({ stats }: StatsProps) => {
  const formatTime = (ms: number | null) => {
    if (ms === null) return '-';
    return `${(ms / 1000).toFixed(2)}с`;
  };

  return (
    <div className={styles.stats}>
      <h3 className={styles.title}>Статистика</h3>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>Завершено тестов:</span>
          <span className={styles.value}>{stats.completedTests}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Лучшее среднее время:</span>
          <span className={styles.value}>{formatTime(stats.bestTime)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Среднее время:</span>
          <span className={styles.value}>{formatTime(stats.averageTime)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Точность:</span>
          <span className={styles.value}>{stats.accuracy}%</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Правильных:</span>
          <span className={styles.value}>{stats.totalCorrect}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Неправильных:</span>
          <span className={styles.value}>{stats.totalWrong}</span>
        </div>
      </div>
    </div>
  );
};
