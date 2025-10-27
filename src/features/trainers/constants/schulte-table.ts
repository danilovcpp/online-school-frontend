import { SchulteTableSettings } from '@/types';

export const defaultSettings: SchulteTableSettings = {
  gridSize: 5,
  shuffle: true,
};

export const gridSizeOptions = [
  { value: 3, label: '3x3 (9 чисел)' },
  { value: 4, label: '4x4 (16 чисел)' },
  { value: 5, label: '5x5 (25 чисел)' },
  { value: 6, label: '6x6 (36 чисел)' },
];
