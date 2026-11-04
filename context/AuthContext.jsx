'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  loginUser: () => {},
  logout: async () => {},
  refreshUser: async () => {}
});

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ivaessentials.com').replace(/\/+$/, '');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to safely format joined date
  const formatJoinedDate = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    try {
      return new Date(dateString).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  // Fetch authentic user profile from backend (/api/users/me or /api/auth/me)
  const refreshUser = useCallback(async (activeToken = null) => {
    const currentToken = activeToken || token || (typeof window !== 'undefined' ? sessionStorage.getItem('iva_session_token') : null);

    const headers = { 'Content-Type': 'application/json' };
    if (currentToken) {
      headers['Authorization'] = `Bearer ${currentToken}`;
    }

    try {
      // 1. First attempt to get the complete user profile
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: 'GET',
        headers,
        credentials: 'include' // Sends httpOnly session cookie
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const profile = {
            id: data.data.id,
            name: data.data.name || 'Customer',
            email: data.data.email,
            phone: data.data.phoneNumber,
            joinedDate: formatJoinedDate(data.data.createdAt)
          };
          setUser(profile);
          if (currentToken) setToken(currentToken);
          return profile;
        }
      }

      // 2. Fallback to /api/auth/me if /api/users/me returned non-ok
      const authRes = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers,
        credentials: 'include'
      });

      if (authRes.ok) {
        const authData = await authRes.json();
        if (authData.success && authData.data) {
          const profile = {
            id: authData.data.id,
            name: authData.data.name || 'Customer',
            email: authData.data.email,
            phone: authData.data.phoneNumber || authData.data.phone || '',
            joinedDate: formatJoinedDate(authData.data.createdAt)
          };
          setUser(profile);
          if (currentToken) setToken(currentToken);
          return profile;
        }
      }

      // Not authenticated
      setUser(null);
      setToken(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('iva_session_token');
      }
      return null;
    } catch (err) {
      console.warn('⚠️ [AuthContext] Session verification notice:', err.message);
      return null;
    }
  }, [token]);

  // Initial session check on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // SECURITY CLEANUP: Purge any legacy sensitive user details from permanent localStorage
    try {
      localStorage.removeItem('iva_user');
      localStorage.removeItem('iva_token');
      localStorage.removeItem('iva_user_orders');
    } catch (e) {}

    // Check active tab session
    const tabToken = sessionStorage.getItem('iva_session_token');
    if (tabToken) {
      setToken(tabToken);
    }

    refreshUser(tabToken).finally(() => {
      setIsLoading(false);
    });
  }, [refreshUser]);

  // Login handler: sets in-memory state and active tab session only
  const loginUser = useCallback((userData, jwtToken = null) => {
    const formattedUser = {
      id: userData?.id || null,
      name: userData?.name || 'Customer',
      email: userData?.email || '',
      phone: userData?.phoneNumber || userData?.phone || '',
      joinedDate: formatJoinedDate(userData?.createdAt)
    };

    setUser(formattedUser);

    if (jwtToken) {
      setToken(jwtToken);
      if (typeof window !== 'undefined') {
        // Stored only in sessionStorage (per-tab, wiped on tab/browser close, never on disk permanently)
        sessionStorage.setItem('iva_session_token', jwtToken);
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('iva_auth_changed', { detail: { user: formattedUser, token: jwtToken } }));
    }
  }, []);

  // Logout handler: destroys server session cookie and wipes memory
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
    } catch (err) {
      console.warn('⚠️ [AuthContext] Logout notice:', err.message);
    }

    // Wipe memory & tab storage
    setUser(null);
    setToken(null);

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('iva_session_token');
      localStorage.removeItem('iva_user');
      localStorage.removeItem('iva_token');
      localStorage.removeItem('iva_cart'); // Clear cart on sign out for shared computer privacy
      window.dispatchEvent(new CustomEvent('iva_auth_changed', { detail: { user: null, token: null } }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(user),
        loginUser,
        logout,
        refreshUser
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

