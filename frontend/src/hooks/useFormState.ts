import { useState } from 'react';
import type { DocumentFormValues } from '../api/documents';
import { FIXED_WHATSAPP_NUMBER } from '../constants';
import type { SubmitState, FieldErrors } from '../types';
import { validateForm } from '../utils/validation';

export function useFormState() {
  const [values, setValues] = useState<DocumentFormValues>({
    fullName: '',
    whatsappNumber: FIXED_WHATSAPP_NUMBER,
    referenceId: '',
    amount: 0,
    description: '',
  });

  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});

  const updateValue = (field: keyof DocumentFormValues, value: string | number) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setValues({
      fullName: '',
      whatsappNumber: FIXED_WHATSAPP_NUMBER,
      referenceId: '',
      amount: 0,
      description: '',
    });
    setErrors({});
    setSubmitState({ status: 'idle' });
  };

  const validateAndUpdateErrors = () => {
    const validation = validateForm(values);
    setErrors(validation.errors);
    return validation.isValid;
  };

  return {
    values,
    submitState,
    errors,
    isSubmitting: submitState.status === 'loading',
    updateValue,
    resetForm,
    setSubmitState,
    validateAndUpdateErrors,
  };
}
