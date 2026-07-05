import { Request, Response, NextFunction } from 'express';
import { Redis } from 'redis';
import redis from '../../core/cache';

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100;

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const identifier = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `rate_limit:${identifier}`;

    const client = await redis.getClient();
    const current = await client.get(key);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= RATE_LIMIT_MAX_REQUESTS) {
      res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: RATE_LIMIT_WINDOW / 1000,
      });
      return;
    }

    await client.setEx(key, Math.ceil(RATE_LIMIT_WINDOW / 1000), String(count + 1));

    res.setHeader('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', RATE_LIMIT_MAX_REQUESTS - (count + 1));
    res.setHeader('X-RateLimit-Reset', new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString());

    next();
  } catch (error) {
    // If rate limiter fails, allow request to proceed
    next();
  }
}
