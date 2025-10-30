import { PropsWithChildren } from 'react';

import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout';
import { TrainerList } from '@/features/trainers/components/trainers-list/trainer-list';

import styles from './layout.module.scss';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <DashboardLayout>
      <div className={styles.container}>

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
