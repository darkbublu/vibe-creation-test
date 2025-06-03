// Session management for maintaining user authentication state

// #region Session Storage
// Local storage keys and helper functions
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export function saveSession(token: string, user: any): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
// #endregion

// #region Session Checks
// Functions for checking session status
export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): any | null {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
}
// #endregion

// #region Session Headers
// Helper for adding auth headers to requests
export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return token ? {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  } : {
    'Content-Type': 'application/json',
  };
}
// #endregion 