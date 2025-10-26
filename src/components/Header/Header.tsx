'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    router.push(routes.auth.login);
  };

  const handleRegister = () => {
    router.push(routes.auth.register);
  };

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
              <div className={styles.userInfo}>
                <span className={styles.avatar}>{user.avatar || '👤'}</span>
                <span className={styles.userName}>{user.name}</span>
              </div>
              <Button variant="secondary" onClick={handleLogout} className={styles.authButton}>
                Выход
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleLogin} className={styles.authButton}>
                Вход
              </Button>
              <Button variant="primary" onClick={handleRegister} className={styles.authButton}>
                Регистрация
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
