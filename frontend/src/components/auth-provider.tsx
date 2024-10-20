'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { User, useUser, useIsAuthenticated } from '../hooks/useAuth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: isAuthenticated, isLoading: isAuthLoading } =
    useIsAuthenticated();

  const value = {
    user: user || null,
    isLoading: isUserLoading || isAuthLoading,
    isAuthenticated: !!isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
