'use client';

import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { authApi } from '@/services/api/auth-api';
import { decodeJWT } from '@/utils/jwt-decode';
import { tokenStorage } from '@/utils/token-storage';

import type { AuthContextType, User } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'user';

// Helper function to create user from JWT token
const createUserFromToken = (accessToken: string): User | null => {
  const payload = decodeJWT(accessToken);
  if (!payload) return null;

  return {
    id: payload.sub || '',
    email: payload.email || '',
    name: payload.name || payload.email || 'Пользователь',
    avatar: payload.name ? payload.name.charAt(0).toUpperCase() : '👤',
    bio: '',
    registeredAt: new Date().toISOString(),
    level: 1,
    experiencePoints: 0,
  };
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const tokens = await authApi.login({ email, password });

      // Save tokens
      tokenStorage.saveTokens(tokens);

      // Create user from JWT
      const newUser = createUserFromToken(tokens.accessToken);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string): Promise<string> => {
    setIsLoading(true);

    try {
      const response = await authApi.register({ email, password });
      return response.message;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    tokenStorage.clearTokens();
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  // Restore user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const tokens = tokenStorage.getTokens();

    if (storedUser && tokens && !tokenStorage.isTokenExpired()) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
        tokenStorage.clearTokens();
      }
    } else if (tokenStorage.isTokenExpired()) {
      // Clear expired tokens
      tokenStorage.clearTokens();
      localStorage.removeItem(USER_STORAGE_KEY);
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
