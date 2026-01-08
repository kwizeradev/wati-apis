import { watiSendTemplate } from './wati.client';
import { uploadPdfToCloudinary } from '../cloudinary/cloudinary.service';
import { env } from '../../config/env';

import type { WatiSendTemplateResponse } from './wati.types';

export type SendPdfOptions = {
  whatsappNumber: string;
  fileName: string;
  fileBuffer: Buffer;
  caption?: string;
};

export async function sendPdfViaWati(
  options: SendPdfOptions & { fullName: string },
): Promise<WatiSendTemplateResponse> {
  const { secureUrl } = await uploadPdfToCloudinary({
    fileBuffer: options.fileBuffer,
    fileName: options.fileName,
  });

  return watiSendTemplate({
    whatsappNumber: options.whatsappNumber,
    template_name: env.WATI_TEMPLATE_NAME,
    broadcast_name: env.WATI_BROADCAST_NAME,
    parameters: [
      {
        "name": 'PDF_FILE',
        "value": secureUrl,
      },
      {
        "name": 'name',
        "value": options.fullName,
      },
    ],
  });
}