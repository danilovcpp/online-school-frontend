import { type PropsWithChildren } from 'react';

import { PortalLayout } from '@/layouts/portal-layout/portal-layout';

import { Providers } from './layout.provider';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <PortalLayout>
        {children}
      </PortalLayout>
    </Providers>
  );
}
