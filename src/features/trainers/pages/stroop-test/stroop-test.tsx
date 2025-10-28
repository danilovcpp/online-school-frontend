'use client';
import { useState } from 'react';

import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Select } from '@/components/Select/Select';

import { StroopTestSettings } from '@/types';

import { colors, defaultSettings, modeOptions, roundsOptions } from '../../constants/stroop-test';
import { useStroopTest } from '../../hooks/use-stroop-test';

import { Stats } from './components/stats/stats';

import styles from './stroop-test.module.scss';

const StroopTestPage = () => {
  const [settings, setSettings] = useState<StroopTestSettings>(defaultSettings);
  const { currentTask, currentRound, totalRounds, isActive, elapsedTime, stats, startTest, stopTest, handleAnswer, reset } =
    useStroopTest();

  const handleStart = () => {
    reset();
    startTest(settings);
  };

  const handleStop = () => {
    stopTest();
  };

  const handleChangeRounds: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      rounds: +event.target.value,
    }));
  };

  const handleChangeMode: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      mode: event.target.value as StroopTestSettings['mode'],
    }));
  };

  const handleColorClick = (colorHex: string) => {
    handleAnswer(colorHex, settings);
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}с`;
  };

  return (
    <Card title="Тест Струпа - Тренировка концентрации внимания">
      <div className={styles.settings}>
        <Select label="Количество раундов:" value={settings.rounds} name="rounds" onChange={handleChangeRounds}>
          {roundsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="Режим теста:" value={settings.mode} name="mode" onChange={handleChangeMode}>
          {modeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className={styles.info}>
        <p>
          <strong>Тест Струпа</strong> — классическое психологическое упражнение для тренировки когнитивного контроля и избирательного
          внимания.
        </p>
        <p>
          <strong>Задача:</strong> Вам будет показано слово-название цвета, написанное определённым цветом. Вы должны выбрать{' '}
          <strong>цвет текста</strong>, а не прочитать слово.
        </p>
        <p className={styles.hint}>Нажмите кнопку &quot;Старт&quot;, чтобы начать упражнение</p>
      </div>

      <div className={styles.controls}>
        {!isActive && currentRound === 0 && (
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
              <div className={styles.roundInfo}>
                Раунд:{' '}
                <span className={styles.number}>
                  {currentRound}/{totalRounds}
                </span>
              </div>
              <div className={styles.timer}>Время: {formatTime(elapsedTime)}</div>
            </div>
          </>
        )}
        {!isActive && currentRound > 0 && (
          <>
            <Button onClick={handleStart} variant="primary">
              Начать заново
            </Button>
            <div className={styles.completionMessage}>Тест завершён за {formatTime(elapsedTime)}!</div>
          </>
        )}
      </div>

      {currentTask && isActive && (
        <div className={styles.taskArea}>
          <div className={styles.wordDisplay}>
            <span className={styles.colorWord} style={{ color: currentTask.displayColor }}>
              {currentTask.colorName}
            </span>
          </div>

          <div className={styles.instruction}>Выберите цвет текста:</div>

          <div className={styles.colorButtons}>
            {colors.map((color) => (
              <button
                key={color.hex}
                className={styles.colorButton}
                style={{
                  backgroundColor: color.hex,
                  borderColor: color.hex,
                }}
                onClick={() => handleColorClick(color.hex)}
                aria-label={color.name}
              >
                <span className={styles.colorName}>{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <Stats stats={stats} />
    </Card>
  );
};

export { StroopTestPage };
