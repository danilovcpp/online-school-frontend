'use client';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

import styles from './register-form.module.scss';

const RegisterForm: FC = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      setError('Введите корректный email');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await register(name, email, password);
      router.push(routes.trainers.abacus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type="text"
        label="Имя"
        value={formData.name}
        onChange={handleChange('name')}
        placeholder="Иван Иванов"
        disabled={isLoading}
        autoComplete="name"
      />

      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="user@example.com"
        disabled={isLoading}
        autoComplete="email"
      />

      <Input
        type="password"
        label="Пароль"
        value={formData.password}
        onChange={handleChange('password')}
        placeholder="••••••••"
        disabled={isLoading}
        autoComplete="new-password"
      />

      <Input
        type="password"
        label="Подтверждение пароля"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        placeholder="••••••••"
        disabled={isLoading}
        autoComplete="new-password"
      />

      {error && <div className={styles.error}>{error}</div>}

      <Button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};

export { RegisterForm };
