// Core type definitions shared across the application

// #region User Types
export interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRole[];
  profile?: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type UserRole = 'admin' | 'user' | 'moderator';
// #endregion

// #region Authentication Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegistrationData extends LoginCredentials {
  email: string;
  confirmPassword: string;
}
// #endregion

// #region API Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
// #endregion 