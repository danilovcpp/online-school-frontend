import Link from 'next/link';

import { Card } from '@/components/Card/Card';
import { routes } from '@/shared/constants/routes';

import { RegisterForm } from './components/register-form/register-form';

import styles from './register.module.scss';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт для доступа к тренажерам</p>

        <RegisterForm />

        <div className={styles.footer}>
          Уже есть аккаунт?{' '}
          <Link href={routes.auth.login} className={styles.link}>
            Войти
          </Link>
        </div>
      </Card>
    </div>
  );
};

export { RegisterPage };
