'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Seed admin and demo accounts
const SEED_USERS: (User & { password: string })[] = [
  {
    id: 'admin-1',
    email: 'admin@skychemicals.co.uk',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    password: 'admin123',
  },
  {
    id: 'user-demo',
    email: 'demo@example.com',
    name: 'Demo Customer',
    role: 'customer',
    createdAt: '2024-06-01T00:00:00Z',
    password: 'demo123',
  },
];

function getStoredUsers(): (User & { password: string })[] {
  if (typeof window === 'undefined') return SEED_USERS;
  const stored = localStorage.getItem('sky_users');
  if (!stored) return SEED_USERS;
  try { return [...SEED_USERS, ...JSON.parse(stored)]; } catch { return SEED_USERS; }
}

function saveUser(user: User & { password: string }) {
  const stored = localStorage.getItem('sky_users');
  const existing: (User & { password: string })[] = stored ? JSON.parse(stored) : [];
  existing.push(user);
  localStorage.setItem('sky_users', JSON.stringify(existing));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sky_session');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const { password: _, ...userObj } = found;
    setUser(userObj);
    localStorage.setItem('sky_session', JSON.stringify(userObj));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User & { password: string } = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: 'customer',
      createdAt: new Date().toISOString(),
      password,
    };
    saveUser(newUser);
    const { password: _, ...userObj } = newUser;
    setUser(userObj);
    localStorage.setItem('sky_session', JSON.stringify(userObj));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sky_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
