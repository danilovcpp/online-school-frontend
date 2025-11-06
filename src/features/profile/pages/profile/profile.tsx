import { redirect } from 'next/navigation';

import { routes } from '@/shared/constants/routes';
import { checkServerIsAuth } from '@/utils/checkServerIsAuth';

import { ProfileCard } from './components/profile-card/profile-card';

import styles from './profile.module.scss';

export const ProfilePage = async () => {
  const { isAuth } = await checkServerIsAuth();

  if (!isAuth) {
    return redirect(routes.auth.login);
  }

  return (
    <div className={styles.container}>
      <ProfileCard />
    </div>
  );
};
