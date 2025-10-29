'use client';
import { useState } from 'react';

import { Button } from '@/components/button/button';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';

import { SchulteTableSettings } from '@/types';

import { defaultSettings, gridSizeOptions } from '../../constants/schulte-table';
import { useSchulteTable } from '../../hooks/use-schulte-table';

import { Stats } from './components/stats/stats';

import styles from './schulte-table.module.scss';

const SchulteTablePage = () => {
  const [settings, setSettings] = useState<SchulteTableSettings>(defaultSettings);
  const { numbers, currentNumber, isActive, elapsedTime, stats, startGame, stopGame, handleNumberClick, reset } = useSchulteTable();

  const handleStart = () => {
    reset();
    startGame(settings);
  };

  const handleStop = () => {
    stopGame();
  };

  const handleChangeGridSize: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      gridSize: +event.target.value,
    }));
  };

  const handleToggleShuffle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      shuffle: event.target.checked,
    }));
  };

  const formatTime = (seconds: number) => {
    return `${seconds}с`;
  };

  const gridSize = settings.gridSize;
  const totalNumbers = gridSize * gridSize;

  return (
    <Card title="Таблица Шульте - Тренажер концентрации и периферического зрения">
      <div className={styles.settings}>
        <Select label="Размер таблицы:" value={settings.gridSize} name="gridSize" onChange={handleChangeGridSize}>
          {gridSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <div className={styles.checkboxWrapper}>
          <Input type="checkbox" id="shuffle" checked={settings.shuffle} onChange={handleToggleShuffle} className={styles.checkbox} />
          <label htmlFor="shuffle" className={styles.checkboxLabel}>
            Перемешивать числа
          </label>
        </div>
      </div>

      <div className={styles.info}>
        <p>
          Таблица Шульте — это таблица со случайно расположенными числами. Задача — как можно быстрее найти все числа по порядку от 1 до{' '}
          {totalNumbers}.
        </p>
        <p className={styles.hint}>Нажмите кнопку &quot;Старт&quot; чтобы начать упражнение</p>
      </div>

      <div className={styles.controls}>
        {!isActive && numbers.length === 0 && (
          <Button onClick={handleStart} variant="primary">
            Старт
          </Button>
        )}
        {isActive && (
          <>
            <Button onClick={handleStop} variant="secondary">
              Остановить
            </Button>
            <div className={styles.gameInfo}>
              <div className={styles.currentNumber}>
                Найдите число: <span className={styles.number}>{currentNumber}</span>
              </div>
              <div className={styles.timer}>Время: {formatTime(elapsedTime)}</div>
            </div>
          </>
        )}
        {!isActive && numbers.length > 0 && (
          <>
            <Button onClick={handleStart} variant="primary">
              Начать заново
            </Button>
            {stats.lastTime && <div className={styles.completionMessage}>Упражнение завершено за {formatTime(stats.lastTime)}!</div>}
          </>
        )}
      </div>

      {numbers.length > 0 && (
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {numbers.map((number, index) => (
            <button
              key={index}
              className={`${styles.cell} ${number < currentNumber ? styles.found : ''} ${!isActive ? styles.disabled : ''}`}
              onClick={() => handleNumberClick(number)}
              disabled={!isActive}
            >
              {number}
            </button>
          ))}
        </div>
      )}

      <Stats stats={stats} />
    </Card>
  );
};

export { SchulteTablePage };
