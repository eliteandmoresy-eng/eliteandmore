'use client';
import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  full?: boolean;
  icon?: React.ReactNode;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-900 shadow-sm hover:shadow-md',
  gold:
    'bg-gold text-primary-dark font-bold hover:bg-gold-dark active:bg-gold-dark shadow-sm hover:shadow-md',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary-50 active:bg-primary-100',
  ghost:
    'text-primary bg-transparent hover:bg-primary-50 active:bg-primary-100',
  danger:
    'bg-[#EF4444] text-white hover:bg-red-600 active:bg-red-700 shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-xl gap-1.5',
  md: 'text-base px-5 py-2.5 rounded-xl gap-2',
  lg: 'text-lg px-7 py-3.5 rounded-2xl gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  full = false,
  icon,
  href,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-tajawal font-semibold transition-all duration-200 cursor-pointer select-none',
    variantStyles[variant],
    sizeStyles[size],
    full && 'w-full',
    (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="animate-spin w-4 h-4 flex-shrink-0" />}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={base}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}
