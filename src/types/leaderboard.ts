export type LeaderboardPeriod = 'today' | 'week' | 'allTime';

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatar?: string;
  score: number;
  level: number;
  achievements: number;
  completedExercises: number;
}

export interface LeaderboardData {
  period: LeaderboardPeriod;
  users: LeaderboardUser[];
  updatedAt: Date;
}
