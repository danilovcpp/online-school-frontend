import type { FlashAnzanSettings } from '@/types';

export const defaultSettings: FlashAnzanSettings = {
  count: 5,
  speed: 1000,
  digits: 2,
};

export const countSetting = [
  { value: 3, label: '3 числа' },
  { value: 5, label: '5 чисел' },
  { value: 10, label: '10 чисел' },
  { value: 15, label: '15 чисел' },
  { value: 20, label: '20 чисел' },
];

export const speedSetting = [
  { value: 1500, label: '1500 мс (легко)' },
  { value: 1000, label: '1000 мс (средне)' },
  { value: 700, label: '700 мс (сложно)' },
  { value: 500, label: '500 мс (эксперт)' },
  { value: 300, label: '300 мс (мастер)' },
];

export const digitsSetting = [
  { value: 1, label: '1 цифра' },
  { value: 2, label: '2 цифры' },
  { value: 3, label: '3 цифры' },
  { value: 4, label: '4 цифры' },
];
