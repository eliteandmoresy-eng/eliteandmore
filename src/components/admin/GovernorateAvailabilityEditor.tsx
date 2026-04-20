'use client';
import { useState, useEffect } from 'react';
import { Governorate } from '@/types';
import Switch from '@/components/ui/Switch';
import Skeleton from '@/components/ui/Skeleton';

interface GovernorateAvailability {
  governorate_id: string;
  is_available: boolean;
}

interface GovernorateAvailabilityEditorProps {
  value: GovernorateAvailability[];
  onChange: (v: GovernorateAvailability[]) => void;
}

export default function GovernorateAvailabilityEditor({
  value,
  onChange,
}: GovernorateAvailabilityEditorProps) {
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/governorates')
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setGovernorates(d.data);
          if (value.length === 0) {
            onChange(d.data.map((g: Governorate) => ({ governorate_id: g.id, is_available: true })));
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getAvailability = (govId: string) => {
    const entry = value.find((v) => v.governorate_id === govId);
    return entry?.is_available ?? true;
  };

  const toggleGovernorate = (govId: string, available: boolean) => {
    const exists = value.find((v) => v.governorate_id === govId);
    if (exists) {
      onChange(value.map((v) => v.governorate_id === govId ? { ...v, is_available: available } : v));
    } else {
      onChange([...value, { governorate_id: govId, is_available: available }]);
    }
  };

  const selectAll = () => {
    onChange(governorates.map((g) => ({ governorate_id: g.id, is_available: true })));
  };

  const deselectAll = () => {
    onChange(governorates.map((g) => ({ governorate_id: g.id, is_available: false })));
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectAll}
          className="px-3 py-1.5 rounded-lg border border-elite-border font-tajawal text-sm text-elite-text hover:bg-surface-dim transition-colors"
        >
          اختيار الكل
        </button>
        <button
          type="button"
          onClick={deselectAll}
          className="px-3 py-1.5 rounded-lg border border-elite-border font-tajawal text-sm text-elite-text hover:bg-surface-dim transition-colors"
        >
          إلغاء الكل
        </button>
      </div>

      <div className="rounded-xl border border-elite-border overflow-hidden">
        <table className="w-full text-sm font-tajawal">
          <thead className="bg-surface-dim">
            <tr>
              <th className="text-start p-3 text-elite-muted font-semibold">اسم المحافظة</th>
              <th className="text-end p-3 text-elite-muted font-semibold">متوفر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-elite-border">
            {governorates.map((gov) => (
              <tr key={gov.id} className="bg-white">
                <td className="p-3 text-elite-text">{gov.name}</td>
                <td className="p-3 text-end">
                  <Switch
                    checked={getAvailability(gov.id)}
                    onChange={(checked) => toggleGovernorate(gov.id, checked)}
                    size="sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
