'use client';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './login-form.module.scss';

const LoginForm: FC = () => {
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
      router.push(routes.home);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    }
  };

  return (
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
  );
};

export { LoginForm };
