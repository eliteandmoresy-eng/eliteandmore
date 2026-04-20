import { cn } from '@/lib/utils';

interface BadgeProps {
  label?: string;
  children?: React.ReactNode;
  variant?: 'success' | 'danger' | 'blue' | 'gray' | 'gold' | 'custom';
  color?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  label, 
  children, 
  variant = 'custom', 
  color = '#6B2D8A', 
  size = 'md', 
  className 
}: BadgeProps) {
  const variants = {
    success: 'bg-green-50 text-green-700 border-green-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    gray: 'bg-surface-dim text-elite-muted border-elite-border',
    gold: 'bg-gold/10 text-gold-dark border-gold/20',
    custom: '',
  };

  const style = variant === 'custom' ? { backgroundColor: color, color: '#fff' } : {};

  return (
    <span
      style={style}
      className={cn(
        'inline-flex items-center font-bold font-tajawal rounded-lg border leading-none',
        size === 'sm' ? 'text-[10px] px-2 py-1' : 'text-xs px-2.5 py-1',
        variants[variant],
        className
      )}
    >
      {children || label}
    </span>
  );
}

