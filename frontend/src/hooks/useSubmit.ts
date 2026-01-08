import { useState } from 'react';
import { sendDocument } from '../api/documents';

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; referenceId: string }
  | { status: 'error'; message: string };

export function useSubmit() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const isSubmitting = submitState.status === 'loading';

  const submit = async (data: any) => {
    setSubmitState({ status: 'loading' });

    try {
      const response = await sendDocument(data);
      setSubmitState({ status: 'success', referenceId: response.data.referenceId });
      return { success: true };
    } catch (err) {
      const axiosMessage =
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: unknown }).response === 'object' &&
        (err as { response?: { data?: unknown } }).response?.data &&
        typeof (err as { response?: { data?: { error?: { message?: unknown } } } }).response?.data
          ?.error?.message === 'string'
          ? (err as { response: { data: { error: { message: string } } } }).response.data.error
              .message
          : 'Failed to send WhatsApp message. Check backend logs and WATI credentials.';

      setSubmitState({ status: 'error', message: axiosMessage });
      return { success: false, message: axiosMessage };
    }
  };

  const reset = () => {
    setSubmitState({ status: 'idle' });
  };

  return {
    submitState,
    isSubmitting,
    submit,
    reset,
  };
}
