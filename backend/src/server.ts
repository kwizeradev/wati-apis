import { env } from './config/env';
import { logger } from './utils/logger';
import { buildApp } from './app';

const app = buildApp();

app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});
