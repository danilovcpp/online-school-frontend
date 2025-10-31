import type { LeaderboardPeriod, LeaderboardUser } from '@/types/leaderboard';

const firstNames = [
  'Александр',
  'Дмитрий',
  'Максим',
  'Сергей',
  'Андрей',
  'Алексей',
  'Артём',
  'Илья',
  'Кирилл',
  'Михаил',
  'Никита',
  'Матвей',
  'Роман',
  'Егор',
  'Арсений',
  'Иван',
  'Денис',
  'Евгений',
  'Даниил',
  'Тимофей',
  'Владимир',
  'Павел',
  'Николай',
  'Георгий',
  'Константин',
  'Анастасия',
  'Мария',
  'Дарья',
  'Анна',
  'Екатерина',
  'Виктория',
  'Полина',
  'Алиса',
  'София',
  'Елизавета',
  'Александра',
  'Варвара',
  'Арина',
  'Валерия',
  'Ксения',
  'Милана',
  'Ульяна',
  'Кристина',
  'Вероника',
  'Таисия',
];

const lastNames = [
  'Иванов',
  'Смирнов',
  'Кузнецов',
  'Попов',
  'Васильев',
  'Петров',
  'Соколов',
  'Михайлов',
  'Новиков',
  'Фёдоров',
  'Морозов',
  'Волков',
  'Алексеев',
  'Лебедев',
  'Семёнов',
  'Егоров',
  'Павлов',
  'Козлов',
  'Степанов',
  'Николаев',
  'Орлов',
  'Андреев',
  'Макаров',
  'Никитин',
  'Захаров',
  'Зайцев',
  'Соловьёв',
  'Борисов',
  'Яковлев',
  'Григорьев',
];

// Generate deterministic but seemingly random values based on seed
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateFakeUsers = (count: number, period: LeaderboardPeriod): LeaderboardUser[] => {
  const users: LeaderboardUser[] = [];
  const usedNames = new Set<string>();

  // Score multipliers based on period
  const scoreMultipliers = {
    today: { min: 100, max: 2000 },
    week: { min: 500, max: 10000 },
    allTime: { min: 5000, max: 100000 },
  };

  const { min, max } = scoreMultipliers[period];

  // Use period as part of seed for different scores per period
  const periodSeed = period === 'today' ? 1000 : period === 'week' ? 2000 : 3000;

  for (let i = 0; i < count; i++) {
    let username: string;
    let attempts = 0;

    // Generate unique username
    do {
      const firstNameIndex = Math.floor(seededRandom(i * 7 + attempts + periodSeed) * firstNames.length);
      const lastNameIndex = Math.floor(seededRandom(i * 11 + attempts + periodSeed) * lastNames.length);
      username = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
      attempts++;
    } while (usedNames.has(username) && attempts < 100);

    usedNames.add(username);

    // Generate score with variation based on rank (higher ranks get higher scores)
    const rankFactor = 1 - i / count; // 1.0 for rank 1, decreasing to 0 for last rank
    const baseScore = min + (max - min) * rankFactor;
    const randomVariation = seededRandom(i * 13 + periodSeed) * 0.2 - 0.1; // ±10%
    const score = Math.floor(baseScore * (1 + randomVariation));

    // Level based on score (rough approximation)
    const level = Math.min(Math.floor(score / (period === 'today' ? 200 : period === 'week' ? 1000 : 5000)) + 1, 50);

    // Achievements based on level with some randomness
    const achievements = Math.floor(level * 1.5 + seededRandom(i * 17 + periodSeed) * 10);

    // Completed exercises
    const completedExercises = Math.floor(
      score / (period === 'today' ? 10 : period === 'week' ? 50 : 100) +
        seededRandom(i * 19 + periodSeed) * 50
    );

    users.push({
      id: `user-${i + 1}-${period}`,
      rank: i + 1,
      username,
      score,
      level,
      achievements,
      completedExercises,
    });
  }

  // Sort by score descending and reassign ranks
  users.sort((a, b) => b.score - a.score);
  users.forEach((user, index) => {
    user.rank = index + 1;
  });

  return users;
};
