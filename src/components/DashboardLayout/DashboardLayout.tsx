'use client';

import React, { PropsWithChildren } from 'react';

import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';

import styles from './DashboardLayout.module.scss';

export const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};
