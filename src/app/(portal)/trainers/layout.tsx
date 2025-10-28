import { PropsWithChildren } from 'react';

import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout';
import { TrainerList } from '@/features/trainers/components/trainers-list/trainer-list';

import styles from './layout.module.scss';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.gradientText}>Абакус</span>
            <span className={styles.subtitle}>Древнее искусство быстрого счета</span>
          </h1>
        </header>

        <main>
          <TrainerList />

          {children}
        </main>

        <footer className={styles.footer}>
          <p>Создано для изучения древнего искусства счета на абакусе</p>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default Layout;
