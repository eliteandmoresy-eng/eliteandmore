'use client';
import { Plus, Trash2 } from 'lucide-react';
import { ProductVariant } from '@/types';
import { cn } from '@/lib/utils';

interface VariantEditorProps {
  variants: ProductVariant[];
  onChange: (variants: ProductVariant[]) => void;
}

const variantTypeLabels: Record<ProductVariant['variant_type'], string> = {
  size: 'الحجم',
  color: 'اللون',
  weight: 'الوزن',
  scent: 'الرائحة',
};

const isValidHex = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);

function generateId() {
  return `new_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function VariantEditor({ variants, onChange }: VariantEditorProps) {
  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: generateId(),
      product_id: '',
      variant_type: 'size',
      name: '',
      value: null,
      price_syp: null,
      sort_order: variants.length,
    };
    onChange([...variants, newVariant]);
  };

  const updateVariant = (index: number, patch: Partial<ProductVariant>) => {
    const updated = variants.map((v, i) => (i === index ? { ...v, ...patch } : v));
    onChange(updated);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {variants.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-elite-border">
          <table className="w-full text-sm font-tajawal">
            <thead className="bg-surface-dim">
              <tr>
                <th className="text-start p-3 text-elite-muted font-semibold">النوع</th>
                <th className="text-start p-3 text-elite-muted font-semibold">الاسم</th>
                <th className="text-start p-3 text-elite-muted font-semibold">القيمة</th>
                <th className="text-start p-3 text-elite-muted font-semibold">السعر الخاص</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border">
              {variants.map((variant, i) => (
                <tr key={variant.id} className="bg-white">
                  <td className="p-2">
                    <select
                      value={variant.variant_type}
                      onChange={(e) =>
                        updateVariant(i, { variant_type: e.target.value as ProductVariant['variant_type'] })
                      }
                      className="w-full px-2 py-1.5 rounded-lg border border-elite-border text-elite-text bg-white text-sm focus:outline-none focus:border-primary"
                    >
                      {(Object.entries(variantTypeLabels) as [ProductVariant['variant_type'], string][]).map(
                        ([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariant(i, { name: e.target.value })}
                      placeholder="مثال: 500مل"
                      className="w-full px-2 py-1.5 rounded-lg border border-elite-border text-elite-text text-sm focus:outline-none focus:border-primary"
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={variant.value ?? ''}
                        onChange={(e) => updateVariant(i, { value: e.target.value || null })}
                        placeholder={variant.variant_type === 'color' ? '#FF0000' : 'اختياري'}
                        className="w-full px-2 py-1.5 rounded-lg border border-elite-border text-elite-text text-sm focus:outline-none focus:border-primary"
                      />
                      {variant.variant_type === 'color' && variant.value && isValidHex(variant.value) && (
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full border border-elite-border"
                          style={{ backgroundColor: variant.value }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={variant.price_syp ?? ''}
                      onChange={(e) =>
                        updateVariant(i, { price_syp: e.target.value ? Number(e.target.value) : null })
                      }
                      placeholder="اختياري"
                      min={0}
                      className="w-full px-2 py-1.5 rounded-lg border border-elite-border text-elite-text text-sm focus:outline-none focus:border-primary"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        onClick={addVariant}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-elite-border',
          'font-tajawal text-sm text-elite-muted hover:border-primary hover:text-primary transition-colors'
        )}
      >
        <Plus className="w-4 h-4" />
        إضافة متغير
      </button>
    </div>
  );
}
