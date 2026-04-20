import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-7 h-7 border-2',
  lg: 'w-10 h-10 border-3',
};

export default function Spinner({ size = 'md', color, className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-t-transparent animate-spin',
        sizeMap[size],
        className
      )}
      style={{
        borderColor: color ? `${color} transparent transparent transparent` : '#6B2D8A transparent transparent transparent',
      }}
      role="status"
      aria-label="جارٍ التحميل"
    />
  );
}
