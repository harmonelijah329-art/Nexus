import { Pool, PoolClient } from 'pg';
import logger from '../utils/logger';

class Database {
  private pool: Pool | null = null;

  async initialize(): Promise<void> {
    try {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        min: parseInt(process.env.DATABASE_POOL_MIN || '2'),
        max: parseInt(process.env.DATABASE_POOL_MAX || '10'),
      });

      // Test connection
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();

      logger.info('✅ Database connected successfully');
    } catch (error) {
      logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  async getClient(): Promise<PoolClient> {
    if (!this.pool) {
      throw new Error('Database not initialized');
    }
    return this.pool.connect();
  }

  async query(text: string, params?: any[]) {
    if (!this.pool) {
      throw new Error('Database not initialized');
    }
    return this.pool.query(text, params);
  }

  async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      logger.info('Database pool closed');
    }
  }
}

export default new Database();
