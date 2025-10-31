import { type FC } from 'react';
import clsx from 'clsx';

import type { Achievement } from '@/types';

import styles from './achievement-card.module.scss';

interface AchievementCardProps {
  achievement: Achievement;
  className?: string;
}

const tierColors: Record<string, string> = {
  bronze: styles.bronze,
  silver: styles.silver,
  gold: styles.gold,
  platinum: styles.platinum,
  diamond: styles.diamond,
};

const AchievementCard: FC<AchievementCardProps> = ({ achievement, className }) => {
  const { title, description, icon, unlocked, tier, progress } = achievement;

  return (
    <div className={clsx(styles.card, tierColors[tier], !unlocked && styles.locked, className)}>
      <div className={styles.iconWrapper}>
        <div className={styles.icon}>{icon}</div>
        {!unlocked && <div className={styles.lockOverlay}>🔒</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {progress && !unlocked && (
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(progress.current / progress.target) * 100}%` }} />
            </div>
            <span className={styles.progressText}>
              {progress.current} / {progress.target}
            </span>
          </div>
        )}

        {unlocked && achievement.unlockedAt && (
          <div className={styles.unlockedDate}>
            Получено: {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        )}
      </div>

      <div className={styles.tierBadge}>{tier.toUpperCase()}</div>
    </div>
  );
};

export { AchievementCard };
