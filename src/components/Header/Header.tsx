'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button/button';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.emoji}>🧮</span>
          <span className={styles.siteName}>Online-school</span>
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated && user ? (
            <>
              <Link href={routes.profile} className={styles.userInfo}>
                <span className={styles.avatar}>{user.avatar || '👤'}</span>
                <span className={styles.userName}>{user.name}</span>
              </Link>
              <Button variant="secondary" onClick={handleLogout} className={styles.authButton}>
                Выход
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href={routes.auth.login} variant="secondary" className={styles.authButton}>
                Вход
              </Button>
              <Button as={Link} href={routes.auth.register} variant="primary" className={styles.authButton}>
                Регистрация
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
