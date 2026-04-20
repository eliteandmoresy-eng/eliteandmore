'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, required, options, placeholder, className, id, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'w-full appearance-none border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white',
              'transition-all duration-200 cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary',
              error
                ? 'border-[#EF4444] focus:ring-red-200 focus:border-[#EF4444]'
                : 'border-elite-border hover:border-primary-200',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-elite-muted pointer-events-none" />
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

Select.displayName = 'Select';
export default Select;
