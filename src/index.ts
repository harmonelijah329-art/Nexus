import express from 'express';
import logger from './utils/logger';
import Gateway from './gateway';
import database from './core/storage/database';
import cache from './core/cache';

const PORT = parseInt(process.env.PORT || '3000');

async function bootstrap(): Promise<void> {
  try {
    logger.info('🚀 Starting Nexus Platform...');

    // Initialize core infrastructure
    logger.info('Initializing core infrastructure...');
    await database.initialize();
    await cache.initialize();

    // Start gateway
    const gateway = new Gateway();
    await gateway.start(PORT);

    logger.info(`✨ Nexus Platform ready on http://localhost:${PORT}`);
    logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
    logger.info(`📚 API docs: http://localhost:${PORT}/api/v1/docs`);
  } catch (error) {
    logger.error('Failed to start Nexus Platform:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  await cache.close();
  await database.close();
  process.exit(0);
});

bootstrap();
