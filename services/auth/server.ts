import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error-handler';
import { authMiddleware } from './middleware/auth-middleware';
import { AppError } from './middleware/app-error';

interface ServerConfig {
  controllers: any[];
  middleware?: any[];
}

export function createServer(config: ServerConfig): Express {
  const app = express();

  // Basic middleware
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  // Custom middleware
  if (config.middleware) {
    config.middleware.forEach(middleware => app.use(middleware));
  }

  // Controllers
  config.controllers.forEach(Controller => {
    const instance = new Controller();
    app.use('/api', instance.router);
  });

  // 404 handler
  app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
  });

  // Error handling
  app.use(errorHandler);

  return app;
}

// Export types
export { AppError };
export type { ServerConfig }; 