import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'warn' : 'info';

    logger[level as 'info' | 'warn'](
      `[${req.method}] ${req.path} - ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}
