export interface User {
  id: string;
  email: string;
  userName: string;
  avatarUrl?: string;
  emailConfirmed?: boolean;
  createdAt?: string;
  // Legacy fields for backward compatibility
  name?: string;
  avatar?: string;
  bio?: string;
  registeredAt?: string;
  level?: number;
  experiencePoints?: number;
}

export interface ProfileResponse {
  id: string;
  email: string;
  userName: string;
  avatarUrl: string;
  emailConfirmed: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<string>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
