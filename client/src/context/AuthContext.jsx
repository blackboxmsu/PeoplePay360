import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const DEMO_CREDENTIALS = [
  {
    role: 'employee',
    roleLabel: 'Employee',
    name: 'Rohan Patel',
    email: 'employee@peoplepay360.com',
    desc: 'Self-service: Attendance, own leave & profile'
  },
  {
    role: 'hr_manager',
    roleLabel: 'HR Manager',
    name: 'Sara Khan',
    email: 'hrmanager@peoplepay360.com',
    desc: 'Employees, Contracts, Attendance, Time Off approvals'
  },
  {
    role: 'hr_payroll_user',
    roleLabel: 'HR Payroll User',
    name: 'Aditi Roy',
    email: 'payrolluser@peoplepay360.com',
    desc: 'Create/compute payruns, read-only structures'
  },
  {
    role: 'hr_payroll_manager',
    roleLabel: 'HR Payroll Manager',
    name: 'Aarav Mehta',
    email: 'payrollmanager@peoplepay360.com',
    desc: 'Full payroll control, Salary rules, Mark Paid'
  },
  {
    role: 'admin',
    roleLabel: 'Admin',
    name: 'System Admin',
    email: 'admin@peoplepay360.com',
    desc: 'Complete administrative & configuration access'
  }
];

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('peoplepay360_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('peoplepay360_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sync token to axios on token change
  useEffect(() => {
    if (token) {
      localStorage.setItem('peoplepay360_token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('peoplepay360_token');
      localStorage.removeItem('peoplepay360_user');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check current session on mount
  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem('peoplepay360_user', JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed, logging out.');
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('peoplepay360_user', JSON.stringify(newUser));
        return { success: true, user: newUser };
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Authentication failed';
      setAuthError(msg);
      return { success: false, message: msg };
    }
  };

  const quickDemoLogin = async (email) => {
    return login(email, 'Demo@123');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('peoplepay360_token');
    localStorage.removeItem('peoplepay360_user');
  };

  const role = user?.role || 'guest';

  // Helper check methods for role access
  const hasRole = (...roles) => roles.includes(role);
  const canAccessPayroll = ['hr_payroll_user', 'hr_payroll_manager', 'admin'].includes(role);
  const canManageHR = ['hr_manager', 'hr_payroll_user', 'hr_payroll_manager', 'admin'].includes(role);
  const isEmployeeSelf = role === 'employee';

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isAuthenticated: !!token && !!user,
        isLoading,
        authError,
        login,
        quickDemoLogin,
        logout,
        hasRole,
        canAccessPayroll,
        canManageHR,
        isEmployeeSelf
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
