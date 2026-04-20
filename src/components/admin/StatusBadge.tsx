import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export default function StatusBadge({
  active,
  activeLabel = 'فعّال',
  inactiveLabel = 'معطّل',
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'px-2.5 py-1 rounded-full text-xs font-medium font-tajawal',
        active
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-700'
      )}
    >
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
