import bcryptjs from 'bcryptjs';
import logger from '../../utils/logger';

const ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');

export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcryptjs.hash(password, ROUNDS);
  } catch (error) {
    logger.error('Password hashing failed:', error);
    throw error;
  }
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    logger.error('Password comparison failed:', error);
    throw error;
  }
}
