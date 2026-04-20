'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'elite-bar-hidden';

const messages = [
  '🚚 شحن لكل المحافظات السورية',
  '💳 الدفع عند الاستلام متاح',
  '✅ منتجات أصلية 100% مضمونة',
  '📲 دفع شام كاش متاح',
];

export default function TopAnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  // Rotate messages on mobile every 3 seconds
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % messages.length), 3000);
    return () => clearInterval(id);
  }, [visible]);

  const hide = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-gold text-primary-dark relative overflow-hidden shadow-md" style={{ minHeight: '36px' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 pointer-events-none" />

      {/* ── Mobile: single rotating message ── */}
      <div className="md:hidden flex items-center justify-between px-3 h-9 relative z-10">
        <div className="flex-1 text-center">
          <span
            key={current}
            className="font-tajawal text-[11px] font-black animate-fade-in inline-block uppercase tracking-tight"
          >
            {messages[current]}
          </span>
        </div>
        <button
          onClick={hide}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors ml-1"
          aria-label="إخفاء"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Desktop: marquee ── */}
      <div className="hidden md:flex items-center justify-between h-9 px-4 relative z-10">
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] inline-block font-tajawal text-xs font-black uppercase tracking-widest">
            {[...messages, ...messages].join('\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0')}
          </div>
        </div>
        <button
          onClick={hide}
          className="mr-4 flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="إخفاء الشريط"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
