'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GovernorateEntry {
  governorate_id: string;
  is_available: boolean;
  governorate?: {
    id: string;
    name: string;
    is_active: boolean;
  };
}

interface GovernorateAvailabilityProps {
  productGovernorates: GovernorateEntry[];
}

export default function GovernorateAvailability({ productGovernorates }: GovernorateAvailabilityProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  const activeEntries = (productGovernorates || []).filter(
    (g) => g.governorate?.is_active === true
  );

  if (activeEntries.length === 0) {
    return (
      <p className="text-sm text-elite-muted font-tajawal">
        تواصل معنا للاستفسار عن التوفر في منطقتك
      </p>
    );
  }

  const selected = activeEntries.find((g) => g.governorate_id === selectedId);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-elite-muted font-tajawal">التوفر في محافظتك</p>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className={cn(
          'w-full border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white',
          'border-elite-border hover:border-primary-200 transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary cursor-pointer'
        )}
      >
        <option value="">اختر محافظتك</option>
        {activeEntries.map((entry) => (
          <option key={entry.governorate_id} value={entry.governorate_id}>
            {entry.governorate?.name}
          </option>
        ))}
      </select>

      {selected && (
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-tajawal font-semibold',
            selected.is_available
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          )}
        >
          {selected.is_available ? (
            <span>✓ متوفر في {selected.governorate?.name}</span>
          ) : (
            <span>✗ غير متوفر في {selected.governorate?.name}</span>
          )}
        </div>
      )}
    </div>
  );
}
