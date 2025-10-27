// Trainer types
export type TrainerType =
  | 'abacus'
  | 'flash-anzan'
  | 'guess-result'
  | 'lipman-test'
  | 'mental-visualization'
  | 'schulte-table'
  | 'soroban'
  | 'stroop-test';

export interface Trainer {
  id: TrainerType;
  title: string;
  description: string;
  icon: string;
  path: string;
}

// Abacus types
export interface BeadPosition {
  column: number;
  type: 'top' | 'bottom';
  index: number;
  active: boolean;
}

export interface ColumnValue {
  column: number;
  value: number;
}

// Flash Anzan types
export interface FlashAnzanSettings {
  count: number;
  speed: number;
  digits: number;
  allowNegative?: boolean;
}

export interface FlashAnzanStats {
  correct: number;
  wrong: number;
  accuracy: number;
}

// Guess Result types
export interface GuessResultSettings {
  count: number; // Number of numbers to show (3-6)
  speed: number; // Display speed in ms
  digits: number; // Number of digits
  allowNegative?: boolean;
}

export interface GuessResultStats {
  correct: number;
  wrong: number;
  accuracy: number;
  averageTime: number; // Average time to answer in seconds
  totalRounds: number;
}

// Practice mode types
export interface PracticeChallenge {
  number: number;
  completed: boolean;
}

// Schulte Table types
export interface SchulteTableSettings {
  gridSize: number; // Size of the grid (3x3, 4x4, 5x5)
  shuffle: boolean; // Whether to shuffle numbers
}

export interface SchulteTableStats {
  completedGames: number;
  bestTime: number | null; // Best time in seconds
  averageTime: number; // Average time in seconds
  lastTime: number | null; // Last completed time in seconds
}

// Stroop Test types
export interface SroopColor {
  name: string; // Color name in Russian (e.g., "красный")
  hex: string; // Color hex code
}

export interface StroopTestSettings {
  rounds: number; // Number of rounds (10, 20, 30)
  mode: 'congruent' | 'incongruent' | 'mixed'; // Test mode
}

export interface StroopTestStats {
  completedTests: number;
  bestTime: number | null; // Best average time per answer in ms
  averageTime: number; // Average time per answer in ms
  accuracy: number; // Accuracy percentage
  totalCorrect: number;
  totalWrong: number;
}

// Lipman Test types
export interface LipmanTestSettings {
  rows: number; // Number of rows (10, 15, 20)
  cols: number; // Number of columns (15, 20, 25)
  targetLetters: string[]; // Letters to find (e.g., ['К', 'А'])
}

export interface LipmanTestStats {
  completedTests: number;
  bestTime: number | null; // Best time in seconds
  averageTime: number; // Average time in seconds
  accuracy: number; // Accuracy percentage
  totalCorrect: number; // Total correct marks
  totalWrong: number; // Total wrong marks
}

export interface LipmanCell {
  letter: string;
  isTarget: boolean;
  isMarked: boolean;
  isCorrect?: boolean; // Only set after test completion
}
