'use client';
import { useCallback, useRef, useState } from 'react';

import { delay, generateRandomNumber } from '@/utils';

import { GuessResultSettings, GuessResultStats } from '@/types';

interface AnswerVariant {
  value: number;
  isCorrect: boolean;
}

export function useGuessResult() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [answerVariants, setAnswerVariants] = useState<AnswerVariant[]>([]);
  const [stats, setStats] = useState<GuessResultStats>({
    correct: 0,
    wrong: 0,
    accuracy: 0,
    averageTime: 0,
    totalRounds: 0,
  });

  const isRunning = useRef<boolean>(false);
  const roundStartTime = useRef<number>(0);

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
    return { numbers: newNumbers, sum: currentSum };
  }, []);

  const generateAnswerVariants = useCallback((correctSum: number, digits: number) => {
    const variants: AnswerVariant[] = [{ value: correctSum, isCorrect: true }];

    // Generate 2 wrong answers
    const maxDeviation = Math.pow(10, digits);
    const usedValues = new Set([correctSum]);

    while (variants.length < 3) {
      // Random deviation from correct answer
      const deviation = generateRandomNumber(1, maxDeviation);
      const wrongAnswer = Math.random() > 0.5 ? correctSum + deviation : Math.max(0, correctSum - deviation);

      // Ensure unique and not negative
      if (!usedValues.has(wrongAnswer) && wrongAnswer >= 0) {
        variants.push({ value: wrongAnswer, isCorrect: false });
        usedValues.add(wrongAnswer);
      }
    }

    // Shuffle variants
    const shuffled = variants.sort(() => Math.random() - 0.5);
    setAnswerVariants(shuffled);
    return shuffled;
  }, []);

  const start = useCallback(
    async (settings: GuessResultSettings, onNumberShow: (num: number, index: number) => void, onFinish: () => void) => {
      const { numbers: nums, sum } = generateNumbers(settings.count, settings.digits, settings.allowNegative);
      isRunning.current = true;
      setCurrentIndex(0);
      roundStartTime.current = Date.now();

      for await (const i of nums.keys()) {
        if (!isRunning.current) break;

        setCurrentIndex(i);
        onNumberShow(nums[i], i);

        await delay(settings.speed);
        await delay(200); // Small pause between numbers
      }

      isRunning.current = false;
      generateAnswerVariants(sum, settings.digits);
      onFinish();
    },
    [generateNumbers, generateAnswerVariants],
  );

  const stop = useCallback(() => {
    isRunning.current = false;
  }, []);

  const checkAnswer = useCallback(
    (userAnswer: number): boolean => {
      const isCorrect = userAnswer === correctAnswer;
      const timeSpent = (Date.now() - roundStartTime.current) / 1000; // Convert to seconds

      setStats((prev) => {
        const newCorrect = prev.correct + (isCorrect ? 1 : 0);
        const newWrong = prev.wrong + (isCorrect ? 0 : 1);
        const newTotalRounds = prev.totalRounds + 1;
        const total = newCorrect + newWrong;
        const accuracy = total > 0 ? Math.round((newCorrect / total) * 100) : 0;

        // Calculate average time (only for completed rounds)
        const totalTime = prev.averageTime * prev.totalRounds + timeSpent;
        const averageTime = Math.round((totalTime / newTotalRounds) * 10) / 10; // Round to 1 decimal

        return {
          correct: newCorrect,
          wrong: newWrong,
          accuracy,
          averageTime,
          totalRounds: newTotalRounds,
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
      averageTime: 0,
      totalRounds: 0,
    });
  }, []);

  return {
    numbers,
    currentIndex,
    correctAnswer,
    answerVariants,
    isRunning: isRunning.current,
    stats,
    start,
    stop,
    checkAnswer,
    resetStats,
  };
}
