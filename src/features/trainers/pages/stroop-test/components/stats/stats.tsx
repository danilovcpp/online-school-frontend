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
          <div className={styles.label}>Завершено тестов:</div>
          <div className={styles.value}>{stats.completedTests}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Лучшее среднее время:</div>
          <div className={styles.value}>{formatTime(stats.bestTime)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Среднее время:</div>
          <div className={styles.value}>{formatTime(stats.averageTime)}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Точность:</div>
          <div className={styles.value}>{stats.accuracy}%</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Правильных:</div>
          <div className={styles.value}>{stats.totalCorrect}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Неправильных:</div>
          <div className={styles.value}>{stats.totalWrong}</div>
        </div>
      </div>
    </div>
  );
};
