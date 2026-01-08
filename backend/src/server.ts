import { env } from './config/env';
import { logger } from './utils/logger';
import { buildApp } from './app';

const app = buildApp();

if (process.env.NODE_ENV !== 'production') {
  app.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });
}

export default app;
