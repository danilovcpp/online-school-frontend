'use client';
import { useCallback, useRef, useState } from 'react';

import { SchulteTableSettings, SchulteTableStats } from '@/types';

export function useSchulteTable() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [settings, setSettings] = useState<SchulteTableSettings | null>(null);
  const [stats, setStats] = useState<SchulteTableStats>({
    completedGames: 0,
    bestTime: null,
    averageTime: 0,
    lastTime: null,
  });

  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  const shuffleArray = useCallback((array: number[]) => {
    const shuffled = [...array];
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const generateGrid = useCallback((gridSize: number, shouldShuffle: boolean) => {
    const totalNumbers = gridSize * gridSize;
    const nums = Array.from({ length: totalNumbers }, (_, i) => i + 1);

    // Если shuffle=false, перемешиваем один раз в начале
    const initialNumbers = shouldShuffle ? nums : shuffleArray(nums);

    setNumbers(initialNumbers);
    setCurrentNumber(1);
    return initialNumbers;
  }, [shuffleArray]);

  const startGame = useCallback(
    (gameSettings: SchulteTableSettings) => {
      setSettings(gameSettings);
      generateGrid(gameSettings.gridSize, gameSettings.shuffle);
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
      if (!isActive || !settings) return;

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

          // Если включено постоянное перемешивание, перемешиваем оставшиеся числа
          if (settings.shuffle) {
            setNumbers((prevNumbers) => {
              // Разделяем найденные и оставшиеся числа
              const found: number[] = [];
              const remaining: number[] = [];

              prevNumbers.forEach((num) => {
                if (num <= currentNumber) {
                  found.push(num);
                } else {
                  remaining.push(num);
                }
              });

              // Перемешиваем только оставшиеся числа
              const shuffledRemaining = shuffleArray(remaining);

              // Объединяем: найденные остаются на своих позициях, оставшиеся перемешаны
              const result: number[] = [];
              let foundIndex = 0;
              let remainingIndex = 0;

              prevNumbers.forEach((num) => {
                if (num <= currentNumber) {
                  result.push(found[foundIndex++]);
                } else {
                  result.push(shuffledRemaining[remainingIndex++]);
                }
              });

              return result;
            });
          }
        }
      }
    },
    [isActive, settings, currentNumber, numbers.length, elapsedTime, stopGame, shuffleArray],
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
    setSettings(null);
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
