export function extractFieldErrors(message: unknown): Record<string, string> {
  if (!message) return {};
  return {};
}

export function extractAxiosErrorMessage(err: unknown): string {
  if (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    typeof (err as { response?: unknown }).response === 'object' &&
    (err as { response?: { data?: unknown } }).response?.data &&
    typeof (err as { response?: { data?: { error?: { message?: unknown } } } }).response?.data
      ?.error?.message === 'string'
  ) {
    return (err as { response: { data: { error: { message: string } } } }).response.data.error
      .message;
  }
  
  return 'Failed to send WhatsApp message. Check backend logs and WATI credentials.';
}
