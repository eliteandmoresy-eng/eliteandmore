'use client';
import { formatSYP, formatUSD, calcDiscount } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  priceSYP: number;
  salePriceSYP?: number | null;
  saleEnabled: boolean;
  exchangeRate: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceDisplay({
  priceSYP,
  salePriceSYP,
  saleEnabled,
  exchangeRate,
  size = 'md',
}: PriceDisplayProps) {
  const showSale = saleEnabled && salePriceSYP && salePriceSYP < priceSYP;
  const discount = showSale ? calcDiscount(priceSYP, salePriceSYP!) : 0;

  const priceTextSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const usdTextSize = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }[size];

  const usdValue = showSale ? (salePriceSYP! / exchangeRate) : (priceSYP / exchangeRate);

  if (showSale) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div className="flex items-baseline gap-1">
          <span className={cn('font-black text-primary font-cairo', priceTextSize)}>
            {formatSYP(salePriceSYP!).split(' ')[0]}
          </span>
          <span className="text-[10px] font-bold text-primary opacity-70">ل.س</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-elite-muted text-[11px] line-through opacity-50 decoration-red-500/20">
            {formatSYP(priceSYP)}
          </span>
          <span className="bg-red-50 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-red-100">
            -{discount}%
          </span>
        </div>

        <div className={cn('bg-surface-dim/80 px-2 py-0.5 rounded-lg border border-white/50 flex items-center gap-1 shadow-sm', usdTextSize)}>
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span className="font-tajawal font-black text-elite-text">{usdValue.toFixed(2)} $</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <div className="flex items-baseline gap-1">
        <span className={cn('font-black text-primary font-cairo', priceTextSize)}>
          {formatSYP(priceSYP).split(' ')[0]}
        </span>
        <span className="text-[10px] font-bold text-primary opacity-70">ل.س</span>
      </div>

      <div className={cn('bg-surface-dim/80 px-2 py-0.5 rounded-lg border border-white/50 flex items-center gap-1 shadow-sm', usdTextSize)}>
        <span className="w-1 h-1 rounded-full bg-gold" />
        <span className="font-tajawal font-black text-elite-text">{usdValue.toFixed(2)} $</span>
      </div>
    </div>
  );
}
