import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/Button/Button';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.emoji}>🧮</span>
          <span className={styles.siteName}>Online-school</span>
        </Link>

        <nav className={styles.nav}>
          <Button variant="secondary" className={styles.authButton}>
            Вход
          </Button>
          <Button variant="primary" className={styles.authButton}>
            Регистрация
          </Button>
        </nav>
      </div>
    </header>
  );
};
