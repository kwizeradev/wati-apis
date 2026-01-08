import type { DocumentFormValues } from '../api/documents';

export type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; referenceId: string }
  | { status: 'error'; message: string };

export type FieldErrors = Partial<Record<keyof DocumentFormValues, string>>;
