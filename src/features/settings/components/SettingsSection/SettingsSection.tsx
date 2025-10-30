import { ReactNode } from 'react';

import styles from './SettingsSection.module.scss';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <section className={styles.settingsSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
