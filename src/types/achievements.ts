export type AchievementCategory =
  | 'flash-anzan'
  | 'abacus'
  | 'guess-result'
  | 'schulte-table'
  | 'stroop-test'
  | 'lipman-test'
  | 'general';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: {
    current: number;
    target: number;
  };
}
