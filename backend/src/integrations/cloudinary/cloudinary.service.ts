import { Readable } from 'stream';

import cloudinary from './cloudinary.config';
import { IntegrationError } from '../../utils/errors';

export type UploadPdfOptions = {
  fileBuffer: Buffer;
  fileName: string;
  publicId?: string;
};

export type UploadPdfResult = {
  secureUrl: string;
  publicId: string;
};

export async function uploadPdfToCloudinary(options: UploadPdfOptions): Promise<UploadPdfResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: options.publicId || options.fileName.replace('.pdf', ''),
        folder: 'wati-documents',
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(new IntegrationError('Failed to upload PDF to Cloudinary'));
        } else if (result) {
          resolve({
            secureUrl: result.secure_url,
            publicId: result.public_id,
          });
        }
      },
    );

    const readable = Readable.from([options.fileBuffer]);
    readable.pipe(uploadStream);
  });
}
