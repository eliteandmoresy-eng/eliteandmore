'use client';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatSYP } from '@/lib/utils';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal);

  const total = subtotal();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-cream py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سلة التسوق' },
          ]}
          className="mb-6"
        />

        <h1 className="font-cairo font-black text-3xl text-elite-text mb-8">
          سلة التسوق
        </h1>

        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="w-8 h-8" />}
            title="سلتك فارغة"
            subtitle="لم تضف أي منتجات إلى سلة التسوق بعد"
            actionLabel="تسوّق الآن"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-elite-border p-4 flex gap-4 items-start shadow-card"
                >
                  {/* Image */}
                  {item.product_slug ? (
                    <Link 
                      href={`/products/${item.product_slug}`}
                      className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-surface-dim flex-shrink-0 group"
                    >
                      <Image
                        src={item.image || '/images/placeholder.png'}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        sizes="72px"
                      />
                    </Link>
                  ) : (
                    <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-surface-dim flex-shrink-0">
                      <Image
                        src={item.image || '/images/placeholder.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    {item.brand_slug ? (
                      <Link 
                        href={`/brands/${item.brand_slug}`}
                        className="font-tajawal text-[10px] md:text-xs text-primary font-bold hover:underline mb-0.5 block uppercase"
                      >
                        {item.brand_name}
                      </Link>
                    ) : (
                      <p className="font-tajawal text-[10px] md:text-xs text-elite-muted mb-0.5 block uppercase">
                        {item.brand_name}
                      </p>
                    )}

                    {item.product_slug ? (
                      <Link href={`/products/${item.product_slug}`}>
                        <h3 className="font-cairo font-semibold text-sm text-elite-text leading-snug mb-1 line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="font-cairo font-semibold text-sm text-elite-text leading-snug mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                    )}
                    {item.variant_label && (
                      <p className="font-tajawal text-xs text-primary mb-1">
                        {item.variant_label}
                      </p>
                    )}
                    <p className="font-tajawal text-sm font-bold text-elite-text">
                      {formatSYP(item.price_syp)}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-elite-muted hover:text-red-500 transition-colors"
                      aria-label="حذف المنتج"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 border border-elite-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-surface-dim transition-colors text-elite-text"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-tajawal font-bold text-sm text-elite-text min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-surface-dim transition-colors text-elite-text"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="font-tajawal text-xs font-semibold text-primary">
                      {formatSYP(item.price_syp * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-elite-border p-6 shadow-card sticky top-24 flex flex-col gap-4">
                <h2 className="font-cairo font-bold text-xl text-elite-text">
                  ملخص الطلب
                </h2>

                <div className="flex flex-col gap-3 border-b border-elite-border pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-tajawal text-sm text-elite-muted">عدد المنتجات</span>
                    <span className="font-tajawal font-bold text-elite-text">{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tajawal text-sm text-elite-muted">المجموع</span>
                    <span className="font-tajawal font-bold text-elite-text">{formatSYP(total)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-cairo font-bold text-base text-elite-text">الإجمالي</span>
                  <span className="font-cairo font-black text-lg text-primary">{formatSYP(total)}</span>
                </div>

                <p className="font-tajawal text-xs text-elite-muted">
                  * سيتم احتساب تكلفة الشحن عند إتمام الطلب
                </p>

                <Button variant="gold" size="lg" full href="/checkout">
                  إتمام الطلب
                </Button>
                <Button variant="ghost" size="md" full href="/shop">
                  مواصلة التسوق
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
