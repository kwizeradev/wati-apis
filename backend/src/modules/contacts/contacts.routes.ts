import { Router } from 'express';

import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

export function buildContactsRouter(): Router {
  const router = Router();

  const service = new ContactsService();
  const controller = new ContactsController(service);

  router.get('/', (req, res, next) => {
    controller.getAll(req, res).catch(next);
  });

  return router;
}
