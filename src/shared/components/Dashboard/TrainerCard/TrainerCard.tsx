'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/ui-kit/button/button';

import { RecommendedTrainer } from '@/types/dashboard';

import styles from './TrainerCard.module.scss';

interface TrainerCardProps {
  trainer: RecommendedTrainer;
  buttonText?: string;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, buttonText = 'Попробовать' }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{trainer.icon}</span>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{trainer.title}</h3>
          <p className={styles.description}>{trainer.description}</p>
        </div>
      </div>
      <Link href={trainer.path}>
        <Button variant="primary" className={styles.button}>
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};
