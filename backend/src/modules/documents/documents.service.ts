import { generateDocumentPdf } from '../../utils/pdf.generator';

import { sendPdfViaWati } from '../../integrations/wati/wati.service';

import type { CreateDocumentRequestDto, DocumentPayload, SendDocumentResult } from './documents.types';

export class DocumentsService {
  async createPdfAndSend(dto: CreateDocumentRequestDto): Promise<SendDocumentResult> {
    const payload: DocumentPayload = {
      ...dto,
      dateIso: new Date().toISOString(),
    };

    const { buffer, fileName } = await generateDocumentPdf(payload);

    await sendPdfViaWati({
      whatsappNumber: payload.whatsappNumber,
      fileName,
      fileBuffer: buffer,
      caption: `Reference ${payload.referenceId}`,
    });

    return { referenceId: payload.referenceId };
  }
}
