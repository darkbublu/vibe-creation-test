// Authentication module for handling user login and registration

// #region Types
// Type definitions for authentication
interface Credentials {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}
// #endregion

// #region Login Function
// Handles user authentication against the backend
export async function login(credentials: Credentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();
  return data;
}
// #endregion

// #region Registration Function
// Handles new user registration
export async function register(user: Credentials & { email: string }): Promise<AuthResponse> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  return data;
}
// #endregion 