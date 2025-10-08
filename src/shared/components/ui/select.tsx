/**
 * Select component with label, error, and helper text support
 * Built with Radix UI Select primitive and Tailwind CSS
 */

import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

export interface ISelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id?: string;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, ISelectProps>(
  (
    {
      className,
      options,
      value,
      onValueChange,
      placeholder = 'Select an option...',
      disabled,
      label,
      error,
      helperText,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();
    const finalId = id || selectId;
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
        <SelectPrimitive.Root
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          {...props}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
              error && 'border-destructive focus:ring-destructive',
              className
            )}
            id={finalId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className='h-4 w-4 opacity-50' />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className='relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
              position='popper'
            >
              <SelectPrimitive.ScrollUpButton className='flex cursor-default items-center justify-center py-1'>
                <ChevronUp className='h-4 w-4' />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className='h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className='relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                  >
                    <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
                      <SelectPrimitive.ItemIndicator>
                        <Check className='h-4 w-4' />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className='flex cursor-default items-center justify-center py-1'>
                <ChevronDown className='h-4 w-4' />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
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
Select.displayName = 'Select';

export { Select };
