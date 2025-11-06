import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';

import { Classes } from '@/types';

import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';

import styles from './portal-layout.module.scss';

interface PortalLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
  classes?: Classes<'container' | 'main'>;
}

const PortalLayout: FC<PortalLayoutProps> = ({ className, children, showSidebar = true, classes }) => {
  return (
    <div className={clsx(styles.layout, className)}>
      <Header />
      <div className={clsx(styles.container, classes?.container)}>
        {showSidebar && <Sidebar />}
        <main className={clsx(styles.main, classes?.main)}>{children}</main>
      </div>
    </div>
  );
};

export { PortalLayout };
