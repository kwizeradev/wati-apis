import { z } from 'zod';

import { http } from './http';

export const documentFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.').max(80),
  whatsappNumber: z
    .string()
    .min(6, 'WhatsApp number is required.')
    .max(20)
    .regex(/^[0-9]+$/, 'Use digits only and include country code.'),
  referenceId: z.string().min(2, 'Reference ID is required.').max(50),
  amount: z.coerce.number().positive('Amount must be greater than 0.'),
  description: z.string().min(3, 'Description is required.').max(1000),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;

export type SendDocumentResponse = {
  data: {
    referenceId: string;
    status: 'sent';
  };
};

export async function sendDocument(values: DocumentFormValues): Promise<SendDocumentResponse> {
  const response = await http.post('/api/documents/send', values);
  return response.data as SendDocumentResponse;
}
