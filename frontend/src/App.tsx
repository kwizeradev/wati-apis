import { useForm } from './hooks/useForm';
import { useSubmit } from './hooks/useSubmit';
import { useEffect } from 'react';
import { Field } from './components/Field';
import { ReferenceIdInput } from './components/ReferenceIdInput';
import { FormActions } from './components/FormActions';
import { FormStatus } from './components/FormStatus';

export function App() {
  const { values, errors, canSubmit, updateValue, validateForm, resetForm } = useForm();
  const { submitState, isSubmitting, submit, reset: resetSubmit } = useSubmit();

  async function onSubmit() {
    resetSubmit();
    
    const validation = validateForm();
    if (!validation.success) {
      return;
    }

    await submit(values);
  }

  const handleReset = () => {
    resetForm();
    resetSubmit();
  };

  useEffect(() => {
    if (submitState.status === 'success') {
      const t = setTimeout(() => {
        resetForm();
        resetSubmit();
      }, 3000);

      return () => clearTimeout(t);
    }
    return undefined;
  }, [submitState.status, resetForm, resetSubmit]);

  return (
    <div className="container">
      <div className="header">
        <div className="brand">
          <div className="brand-title">WhatsApp PDF Delivery</div>
          <p className="brand-subtitle">
            Generate PDF and deliver via WATI template message to any WhatsApp number
          </p>
        </div>
      </div>

      <div className="card">
        <div className="grid">
          <Field label="Full Name" error={errors.fullName}>
            <input
              className="input"
              value={values.fullName}
              onChange={(e) => updateValue('fullName', e.target.value)}
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </Field>

          <Field label="WhatsApp Number" error={errors.whatsappNumber}>
            <input
              className="input"
              value={values.whatsappNumber}
              onChange={(e) => updateValue('whatsappNumber', e.target.value)}
              placeholder="250712345678"
              disabled={isSubmitting}
            />
          </Field>

          <div className="grid-two-columns">
            <Field label="Reference ID" error={errors.referenceId}>
              <ReferenceIdInput
                value={values.referenceId}
                onChange={(value) => updateValue('referenceId', value)}
                disabled={isSubmitting}
                error={errors.referenceId}
              />
            </Field>

            <Field label="Amount" error={errors.amount}>
              <input
                className="input"
                value={String(values.amount)}
                onChange={(e) => updateValue('amount', Number(e.target.value))}
                placeholder="100"
                inputMode="text"
                disabled={isSubmitting}
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              className="textarea"
              value={values.description}
              onChange={(e) => updateValue('description', e.target.value)}
              placeholder="What is this document about?"
              disabled={isSubmitting}
            />
          </Field>
        </div>

        <FormActions
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
          onReset={handleReset}
          onSubmit={onSubmit}
        />

        <FormStatus submitState={submitState} />
      </div>
    </div>
  );
}
