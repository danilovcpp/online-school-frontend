import type { GuessResultSettings } from '@/types';

export const defaultSettings: GuessResultSettings = {
  count: 4,
  speed: 1000,
  digits: 2,
  allowNegative: false,
};

export const countSetting = [
  { value: 3, label: '3 числа' },
  { value: 4, label: '4 числа' },
  { value: 5, label: '5 чисел' },
  { value: 6, label: '6 чисел' },
];

export const speedSetting = [
  { value: 1500, label: '1500 мс (легко)' },
  { value: 1000, label: '1000 мс (средне)' },
  { value: 700, label: '700 мс (сложно)' },
  { value: 500, label: '500 мс (эксперт)' },
];

export const digitsSetting = [
  { value: 1, label: '1 цифра' },
  { value: 2, label: '2 цифры' },
  { value: 3, label: '3 цифры' },
];
