'use client';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export default function Checkbox({ checked, onChange, label, id, disabled, className }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-2.5 cursor-pointer select-none font-tajawal',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex-shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer appearance-none w-5 h-5 rounded border-2 border-elite-border bg-white checked:bg-primary checked:border-primary transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <svg
          className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 10l3.5 3.5L15 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && (
        <span className="text-sm text-elite-text">{label}</span>
      )}
    </label>
  );
}
