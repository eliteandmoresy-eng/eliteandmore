import React from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-20 px-8 text-center',
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-dim flex items-center justify-center text-elite-muted">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="font-cairo font-bold text-xl text-elite-text">{title}</h3>
        {subtitle && (
          <p className="text-elite-muted text-sm font-tajawal max-w-sm">{subtitle}</p>
        )}
      </div>
      {actionLabel && (onAction || actionHref) && (
        <Button
          variant="primary"
          onClick={onAction}
          href={actionHref}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
