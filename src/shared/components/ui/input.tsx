/**
 * Input component with label, error, and helper text support
 * Built with Radix UI primitives and Tailwind CSS
 */

import { cn } from '@/lib/utils';
import * as React from 'react';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, label, error, helperText, required, id, ...props }, ref) => {
    const inputId = React.useId();
    const finalId = id || inputId;
    const errorId = `${finalId}-error`;
    const helperId = `${finalId}-helper`;

    return (
      <div className='space-y-2'>
        {label && (
          <label
            htmlFor={finalId}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
            {required && <span className='text-destructive ml-1'>*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          ref={ref}
          id={finalId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className='text-sm text-destructive' role='alert'>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className='text-sm text-muted-foreground'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
