/* eslint-disable react-hooks/refs */
'use client';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import type { RootState } from '../index';
import { AppStore, makeStore } from '../index';

export type StoreProviderClientProps = {
  children: ReactNode;
  preloadedState?: Partial<RootState>;
};

export const StoreProviderClient = ({ children, preloadedState }: StoreProviderClientProps) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
