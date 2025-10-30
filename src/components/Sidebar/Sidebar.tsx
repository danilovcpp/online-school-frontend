'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from '@/shared/constants/routes';

import styles from './Sidebar.module.scss';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Дашборд',
    icon: '📊',
    path: routes.dashboard,
  },
  {
    id: 'courses',
    title: 'Курсы',
    icon: '📚',
    path: routes.courses,
  },
  {
    id: 'mental-arithmetic-level-1',
    title: 'Курс: Уровень 1',
    icon: '🎓',
    path: routes.course.mentalArithmeticLevel1,
  },
  {
    id: 'abacus',
    title: 'Абакус',
    icon: '🧮',
    path: routes.trainers.abacus,
  },
  {
    id: 'flash-anzan',
    title: 'Flash Anzan',
    icon: '⚡',
    path: routes.trainers.flashAzan,
  },
  {
    id: 'guess-result',
    title: 'Угадай результат',
    icon: '🎯',
    path: routes.trainers.guessResult,
  },
  {
    id: 'schulte-table',
    title: 'Таблица Шульте',
    icon: '🔢',
    path: routes.trainers.schulteTable,
  },
  {
    id: 'stroop-test',
    title: 'Тест Струпа',
    icon: '🎨',
    path: routes.trainers.stroopTest,
  },
  {
    id: 'lipman-test',
    title: 'Тест Липмана',
    icon: '🔤',
    path: routes.trainers.lipmanTest,
  }
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/*<div className={styles.header}>
        <h2 className={styles.title}>Меню</h2>
      </div>*/}

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link key={item.id} href={item.path} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.emoji}>🧠</span>
          <p className={styles.footerText}>Развивайте свой мозг каждый день</p>
        </div>
      </div>
    </aside>
  );
};
