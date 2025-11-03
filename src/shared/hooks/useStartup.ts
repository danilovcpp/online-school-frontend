import { selectIsUserLoaded,selectIsUserLoading, userRequest } from '@/store/features/user/user-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const useStartup = () => {
  const dispatch = useAppDispatch();

  const userIsLoading = useAppSelector(selectIsUserLoading);
  const userIsLoaded = useAppSelector(selectIsUserLoaded);

  if (!userIsLoading && !userIsLoaded) {
    dispatch(userRequest())
  }
};
