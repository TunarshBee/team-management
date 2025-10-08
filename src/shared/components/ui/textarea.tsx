/**
 * Textarea component with label, error, and helper text support
 * Built with Radix UI primitives and Tailwind CSS
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	helperText?: string;
	required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ className, label, error, helperText, required, id, ...props }, ref) => {
		const textareaId = id || React.useId();
		const errorId = `${textareaId}-error`;
		const helperId = `${textareaId}-helper`;

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={textareaId}
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{label}
						{required && <span className="text-destructive ml-1">*</span>}
					</label>
				)}
				<textarea
					className={cn(
						'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
						error && 'border-destructive focus-visible:ring-destructive',
						className
					)}
					ref={ref}
					id={textareaId}
					aria-invalid={!!error}
					aria-describedby={error ? errorId : helperText ? helperId : undefined}
					{...props}
				/>
				{error && (
					<p id={errorId} className="text-sm text-destructive" role="alert">
						{error}
					</p>
				)}
				{helperText && !error && (
					<p id={helperId} className="text-sm text-muted-foreground">
						{helperText}
					</p>
				)}
			</div>
		);
	}
);
Textarea.displayName = 'Textarea';

export { Textarea };
