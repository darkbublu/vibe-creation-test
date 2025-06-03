// Authentication hook for managing user login state

// #region Imports
import { useState, useCallback } from 'react';
import { login, register } from '../../core/auth/login';
import { saveSession, clearSession, getUser } from '../../core/auth/session';
// #endregion

// #region Types
interface UseAuthReturn {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, email: string) => Promise<void>;
  logout: () => void;
}
// #endregion

// #region Hook Implementation
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<any | null>(getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login({ username, password });
      saveSession(response.token, response.user);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (username: string, password: string, email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await register({ username, password, email });
      saveSession(response.token, response.user);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
// #endregion

export default useAuth; 