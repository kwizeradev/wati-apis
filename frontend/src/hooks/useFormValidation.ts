import { useMemo } from 'react';
import type { DocumentFormValues } from '../api/documents';

export function useFormValidation(values: DocumentFormValues) {
  const canSubmit = useMemo(() => {
    return (
      values.fullName.trim().length > 0 &&
      values.whatsappNumber.trim().length > 0 &&
      values.referenceId.trim().length > 0 &&
      values.description.trim().length > 0 &&
      Number.isFinite(values.amount) &&
      values.amount > 0
    );
  }, [values]);

  return { canSubmit };
}
