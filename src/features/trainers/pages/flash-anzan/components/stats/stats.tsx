import type { FlashAnzanStats } from '@/types';

import styles from './stats.module.scss';

interface StatsProps {
  stats: FlashAnzanStats;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const totalRounds = stats.correct + stats.wrong;

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
          <div className={styles.value}>{totalRounds > 0 ? `${stats.accuracy}%` : '-'}</div>
        </div>
      </div>
    </div>
  );
};

export { Stats };
