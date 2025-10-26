'use client';
import React from 'react';

import { AbacusBead } from '../abacus-bead/abacus-bead';

import styles from './abacus-column.module.scss';

interface AbacusColumnProps {
  columnIndex: number;
  label: string;
  value: number;
  onToggleTop: (column: number, isActive: boolean) => void;
  onToggleBottom: (column: number, index: number, isActive: boolean, beats: boolean[]) => void;
}

export const AbacusColumn: React.FC<AbacusColumnProps> = ({ columnIndex, label, value, onToggleTop, onToggleBottom }) => {
  const hasTopBead = value >= 5;
  const bottomCount = value % 5;
  const bottomBeads = [false, false, false, false];

  for (let i = 3; i >= 4 - bottomCount; i--) {
    bottomBeads[i] = true;
  }

  const handleTopClick = () => {
    onToggleTop(columnIndex, hasTopBead);
  };

  const handleBottomClick = (beadIndex: number) => {
    onToggleBottom(columnIndex, beadIndex, bottomBeads[beadIndex], bottomBeads);
  };

  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      <div className={styles.rod}>
        <div className={styles.topBeads}>
          <AbacusBead active={hasTopBead} onClick={handleTopClick} type="top" />
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomBeads}>
          {bottomBeads.map((isActive, index) => (
            <AbacusBead key={index} type="bottom" active={isActive} onClick={() => handleBottomClick(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};
