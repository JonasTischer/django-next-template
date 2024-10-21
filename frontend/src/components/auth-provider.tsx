'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from '../hooks/use-auth';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading: isUserLoading } = useUser();

  const value = {
    user: user || null,
    isLoading: isUserLoading,
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
