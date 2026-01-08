import type { DocumentFormValues } from '../api/documents';

export function validateForm(values: DocumentFormValues): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (!values.whatsappNumber.trim()) {
    errors.whatsappNumber = 'WhatsApp number is required';
  }
  
  if (!values.referenceId.trim()) {
    errors.referenceId = 'Reference ID is required';
  }
  
  if (!Number.isFinite(values.amount) || values.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
