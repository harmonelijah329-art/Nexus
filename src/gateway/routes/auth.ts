import { Router, Request, Response } from 'express';
import logger from '../../utils/logger';

const router = Router();

interface SignupBody {
  email: string;
  password: string;
  name: string;
}

interface LoginBody {
  email: string;
  password: string;
}

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body as SignupBody;

    if (!email || !password || !name) {
      res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'name'],
      });
      return;
    }

    logger.info(`Signup attempt for ${email}`);

    // Auth service will be implemented next
    res.json({
      message: 'Signup endpoint - service implementation pending',
    });
  } catch (error) {
    logger.error('Signup error', { error });
    res.status(500).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    if (!email || !password) {
      res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password'],
      });
      return;
    }

    logger.info(`Login attempt for ${email}`);

    // Auth service will be implemented next
    res.json({
      message: 'Login endpoint - service implementation pending',
    });
  } catch (error) {
    logger.error('Login error', { error });
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
