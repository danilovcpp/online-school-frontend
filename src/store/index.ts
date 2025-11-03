import { configureStore } from '@reduxjs/toolkit';

import { rootSlice } from './features/root-slice';

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootSlice,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootSlice>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
