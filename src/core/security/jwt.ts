import jwt from 'jsonwebtoken';
import logger from '../../utils/logger';

const SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const EXPIRY = process.env.JWT_EXPIRY || '7d';

export async function generateToken(payload: any): Promise<string> {
  try {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
  } catch (error) {
    logger.error('Token generation failed:', error);
    throw error;
  }
}

export async function verifyToken(token: string): Promise<any> {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw error;
  }
}

export async function decodeToken(token: string): Promise<any> {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.error('Token decode failed:', error);
    throw error;
  }
}
