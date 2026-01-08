import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert } from './Alert';

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; referenceId: string }
  | { status: 'error'; message: string };

interface FormStatusProps {
  submitState: SubmitState;
}

export function FormStatus({ submitState }: FormStatusProps) {
  if (submitState.status === 'success') {
    return (
      <Alert
        variant="success"
        title="Delivered"
        icon={<CheckCircle2 size={18} color="var(--success)" />}
      >
        Reference ID <span style={{ color: 'var(--muted)' }}>{submitState.referenceId}</span> was
        processed. The recipient should receive the PDF on WhatsApp.
      </Alert>
    );
  }

  if (submitState.status === 'error') {
    return (
      <Alert
        variant="error"
        title="Request failed"
        icon={<AlertTriangle size={18} color="var(--danger)" />}
      >
        {submitState.message}
      </Alert>
    );
  }

  return null;
}
