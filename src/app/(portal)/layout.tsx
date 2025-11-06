import { type PropsWithChildren } from 'react';

import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';

import { Providers } from './layout.provider';

import styles from './layout.module.scss';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <div className={styles.layout}>
        <Header />
        <div className={styles.container}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </Providers>
  );
}
