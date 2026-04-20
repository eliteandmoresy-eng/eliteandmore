'use client';
import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export default function Switch({ checked, onChange, label, size = 'md', disabled = false }: SwitchProps) {
  const trackSizes = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
  };
  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
  };
  const thumbTranslate = {
    sm: checked ? 'translate-x-[-16px]' : 'translate-x-0',
    md: checked ? 'translate-x-[-20px]' : 'translate-x-0',
  };

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2.5 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={cn(
            'rounded-full transition-colors duration-200',
            trackSizes[size],
            checked ? 'bg-primary' : 'bg-elite-border'
          )}
        />
        <div
          className={cn(
            'absolute top-0.5 right-0.5 bg-white rounded-full shadow-sm transition-transform duration-200',
            thumbSizes[size],
            thumbTranslate[size]
          )}
        />
      </div>
      {label && (
        <span className="text-sm font-tajawal text-elite-text">{label}</span>
      )}
    </label>
  );
}
