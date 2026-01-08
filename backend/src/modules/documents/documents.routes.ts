import { Router } from 'express';

import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

export function buildDocumentsRouter(): Router {
  const router = Router();

  const service = new DocumentsService();
  const controller = new DocumentsController(service);

  router.post('/send', (req, res, next) => {
    controller.createAndSend(req, res).catch(next);
  });

  return router;
}
