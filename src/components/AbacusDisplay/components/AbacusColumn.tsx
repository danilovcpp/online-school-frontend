'use client';

import React from 'react';

import { AbacusBead } from './AbacusBead';

import styles from './AbacusColumn.module.scss';

interface AbacusColumnProps {
  columnIndex: number;
  label?: string;
  value: number;
  onToggleTop?: (column: number, isActive: boolean) => void;
  onToggleBottom?: (column: number, index: number, isActive: boolean, beads: boolean[]) => void;
}

export const AbacusColumn: React.FC<AbacusColumnProps> = ({ columnIndex, label, value, onToggleTop, onToggleBottom }) => {
  const hasTopBead = value >= 5;
  const bottomCount = value % 5;
  const bottomBeads = [false, false, false, false];

  // Активные бусины располагаются снизу вверх (индекс 3,2,1,0)
  // bottomCount бусин будут активны начиная с нижней
  for (let i = 3; i >= 4 - bottomCount; i--) {
    bottomBeads[i] = true;
  }

  const handleTopClick = () => {
    if (onToggleTop) {
      onToggleTop(columnIndex, hasTopBead);
    }
  };

  const handleBottomClick = (beadIndex: number) => {
    if (onToggleBottom) {
      onToggleBottom(columnIndex, beadIndex, bottomBeads[beadIndex], bottomBeads);
    }
  };

  return (
    <div className={styles.column}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.rod}>
        <div className={styles.topSection}>
          {!hasTopBead && <div className={styles.spacer} />}
          <AbacusBead active={hasTopBead} onClick={handleTopClick} interactive={!!onToggleTop} />
          {hasTopBead && <div className={styles.spacer} />}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          {bottomCount > 0 && <div className={styles.spacer} />}
          <div className={styles.beadGroup}>
            {bottomBeads.map((isActive, index) => (
              <AbacusBead key={index} active={isActive} onClick={() => handleBottomClick(index)} interactive={!!onToggleBottom} />
            ))}
          </div>
          {bottomCount === 0 && <div className={styles.spacer} />}
        </div>
      </div>
    </div>
  );
};
