'use client';

import { useState } from 'react';

import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { Select } from '@/components/select/select';
import { useAuth } from '@/contexts/AuthContext';

import { UserSettings } from '@/types/settings';

import { AvatarUpload } from '../../components/AvatarUpload';
import { PasswordChange } from '../../components/PasswordChange';
import { SettingsSection } from '../../components/SettingsSection';

import styles from './SettingsPage.module.scss';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    email: user?.email || 'user@example.com',
    notifications: {
      email: true,
      push: false,
      updates: true,
    },
    language: 'ru',
    theme: 'auto',
    privacy: {
      showProfile: true,
      showProgress: true,
    },
  });
  const [saved, setSaved] = useState(false);

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file.name);
  };

  const handleSettingChange = <K extends keyof UserSettings>(key: K, value: UserSettings[K] | Partial<UserSettings[K]>) => {
    setSettings((prev) => {
      const prevValue = prev[key];
      const newValue =
        typeof value === 'object' && !Array.isArray(value) && typeof prevValue === 'object' && prevValue !== null
          ? { ...prevValue, ...value }
          : value;

      return {
        ...prev,
        [key]: newValue as UserSettings[K],
      };
    });
    setSaved(false);
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.settingsPage}>
      <h1 className={styles.pageTitle}>Настройки</h1>

      <div className={styles.sections}>
        <SettingsSection title="Профиль" description="Управление данными профиля">
          <div className={styles.profileSection}>
            <AvatarUpload currentAvatar={user?.avatarUrl} onAvatarChange={handleAvatarChange} />
            <Input label="Email" type="email" value={settings.email} disabled />
          </div>
        </SettingsSection>

        <SettingsSection title="Безопасность" description="Управление паролем и безопасностью аккаунта">
          <PasswordChange />
        </SettingsSection>

        <SettingsSection title="Уведомления" description="Настройка уведомлений">
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  handleSettingChange('notifications', {
                    email: e.target.checked,
                  })
                }
              />
              <span>Email уведомления</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) =>
                  handleSettingChange('notifications', {
                    push: e.target.checked,
                  })
                }
              />
              <span>Push уведомления</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.notifications.updates}
                onChange={(e) =>
                  handleSettingChange('notifications', {
                    updates: e.target.checked,
                  })
                }
              />
              <span>Уведомления об обновлениях</span>
            </label>
          </div>
        </SettingsSection>

        <SettingsSection title="Внешний вид" description="Настройка интерфейса приложения">
          <div className={styles.appearanceSettings}>
            <Select label="Язык" value={settings.language} onChange={(e) => handleSettingChange('language', e.target.value)}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </Select>
            <Select
              label="Тема оформления"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value as UserSettings['theme'])}
            >
              <option value="light">Светлая</option>
              <option value="dark">Темная</option>
              <option value="auto">Системная</option>
            </Select>
          </div>
        </SettingsSection>

        <SettingsSection title="Приватность" description="Управление настройками приватности">
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.privacy.showProfile}
                onChange={(e) =>
                  handleSettingChange('privacy', {
                    showProfile: e.target.checked,
                  })
                }
              />
              <span>Показывать профиль другим пользователям</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.privacy.showProgress}
                onChange={(e) =>
                  handleSettingChange('privacy', {
                    showProgress: e.target.checked,
                  })
                }
              />
              <span>Показывать мой прогресс</span>
            </label>
          </div>
        </SettingsSection>

        <div className={styles.actions}>
          <Button variant="primary" onClick={handleSave} fullWidth>
            Сохранить изменения
          </Button>
          {saved && <div className={styles.savedMessage}>Настройки успешно сохранены</div>}
        </div>
      </div>
    </div>
  );
};
