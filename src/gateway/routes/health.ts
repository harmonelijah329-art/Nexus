import { Router, Request, Response } from 'express';
import db from '../../core/storage/database';
import redis from '../../core/cache';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const dbHealthy = await checkDatabase();
    const cacheHealthy = await checkCache();

    const status = dbHealthy && cacheHealthy ? 200 : 503;
    const healthy = dbHealthy && cacheHealthy;

    res.status(status).json({
      status: healthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealthy ? 'connected' : 'disconnected',
      cache: cacheHealthy ? 'connected' : 'disconnected',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: 'Health check failed',
    });
  }
});

async function checkDatabase(): Promise<boolean> {
  try {
    const client = await db.getClient();
    const result = await client.query('SELECT NOW()');
    return !!result.rows;
  } catch {
    return false;
  }
}

async function checkCache(): Promise<boolean> {
  try {
    const client = await redis.getClient();
    await client.ping();
    return true;
  } catch {
    return false;
  }
}

export default router;
