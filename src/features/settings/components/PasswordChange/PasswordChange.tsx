'use client';

import { useState } from 'react';

import { Button } from '@/ui-kit/button/button';
import { Input } from '@/ui-kit/input/input';

import { PasswordChangeData } from '@/types/settings';

import styles from './PasswordChange.module.scss';

export const PasswordChange: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (field: keyof PasswordChangeData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
    setError('');
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Mock password change
    setSuccess(true);
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <form className={styles.passwordChange} onSubmit={handleSubmit}>
      <Input
        type="password"
        label="Текущий пароль"
        value={passwords.currentPassword}
        onChange={handleChange('currentPassword')}
        placeholder="Введите текущий пароль"
      />
      <Input
        type="password"
        label="Новый пароль"
        value={passwords.newPassword}
        onChange={handleChange('newPassword')}
        placeholder="Введите новый пароль"
      />
      <Input
        type="password"
        label="Подтвердите пароль"
        value={passwords.confirmPassword}
        onChange={handleChange('confirmPassword')}
        placeholder="Подтвердите новый пароль"
      />

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>Пароль успешно изменен</div>}

      <Button type="submit" variant="primary">
        Изменить пароль
      </Button>
    </form>
  );
};
