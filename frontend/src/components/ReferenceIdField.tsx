import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Field } from './Field';
import { Input } from './Input';
import { Button } from './Button';
import { generateReferenceId } from '../constants';

interface ReferenceIdFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function ReferenceIdField({ value, onChange, error, disabled }: ReferenceIdFieldProps) {
  const handleGenerateId = () => {
    onChange(generateReferenceId());
  };

  return (
    <Field label="Reference ID" error={error}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="INV-2026-0001"
          disabled={disabled}
          style={{ flex: 1 }}
        />
        <Button
          variant="secondary"
          onClick={handleGenerateId}
          disabled={disabled}
          style={{ padding: '12px 16px' }}
        >
          <RefreshCw size={16} />
        </Button>
      </div>
    </Field>
  );
}
