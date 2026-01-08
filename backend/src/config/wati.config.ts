import { env } from './env';

export const watiConfig = {
  baseUrl: env.WATI_BASE_URL,
  token: env.WATI_TOKEN,
  tenantId: env.WATI_TENANT_ID,
} as const;
