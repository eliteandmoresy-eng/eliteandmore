'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, icon, className, id, ...props }, ref) => {
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
        <div className="relative group">
          {icon && (
            <div className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 transition-colors",
              error ? "text-red-400" : "text-elite-muted/50 group-focus-within:text-gold"
            )}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full border rounded-xl py-2.5 text-sm font-tajawal text-elite-text bg-white',
              'placeholder:text-elite-muted/40',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary',
              icon ? 'pr-12 pl-4' : 'px-4',
              error
                ? 'border-[#EF4444] focus:ring-red-200 focus:border-[#EF4444]'
                : 'border-elite-border hover:border-primary-200',
              className
            )}
            {...props}
          />
        </div>
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

Input.displayName = 'Input';
export default Input;
