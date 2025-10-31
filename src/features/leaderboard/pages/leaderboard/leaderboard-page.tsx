'use client';

import { useMemo, useState } from 'react';

import { LeaderboardTable } from '@/features/leaderboard/components/leaderboard-table/leaderboard-table';
import { generateFakeUsers } from '@/utils/generate-fake-users';

import type { LeaderboardPeriod } from '@/types/leaderboard';

import styles from './leaderboard-page.module.scss';

const TABS: { id: LeaderboardPeriod; label: string }[] = [
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: 'Неделя' },
  { id: 'allTime', label: 'Все время' },
];

export const LeaderboardPage = () => {
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>('allTime');

  // Generate users for each period (memoized to avoid regeneration on re-renders)
  const usersData = useMemo(() => {
    return {
      today: generateFakeUsers(50, 'today'),
      week: generateFakeUsers(50, 'week'),
      allTime: generateFakeUsers(50, 'allTime'),
    };
  }, []);

  const currentUsers = usersData[activePeriod];
  const topThree = currentUsers.slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Рейтинг</h1>
        <p className={styles.subtitle}>Соревнуйтесь с другими учениками и поднимайтесь в топ!</p>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={activePeriod === tab.id ? styles.tabActive : styles.tab}
            onClick={() => setActivePeriod(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.podium}>
        {topThree.map((user, index) => {
          const position = index + 1;
          const positionClass =
            position === 1 ? styles.first : position === 2 ? styles.second : styles.third;

          return (
            <div key={user.id} className={`${styles.podiumPlace} ${positionClass}`}>
              <div className={styles.podiumRank}>
                <span className={styles.medal}>
                  {position === 1 ? '🥇' : position === 2 ? '🥈' : '🥉'}
                </span>
              </div>
              <div className={styles.podiumAvatar}>{user.username.charAt(0)}</div>
              <div className={styles.podiumUsername}>{user.username}</div>
              <div className={styles.podiumScore}>{user.score.toLocaleString('ru-RU')}</div>
              <div className={styles.podiumLevel}>Уровень {user.level}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{currentUsers.length}</div>
          <div className={styles.statLabel}>Участников</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statCard}>
          <div className={styles.statValue}>{topThree[0]?.score.toLocaleString('ru-RU') || 0}</div>
          <div className={styles.statLabel}>Лучший результат</div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {Math.round(currentUsers.reduce((acc, u) => acc + u.score, 0) / currentUsers.length).toLocaleString('ru-RU')}
          </div>
          <div className={styles.statLabel}>Средний балл</div>
        </div>
      </div>

      <LeaderboardTable users={currentUsers} />
    </div>
  );
};
