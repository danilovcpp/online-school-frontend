'use client';

import { type FC, useMemo, useState } from 'react';

import type { AchievementCategory } from '@/types';

import { AchievementCard } from '../../components';
import { achievementsData } from '../../data/achievements-data';

import styles from './achievements-page.module.scss';

const categories: { id: AchievementCategory; label: string }[] = [
  { id: 'general', label: 'Общие' },
  { id: 'flash-anzan', label: 'Flash Anzan' },
  { id: 'abacus', label: 'Абакус' },
  { id: 'guess-result', label: 'Угадай результат' },
  { id: 'schulte-table', label: 'Таблица Шульте' },
  { id: 'stroop-test', label: 'Тест Струпа' },
  { id: 'lipman-test', label: 'Тест Липмана' },
];

const AchievementsPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  const filteredAchievements = useMemo(() => {
    let filtered = achievementsData;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((achievement) => achievement.category === selectedCategory);
    }

    if (showOnlyUnlocked) {
      filtered = filtered.filter((achievement) => achievement.unlocked);
    }

    return filtered;
  }, [selectedCategory, showOnlyUnlocked]);

  const stats = useMemo(() => {
    const total = achievementsData.length;
    const unlocked = achievementsData.filter((a) => a.unlocked).length;
    const percentage = Math.round((unlocked / total) * 100);

    return { total, unlocked, percentage };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Достижения</h1>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.unlocked}</span>
            <span className={styles.statLabel}>Получено</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Всего</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stats.percentage}%</span>
            <span className={styles.statLabel}>Прогресс</span>
          </div>
        </div>
      </div>

      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${stats.percentage}%` }} />
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.categoryFilters}>
          <button
            className={selectedCategory === 'all' ? styles.categoryButtonActive : styles.categoryButton}
            onClick={() => setSelectedCategory('all')}
            type="button"
          >
            Все
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? styles.categoryButtonActive : styles.categoryButton}
              onClick={() => setSelectedCategory(category.id)}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>

        <label className={styles.toggleLabel}>
          <input checked={showOnlyUnlocked} onChange={(e) => setShowOnlyUnlocked(e.target.checked)} type="checkbox" />
          <span>Только полученные</span>
        </label>
      </div>

      <div className={styles.achievements}>
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => <AchievementCard key={achievement.id} achievement={achievement} />)
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🎯</span>
            <p className={styles.emptyText}>Достижений в этой категории пока нет</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { AchievementsPage };
