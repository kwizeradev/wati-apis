import { z } from 'zod';
import type { ZodIssue } from 'zod';

import { ValidationError } from '../../utils/errors';

import type { CreateDocumentRequestDto } from './documents.types';

const whatsappNumberSchema = z
  .string()
  .min(6)
  .max(20)
  .regex(/^[0-9]+$/, 'WhatsApp number must contain digits only (include country code).');

const createDocumentSchema = z.object({
  fullName: z.string().min(2).max(80),
  whatsappNumber: whatsappNumberSchema,
  description: z.string().min(3).max(1000),
  referenceId: z.string().min(2).max(50),
  amount: z.coerce.number().positive().max(10_000_000),
});

export function validateCreateDocumentRequest(input: unknown): CreateDocumentRequestDto {
  const result = createDocumentSchema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues
      .map((issue: ZodIssue) => issue.message)
      .join(' ');
    throw new ValidationError(message);
  }

  return result.data;
}
