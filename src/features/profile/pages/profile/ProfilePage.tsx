'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button/button';
import { Card } from '@/components/Card/Card';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './profile.module.scss';

export const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push(routes.home);
  };

  if (!user) {
    router.push(routes.auth.login);
    return null;
  }

  const registeredDate = user.registeredAt
    ? new Date(user.registeredAt).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Недавно';

  const level = user.level ?? 1;
  const experiencePoints = user.experiencePoints ?? 0;
  const experienceToNextLevel = level * 1000;
  const progressPercentage = Math.min((experiencePoints / experienceToNextLevel) * 100, 100);

  return (
    <div className={styles.container}>
      <Card className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{user.avatar || '👤'}</div>
            <div className={styles.info}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.email}>{user.email}</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>О себе</h2>
          <p className={styles.bio}>{user.bio || 'Расскажите о себе...'}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Статистика</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏆</div>
              <div className={styles.statValue}>{level}</div>
              <div className={styles.statLabel}>Уровень</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statValue}>{experiencePoints.toLocaleString('ru-RU')}</div>
              <div className={styles.statLabel}>Опыт</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>📅</div>
              <div className={styles.statValue}>{registeredDate}</div>
              <div className={styles.statLabel}>Регистрация</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Прогресс до следующего уровня</h2>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
          </div>
          <div className={styles.progressText}>
            {experiencePoints} / {experienceToNextLevel} XP
          </div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={() => router.push(routes.dashboard)}>
            К тренажерам
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Card>
    </div>
  );
};
