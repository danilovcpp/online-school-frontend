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
      // Теперь индекс 0 = единицы, индекс 1 = десятки и т.д.
      total += values[i] * Math.pow(10, i);
    }
    return total;
  }, [values, columns]);

  /**
   * Переключить верхнюю бусину (стоимость 5)
   * При клике бусина перемещается вверх (от разделителя)
   * @param {number} column - индекс колонки
   * @param {boolean} isActive - текущее состояние бусины (true = внизу у разделителя)
   */
  const toggleTopBead = useCallback((column: number, isActive: boolean) => {
    setValues((prev) => {
      const newValues = [...prev];
      if (isActive) {
        // Бусина активна (внизу), переместить вверх - отнять 5
        newValues[column] -= 5;
      } else {
        // Бусина неактивна (вверху), переместить вниз - добавить 5
        newValues[column] += 5;
      }
      return newValues;
    });
  }, []);

  /**
   * Переключить нижнюю бусину (стоимость 1)
   * При клике бусина перемещается вверх вместе со всеми ниже неё
   * @param {number} column - индекс колонки
   * @param {number} beadIndex - индекс бусины (0 = верхняя, 3 = нижняя)
   * @param {boolean} isActive - текущее состояние бусины (true = вверху у разделителя)
   * @param {Array} activeBeads - массив активных нижних бусин
   */
  const toggleBottomBead = useCallback((column: number, beadIndex: number, isActive: boolean, activeBeads: boolean[]) => {
    setValues((prev) => {
      const newValues = [...prev];

      if (isActive) {
        // Бусина активна (вверху у разделителя), опустить её и все ниже
        let deactivateCount = 0;
        for (let i = beadIndex; i < 4; i++) {
          if (activeBeads[i]) deactivateCount++;
        }
        newValues[column] -= deactivateCount;
      } else {
        // Бусина неактивна (внизу), поднять её и все ниже неё
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

      // Переворачиваем массив, чтобы индекс 0 был единицами
      setValues(digits.reverse());
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
      // Теперь индекс 0 = 10^0 (единицы), индекс 1 = 10^1 (десятки) и т.д.
      return column;
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
