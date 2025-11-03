import { combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './auth/auth-slice';
import { userSlice } from './user/user-slice';

export const rootSlice = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
});
