'use client';
import { useCallback, useRef, useState } from 'react';

import { SchulteTableSettings, SchulteTableStats } from '@/types';

export function useSchulteTable() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [stats, setStats] = useState<SchulteTableStats>({
    completedGames: 0,
    bestTime: null,
    averageTime: 0,
    lastTime: null,
  });

  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const generateGrid = useCallback((gridSize: number, shuffle: boolean) => {
    const totalNumbers = gridSize * gridSize;
    const nums = Array.from({ length: totalNumbers }, (_, i) => i + 1);

    if (shuffle) {
      // Fisher-Yates shuffle algorithm
      for (let i = nums.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }

    setNumbers(nums);
    setCurrentNumber(1);
    return nums;
  }, []);

  const startGame = useCallback(
    (settings: SchulteTableSettings) => {
      generateGrid(settings.gridSize, settings.shuffle);
      setCurrentNumber(1);
      setIsActive(true);
      const now = Date.now();
      setElapsedTime(0);

      // Start timer
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      timerInterval.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - now) / 1000));
      }, 100);
    },
    [generateGrid],
  );

  const stopGame = useCallback(() => {
    setIsActive(false);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  const handleNumberClick = useCallback(
    (clickedNumber: number) => {
      if (!isActive) return;

      if (clickedNumber === currentNumber) {
        const totalNumbers = numbers.length;

        if (currentNumber === totalNumbers) {
          // Game completed
          const finalTime = elapsedTime;
          stopGame();

          setStats((prev) => {
            const newCompletedGames = prev.completedGames + 1;
            const newBestTime =
              prev.bestTime === null ? finalTime : Math.min(prev.bestTime, finalTime);
            const newAverageTime =
              (prev.averageTime * prev.completedGames + finalTime) / newCompletedGames;

            return {
              completedGames: newCompletedGames,
              bestTime: newBestTime,
              averageTime: Math.round(newAverageTime * 10) / 10,
              lastTime: finalTime,
            };
          });
        } else {
          setCurrentNumber(currentNumber + 1);
        }
      }
    },
    [isActive, currentNumber, numbers.length, elapsedTime, stopGame],
  );

  const resetStats = useCallback(() => {
    setStats({
      completedGames: 0,
      bestTime: null,
      averageTime: 0,
      lastTime: null,
    });
  }, []);

  const reset = useCallback(() => {
    setNumbers([]);
    setCurrentNumber(1);
    setIsActive(false);
    setElapsedTime(0);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  return {
    numbers,
    currentNumber,
    isActive,
    elapsedTime,
    stats,
    startGame,
    stopGame,
    handleNumberClick,
    resetStats,
    reset,
  };
}
