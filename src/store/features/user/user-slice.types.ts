import { type Profile } from '@/types/auth';

import { type LoadingStatuses } from '../types';

export interface UserState {
  status: LoadingStatuses | null;
  profile: Profile;
}
