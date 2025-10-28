'use client';

import React, { useEffect } from 'react';

import { useAbacus } from '@/features/trainers/hooks/use-abacus';

import { AbacusColumn } from './components/AbacusColumn';

import styles from './AbacusDisplay.module.scss';

interface AbacusDisplayProps {
  columns?: number;
  value?: number;
  onChange?: (value: number) => void;
  showLabels?: boolean;
  interactive?: boolean;
  showValue?: boolean;
}

export const AbacusDisplay: React.FC<AbacusDisplayProps> = ({
  columns: initialColumns = 13,
  value,
  onChange,
  showLabels = true,
  interactive = true,
  showValue = true,
}) => {
  const { columns, currentValue, toggleTopBead, toggleBottomBead, getColumnValue, getColumnLabel, setValue } = useAbacus(initialColumns);

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value, setValue]);

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [currentValue, onChange]);

  return (
    <div className={styles.container}>
      <div className={styles.abacusFrame}>
        {Array.from({ length: columns }, (_, i) => columns - 1 - i).map((_, index) => {
          const columnIndex = columns - 1 - index;
          return (
            <AbacusColumn
              key={columnIndex}
              columnIndex={columnIndex}
              value={getColumnValue(columnIndex)}
              label={showLabels ? getColumnLabel(columnIndex) : undefined}
              onToggleTop={interactive ? toggleTopBead : undefined}
              onToggleBottom={interactive ? toggleBottomBead : undefined}
            />
          );
        })}
      </div>
      {showValue && (
        <div className={styles.valueDisplay}>
          <div className={styles.valueLabel}>Текущее значение</div>
          <div className={styles.valueNumber}>{currentValue.toLocaleString('ru-RU')}</div>
        </div>
      )}
    </div>
  );
};
