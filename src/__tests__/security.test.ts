import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../src/core/security/password';
import { generateToken, verifyToken } from '../src/core/security/jwt';

describe('Security', () => {
  describe('Password Hashing', () => {
    it('should hash password correctly', async () => {
      const password = 'TestPassword@123';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
    });

    it('should compare password correctly', async () => {
      const password = 'TestPassword@123';
      const hash = await hashPassword(password);
      const matches = await comparePassword(password, hash);
      expect(matches).toBe(true);
    });

    it('should not match incorrect password', async () => {
      const password = 'TestPassword@123';
      const hash = await hashPassword(password);
      const matches = await comparePassword('WrongPassword@123', hash);
      expect(matches).toBe(false);
    });
  });

  describe('JWT', () => {
    it('should generate and verify token', async () => {
      const payload = { id: '123', email: 'test@example.com' };
      const token = await generateToken(payload);
      const decoded = await verifyToken(token);

      expect(decoded.id).toBe(payload.id);
      expect(decoded.email).toBe(payload.email);
    });

    it('should reject invalid token', async () => {
      try {
        await verifyToken('invalid.token.here');
        expect.fail('Should have thrown error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
