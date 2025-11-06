import { type Profile } from '@/types/auth';

import { type LoadingStatuses } from '../types';

export type UserStatus = LoadingStatuses | 'logout' | null;

export interface UserState {
  status: UserStatus;
  profile: Profile;
}
