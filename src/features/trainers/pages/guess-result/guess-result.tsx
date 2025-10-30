'use client';
import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { Input } from '@/components/input/input';
import { Select } from '@/components/select/select';

import { GuessResultSettings } from '@/types';

import { countSetting, defaultSettings, digitsSetting, speedSetting } from '../../constants/guess-result';
import { useGuessResult } from '../../hooks/use-guess-result';

import { MiniAbacus } from './components/mini-abacus/mini-abacus';
import { Stats } from './components/stats/stats';

import styles from './guess-result.module.scss';

const GuessResultPage = () => {
  const [settings, setSettings] = useState<GuessResultSettings>(defaultSettings);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<string>('');
  const [showAnswerSection, setShowAnswerSection] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');
  const [showAbacus, setShowAbacus] = useState<boolean>(false);

  const { numbers, correctAnswer, answerVariants, isRunning, stats, start, stop, checkAnswer } = useGuessResult();

  const handleStart = () => {
    setResultMessage('');
    setResultType('');
    setShowAnswerSection(false);
    setShowAbacus(false);

    start(
      settings,
      (num, index) => {
        setCurrentNumber(num);
        setCurrentProgress(`${index + 1} / ${settings.count}`);
      },
      () => {
        setCurrentNumber(null);
        setCurrentProgress('Выберите правильный ответ');
        setShowAnswerSection(true);
      },
    );
  };

  const handleStop = () => {
    stop();
    setCurrentNumber(null);
    setCurrentProgress('');
  };

  const handleSelectAnswer = (selectedValue: number) => {
    const isCorrect = checkAnswer(selectedValue);

    // Format numbers with proper signs for display
    const numbersFormatted = numbers
      .map((num, idx) => {
        if (idx === 0) return num.toString();
        return num >= 0 ? `+ ${num}` : `- ${Math.abs(num)}`;
      })
      .join(' ');

    if (isCorrect) {
      setResultMessage(`Правильно! ${numbersFormatted} = ${correctAnswer}`);
      setResultType('success');
    } else {
      setResultMessage(`Неправильно. Ваш ответ: ${selectedValue}, правильный ответ: ${correctAnswer}`);
      setResultType('error');
    }

    setShowAbacus(true);

    setTimeout(() => {
      setShowAnswerSection(false);
      setCurrentNumber(null);
      setCurrentProgress('');
      setResultMessage('');
      setResultType('');
      setShowAbacus(false);
    }, 4000);
  };

  const handleChangeSettings: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      [event.target.name]: +event.target.value,
    }));
  };

  const handleToggleNegative: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSettings((prev) => ({
      ...prev,
      allowNegative: event.target.checked,
    }));
  };

  return (
    <Card title="Угадай результат - Тренировка памяти и ментального счета">
      <div className={styles.settings}>
        <Select label="Количество чисел:" value={settings.count} name="count" onChange={handleChangeSettings}>
          {countSetting.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="Скорость (мс):" name="speed" value={settings.speed} onChange={handleChangeSettings}>
          {speedSetting.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select label="Количество цифр:" value={settings.digits} name="digits" onChange={handleChangeSettings}>
          {digitsSetting.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <div className={styles.checkboxWrapper}>
          <Input
            type="checkbox"
            id="allowNegative"
            checked={settings.allowNegative}
            onChange={handleToggleNegative}
            className={styles.checkbox}
          />
          <label htmlFor="allowNegative" className={styles.checkboxLabel}>
            Разрешить отрицательные числа
          </label>
        </div>
      </div>

      <div className={styles.display}>
        {currentNumber !== null ? (
          <div key={`${currentNumber}-${currentProgress}`} className={styles.flashNumber}>
            {currentNumber}
          </div>
        ) : (
          currentProgress && <div className={styles.placeholder}>?</div>
        )}
        <div className={styles.progress}>{currentProgress}</div>
      </div>

      <div className={styles.controls}>
        {!isRunning && !showAnswerSection && (
          <Button onClick={handleStart} variant="primary">
            Начать
          </Button>
        )}
        {isRunning && (
          <Button onClick={handleStop} variant="secondary">
            Остановить
          </Button>
        )}
      </div>

      {showAnswerSection && (
        <div className={styles.answer}>
          <h3>Выберите правильную сумму:</h3>
          <div className={styles.variants}>
            {answerVariants.map((variant, index) => (
              <Button key={index} onClick={() => handleSelectAnswer(variant.value)} variant="accent" className={styles.variantButton}>
                {variant.value}
              </Button>
            ))}
          </div>
        </div>
      )}

      {resultMessage && (
        <>
          <div className={clsx(styles.result, resultType === 'success' ? styles.success : styles.error)}>{resultMessage}</div>
          <MiniAbacus value={correctAnswer} show={showAbacus} />
        </>
      )}

      <Stats stats={stats} />
    </Card>
  );
};

export { GuessResultPage };
