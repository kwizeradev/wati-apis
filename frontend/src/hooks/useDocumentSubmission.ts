import { useState } from 'react';
import { sendDocument } from '../api/documents';
import { documentFormSchema } from '../api/documents';
import type { DocumentFormValues } from '../api/documents';
import type { SubmitState } from '../types';
import { extractAxiosErrorMessage, extractFieldErrors } from '../utils/errors';

export function useDocumentSubmission() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  const submitDocument = async (values: DocumentFormValues) => {
    setSubmitState({ status: 'idle' });

    const validation = documentFormSchema.safeParse(values);
    if (!validation.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string') {
          nextErrors[key] = issue.message;
        }
      }
      setSubmitState({ status: 'error', message: 'Please fix the highlighted fields.' });
      return { success: false, errors: nextErrors };
    }

    setSubmitState({ status: 'loading' });

    try {
      const response = await sendDocument(validation.data);
      setSubmitState({ status: 'success', referenceId: response.data.referenceId });
      return { success: true, errors: {} };
    } catch (err) {
      const errorMessage = extractAxiosErrorMessage(err);
      setSubmitState({ status: 'error', message: errorMessage });
      return { success: false, errors: extractFieldErrors(err) };
    }
  };

  const resetSubmitState = () => {
    setSubmitState({ status: 'idle' });
  };

  return {
    submitState,
    isSubmitting: submitState.status === 'loading',
    submitDocument,
    resetSubmitState,
  };
}
