import { configureStore } from '@reduxjs/toolkit';

import { IS_SSR } from '@/utils/isSsr';

import { rootSlice } from './features/root-slice';

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootSlice,
    preloadedState,
  });
};

let store: AppStore | undefined;

export const getOrCreateStore = (preloadedState?: Partial<RootState>): AppStore => {
  if (IS_SSR) {
    return makeStore(preloadedState);
  }

  if (!store) {
    store = makeStore(preloadedState);
  }

  return store;
};

export type RootState = ReturnType<typeof rootSlice>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
