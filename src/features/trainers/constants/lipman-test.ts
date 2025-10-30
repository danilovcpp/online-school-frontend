import { LipmanTestSettings } from '@/types';

export const defaultSettings: LipmanTestSettings = {
  rows: 10,
  cols: 10,
  targetLetters: ['К', 'А'],
};

export const rowsOptions = [
  { value: 5, label: '5 строк' },
  { value: 7, label: '7 строк' },
  { value: 10, label: '10 строк' },
  { value: 15, label: '15 строк' },
  { value: 20, label: '20 строк' },
];

export const colsOptions = [
  { value: 5, label: '5 столбцов' },
  { value: 7, label: '7 столбцов' },
  { value: 10, label: '10 столбцов' },
  { value: 15, label: '15 столбцов' },
  { value: 20, label: '20 столбцов' },
];

export const AVAILABLE_LETTERS = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'.split('');
