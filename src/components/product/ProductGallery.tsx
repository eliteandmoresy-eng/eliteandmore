'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sorted = [...(images || [])].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.sort_order - b.sort_order;
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const visibleThumbs = sorted.slice(0, 6);
  const mainImage = sorted[activeIndex] ?? null;

  if (!sorted.length) {
    return (
      <div className="flex flex-col gap-3">
        <div className="aspect-square w-full rounded-2xl bg-surface-dim flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-elite-muted/40" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square w-full rounded-2xl bg-surface-dim overflow-hidden">
        <Image
          src={mainImage.url}
          alt={productName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {visibleThumbs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {visibleThumbs.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-surface-dim',
                'border-2 transition-all duration-200',
                activeIndex === index
                  ? 'border-primary'
                  : 'border-elite-border hover:border-primary/50'
              )}
              aria-label={`صورة ${index + 1}`}
            >
              <Image
                src={img.url}
                alt={`${productName} - ${index + 1}`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
