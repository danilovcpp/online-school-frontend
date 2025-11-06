'use client';
import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { routes } from '@/shared/constants/routes';
import { logoutRequest } from '@/store/features/auth/auth-slice';
import { selectUserProfile } from '@/store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/ui-kit/button/button';
import { Card } from '@/ui-kit/card/card';

import styles from './profile-card.module.scss';

const ProfileCard: FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const handleLogout = () => {
    dispatch(logoutRequest());
    router.push(routes.home);
  };

  const registeredDate = 'Недавно'; // user.registeredAt;

  const level = 1; // user.level
  const experiencePoints = 0; // user.experiencePoints
  const experienceToNextLevel = level * 1000;
  const progressPercentage = Math.min((experiencePoints / experienceToNextLevel) * 100, 100);

  const displayName = user.userName || user.name || 'Пользователь';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <Card className={styles.profileCard}>
      <div className={styles.header}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={displayName} width={120} height={120} className={styles.avatarImage} />
            ) : (
              avatarInitial
            )}
          </div>
          <div className={styles.info}>
            <h1 className={styles.name}>{displayName}</h1>
            <p className={styles.email}>{user.email}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>О себе</h2>
        <p className={styles.bio}>{'Расскажите о себе...'}</p>
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
        <Button variant="secondary" as={Link} href={routes.dashboard}>
          К тренажерам
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </Card>
  );
};

export { ProfileCard };
