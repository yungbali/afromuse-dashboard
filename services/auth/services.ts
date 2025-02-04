import jwt from 'jsonwebtoken';
import type { LoginDTO, UserDTO, User, AuthToken } from '@/types/auth';

export class JWTService {
  refreshToken(refreshToken: any) {
      throw new Error('Method not implemented.');
  }
  private readonly secretKey: string;

  constructor() {
    this.secretKey = process.env.JWT_SECRET || 'your-secret-key';
  }

  public async generateToken(credentials: LoginDTO): Promise<AuthToken> {
    // In a real app, verify credentials against database
    const token = jwt.sign({ email: credentials.email }, this.secretKey, {
      expiresIn: '1h'
    });

    return {
      token,
      expiresIn: 3600 // 1 hour in seconds
    };
  }

  public async createUser(userData: UserDTO): Promise<User> {
    // In a real app, save to database
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'viewer',
      createdAt: new Date()
    };

    return user;
  }

  public async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch {
      return false;
    }
  }

  public static middleware() {
    return async (req: { headers: { authorization?: string } }, res: Response, next: Function) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      try {
        const decoded = jwt.verify(token, JWTService.secretKey); // Use JWTService.secretKey for consistency
        (req as any).user = decoded; // Type assertion to avoid TypeScript error
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    };
  }
} 