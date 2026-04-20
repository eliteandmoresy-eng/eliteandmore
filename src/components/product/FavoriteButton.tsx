'use client';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  productId: string;
  className?: string;
}

export default function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const { has, toggle } = useFavoritesStore();
  const favorited = has(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      className={cn(
        'w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm',
        'transition-transform duration-200 active:scale-90 hover:scale-110',
        className
      )}
      aria-label={favorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-colors duration-200',
          favorited ? 'fill-red-500 text-red-500' : 'text-elite-muted'
        )}
      />
    </button>
  );
}
