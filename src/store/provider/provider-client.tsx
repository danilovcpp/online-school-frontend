'use client';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { RootState } from '../index';
import { getOrCreateStore } from '../index';

export type StoreProviderClientProps = {
  children: ReactNode;
  preloadedState?: Partial<RootState>;
};

export const StoreProviderClient = ({ children, preloadedState }: StoreProviderClientProps) => {
  const store = getOrCreateStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
};
