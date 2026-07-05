import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import logger from '../utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';
import { corsHandler } from './middleware/corsHandler';
import { authMiddleware } from './middleware/authMiddleware';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';

class Gateway {
  private app: Express;
  private server: Server | null = null;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));

    // CORS
    this.app.use(corsHandler);

    // Request logging
    this.app.use(requestLogger);

    // Rate limiting
    this.app.use(rateLimiter);

    // Security headers
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      next();
    });
  }

  private setupRoutes(): void {
    // Health check (no auth required)
    this.app.use('/health', healthRoutes);

    // Public routes
    this.app.use('/api/v1/auth', authRoutes);

    // Protected routes
    this.app.use('/api/v1', authMiddleware);

    // Service routes (will be added as services are built)
    this.app.use('/api/v1/messaging', (req: Request, res: Response) => {
      res.json({ status: 'Messaging service coming soon' });
    });

    this.app.use('/api/v1/presence', (req: Request, res: Response) => {
      res.json({ status: 'Presence service coming soon' });
    });

    this.app.use('/api/v1/notifications', (req: Request, res: Response) => {
      res.json({ status: 'Notifications service coming soon' });
    });

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} does not exist`,
        path: req.path,
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  async start(port: number = 3000): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        logger.info(`🚀 Gateway running on port ${port}`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server) {
        this.server.close((err) => {
          if (err) reject(err);
          else {
            logger.info('Gateway stopped');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  getApp(): Express {
    return this.app;
  }
}

export default Gateway;
