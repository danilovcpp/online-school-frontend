'use client';
import { PropsWithChildren } from 'react';

import { useStartup } from '@/shared/hooks/useStartup';

const Providers = ({ children }: PropsWithChildren) => {
  useStartup();
  return <>{children}</>;
};

export { Providers };
