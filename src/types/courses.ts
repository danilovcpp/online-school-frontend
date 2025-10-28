import type { TrainerType } from './trainers';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: number;
  duration: string;
  lessonsCount: number;
  icon: string;
  price?: number;
  isAvailable: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  theory: {
    title: string;
    content: string;
  };
  practice: {
    trainerType: TrainerType;
    trainerPath: string;
    description?: string;
    requirements?: string;
  };
  isCompleted?: boolean;
  isLocked?: boolean;
}
