import { createServer } from './server';
import { AuthController } from './controllers';
import { JWTService } from './services';
import type { LoginDTO, UserDTO, User, AuthToken } from '@/types/auth';

interface AuthServiceAPI {
  login: (credentials: LoginDTO) => Promise<AuthToken>;
  register: (userData: UserDTO) => Promise<User>;
  validateToken: (token: string) => Promise<boolean>;
}

const authService = createServer({
  controllers: [AuthController],
  middleware: [
    JWTService.middleware(),
  ],
});

export class AuthServiceImpl implements AuthServiceAPI {
  private jwtService: JWTService;

  constructor() {
    this.jwtService = new JWTService();
  }

  async login(credentials: LoginDTO): Promise<AuthToken> {
    return this.jwtService.generateToken(credentials);
  }

  async register(userData: UserDTO): Promise<User> {
    return this.jwtService.createUser(userData);
  }

  async validateToken(token: string): Promise<boolean> {
    return this.jwtService.verifyToken(token);
  }
}

export const authServiceInstance = new AuthServiceImpl();
export default authService; 