import { useEffect } from 'react';

import { selectUserStatus, userRequest } from '@/store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { useIsAuthorized } from './auth/use-is-authorized';
import { usePrevious } from './use-previous';

export const useStartup = () => {
  const dispatch = useAppDispatch();

  const isAuth = useIsAuthorized();
  const userStatus = useAppSelector(selectUserStatus);

  const prevIsAuth = usePrevious(isAuth);

  useEffect(() => {
    if (userStatus === 'success' || userStatus === 'logout' || userStatus === 'loading') {
      return;
    }

    if (isAuth && !prevIsAuth) {
      dispatch(userRequest());
    }
  }, [dispatch, isAuth, prevIsAuth, userStatus]);
};
