'use client';

import { type FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { routes } from '@/shared/constants/routes';
import { logoutRequest } from '@/store/features/auth/auth-slice';
import { selectUserProfile } from '@/store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Dropdown, DropdownDivider, DropdownItem } from '@/ui-kit/Dropdown';

import styles from './user-menu.module.scss';

export const UserMenu: FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logoutRequest());
    router.push('/');
  };

  const displayName = user.userName || user.name || 'Пользователь';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  const trigger = (
    <div className={styles.trigger}>
      {user.avatarUrl ? (
        <Image src={user.avatarUrl} alt={displayName} width={32} height={32} className={styles.avatarImage} />
      ) : (
        <span className={styles.avatar}>{avatarInitial}</span>
      )}
      <span className={styles.userName}>{displayName}</span>
      <span className={styles.chevron}>▼</span>
    </div>
  );

  return (
    <Dropdown trigger={trigger} align="right">
      <DropdownItem icon="👤" onClick={() => router.push(routes.profile)}>
        Профиль
      </DropdownItem>
      <DropdownItem icon="📊" onClick={() => router.push(routes.dashboard)}>
        Дашборд
      </DropdownItem>
      <DropdownItem icon="📚" onClick={() => router.push(routes.courses)}>
        Курсы
      </DropdownItem>
      <DropdownItem icon="🏆" onClick={() => router.push(routes.leaderboard)}>
        Рейтинг
      </DropdownItem>
      <DropdownItem icon="🎖️" onClick={() => router.push(routes.achievements)}>
        Достижения
      </DropdownItem>
      <DropdownItem icon="🎯" onClick={() => router.push('/trainers')}>
        Тренажеры
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="⚙️" onClick={() => router.push(routes.settings)}>
        Настройки
      </DropdownItem>
      <DropdownItem icon="❓">Помощь</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="🚪" onClick={handleLogout} variant="danger">
        Выход
      </DropdownItem>
    </Dropdown>
  );
};
