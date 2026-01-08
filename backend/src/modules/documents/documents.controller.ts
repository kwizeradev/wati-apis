import type { Request, Response } from 'express';

import { DocumentsService } from './documents.service';
import { validateCreateDocumentRequest } from './documents.validator';

export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  createAndSend = async (req: Request, res: Response) => {
    const dto = validateCreateDocumentRequest(req.body);

    const result = await this.documentsService.createPdfAndSend(dto);

    return res.status(201).json({
      data: {
        referenceId: result.referenceId,
        status: 'sent',
      },
    });
  };
}
