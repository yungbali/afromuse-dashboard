import type { 
  LoginCredentials, 
  AuthResponse, 
  UserDTO, 
  User, 
  VerificationResponse, 
  RefreshResponse 
} from '@/types/auth';

export interface AuthService {
  baseUrl: string;
  endpoints: {
    login: '/auth/login';
    register: '/auth/register';
    verify: '/auth/verify';
    refresh: '/auth/refresh';
  };
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(userData: UserDTO): Promise<AuthResponse>;
  verifyToken(token: string): Promise<VerificationResponse>;
  refreshToken(refreshToken: string): Promise<RefreshResponse>;
}