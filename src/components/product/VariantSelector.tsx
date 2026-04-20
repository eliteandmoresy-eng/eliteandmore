'use client';
import { cn } from '@/lib/utils';
import { ProductVariant } from '@/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string | null) => void;
}

const typeLabels: Record<string, string> = {
  size: 'الحجم',
  color: 'اللون',
  weight: 'الوزن',
  scent: 'الرائحة',
};

export default function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  // Group variants by type, preserving order of first appearance
  const typeOrder: string[] = [];
  const grouped: Record<string, ProductVariant[]> = {};
  for (const v of variants) {
    if (!grouped[v.variant_type]) {
      grouped[v.variant_type] = [];
      typeOrder.push(v.variant_type);
    }
    grouped[v.variant_type].push(v);
  }

  return (
    <div className="flex flex-col gap-4">
      {typeOrder.map((type) => {
        const group = grouped[type];
        const label = typeLabels[type] ?? type;
        const isColor = type === 'color';

        return (
          <div key={type} className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-elite-text font-tajawal">{label}</span>
            <div className="flex flex-wrap gap-2">
              {group.map((variant) => {
                const isSelected = selectedVariantId === variant.id;

                if (isColor) {
                  return (
                    <button
                      key={variant.id}
                      onClick={() => onSelect(isSelected ? null : variant.id)}
                      title={variant.name}
                      aria-label={variant.name}
                      className={cn(
                        'w-7 h-7 rounded-full border-2 transition-all duration-200 flex-shrink-0',
                        isSelected
                          ? 'ring-2 ring-primary ring-offset-2 border-primary'
                          : 'border-elite-border hover:border-primary/50'
                      )}
                      style={{ backgroundColor: variant.value ?? '#ccc' }}
                    />
                  );
                }

                return (
                  <button
                    key={variant.id}
                    onClick={() => onSelect(isSelected ? null : variant.id)}
                    className={cn(
                      'px-4 py-1.5 rounded-full border text-sm font-tajawal transition-all duration-200',
                      isSelected
                        ? 'bg-primary text-white border-primary'
                        : 'border-elite-border text-elite-text hover:border-primary'
                    )}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
