import { useMemo, useState } from 'react';
import { documentFormSchema } from '../api/documents';
import type { DocumentFormValues } from '../api/documents';

export function useForm() {
  const [values, setValues] = useState<DocumentFormValues>({
    fullName: '',
    whatsappNumber: '',
    referenceId: '',
    amount: 0,
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DocumentFormValues, string>>>({});

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

  const updateValue = (field: keyof DocumentFormValues, value: string | number) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const validation = documentFormSchema.safeParse(values);
    if (!validation.success) {
      const nextErrors: Partial<Record<keyof DocumentFormValues, string>> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string') {
          (nextErrors as Record<string, string>)[key] = issue.message;
        }
      }
      setErrors(nextErrors);
      return { success: false, errors: nextErrors };
    }
    setErrors({});
    return { success: true };
  };

  const resetForm = () => {
    setValues({
      fullName: '',
      whatsappNumber: '',
      referenceId: '',
      amount: 0,
      description: '',
    });
    setErrors({});
  };

  return {
    values,
    errors,
    canSubmit,
    updateValue,
    validateForm,
    resetForm,
  };
}
