import { ProfileApi } from '@/services/api/profile-api';

import type { Profile } from '@/types/auth';

import { createAppSlice } from '../../utils/create-app-slice';
import type { CustomError } from '../types';

import type { UserState, UserStatus } from './user-slice.types';

const nameOfSlice = 'user';

const initialState: UserState = {
  status: null,
  profile: {
    id: '',
    avatarUrl: '',
    email: '',
    emailConfirmed: false,
    userName: '',
    name: '',
    createdAt: '',
  },
};

export const userSlice = createAppSlice({
  name: nameOfSlice,
  initialState,
  reducers: (create) => ({
    userRequest: create.asyncThunk<Profile, undefined, { rejectValue: CustomError }>(
      async (_, { rejectWithValue, fulfillWithValue }) => {
        const { error, data, status } = await ProfileApi.getMyProfile();

        if (error) {
          return rejectWithValue({ type: 'error', message: error });
        }

        if (status === 200 && data) {
          return fulfillWithValue(data);
        }

        return rejectWithValue({ type: 'response value', message: 'Unexpected response value' });
      },
      {
        fulfilled: (state, action) => {
          state.profile = action.payload;
          state.status = 'success';
        },
        rejected: (state) => {
          state.status = 'error';
          state.profile = initialState.profile;
        },
        pending: (state) => {
          state.status = 'loading';
        },
      },
    ),
    resetUser: create.reducer<UserStatus>((_, action) => {
      return { ...initialState, status: action.payload };
    }),
  }),
  selectors: {
    selectIsUserLoading: (state) => state.status === 'loading',
    selectIsUserLoaded: (state) => state.status === 'success',
    selectUserProfile: (state) => state.profile,
    selectUserStatus: (state) => state.status,
  },
});

export const { userRequest, resetUser } = userSlice.actions;

export const { selectIsUserLoading, selectUserProfile, selectIsUserLoaded, selectUserStatus } = userSlice.selectors;
