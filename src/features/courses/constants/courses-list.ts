import type { Course } from '@/types/courses';

export const coursesList: Course[] = [
  {
    id: 'mental-arithmetic-level-1',
    title: 'Ментальная арифметика (уровень 1)',
    description:
      'Базовый курс ментальной арифметики. Освойте основы счёта на абакусе, научитесь выполнять простые арифметические операции и развивайте навыки ментального счёта.',
    level: 1,
    duration: '3 месяца',
    lessonsCount: 24,
    icon: '🧮',
    price: 0,
    isAvailable: true,
  },
];
