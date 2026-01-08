import { Loader2, Send } from 'lucide-react';

interface FormActionsProps {
  isSubmitting: boolean;
  canSubmit: boolean;
  onReset: () => void;
  onSubmit: () => void;
}

export function FormActions({ isSubmitting, canSubmit, onReset, onSubmit }: FormActionsProps) {
  return (
    <div className="actions">
      <button
        type="button"
        className="button secondary"
        onClick={onReset}
        disabled={isSubmitting}
      >
        Reset
      </button>
      <button
        type="button"
        className="button"
        onClick={onSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        Send PDF
      </button>
    </div>
  );
}
