'use client';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { AuthApi } from '@/services/api/auth-api';
import { routes } from '@/shared/constants/routes';
import { loginToken } from '@/store/features/auth/auth-slice';
import { useAppDispatch } from '@/store/hooks';
import { setTokens } from '@/utils/jwt';

import styles from './login-form.module.scss';

const LoginForm: FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    const { status, data, error } = await AuthApi.login({ email, password });

    if (data && status === 200) {
      await setTokens(data);
      dispatch(loginToken(data.accessToken));
      router.push(routes.home);
    } else {
      setError(error || 'Ошибка входа');
    }

    setIsLoading(false);
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

      <Button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};

export { LoginForm };
