'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { cn, getPrimaryImage } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useSettings } from '@/hooks/useSettings';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import FavoriteButton from '@/components/product/FavoriteButton';
import PriceDisplay from '@/components/product/PriceDisplay';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const { settings } = useSettings();

  const imageUrl = getPrimaryImage(product.images);
  const inStock = product.stock_status === 'in_stock';

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem({
      product_id: product.id,
      product_slug: product.slug,
      name: product.name,
      brand_name: product.brand?.name ?? '',
      brand_slug: product.brand?.slug ?? '',
      image: imageUrl,
      price_syp: product.sale_enabled && product.sale_price_syp ? product.sale_price_syp : product.price_syp,
      quantity: 1,
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'group relative flex flex-col bg-white rounded-[2rem] border border-elite-border overflow-hidden cursor-pointer',
        'shadow-sm transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:border-primary/10'
      )}
    >
      {/* Image */}
      <div className="relative aspect-square md:aspect-[4/4.5] overflow-hidden bg-surface-dim">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 45vw, 20vw"
          priority={false}
        />

        {/* Status badges - Top Left */}
        <div className="absolute top-2 start-2 flex flex-col gap-1.5 items-start z-10">
          <FavoriteButton productId={product.id} />
        </div>

        {/* Promotion badges - Top Right */}
        <div className="absolute top-2 end-2 flex flex-col gap-1 items-end z-10">
          {product.sale_enabled && product.sale_price_syp && (
            <div className="bg-gold text-primary-dark text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              وفر
            </div>
          )}
          {product.tags?.some(t => t.slug === 'new' || t.name === 'جديد') && (
            <div className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
              جديد
            </div>
          )}
        </div>

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className="font-cairo font-black text-white text-sm border border-white/50 px-3 py-1 rounded-lg rotate-[-12deg] uppercase">
              نفد
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 md:p-4 gap-1">
        <div className="space-y-0.5">
          {/* Brand - Fixed height for alignment */}
          <p className="text-[9px] md:text-[10px] text-primary font-bold uppercase tracking-wider opacity-80 h-3.5 mb-0.5">
            {product.brand?.name || '\u00A0'}
          </p>
          
          <h3 className="font-cairo font-bold text-elite-text text-[12px] md:text-[14px] leading-tight line-clamp-2 h-8 md:h-10 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto pt-1 flex flex-col gap-2">
          <PriceDisplay
            priceSYP={product.price_syp}
            salePriceSYP={product.sale_price_syp}
            saleEnabled={product.sale_enabled}
            exchangeRate={settings.exchange_rate_syp ?? 15000}
            size="sm"
          />

          <Button
            variant="primary"
            size="sm"
            full
            disabled={!inStock}
            onClick={handleAddToCart}
            className="rounded-xl py-1.5 h-8 md:h-9 text-[11px] md:text-[13px] shadow-sm active:scale-95 transition-all"
          >
            {inStock ? (
              <div className="flex items-center gap-1.5">
                <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span>أضف للسلة</span>
              </div>
            ) : (
              'غير متوفر'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
