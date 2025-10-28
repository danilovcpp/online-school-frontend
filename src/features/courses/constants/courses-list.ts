import type { Course } from '@/types/courses';

export const coursesList: Course[] = [
  {
    id: 'mental-arithmetic-level-1',
    title: 'Ментальная арифметика (уровень 1)',
    description:
      'Базовый курс ментальной арифметики из 3 уроков. Познакомьтесь с абакусом, освойте сложение и вычитание, научитесь ментальному счёту без абакуса.',
    level: 1,
    duration: '1 неделя',
    lessonsCount: 3,
    icon: '🧮',
    price: 0,
    isAvailable: true,
  },
];
