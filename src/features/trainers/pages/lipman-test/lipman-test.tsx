'use client';
import { useState } from 'react';

import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';

import { LipmanTestSettings } from '@/types';

import { colsOptions, defaultSettings, rowsOptions } from '../../constants/lipman-test';
import { useLipmanTest } from '../../hooks/use-lipman-test';

import { Stats } from './components/stats/stats';

import styles from './lipman-test.module.scss';

const LipmanTestPage = () => {
  const [settings, setSettings] = useState<LipmanTestSettings>(defaultSettings);
  const { cells, isActive, isCompleted, elapsedTime, stats, startTest, completeTest, toggleCell, reset } = useLipmanTest();

  const handleStart = () => {
    reset();
    startTest(settings);
  };

  const handleComplete = () => {
    completeTest();
  };

  const handleChangeRows: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      rows: +event.target.value,
    }));
  };

  const handleChangeCols: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      cols: +event.target.value,
    }));
  };

  const handleTargetLettersChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value.toUpperCase();
    const letters = value
      .split('')
      .filter((char) => /[А-ЯЁ]/.test(char))
      .filter((char, index, arr) => arr.indexOf(char) === index);

    setSettings((prev) => ({
      ...prev,
      targetLetters: letters,
    }));
  };

  const formatTime = (seconds: number) => {
    return `${seconds}с`;
  };

  const targetCount = cells.filter((c) => c.isTarget).length;
  const markedCount = cells.filter((c) => c.isMarked).length;
  const correctMarks = cells.filter((c) => c.isMarked && c.isTarget).length;
  const wrongMarks = cells.filter((c) => c.isMarked && !c.isTarget).length;

  return (
    <Card title="Тест Лимпана - Тренировка концентрации и избирательного внимания">
      <div className={styles.settings}>
        <Select label="Количество строк:" value={settings.rows} name="rows" onChange={handleChangeRows}>
          {rowsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="Количество столбцов:" value={settings.cols} name="cols" onChange={handleChangeCols}>
          {colsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Input
          label="Целевые буквы (введите буквы через пробел или слитно):"
          value={settings.targetLetters.join('')}
          onChange={handleTargetLettersChange}
          placeholder="КА"
          maxLength={10}
        />
      </div>

      <div className={styles.info}>
        <p>
          Тест Лимпана — это психологический тест для оценки концентрации внимания. В таблице случайных букв нужно найти и отметить все
          вхождения указанных букв.
        </p>
        {settings.targetLetters.length > 0 && (
          <p className={styles.targetInfo}>
            Целевые буквы: <span className={styles.targetLetters}>{settings.targetLetters.join(', ')}</span>
          </p>
        )}
        <p className={styles.hint}>Нажмите кнопку &quot;Старт&quot; чтобы начать тест</p>
      </div>

      <div className={styles.controls}>
        {!isActive && cells.length === 0 && (
          <Button onClick={handleStart} variant="primary" disabled={settings.targetLetters.length === 0}>
            Старт
          </Button>
        )}
        {isActive && !isCompleted && (
          <>
            <div className={styles.gameInfo}>
              <div className={styles.timer}>Время: {formatTime(elapsedTime)}</div>
              <div className={styles.progress}>
                Отмечено: {markedCount} / Целевых букв: {targetCount}
              </div>
            </div>
            <Button onClick={handleComplete} variant="primary">
              Завершить тест
            </Button>
          </>
        )}
        {isCompleted && (
          <>
            <div className={styles.results}>
              <div className={styles.result}>
                Время выполнения: <span className={styles.resultValue}>{formatTime(elapsedTime)}</span>
              </div>
              <div className={styles.result}>
                Правильно отмечено: <span className={styles.resultValue + ' ' + styles.correct}>{correctMarks}</span>
              </div>
              <div className={styles.result}>
                Ошибочно отмечено: <span className={styles.resultValue + ' ' + styles.wrong}>{wrongMarks}</span>
              </div>
              <div className={styles.result}>
                Пропущено: <span className={styles.resultValue}>{targetCount - correctMarks}</span>
              </div>
            </div>
            <Button onClick={handleStart} variant="primary">
              Начать заново
            </Button>
          </>
        )}
      </div>

      {cells.length > 0 && (
        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
          }}
        >
          {cells.map((cell, index) => (
            <button
              key={index}
              className={`${styles.cell} ${cell.isMarked ? styles.marked : ''} ${
                isCompleted && cell.isCorrect === true ? styles.correctMark : ''
              } ${isCompleted && cell.isCorrect === false ? styles.wrongMark : ''} ${
                isCompleted && cell.isTarget && !cell.isMarked ? styles.missed : ''
              } ${!isActive || isCompleted ? styles.disabled : ''}`}
              onClick={() => toggleCell(index)}
              disabled={!isActive || isCompleted}
            >
              {cell.letter}
            </button>
          ))}
        </div>
      )}

      <Stats stats={stats} />
    </Card>
  );
};

export { LipmanTestPage };
