'use client';

import React, { useEffect } from 'react';

import { Card } from '@/components/card/card';

import { useAbacus } from '../../../../hooks/use-abacus';
import { AbacusColumn } from '../abacus-column/abacus-column';

import styles from './abacus-display.module.scss';

interface AbacusProps {
  columns?: number;
  value?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

export const AbacusDisplay: React.FC<AbacusProps> = ({ columns: initialColums = 6, value, onChange, showValue = true }) => {
  const { columns, currentValue, toggleTopBead, toggleBottomBead, getColumnValue, getColumnLabel, setValue } = useAbacus(initialColums);

  useEffect(() => {
    if (value !== undefined) {
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [currentValue, onChange]);

  return (
    <Card className={styles.abacusCard} title="Соробан (Японский абакус)">
      <div className={styles.container}>
        <div className={styles.abacusFrame}>
          {Array.from({ length: columns }, (_, i) => columns - 1 - i).map((col, index) => {
            const columnIndex = columns - 1 - index;
            return (
              <AbacusColumn
                key={columnIndex}
                columnIndex={columnIndex}
                value={getColumnValue(columnIndex)}
                label={getColumnLabel(columnIndex)}
                onToggleTop={toggleTopBead}
                onToggleBottom={toggleBottomBead}
              />
            );
          })}
        </div>
      </div>

      {showValue && (
        <div className={styles.footer}>
          <p>Нажимайте на бусины, чтобы двигать их</p>
          <p>Верхняя бусина = 5, нижние бусины = 1</p>
        </div>
      )}
    </Card>
  );
};
