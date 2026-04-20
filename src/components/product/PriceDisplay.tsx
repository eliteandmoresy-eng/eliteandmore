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

  if (showSale) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn('font-bold text-primary', priceTextSize)}>
          {formatSYP(salePriceSYP!)}
        </span>
        <span className="text-elite-muted text-sm line-through">
          {formatSYP(priceSYP)}
        </span>
        <span className={cn('text-elite-muted', usdTextSize)}>
          {formatUSD(salePriceSYP!, exchangeRate)}
        </span>
        <span className="bg-gold text-primary-dark text-xs font-bold px-2 py-0.5 rounded">
          -{discount}%
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cn('font-bold text-primary', priceTextSize)}>
        {formatSYP(priceSYP)}
      </span>
      <span className={cn('text-elite-muted', usdTextSize)}>
        {formatUSD(priceSYP, exchangeRate)}
      </span>
    </div>
  );
}
