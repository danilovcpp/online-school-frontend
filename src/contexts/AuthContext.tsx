'use client';

import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import type { AuthContextType, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Иван Иванов',
  avatar: '👤',
  bio: 'Увлекаюсь ментальной арифметикой и развитием когнитивных способностей. Постоянно совершенствую свои навыки счета на абакусе.',
  registeredAt: new Date('2024-01-15').toISOString(),
  level: 5,
  experiencePoints: 3750,
};

// Mock credentials
const MOCK_CREDENTIALS = {
  email: 'user@example.com',
  password: 'password',
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
    } else {
      throw new Error('Неверный email или пароль');
    }

    setIsLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, validate with backend
    // For now, create a mock user with provided data
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: name.charAt(0).toUpperCase(),
      bio: '',
      registeredAt: new Date().toISOString(),
      level: 1,
      experiencePoints: 0,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  // Restore user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
