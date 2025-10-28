import { TrainerType } from './trainers';

export interface StudentProgress {
  currentLevel: string;
  nextLevel: string;
  totalPoints: number;
  progressPercentage: number;
}

export interface CategoryStats {
  id: string;
  title: string;
  points: number;
  completed: number;
  started: number;
  repeated?: number;
}

export interface RecommendedTrainer {
  id: TrainerType;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface DashboardData {
  progress: StudentProgress;
  categories: CategoryStats[];
  recommendedTrainers: RecommendedTrainer[];
}
