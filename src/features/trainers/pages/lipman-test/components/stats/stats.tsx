import { LipmanTestStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: LipmanTestStats;
}

export const Stats = ({ stats }: StatsProps) => {
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '-';
    return `${seconds}с`;
  };

  return (
    <div className={styles.stats}>
      <h3 className={styles.title}>Статистика</h3>
      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.label}>Тестов завершено</div>
          <div className={styles.value}>{stats.completedTests}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Лучшее время</div>
          <div className={styles.value}>{formatTime(stats.bestTime)}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Среднее время</div>
          <div className={styles.value}>{stats.completedTests > 0 ? formatTime(stats.averageTime) : '-'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Точность</div>
          <div className={styles.value}>{stats.completedTests > 0 ? `${stats.accuracy}%` : '-'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Правильно</div>
          <div className={styles.value}>{stats.totalCorrect}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Ошибок</div>
          <div className={styles.value}>{stats.totalWrong}</div>
        </div>
      </div>
    </div>
  );
};
