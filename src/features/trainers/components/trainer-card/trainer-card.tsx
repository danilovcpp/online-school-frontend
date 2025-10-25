import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { Trainer } from '@/types';

import styles from './trainer-card.module.scss';

interface TrainerCardProps {
  trainer: Trainer;
  isActive: boolean;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, isActive }) => {
  return (
    <Link href={trainer.path} className={styles.root}>
      <div className={clsx(styles.card, { [styles.active]: isActive })}>
        <div className={styles.content}>
          <div className={styles.icon}>{trainer.icon}</div>
          <h3 className={styles.title}>{trainer.title}</h3>
          <p className={styles.description}>{trainer.description}</p>
        </div>
      </div>
    </Link>
  );
};
