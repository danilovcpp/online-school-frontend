'use client';
import { useCallback, useRef, useState } from 'react';

import { delay, generateRandomNumber } from '@/utils';

import { FlashAnzanSettings, FlashAnzanStats } from '@/types';

export function useFlashAnzan() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [stats, setStats] = useState<FlashAnzanStats>({
    correct: 0,
    wrong: 0,
    accuracy: 0,
  });

  const isRunning = useRef<boolean>(false);

  const generateNumbers = useCallback((count: number, digits: number, allowNegative = false) => {
    const newNumbers: number[] = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    let currentSum = 0;

    for (let i = 0; i < count; i++) {
      const number = generateRandomNumber(min, max);
      let finalNumber = number;

      // If negative numbers are allowed, randomly make some numbers negative
      // but ensure the intermediate sum never goes below 0 (abacus constraint)
      if (allowNegative && Math.random() > 0.5) {
        const potentialNegative = -number;
        // Only make it negative if the intermediate sum would remain >= 0
        if (currentSum + potentialNegative >= 0) {
          finalNumber = potentialNegative;
        }
      }

      newNumbers.push(finalNumber);
      currentSum += finalNumber;
    }

    setNumbers(newNumbers);
    setCorrectAnswer(currentSum);
    return newNumbers;
  }, []);

  const start = useCallback(
    async (settings: FlashAnzanSettings, onNumberShow: (num: number, index: number) => void, onFinish: () => void) => {
      const nums = generateNumbers(settings.count, settings.digits, settings.allowNegative);
      isRunning.current = true;
      setCurrentIndex(0);

      for await (const i of nums.keys()) {
        console.log('is run', isRunning);

        if (!isRunning.current) break;

        console.log('set', settings);
        console.log('i', i);
        console.log('num', nums[i]);

        setCurrentIndex(i);
        onNumberShow(nums[i], i);

        await delay(settings.speed);
        await delay(200);
      }

      isRunning.current = false;
      onFinish();
    },
    [generateNumbers, isRunning],
  );

  const stop = useCallback(() => {
    isRunning.current = false;
  }, []);

  const checkAnswer = useCallback(
    (userAnswer: number): boolean => {
      const isCorrect = userAnswer === correctAnswer;

      setStats((prev) => {
        const newCorrect = prev.correct + (isCorrect ? 1 : 0);
        const newWrong = prev.wrong + (isCorrect ? 0 : 1);
        const total = newCorrect + newWrong;
        const accuracy = total > 0 ? Math.round((newCorrect / total) * 100) : 0;

        return {
          correct: newCorrect,
          wrong: newWrong,
          accuracy,
        };
      });

      return isCorrect;
    },
    [correctAnswer],
  );

  const resetStats = useCallback(() => {
    setStats({
      correct: 0,
      wrong: 0,
      accuracy: 0,
    });
  }, []);

  return {
    numbers,
    currentIndex,
    correctAnswer,
    isRunning: isRunning.current,
    stats,
    start,
    stop,
    checkAnswer,
    resetStats,
  };
}
