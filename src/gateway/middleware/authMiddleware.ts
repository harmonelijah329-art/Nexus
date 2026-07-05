import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../core/security/jwt';
import logger from '../../utils/logger';

interface AuthRequest extends Request {
  user?: any;
  token?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);

    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    logger.warn('Auth middleware error', { error });
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
    });
  }
}
