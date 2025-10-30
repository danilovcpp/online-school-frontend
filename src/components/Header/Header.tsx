'use client';

import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/button/button';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import { UserMenu } from './UserMenu';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.emoji}>🧮</span>
          <span className={styles.siteName}>Online-school</span>
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated ? (
            <UserMenu />
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
