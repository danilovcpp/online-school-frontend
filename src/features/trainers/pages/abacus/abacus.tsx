'use client';
import { useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { Input } from '@/components/Input/Input';
import { generateRandomNumber } from '@/utils';

import { tutorials } from '../../constants/abacus';

import { AbacusDisplay } from './components/abacus-display/abacus-display';
import { TutorialCard } from './components/tutorial-card/tutorial-card';

import styles from './abacus.module.scss';

const AbacusPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);
  const [abacusValue, setAbacusValue] = useState<number>(0);
  const [challenge, setChallenge] = useState<number>(42);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [resultType, setResultType] = useState<'success' | 'error' | ''>('');

  const handleSetNumber = () => {
    if (inputValue >= 0 && inputValue <= 999999) {
      setAbacusValue(inputValue);
    } else {
      alert('Пожалуйста, введите число от 0 до 999999');
    }
  };

  const handleReset = () => {
    setAbacusValue(0);
    setInputValue(0);
  };

  const handleRandom = () => {
    const randomNum = generateRandomNumber(0, 999999);
    setInputValue(randomNum);
    setAbacusValue(randomNum);
  };

  const handleNewChallenge = () => {
    const newChallenge = generateRandomNumber(1, 999999);
    setChallenge(newChallenge);
    setResultMessage('');
    setResultType('');
    setAbacusValue(0);
  };

  const handleCheckAnswer = () => {
    if (abacusValue === challenge) {
      setResultMessage('🎉 Правильно! Отличная работа!');
      setResultType('success');
      setTimeout(() => {
        handleNewChallenge();
      }, 2000);
    } else {
      setResultMessage(`❌ Неправильно. Ваш ответ: ${abacusValue.toLocaleString()}. Попробуйте еще раз!`);
      setResultType('error');
    }
  };

  return (
    <main>
      <section>
        <Card title="Панель управления">
          <div className={styles.controls}>
            <div className={styles.inputGroup}>
              <Input
                type="number"
                label="Введите число (0-999999):"
                min={0}
                max={999999}
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSetNumber();
                  }
                }}
              />
              <Button onClick={handleSetNumber} variant="primary">
                Показать на абакусе
              </Button>
            </div>
            <div className={styles.buttonGroup}>
              <Button onClick={handleReset} variant="secondary" className="flex-1 min-w-[150px]">
                Сбросить
              </Button>
              <Button onClick={handleRandom} variant="accent" className="flex-1 min-w-[150px]">
                Случайное число
              </Button>
            </div>
          </div>
          <div className={styles.currentValue}>
            <span>Текущее значение:</span>
            <span className={styles.valueDisplay}>{abacusValue.toLocaleString()}</span>
          </div>
        </Card>
      </section>

      <section>
        <Card title="Практика">
          <div className={styles.challengeWrapper}>
            <div className={styles.challenge}>
              <h3>Текущее задание:</h3>
              <div className={styles.challengeNumber}>{challenge.toLocaleString()}</div>
              <div className={styles.challengeControls}>
                <Button onClick={handleCheckAnswer} variant="primary">
                  Проверить ответ
                </Button>
                <Button onClick={handleNewChallenge} variant="secondary">
                  Новое задание
                </Button>
              </div>
            </div>
            {resultMessage && <div className={clsx(styles.result, styles[resultType])}>{resultMessage}</div>}
          </div>
        </Card>
      </section>

      <section>
        <AbacusDisplay columns={6} value={abacusValue} onChange={setAbacusValue} />
      </section>

      <Card title="Как использовать абакус">
        <div className={styles.grid}>
          {tutorials.map((item) => (
            <TutorialCard key={item.step} {...item} />
          ))}
        </div>
      </Card>
    </main>
  );
};

export { AbacusPage };
