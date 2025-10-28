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
  {
    id: 'mental-arithmetic-level-2',
    title: 'Ментальная арифметика (уровень 2)',
    description:
      'Расширенный курс ментальной арифметики из 9 уроков. Познакомьтесь с абакусом, освойте сложение и вычитание, научитесь ментальному счёту без абакуса.',
    level: 2,
    duration: '3 недели',
    lessonsCount: 9,
    icon: '🧮',
    price: 1500,
    isAvailable: false,
  },
  {
    id: 'mental-arithmetic-level-3',
    title: 'Ментальная арифметика (уровень 3)',
    description:
      'Продвинутый курс ментальной арифметики из 9 уроков. Познакомьтесь с абакусом, освойте сложение и вычитание, научитесь ментальному счёту без абакуса.',
    level: 3,
    duration: '3 недели',
    lessonsCount: 9,
    icon: '🧮',
    price: 2500,
    isAvailable: false,
  },
];
