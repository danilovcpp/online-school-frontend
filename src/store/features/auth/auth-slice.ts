import { logoutAction } from '@/services/server-actions/auth/logout';

import { createAppSlice } from '../../utils/create-app-slice';
import { resetUser } from '../user/user-slice';

import type { AuthEntity } from './auth-slice.types';

const nameOfSlice = 'auth';

const initialState: AuthEntity = {
  token: '',
};

export const authSlice = createAppSlice({
  name: nameOfSlice,
  initialState,
  reducers: (create) => ({
    loginToken: create.reducer<string>((state, action) => {
      state.token = action.payload;
    }),
    logoutToken: create.reducer((state) => {
      state.token = '';
    }),
    logoutRequest: create.asyncThunk<AuthEntity, undefined, { rejectValue: AuthEntity }>(
      async (_, thunkApi) => {
        const result = await logoutAction();

        if (result) {
          thunkApi.dispatch(resetUser());
          return thunkApi.fulfillWithValue({ token: '' });
        }

        return thunkApi.rejectWithValue({ token: '' });
      },
      {
        pending: () => {
          return;
        },
        fulfilled: (state, action) => {
          state.token = action.payload.token;
        },
        rejected: () => {
          return;
        },
      },
    ),
  }),
  selectors: {
    selectIsUserAuthorized: (state) => !!state.token,
    selectAuthToken: (state) => state.token,
  },
});

export const { loginToken, logoutToken, logoutRequest } = authSlice.actions;

export const { selectIsUserAuthorized, selectAuthToken } = authSlice.selectors;
