'use client';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { AuthApi } from '@/services/api/auth-api';

import styles from './register-form.module.scss';

const RegisterForm: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
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

    setIsLoading(true);
    const { status, data, error } = await AuthApi.register({ email, password });

    if (status === 200 && data) {
      setSuccessMessage(data.message);
      setFormData({ email: '', password: '', confirmPassword: '' });
    } else {
      setError(error || 'Ошибка регистрации');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      {successMessage && <div className={styles.success}>{successMessage}</div>}

      <Button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};

export { RegisterForm };
