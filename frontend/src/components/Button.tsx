import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  variant = 'primary', 
  loading = false, 
  icon, 
  className = '', 
  disabled,
  ...props 
}: ButtonProps) {
  const baseClass = 'button';
  const variantClass = variant === 'secondary' ? 'secondary' : '';
  const combinedClassName = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="spin" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
}
