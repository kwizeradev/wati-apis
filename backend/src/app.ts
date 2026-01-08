import cors from 'cors';
import express from 'express';
import type { Request, Response } from 'express';

import { env } from './config/env';
import { buildDocumentsRouter } from './modules/documents/documents.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export function buildApp() {
  const app = express();

  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN ?? true,
    }),
  );

  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req: Request, res: Response) => res.status(200).json({ status: 'ok' }));

  app.use('/api/documents', buildDocumentsRouter());

  app.use(errorMiddleware);

  return app;
}
