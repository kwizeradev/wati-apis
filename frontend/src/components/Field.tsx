import type { ReactNode } from 'react';

type FieldProps = {
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
};

export function Field(props: FieldProps) {
  return (
    <div className="field">
      <div className="label">{props.label}</div>
      {props.children}
      {props.error ? (
        <div className="helper" style={{ color: 'var(--danger)' }}>
          {props.error}
        </div>
      ) : props.hint ? (
        <div className="helper">{props.hint}</div>
      ) : null}
    </div>
  );
}
