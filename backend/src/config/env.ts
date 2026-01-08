import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  FRONTEND_ORIGIN: z.string().url().optional().or(z.literal('')),
  WATI_BASE_URL: z.string().url(),
  WATI_TOKEN: z.string().min(1),
  WATI_TENANT_ID: z.string().min(1),
  WATI_TEMPLATE_NAME: z.string().min(1),
  WATI_BROADCAST_NAME: z.string().min(1),
  WATI_CHANNEL_NUMBER: z.string().min(1),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
