'use client';

import React from 'react';
import clsx from 'clsx';

import styles from './abacus-bead.module.scss';

interface BeadProps {
  active: boolean;
  onClick: () => void;
  type: 'top' | 'bottom';
}

export const AbacusBead: React.FC<BeadProps> = ({ active, onClick, type }) => {
  return <div onClick={onClick} className={clsx(styles.bead, active ? styles.active : styles.inactive)} />;
};
