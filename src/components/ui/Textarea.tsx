'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, className, id, rows = 3, ...props }, ref) => {
    const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-elite-text font-tajawal"
          >
            {label}
            {required && <span className="text-[#EF4444] mr-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={cn(
            'w-full border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white resize-y',
            'placeholder:text-elite-muted/60',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary',
            error
              ? 'border-[#EF4444] focus:ring-red-200 focus:border-[#EF4444]'
              : 'border-elite-border hover:border-primary-200',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-elite-muted font-tajawal">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-[#EF4444] font-tajawal">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
