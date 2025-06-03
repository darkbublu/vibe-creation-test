// Local storage keys and helper functions
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export function saveSession(token: string, user: any): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
//good ehre
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}