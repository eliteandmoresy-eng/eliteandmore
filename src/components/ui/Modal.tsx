'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={cn(
          'relative w-full bg-white sm:rounded-2xl rounded-t-2xl shadow-card-hover animate-scale-in',
          maxWidth
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-elite-border">
            <h2 className="font-cairo font-bold text-base md:text-lg text-elite-text">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-elite-muted hover:text-elite-text hover:bg-surface-dim transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={cn('overflow-y-auto max-h-[85vh]', title ? 'p-4 md:p-5' : 'p-4 md:p-5')}>
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-1.5 rounded-lg text-elite-muted hover:text-elite-text hover:bg-surface-dim transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
