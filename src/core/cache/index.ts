import { createClient } from 'redis';
import logger from '../../utils/logger';

class Cache {
  private client: any = null;

  async initialize(): Promise<void> {
    try {
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      this.client.on('error', (err: any) => logger.error('Redis error:', err));
      this.client.on('connect', () => logger.info('✅ Redis connected'));

      await this.client.connect();
    } catch (error) {
      logger.error('❌ Redis connection failed:', error);
      throw error;
    }
  }

  async getClient() {
    if (!this.client) {
      throw new Error('Cache not initialized');
    }
    return this.client;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      logger.info('Redis connection closed');
    }
  }
}

export default new Cache();
