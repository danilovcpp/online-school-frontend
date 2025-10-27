'use client';
import { useCallback, useRef, useState } from 'react';

import { LipmanCell, LipmanTestSettings, LipmanTestStats } from '@/types';

const RUSSIAN_LETTERS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'.split('');

export function useLipmanTest() {
  const [cells, setCells] = useState<LipmanCell[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [settings, setSettings] = useState<LipmanTestSettings | null>(null);
  const [stats, setStats] = useState<LipmanTestStats>({
    completedTests: 0,
    bestTime: null,
    averageTime: 0,
    accuracy: 0,
    totalCorrect: 0,
    totalWrong: 0,
  });

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const generateGrid = useCallback((gridSettings: LipmanTestSettings) => {
    const totalCells = gridSettings.rows * gridSettings.cols;
    const newCells: LipmanCell[] = [];

    for (let i = 0; i < totalCells; i++) {
      const randomLetter = RUSSIAN_LETTERS[Math.floor(Math.random() * RUSSIAN_LETTERS.length)];
      const isTarget = gridSettings.targetLetters.includes(randomLetter);

      newCells.push({
        letter: randomLetter,
        isTarget,
        isMarked: false,
      });
    }

    return newCells;
  }, []);

  const startTest = useCallback(
    (testSettings: LipmanTestSettings) => {
      const newCells = generateGrid(testSettings);
      setCells(newCells);
      setSettings(testSettings);
      setIsActive(true);
      setIsCompleted(false);
      setElapsedTime(0);

      startTimeRef.current = Date.now();

      // Start timer
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      timerInterval.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 100);
    },
    [generateGrid],
  );

  const stopTest = useCallback(() => {
    setIsActive(false);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  const toggleCell = useCallback(
    (index: number) => {
      if (!isActive || isCompleted) return;

      setCells((prevCells) => {
        const newCells = [...prevCells];
        newCells[index] = {
          ...newCells[index],
          isMarked: !newCells[index].isMarked,
        };
        return newCells;
      });
    },
    [isActive, isCompleted],
  );

  const completeTest = useCallback(() => {
    if (!isActive) return;

    stopTest();
    setIsCompleted(true);

    // Calculate results
    let correct = 0;
    let wrong = 0;

    const updatedCells = cells.map((cell) => {
      let isCorrect: boolean | undefined;

      if (cell.isMarked && cell.isTarget) {
        correct++;
        isCorrect = true;
      } else if (cell.isMarked && !cell.isTarget) {
        wrong++;
        isCorrect = false;
      } else if (!cell.isMarked && cell.isTarget) {
        // Missed target
        wrong++;
      }

      return { ...cell, isCorrect };
    });

    setCells(updatedCells);

    const finalTime = elapsedTime;

    // Update stats
    setStats((prev) => {
      const newCompletedTests = prev.completedTests + 1;
      const newBestTime = prev.bestTime === null ? finalTime : Math.min(prev.bestTime, finalTime);
      const newAverageTime =
        (prev.averageTime * prev.completedTests + finalTime) / newCompletedTests;
      const newTotalCorrect = prev.totalCorrect + correct;
      const newTotalWrong = prev.totalWrong + wrong;
      const totalAttempts = newTotalCorrect + newTotalWrong;
      const newAccuracy =
        totalAttempts > 0 ? Math.round((newTotalCorrect / totalAttempts) * 100) : 0;

      return {
        completedTests: newCompletedTests,
        bestTime: newBestTime,
        averageTime: Math.round(newAverageTime * 10) / 10,
        accuracy: newAccuracy,
        totalCorrect: newTotalCorrect,
        totalWrong: newTotalWrong,
      };
    });
  }, [isActive, cells, elapsedTime, stopTest]);

  const resetStats = useCallback(() => {
    setStats({
      completedTests: 0,
      bestTime: null,
      averageTime: 0,
      accuracy: 0,
      totalCorrect: 0,
      totalWrong: 0,
    });
  }, []);

  const reset = useCallback(() => {
    setCells([]);
    setIsActive(false);
    setIsCompleted(false);
    setElapsedTime(0);
    setSettings(null);
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  return {
    cells,
    isActive,
    isCompleted,
    elapsedTime,
    settings,
    stats,
    startTest,
    stopTest,
    toggleCell,
    completeTest,
    resetStats,
    reset,
  };
}
