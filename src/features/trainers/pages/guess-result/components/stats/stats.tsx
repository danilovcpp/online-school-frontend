import type { GuessResultStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: GuessResultStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className={styles.stats}>
      <h3 className={styles.title}>Статистика</h3>
      <div className={styles.grid}>
        <div className={styles.stat}>
          <div className={styles.label}>Правильные ответы</div>
          <div className={styles.value}>{stats.correct}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Неправильные</div>
          <div className={styles.value}>{stats.wrong}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Точность</div>
          <div className={styles.value}>{stats.totalRounds > 0 ? `${stats.accuracy}%` : '-'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Среднее время</div>
          <div className={styles.value}>{stats.totalRounds > 0 ? `${stats.averageTime}с` : '-'}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.label}>Всего раундов</div>
          <div className={styles.value}>{stats.totalRounds}</div>
        </div>
      </div>
    </div>
  );
};

export { Stats };
