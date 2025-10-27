import { LipmanTestSettings } from '@/types';

export const defaultSettings: LipmanTestSettings = {
  rows: 10,
  cols: 15,
  targetLetters: ['К', 'А'],
};

export const rowsOptions = [
  { value: 10, label: '10 строк' },
  { value: 15, label: '15 строк' },
  { value: 20, label: '20 строк' },
];

export const colsOptions = [
  { value: 15, label: '15 столбцов' },
  { value: 20, label: '20 столбцов' },
  { value: 25, label: '25 столбцов' },
];

export const AVAILABLE_LETTERS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'.split('');
