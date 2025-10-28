'use client';

import React from 'react';

import { AbacusBead } from './AbacusBead';

import styles from './AbacusColumn.module.scss';

interface AbacusColumnProps {
  columnIndex: number;
  label?: string;
  value: number;
  onToggleTop?: (column: number, isActive: boolean) => void;
  onToggleBottom?: (column: number, index: number, isActive: boolean, activeBeats: boolean[]) => void;
}

export const AbacusColumn: React.FC<AbacusColumnProps> = ({ columnIndex, label, value, onToggleTop, onToggleBottom }) => {
  const hasTopBead = value >= 5;
  const bottomCount = value % 5;
  const bottomBeads = [false, false, false, false];

  console.log('bottomCount', bottomCount);

  // Активные бусины - это бусины у разделителя
  // bottomCount определяет количество активных бусин (подсвеченных)
  // Индекс 0 = ближайшая к разделителю, индекс 3 = самая дальняя
  for (let i = 0; i < bottomCount; i++) {
    bottomBeads[i] = true;
  }

  const handleTopClick = () => {
    onToggleTop?.(columnIndex, hasTopBead);
  };

  const handleBottomClick = (beadIndex: number) => {
    onToggleBottom?.(columnIndex, beadIndex, bottomBeads[beadIndex], bottomBeads);
  };

  return (
    <div className={styles.column}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.rod}>
        <div className={styles.topSection}>
          <AbacusBead active={hasTopBead} onClick={handleTopClick} interactive={!!onToggleTop} type="top" />
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <div className={styles.beadGroup}>
            {bottomBeads.map((isActive, index) => (
              <AbacusBead
                data-index={index}
                data-active={isActive}
                key={index}
                active={isActive}
                onClick={() => handleBottomClick(index)}
                interactive={!!onToggleBottom}
                type="bottom"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
