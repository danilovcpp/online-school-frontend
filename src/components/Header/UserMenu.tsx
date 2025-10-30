'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Dropdown, DropdownDivider, DropdownItem } from '@/components/Dropdown';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './UserMenu.module.scss';

export const UserMenu: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const trigger = (
    <div className={styles.trigger}>
      {user.avatarUrl ? (
        <Image src={user.avatarUrl} alt={user.userName} width={32} height={32} className={styles.avatarImage} />
      ) : (
        <span className={styles.avatar}>{user.avatar || '👤'}</span>
      )}
      <span className={styles.userName}>{user.userName || user.name}</span>
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
      <DropdownItem icon="🎯" onClick={() => router.push('/trainers')}>
        Тренажеры
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="⚙️">Настройки</DropdownItem>
      <DropdownItem icon="❓">Помощь</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="🚪" onClick={handleLogout} variant="danger">
        Выход
      </DropdownItem>
    </Dropdown>
  );
};
