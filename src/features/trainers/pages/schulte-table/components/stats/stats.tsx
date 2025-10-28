import { SchulteTableStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: SchulteTableStats;
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
          <div className={styles.label}>Игр завершено</div>
          <div className={styles.value}>{stats.completedGames}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Лучшее время</div>
          <div className={styles.value}>{formatTime(stats.bestTime)}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Среднее время</div>
          <div className={styles.value}>{stats.completedGames > 0 ? formatTime(stats.averageTime) : '-'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Последнее время</div>
          <div className={styles.value}>{formatTime(stats.lastTime)}</div>
        </div>
      </div>
    </div>
  );
};
