import { useEffect } from 'react';

import { selectUserStatus, userRequest } from '@/store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useIsAuthorized } from './auth/use-is-authorized';

export const useStartup = () => {
  const dispatch = useAppDispatch();

  const isAuth = useIsAuthorized();
  const userStatus = useAppSelector(selectUserStatus);

  useEffect(() => {
    if (isAuth && !userStatus) {
      dispatch(userRequest());
    }
  });
};
