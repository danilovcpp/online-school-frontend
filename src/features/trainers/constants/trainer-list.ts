import { routes } from '@/shared/constants/routes';

import { Trainer } from '@/types';

export const trainerList: Array<Trainer> = [
  {
    id: 'abacus',
    title: 'Базовый режим',
    description: 'Практика работы с абакусом и ввод чисел вручную',
    icon: '🎯',
    path: routes.trainers.abacus,
  },
  {
    id: 'flash-anzan',
    title: 'Flash Anzan',
    description: 'Быстрые вычисления (Speed Math) - числа появляются на экране на доли секунды',
    icon: '⚡',
    path: routes.trainers.flashAzan,
  },
  {
    id: 'guess-result',
    title: 'Угадай результат',
    description: 'Решайте примеры и вводите правильный ответ',
    icon: '🎲',
    path: routes.trainers.guessResult,
  },
  {
    id: 'mental-visualization',
    title: 'Mental Visualization',
    description: 'Абакус из головы - визуализация без физического инструмента',
    icon: '🧠',
    path: routes.trainers.mentalVisualization,
  },
  {
    id: 'schulte-table',
    title: 'Таблица Шульте',
    description: 'Тренажер концентрации внимания и периферического зрения',
    icon: '🎯',
    path: routes.trainers.schulteTable,
  },
];
