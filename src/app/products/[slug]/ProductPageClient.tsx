'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, Plus, Minus, ShoppingCart, Shield, Truck, RotateCcw, ChevronLeft, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '@/types';
import { getPrimaryImage, formatSYP } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useSettings } from '@/hooks/useSettings';
import { buildOrderMessage, getWhatsAppLink } from '@/lib/whatsapp';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProductGallery from '@/components/product/ProductGallery';
import VariantSelector from '@/components/product/VariantSelector';
import ProductCard from '@/components/product/ProductCard';

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { settings } = useSettings();

  const inStock = product.stock_status === 'in_stock';
  const imageUrl = getPrimaryImage(product.images);

  const selectedVariant: ProductVariant | undefined = product.variants?.find(
    (v) => v.id === selectedVariantId
  );
  const effectivePrice =
    selectedVariant?.price_syp ??
    (product.sale_enabled && product.sale_price_syp ? product.sale_price_syp : product.price_syp);

  const discountPct =
    product.sale_enabled && product.sale_price_syp && product.price_syp
      ? Math.round((1 - product.sale_price_syp / product.price_syp) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!inStock) return;
    addItem({
      product_id: product.id,
      product_slug: product.slug,
      variant_id: selectedVariantId ?? undefined,
      name: product.name,
      brand_name: product.brand?.name ?? '',
      brand_slug: product.brand?.slug ?? '',
      image: imageUrl,
      price_syp: effectivePrice,
      quantity,
      variant_label: selectedVariant?.name ?? undefined,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const subtotal = effectivePrice * quantity;
    const message = buildOrderMessage({
      items: [{
        id: `${product.id}_${selectedVariantId ?? 'base'}`,
        product_id: product.id,
        product_slug: product.slug,
        variant_id: selectedVariantId ?? undefined,
        name: product.name,
        brand_name: product.brand?.name ?? '',
        brand_slug: product.brand?.slug ?? '',
        image: imageUrl,
        price_syp: effectivePrice,
        quantity,
        variant_label: selectedVariant?.name ?? undefined,
      }],
      form: {
        full_name: '', phone: '', governorate_id: '',
        governorate_name: 'غير محدد', address: '', notes: '', payment_method: 'cod',
      },
      subtotal, shippingCost: 0, total: subtotal,
      exchangeRate: settings.exchange_rate_syp ?? 15000,
      freeShipping: false,
    });
    window.open(getWhatsAppLink(settings.whatsapp_number ?? WHATSAPP_NUMBER, message), '_blank');
  };

  const tagList = (product.tags as unknown as { tag: { id: string; name: string; color: string } }[] | undefined) ?? [];

  const breadcrumbs = [
    { label: 'الرئيسية', href: '/' },
    ...(product.brand ? [{ label: product.brand.name, href: `/brands/${product.brand.slug}` }] : []),
    ...(product.category ? [{ label: product.category.name, href: `/brands/${product.brand?.slug}` }] : []),
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-white md:bg-cream pb-32 md:pb-12">
      
      {/* Breadcrumb - Special back button for desktop */}
      <div className="hidden sm:block bg-white border-b border-elite-border mb-2">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs font-tajawal font-bold text-elite-muted hover:text-primary transition-colors bg-surface-dim px-4 py-1.5 rounded-full"
          >
            <span>رجوع</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:px-4 md:py-8">

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-10">

          {/* ── GALLERY (First on Mobile) ── */}
          <div className="bg-white p-0 md:rounded-3xl overflow-hidden relative">
            {/* Mobile Back Button - Floating */}
            <button 
              onClick={() => router.back()}
              className="md:hidden absolute top-4 right-4 z-20 w-11 h-11 bg-white/70 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all text-elite-text"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="md:sticky md:top-24">
              <ProductGallery images={product.images ?? []} productName={product.name} />
              
              {/* Desktop-only Category info */}
              {product.category && (
                <div className="hidden md:flex mt-4 items-center gap-2">
                  <span className="text-xs text-elite-muted font-tajawal">التصنيف:</span>
                  <span className="text-xs font-tajawal font-semibold bg-primary/8 text-primary px-3 py-1 rounded-full">
                    {product.category.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── INFO ── */}
          <div className="flex flex-col px-4 pt-6 md:pt-0 gap-6">
            
            {/* Header: Brand + Title + Tags */}
            <div className="space-y-3">
              {product.brand && (
                <Link
                  href={`/brands/${product.brand.slug}`}
                  className="flex items-center gap-2 w-fit bg-surface-dim/50 border border-elite-border/50 rounded-xl px-2.5 py-1.5 active:scale-95 transition-all group"
                >
                  <div className="relative w-5 h-5 rounded-md overflow-hidden bg-white flex-shrink-0 border border-black/5">
                    <Image src={product.brand.logo_url} alt={product.brand.name} fill className="object-contain" sizes="20px" />
                  </div>
                  <span className="text-[11px] font-tajawal font-black text-primary uppercase tracking-tight">
                    {product.brand.name}
                  </span>
                </Link>
              )}

              <h1 className="font-cairo font-black text-2xl md:text-4xl text-elite-text leading-tight">
                {product.name}
              </h1>

              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tagList.map((t) => (
                    <Badge key={t.tag.id} label={t.tag.name} color={t.tag.color} size="sm" />
                  ))}
                </div>
              )}
            </div>

            {/* Price section - Cleaner */}
            <div className="flex items-center justify-between pb-6 border-b border-elite-border/10">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-cairo font-black text-3xl text-primary">{formatSYP(effectivePrice)}</span>
                  {product.sale_enabled && product.sale_price_syp && (
                    <span className="font-tajawal text-sm text-elite-muted line-through opacity-60">
                      {formatSYP(product.price_syp)}
                    </span>
                  )}
                </div>
                {product.sale_enabled && discountPct > 0 && (
                   <span className="text-[10px] font-tajawal font-bold text-red-500">خصم {discountPct}% لفترة محدودة</span>
                )}
              </div>

              {inStock ? (
                <span className="text-[11px] font-tajawal font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  موجود حالياً
                </span>
              ) : (
                <span className="text-[11px] font-tajawal font-black text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                  غير متوفر
                </span>
              )}
            </div>

            {/* Description - Foldable or compact */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="font-cairo font-black text-sm text-elite-text">وصف المنتج</h3>
                <p className="text-elite-muted text-sm font-tajawal leading-relaxed whitespace-pre-wrap line-clamp-4 md:line-clamp-none">
                  {product.description}
                </p>
              </div>
            )}

            {/* Selection Area */}
            <div className="bg-surface-dim/40 rounded-3xl p-5 md:p-6 space-y-6">
              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariantId}
                  onSelect={setSelectedVariantId}
                />
              )}

              <div className="flex items-center justify-between">
                <span className="font-cairo font-black text-sm text-elite-text">الكمية المطلوبة</span>
                <div className="flex items-center bg-white border border-elite-border rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-dim rounded-xl transition-colors text-elite-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-cairo font-black text-lg text-elite-text min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={!inStock}
                    className="w-10 h-10 flex items-center justify-center hover:bg-surface-dim rounded-xl transition-colors text-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex flex-col gap-3">
              <Button
                variant="gold" size="lg" full disabled={!inStock} onClick={handleAddToCart}
                icon={<ShoppingCart className="w-5 h-5" />}
              >
                {addedToCart ? '✓ تمت الإضافة' : 'أضف للسلة'}
              </Button>
              <Button
                variant="primary" size="lg" full disabled={!inStock} onClick={handleWhatsAppOrder}
                icon={<MessageCircle className="w-5 h-5" />}
              >
                اطلب عبر واتساب
              </Button>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-3 gap-3 md:pt-4">
              {[
                { icon: Shield, title: 'أصلي 100%', sub: 'جودة مضمونة' },
                { icon: Truck, title: 'شحن سريع', sub: 'كل المحافظات' },
                { icon: RotateCcw, title: 'دعم مباشر', sub: '24/7 مساعدة' },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-gold-dark" />
                  </div>
                  <p className="font-cairo font-black text-[10px] text-elite-text">{title}</p>
                  <p className="font-tajawal text-[9px] text-elite-muted opacity-80">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 px-4 md:px-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-7 rounded-full bg-gold" />
              <h2 className="font-cairo font-black text-xl md:text-2xl text-elite-text">منتجات قد تعجبك</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Mobile Sticky Footer ── */}
      <div className="md:hidden fixed bottom-[72px] inset-x-0 bg-white/80 backdrop-blur-xl border-t border-elite-border/50 p-4 z-[90] shadow-[0_-10px_25px_rgba(0,0,0,0.05)] animate-fade-in-up">
        <div className="flex gap-3 max-w-lg mx-auto">
          <div className="flex-1">
             <Button
                variant="gold" size="lg" full disabled={!inStock} onClick={handleAddToCart}
                className="h-14 rounded-2xl font-black text-sm shadow-lg shadow-gold/20"
              >
                {addedToCart ? '✓ تم' : (
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>أضف للسلة</span>
                  </div>
                )}
              </Button>
          </div>
          <button
            onClick={handleWhatsAppOrder}
            disabled={!inStock}
            className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/20 active:scale-95 transition-all disabled:opacity-40"
          >
            <MessageCircle className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
