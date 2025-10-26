'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Input } from '@/components/Input/Input';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      setError('Введите корректный email');
      return;
    }

    try {
      await login(email, password);
      router.push(routes.trainers.abacus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Вход</h1>
        <p className={styles.subtitle}>Добро пожаловать в Online-school</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            disabled={isLoading}
            autoComplete="email"
          />

          <Input
            type="password"
            label="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            autoComplete="current-password"
          />

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.hint}>
            <strong>Тестовые данные:</strong>
            <br />
            Email: user@example.com
            <br />
            Пароль: password
          </div>

          <Button type="submit" disabled={isLoading} className={styles.submitButton}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className={styles.footer}>
          Нет аккаунта?{' '}
          <Link href={routes.auth.register} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>
      </Card>
    </div>
  );
}
