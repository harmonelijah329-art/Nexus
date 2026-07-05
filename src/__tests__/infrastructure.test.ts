import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import database from '../src/core/storage/database';
import cache from '../src/core/cache';

describe('Infrastructure Health Checks', () => {
  describe('Database', () => {
    it('should connect to database', async () => {
      try {
        const result = await database.query('SELECT NOW()');
        expect(result.rows).toBeDefined();
        expect(result.rows.length).toBeGreaterThan(0);
      } catch (error) {
        throw new Error('Database connection failed');
      }
    });

    it('should have users table', async () => {
      const result = await database.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_name = 'users'
      `);
      expect(result.rows.length).toBeGreaterThan(0);
    });

    it('should have test user', async () => {
      const result = await database.query(
        `SELECT * FROM users WHERE email = $1`,
        ['test@nexus.dev']
      );
      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.rows[0].email).toBe('test@nexus.dev');
    });
  });

  describe('Cache', () => {
    it('should connect to Redis', async () => {
      try {
        const client = await cache.getClient();
        const response = await client.ping();
        expect(response).toBe('PONG');
      } catch (error) {
        throw new Error('Redis connection failed');
      }
    });

    it('should set and get cache values', async () => {
      const client = await cache.getClient();
      await client.set('test_key', 'test_value');
      const value = await client.get('test_key');
      expect(value).toBe('test_value');
      await client.del('test_key');
    });
  });
});
