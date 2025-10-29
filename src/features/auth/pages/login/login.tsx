import type { FC } from 'react';
import Link from 'next/link';

import { Card } from '@/components/card/card';
import { routes } from '@/shared/constants/routes';

import { LoginForm } from './components/login-form/login-form';

import styles from './login.module.scss';

const LoginPage: FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Добро пожаловать в Online-school</p>

        <LoginForm />

        <div className={styles.footer}>
          Нет аккаунта?{' '}
          <Link href={routes.auth.register} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </Card>
    </div>
  );
};

export { LoginPage };
