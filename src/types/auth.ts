export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
