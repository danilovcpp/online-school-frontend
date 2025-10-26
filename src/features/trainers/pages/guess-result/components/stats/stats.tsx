import type { GuessResultStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: GuessResultStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  if (stats.totalRounds === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Статистика:</h3>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>Правильные ответы:</span>
          <span className={styles.value}>{stats.correct}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Неправильные:</span>
          <span className={styles.value}>{stats.wrong}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Точность:</span>
          <span className={styles.value}>{stats.accuracy}%</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Среднее время:</span>
          <span className={styles.value}>{stats.averageTime}с</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Всего раундов:</span>
          <span className={styles.value}>{stats.totalRounds}</span>
        </div>
      </div>
    </div>
  );
};

export { Stats };
