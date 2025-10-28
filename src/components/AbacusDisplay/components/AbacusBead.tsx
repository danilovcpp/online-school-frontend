'use client';

import React, { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import styles from './AbacusBead.module.scss';

interface AbacusBeadProps extends ComponentPropsWithoutRef<'div'> {
  active: boolean;
  onClick: () => void;
  interactive?: boolean;
  type: 'top' | 'bottom';
}

export const AbacusBead: React.FC<AbacusBeadProps> = ({ active, onClick, interactive = true, type, ...rest }) => {
  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={clsx(styles.bead, active ? styles.active : styles.inactive, interactive && styles.interactive, styles[type])}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    />
  );
};
