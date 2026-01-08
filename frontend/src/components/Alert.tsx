import type { ReactNode } from 'react';

type AlertProps = {
  variant: 'success' | 'error';
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

export function Alert(props: AlertProps) {
  const className =
    props.variant === 'success' ? 'alert alert-success' : 'alert alert-error';

  return (
    <div className={className} role="status">
      <div style={{ marginTop: 2 }}>{props.icon}</div>
      <div>
        <div className="alert-title">{props.title}</div>
        <div className="alert-message">{props.children}</div>
      </div>
    </div>
  );
}
