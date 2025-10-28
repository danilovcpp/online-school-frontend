import React from 'react';

import { CategoryStats } from '@/types/dashboard';

import styles from './StatsCard.module.scss';

interface StatsCardProps {
  stats: CategoryStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{stats.title}</h3>
        <div className={styles.points}>
          <span className={styles.pointsValue}>{stats.points}</span>
          <span className={styles.pointsLabel}>баллов</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.completed}</span>
          <span className={styles.statLabel}>решено</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.started}</span>
          <span className={styles.statLabel}>начато</span>
        </div>
        {stats.repeated !== undefined && (
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.repeated}</span>
            <span className={styles.statLabel}>повторено</span>
          </div>
        )}
      </div>
    </div>
  );
};
