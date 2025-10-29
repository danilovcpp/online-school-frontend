'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/button/button';

import { DashboardData } from '@/types/dashboard';

import { ProgressSection } from './ProgressSection/ProgressSection';
import { StatsCard } from './StatsCard/StatsCard';
import { TrainerCard } from './TrainerCard/TrainerCard';

import styles from './Dashboard.module.scss';

interface DashboardProps {
  data: DashboardData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className={styles.dashboard}>
      <ProgressSection progress={data.progress} />

      <div className={styles.statsGrid}>
        {data.categories.map((category) => (
          <StatsCard key={category.id} stats={category} />
        ))}
      </div>

      {data.recommendedTrainers.length > 0 && (
        <div className={styles.trainersSection}>
          <div className={styles.trainersGrid}>
            {data.recommendedTrainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <Link href="/trainers">
          <Button variant="secondary" className={styles.footerButton}>
            Мои занятия
            <span className={styles.arrow}>→</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
