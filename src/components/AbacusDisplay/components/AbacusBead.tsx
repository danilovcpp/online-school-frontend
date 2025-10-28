'use client';

import React from 'react';
import clsx from 'clsx';

import styles from './AbacusBead.module.scss';

interface AbacusBeadProps {
  active: boolean;
  onClick: () => void;
  interactive?: boolean;
}

export const AbacusBead: React.FC<AbacusBeadProps> = ({ active, onClick, interactive = true }) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={clsx(styles.bead, active ? styles.active : styles.inactive, interactive && styles.interactive)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    />
  );
};
