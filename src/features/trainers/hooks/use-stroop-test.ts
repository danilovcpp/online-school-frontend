'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SroopColor, StroopTestSettings, StroopTestStats } from '@/types';

import { colors } from '../constants/stroop-test';

interface CurrentTask {
  colorName: string;
  displayColor: string;
}

export function useStroopTest() {
  const [currentTask, setCurrentTask] = useState<CurrentTask | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [roundStartTime, setRoundStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [stats, setStats] = useState<StroopTestStats>({
    completedTests: 0,
    bestTime: null,
    averageTime: 0,
    accuracy: 0,
    totalCorrect: 0,
    totalWrong: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const responseTimes = useRef<number[]>([]);

  const generateTask = useCallback((mode: StroopTestSettings['mode']): CurrentTask => {
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    let displayColor: SroopColor;

    if (mode === 'congruent') {
      displayColor = wordColor;
    } else if (mode === 'incongruent') {
      // Ensure display color is different from word color
      const availableColors = colors.filter((c) => c.name !== wordColor.name);
      displayColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    } else {
      // Mixed mode
      if (Math.random() > 0.5) {
        displayColor = wordColor;
      } else {
        const availableColors = colors.filter((c) => c.name !== wordColor.name);
        displayColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      }
    }

    return {
      colorName: wordColor.name,
      displayColor: displayColor.hex,
    };
  }, []);

  const startTest = useCallback(
    (settings: StroopTestSettings) => {
      setIsActive(true);
      setCurrentRound(1);
      setTotalRounds(settings.rounds);
      setRoundStartTime(Date.now());
      setElapsedTime(0);
      responseTimes.current = [];

      const task = generateTask(settings.mode);
      setCurrentTask(task);

      // Start timer
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 0.1);
      }, 100);
    },
    [generateTask],
  );

  const stopTest = useCallback(() => {
    setIsActive(false);
    setCurrentTask(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleAnswer = useCallback(
    (selectedColor: string, settings: StroopTestSettings) => {
      if (!isActive || !currentTask || !roundStartTime) return;

      const responseTime = Date.now() - roundStartTime;
      responseTimes.current.push(responseTime);

      const isCorrect = selectedColor === currentTask.displayColor;

      setStats((prev) => {
        const newTotalCorrect = prev.totalCorrect + (isCorrect ? 1 : 0);
        const newTotalWrong = prev.totalWrong + (isCorrect ? 0 : 1);
        const total = newTotalCorrect + newTotalWrong;
        const accuracy = total > 0 ? Math.round((newTotalCorrect / total) * 100) : 0;

        return {
          ...prev,
          totalCorrect: newTotalCorrect,
          totalWrong: newTotalWrong,
          accuracy,
        };
      });

      if (currentRound < totalRounds) {
        // Next round
        setCurrentRound((prev) => prev + 1);
        setRoundStartTime(Date.now());
        const task = generateTask(settings.mode);
        setCurrentTask(task);
      } else {
        // Test completed
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        const avgResponseTime = responseTimes.current.reduce((a, b) => a + b, 0) / responseTimes.current.length;

        setStats((prev) => {
          const newBestTime = prev.bestTime === null ? avgResponseTime : Math.min(prev.bestTime, avgResponseTime);
          const newCompletedTests = prev.completedTests + 1;
          const newAverageTime =
            (prev.averageTime * prev.completedTests + avgResponseTime) / newCompletedTests;

          return {
            ...prev,
            completedTests: newCompletedTests,
            bestTime: newBestTime,
            averageTime: newAverageTime,
          };
        });

        setIsActive(false);
        setCurrentTask(null);
      }
    },
    [isActive, currentTask, roundStartTime, currentRound, totalRounds, generateTask],
  );

  const reset = useCallback(() => {
    setCurrentTask(null);
    setCurrentRound(0);
    setTotalRounds(0);
    setIsActive(false);
    setRoundStartTime(null);
    setElapsedTime(0);
    responseTimes.current = [];

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    currentTask,
    currentRound,
    totalRounds,
    isActive,
    elapsedTime,
    stats,
    startTest,
    stopTest,
    handleAnswer,
    reset,
    resetStats,
  };
}
