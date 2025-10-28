'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/shared/constants/routes';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(routes.dashboard);
    } else {
      router.replace(routes.auth.login);
    }
  }, [isAuthenticated, router]);

  return null;
}
