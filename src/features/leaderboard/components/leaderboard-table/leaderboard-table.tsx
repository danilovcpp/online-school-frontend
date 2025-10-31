'use client';

import type { LeaderboardUser } from '@/types/leaderboard';

import styles from './leaderboard-table.module.scss';

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

const getRankMedal = (rank: number): string | null => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return null;
  }
};

export const LeaderboardTable = ({ users }: LeaderboardTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rankColumn}>Место</th>
            <th className={styles.userColumn}>Пользователь</th>
            <th className={styles.scoreColumn}>Баллы</th>
            <th className={styles.levelColumn}>Уровень</th>
            <th className={styles.achievementsColumn}>Достижения</th>
            <th className={styles.exercisesColumn}>Упражнения</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const medal = getRankMedal(user.rank);
            const isTopThree = user.rank <= 3;

            return (
              <tr key={user.id} className={isTopThree ? styles.topThreeRow : styles.row}>
                <td className={styles.rankCell}>
                  <div className={styles.rankContent}>
                    {medal ? <span className={styles.medal}>{medal}</span> : <span className={styles.rankNumber}>{user.rank}</span>}
                  </div>
                </td>
                <td className={styles.userCell}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.username.charAt(0)}</div>
                    <span className={styles.username}>{user.username}</span>
                  </div>
                </td>
                <td className={styles.scoreCell}>
                  <span className={styles.score}>{user.score.toLocaleString('ru-RU')}</span>
                </td>
                <td className={styles.levelCell}>
                  <span className={styles.level}>{user.level}</span>
                </td>
                <td className={styles.achievementsCell}>
                  <span className={styles.achievements}>{user.achievements}</span>
                </td>
                <td className={styles.exercisesCell}>
                  <span className={styles.exercises}>{user.completedExercises}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
