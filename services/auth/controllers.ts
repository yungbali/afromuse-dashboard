import { Router, Request, Response } from 'express';
import { JWTService } from './services';
import type { 
  LoginDTO, 
  UserDTO, 
  AuthToken,
  User 
} from '@/types/auth';
import { AppError } from '../auth/middleware/app-error';

export class AuthController {
  public router: Router;
  private jwtService: JWTService;

  constructor() {
    this.router = Router();
    this.jwtService = new JWTService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/auth/login', this.login.bind(this));
    this.router.post('/auth/register', this.register.bind(this));
    this.router.post('/auth/verify', this.verifyToken.bind(this));
    this.router.post('/auth/refresh', this.refreshToken.bind(this));
  }

  private async login(req: Request, res: Response) {
    try {
      const credentials = req.body as LoginDTO;
      
      if (!credentials.email || !credentials.password) {
        throw new AppError('Email and password are required', 400);
      }

      const authResult = await this.jwtService.generateToken(credentials);
      res.status(200).json(authResult);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(401).json({ 
          error: 'Invalid credentials' 
        });
      }
    }
  }

  private async register(req: Request, res: Response) {
    try {
      const userData = req.body as UserDTO;
      
      if (!userData.email || !userData.password) {
        throw new AppError('Email and password are required', 400);
      }

      const user = await this.jwtService.createUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(400).json({ 
          error: 'Registration failed' 
        });
      }
    }
  }

  private async verifyToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      
      if (!token) {
        throw new AppError('Token is required', 400);
      }

      const isValid = await this.jwtService.verifyToken(token);
      res.status(200).json({ valid: isValid });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(401).json({ 
          error: 'Invalid token' 
        });
      }
    }
  }

  private async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        throw new AppError('Refresh token is required', 400);
      }

      const newToken = await this.jwtService.refreshToken(refreshToken);
      res.status(200).json(newToken);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(401).json({ 
          error: 'Invalid refresh token' 
        });
      }
    }
  }
} 