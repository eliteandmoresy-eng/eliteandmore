'use client';
import { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HelpTooltipProps {
  text: string;
  className?: string;
}

export default function HelpTooltip({ text, className }: HelpTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        type="button"
        aria-label="مساعدة"
        onClick={() => setVisible((v) => !v)}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="w-5 h-5 flex items-center justify-center text-elite-muted hover:text-primary transition-colors"
      >
        <Info className="w-4 h-4" />
      </button>

      {visible && (
        <div className="absolute bottom-full end-0 mb-2 z-50 w-64 max-w-64 bg-white shadow-card rounded-xl p-3 text-sm text-elite-muted font-tajawal leading-relaxed">
          {text}
        </div>
      )}
    </div>
  );
}
