'use client';

import { Dashboard } from '@/shared/components/Dashboard';
import { routes } from '@/shared/constants/routes';

import { DashboardData } from '@/types/dashboard';

const mockDashboardData: DashboardData = {
  progress: {
    currentLevel: 'Ментальная арифметика – Уровень 1',
    nextLevel: 'уровню 2',
    totalPoints: 8,
    progressPercentage: 45,
  },
  categories: [
    {
      id: 'regular-tasks',
      title: 'Обычные задачи',
      points: 8,
      completed: 2,
      started: 1,
    },
    {
      id: 'text-tasks',
      title: 'Текстовые задачи',
      points: 0,
      completed: 0,
      started: 0,
      repeated: 0,
    },
    {
      id: 'audio-tasks',
      title: 'Задачи на слух',
      points: 0,
      completed: 0,
      started: 0,
      repeated: 0,
    },
  ],
  recommendedTrainers: [
    {
      id: 'schulte-table',
      title: 'Таблица Шульте',
      description: 'Программировать скорость и точность визуального восприятия с помощью виртуального тренажера',
      icon: '🎯',
      path: routes.trainers.schulteTable,
    },
    {
      id: 'flash-anzan',
      title: 'Занимайтесь с помощником',
      description: 'Просите менталику и прокачайте навыки с виртуальным арифметистом',
      icon: '🎓',
      path: routes.trainers.flashAzan,
    },
  ],
};

export default function DashboardPage() {
  return <Dashboard data={mockDashboardData} />;
}
