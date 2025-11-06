'use client';
import { type PropsWithChildren } from 'react';

import { useStartup } from '@/shared/hooks/use-startup';

const Providers = ({ children }: PropsWithChildren) => {
  useStartup();
  return <>{children}</>;
};

export { Providers };
