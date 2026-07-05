import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}`, { status, path: req.path, stack: err.stack });

  res.status(status).json({
    error: true,
    status,
    message,
    code: err.code,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
