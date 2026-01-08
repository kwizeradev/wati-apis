export const FIXED_WHATSAPP_NUMBER = '250787533418';

export function generateReferenceId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `INV-${timestamp}-${random}`;
}
