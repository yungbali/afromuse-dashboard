export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserDTO {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface VerificationResponse {
  valid: boolean;
  user?: User;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresIn: number;
} 