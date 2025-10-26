'use client';
import { useCallback, useMemo, useState } from 'react';

import { getSuperscript } from '@/utils';

/**
 * Hook для управления абакусом (соробан)
 * @param {number} columns - количество колонок (по умолчанию 6)
 * @returns {object} методы и состояние абакуса
 */
export const useAbacus = (columns = 6) => {
  // Состояние значений каждой колонки (0-9)
  const [values, setValues] = useState(new Array(columns).fill(0));

  const currentValue = useMemo(() => {
    let total = 0;
    for (let i = 0; i < columns; i++) {
      const power = columns - 1 - i;
      total += values[i] * Math.pow(10, power);
    }
    return total;
  }, [values, columns]);

  /**
   * Переключить верхнюю бусину (стоимость 5)
   * @param {number} column - индекс колонки
   * @param {boolean} isActive - текущее состояние бусины
   */
  const toggleTopBead = useCallback((column: number, isActive: boolean) => {
    setValues((prev) => {
      const newValues = [...prev];
      if (isActive) {
        newValues[column] -= 5;
      } else {
        newValues[column] += 5;
      }
      return newValues;
    });
  }, []);

  /**
   * Переключить нижнюю бусину (стоимость 1)
   * @param {number} column - индекс колонки
   * @param {number} beadIndex - индекс бусины (0-3)
   * @param {boolean} isActive - текущее состояние бусины
   * @param {Array} activeBeads - массив активных нижних бусин
   */
  const toggleBottomBead = useCallback((column: number, beadIndex: number, isActive: boolean, activeBeads: boolean[]) => {
    setValues((prev) => {
      const newValues = [...prev];

      if (isActive) {
        // Деактивировать эту бусину и все выше неё
        let deactivateCount = 0;
        for (let i = 0; i <= beadIndex; i++) {
          if (activeBeads[i]) deactivateCount++;
        }
        newValues[column] -= deactivateCount;
      } else {
        // Активировать эту бусину и все ниже неё
        let activateCount = 0;
        for (let i = beadIndex; i < 4; i++) {
          if (!activeBeads[i]) activateCount++;
        }
        newValues[column] += activateCount;
      }

      return newValues;
    });
  }, []);

  /**
   * Установить значение на абакусе
   * @param {number} number - число для установки
   */
  const setValue = useCallback(
    (number: number) => {
      const maxValue = Math.pow(10, columns) - 1;
      const clampedNumber = Math.max(0, Math.min(maxValue, number));
      const digits = String(clampedNumber).padStart(columns, '0').split('').map(Number);

      setValues(digits);
    },
    [columns],
  );

  /**
   * Сбросить абакус (все значения в 0)
   */
  const reset = useCallback(() => {
    setValues(new Array(columns).fill(0));
  }, [columns]);

  /**
   * Получить цифру для конкретной колонки
   * @param {number} column - индекс колонки
   */
  const getColumnValue = useCallback(
    (column: number): number => {
      return values[column];
    },
    [values],
  );

  /**
   * Получить степень десятки для колонки
   * @param {number} column - индекс колонки
   */
  const getColumnPower = useCallback(
    (column: number) => {
      return columns - 1 - column;
    },
    [columns],
  );

  /**
   * Получить метку для колонки (например "10²")
   * @param {number} column - индекс колонки
   */
  const getColumnLabel = useCallback(
    (column: number) => {
      const power = getColumnPower(column);
      return power === 0 ? '1' : `10${getSuperscript(power)}`;
    },
    [getColumnPower],
  );

  return {
    // Состояние
    values,
    columns,

    // Основные методы
    currentValue,
    setValue,
    reset,

    // Методы для работы с бусинами
    toggleTopBead,
    toggleBottomBead,

    // Вспомогательные методы
    getColumnValue,
    getColumnPower,
    getColumnLabel,
  };
};
