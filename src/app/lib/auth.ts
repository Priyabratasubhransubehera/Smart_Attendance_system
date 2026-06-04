import { User, AuthState } from '../types';

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem('user');
  },

  clear: (): void => {
    authStorage.removeToken();
    authStorage.removeUser();
  },

  getAuthState: (): AuthState => {
    return {
      token: authStorage.getToken(),
      user: authStorage.getUser(),
    };
  },
};

export const getRoleHomePath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'hr':
      return '/hr';
    case 'manager':
      return '/manager';
    case 'employee':
      return '/employee';
    default:
      return '/';
  }
};
