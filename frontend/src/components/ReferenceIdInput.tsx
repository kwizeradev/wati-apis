import { RefreshCw } from 'lucide-react';
import { generateReferenceId } from '../utils/referenceId';

interface ReferenceIdInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function ReferenceIdInput({ value, onChange, disabled, error }: ReferenceIdInputProps) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="INV-2026-0001"
        disabled={disabled}
        style={{ flex: 1 }}
      />
      <button
        type="button"
        className="button secondary"
        onClick={() => onChange(generateReferenceId())}
        disabled={disabled}
        style={{ padding: '12px 16px' }}
      >
        <RefreshCw size={16} />
      </button>
    </div>
  );
}
