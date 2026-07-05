import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express from 'express';
import request from 'supertest';
import Gateway from '../src/gateway';

describe('Gateway', () => {
  let gateway: Gateway;
  let app: any;

  beforeAll(() => {
    gateway = new Gateway();
    app = gateway.getApp();
  });

  afterAll(async () => {
    await gateway.stop();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
    });
  });

  describe('Auth Routes', () => {
    it('should return 400 for signup without required fields', async () => {
      const response = await request(app).post('/api/v1/auth/signup').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for login without required fields', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({});
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('CORS', () => {
    it('should handle CORS preflight requests', async () => {
      const response = await request(app)
        .options('/api/v1/auth/login')
        .set('Origin', 'http://localhost:3000');

      expect(response.status).toBe(200);
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/v1/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Not Found');
    });
  });
});
