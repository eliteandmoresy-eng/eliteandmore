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

export function compressImage(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<Blob | File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else resolve(file);
        }, file.type, quality);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
