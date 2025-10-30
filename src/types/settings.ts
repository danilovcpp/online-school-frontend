export interface UserSettings {
  email: string;
  notifications: {
    email: boolean;
    push: boolean;
    updates: boolean;
  };
  language: string;
  theme: 'light' | 'dark' | 'auto';
  privacy: {
    showProfile: boolean;
    showProgress: boolean;
  };
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
