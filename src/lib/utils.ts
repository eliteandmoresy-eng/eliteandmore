import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSYP(amount: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(amount)) + ' ل.س';
}

export function formatUSD(amountSYP: number, rate: number): string {
  const usd = amountSYP / rate;
  return '≈ ' + usd.toFixed(2) + ' $';
}

export function calcDiscount(original: number, sale: number): number {
  return Math.round((1 - sale / original) * 100);
}

export function getPrimaryImage(images?: { url: string; is_primary: boolean; sort_order: number }[]): string {
  if (!images || images.length === 0) return '/images/placeholder.svg';
  const primary = images.find((img) => img.is_primary);
  if (primary) return primary.url;
  return images.sort((a, b) => a.sort_order - b.sort_order)[0].url;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '…';
}
