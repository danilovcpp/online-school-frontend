'use client';
import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Select/Select';

import { FlashAnzanSettings } from '@/types';

import { countSetting, defaultSettings, digitsSetting, speedSetting } from '../../constants/flash-anzan';
import { useFlashAnzan } from '../../hooks/use-flash-anzan';

import { Stats } from './components/stats/stats';

import styles from './flash-anzan.module.scss';

const FlashAnzanPage = () => {
  const [settings, setSettings] = useState<FlashAnzanSettings>(defaultSettings);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentProgress, setCurrentProgress] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showAnswerSection, setShowAnswerSection] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');

  const { numbers, correctAnswer, isRunning, stats, start, stop, checkAnswer } = useFlashAnzan();

  const handleStart = () => {
    setUserAnswer('');
    setResultMessage('');
    setResultType('');
    setShowAnswerSection(false);

    start(
      settings,
      (num, index) => {
        setCurrentNumber(num);
        setCurrentProgress(`${index + 1} / ${settings.count}`);
      },
      () => {
        setCurrentNumber(null);
        setCurrentProgress('Введите ответ');
        setShowAnswerSection(true);
      },
    );
  };

  console.log('numbers', numbers);

  const handleStop = () => {
    stop();
    setCurrentNumber(null);
    setCurrentProgress('');
  };

  const handleCheckAnswer = () => {
    const answer = parseInt(userAnswer);

    if (isNaN(answer)) {
      setResultMessage('Пожалуйста, введите число');
      setResultType('error');
      return;
    }

    const isCorrect = checkAnswer(answer);

    // Format numbers with proper signs for display
    const numbersFormatted = numbers.map((num, idx) => {
      if (idx === 0) return num.toString();
      return num >= 0 ? `+ ${num}` : `- ${Math.abs(num)}`;
    }).join(' ');

    if (isCorrect) {
      setResultMessage(`🎉 Правильно!\nЧисла: ${numbersFormatted} = ${correctAnswer}`);
      setResultType('success');
    } else {
      setResultMessage(`❌ Неправильно\nВаш ответ: ${answer}\nПравильный ответ: ${correctAnswer}\nЧисла: ${numbersFormatted}`);
      setResultType('error');
    }

    setTimeout(() => {
      setShowAnswerSection(false);
      setCurrentNumber(null);
      setCurrentProgress('');
      setResultMessage('');
      setResultType('');
      setUserAnswer('');
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
    <Card title="Flash Anzan - Тренажер быстрых вычислений">
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
          currentProgress && <div className={styles.flashNumber}>?</div>
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
          <h3>Введите сумму всех чисел:</h3>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCheckAnswer();
              }
            }}
            placeholder="Ваш ответ"
            autoFocus
            className={styles.input}
          />
          <Button onClick={handleCheckAnswer} variant="accent">
            Проверить
          </Button>
        </div>
      )}

      {resultMessage && (
        <div className={clsx(styles.result, resultType === 'success' ? styles.success : styles.error)}>{resultMessage}</div>
      )}

      <Stats stats={stats} />
    </Card>
  );
};

export { FlashAnzanPage };
