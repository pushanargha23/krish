import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('krisshiv_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Mock login
    if (email && password) {
      const mockUser: User = {
        _id: 'mock_user_123',
        name: 'Mock User',
        email,
        role: 'user',
      };
      setUser(mockUser);
      localStorage.setItem('krisshiv_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, password: string) => {
    if (email && password) {
      const mockUser: User = {
        _id: 'mock_user_123',
        name,
        email,
        phone,
        role: 'user',
      };
      setUser(mockUser);
      localStorage.setItem('krisshiv_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid registration data');
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem('krisshiv_user');
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    console.log('Password reset requested for', email);
  }, []);

  const resetPassword = useCallback(async (oobCode: string, newPassword: string) => {
    console.log('Password reset confirmed with code', oobCode);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
