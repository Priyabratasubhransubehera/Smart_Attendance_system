import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing auth on mount
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call the API
    // For demo purposes, we'll accept specific credentials
    const mockUsers = {
      'admin@peoplehub.com': { 
        id: '1', 
        name: 'Admin User', 
        email: 'admin@peoplehub.com', 
        role: 'admin' as UserRole,
        department: 'Administration'
      },
      'hr@peoplehub.com': { 
        id: '2', 
        name: 'HR Manager', 
        email: 'hr@peoplehub.com', 
        role: 'hr' as UserRole,
        department: 'Human Resources'
      },
      'manager@peoplehub.com': { 
        id: '3', 
        name: 'Team Manager', 
        email: 'manager@peoplehub.com', 
        role: 'manager' as UserRole,
        department: 'Engineering'
      },
      'employee@peoplehub.com': { 
        id: '4', 
        name: 'John Doe', 
        email: 'employee@peoplehub.com', 
        role: 'employee' as UserRole,
        department: 'Engineering'
      },
    };

    const user = mockUsers[email as keyof typeof mockUsers];
    
    if (user && password === 'password') {
      const mockToken = `mock_jwt_token_${user.role}_${Date.now()}`;
      
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      setToken(mockToken);
      setUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        isAuthenticated: !!token 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
