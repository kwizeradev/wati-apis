import React from 'react';
import { Field } from './Field';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { ReferenceIdField } from './ReferenceIdField';

interface DocumentFormProps {
  values: {
    fullName: string;
    whatsappNumber: string;
    referenceId: string;
    amount: number;
    description: string;
  };
  errors: {
    fullName?: string;
    whatsappNumber?: string;
    referenceId?: string;
    amount?: string;
    description?: string;
  };
  onChange: (field: string, value: string | number) => void;
  disabled?: boolean;
}

export function DocumentForm({ values, errors, onChange, disabled }: DocumentFormProps) {
  return (
    <div className="grid">
      <Field label="Full Name" error={errors.fullName}>
        <Input
          value={values.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="John Doe"
          disabled={disabled}
        />
      </Field>

      <Field label="WhatsApp Number" error={errors.whatsappNumber}>
        <Input value={values.whatsappNumber} disabled />
      </Field>

      <div className="grid-two-columns">
        <ReferenceIdField
          value={values.referenceId}
          onChange={(value) => onChange('referenceId', value)}
          error={errors.referenceId}
          disabled={disabled}
        />

        <Field label="Amount" error={errors.amount}>
          <Input
            value={String(values.amount)}
            onChange={(e) => onChange('amount', Number(e.target.value))}
            placeholder="100"
            inputMode="decimal"
            disabled={disabled}
          />
        </Field>
      </div>

      <Field label="Description" error={errors.description}>
        <Textarea
          value={values.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="What is this document about?"
          disabled={disabled}
        />
      </Field>
    </div>
  );
}
