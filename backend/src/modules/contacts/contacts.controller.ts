import type { Request, Response } from 'express';

import type { ContactsService } from './contacts.service';

export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.contactsService.getContacts();

    return res.status(200).json({
      data: result,
    });
  };
}
