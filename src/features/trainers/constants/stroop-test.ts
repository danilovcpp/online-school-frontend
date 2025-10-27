import { SroopColor, StroopTestSettings } from '@/types';

export const colors: SroopColor[] = [
  { name: 'красный', hex: '#FF0000' },
  { name: 'синий', hex: '#0000FF' },
  { name: 'зелёный', hex: '#00AA00' },
  { name: 'жёлтый', hex: '#FFD700' },
  { name: 'оранжевый', hex: '#FF8C00' },
  { name: 'фиолетовый', hex: '#8B00FF' },
];

export const defaultSettings: StroopTestSettings = {
  rounds: 10,
  mode: 'incongruent',
};

export const roundsOptions = [
  { value: 10, label: '10 раундов' },
  { value: 20, label: '20 раундов' },
  { value: 30, label: '30 раундов' },
];

export const modeOptions = [
  { value: 'congruent', label: 'Конгруэнтный (цвет совпадает со словом)' },
  { value: 'incongruent', label: 'Неконгруэнтный (цвет не совпадает)' },
  { value: 'mixed', label: 'Смешанный (случайно)' },
];
