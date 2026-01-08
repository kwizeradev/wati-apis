import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  }

  logger.error('Unhandled error', { err });

  return res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
}
