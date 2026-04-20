'use client';
import { useEffect, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';
import { useFavoritesStore } from '@/store/favoritesStore';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

export default function FavoritesPage() {
  const { ids, clear } = useFavoritesStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('products')
      .select(
        '*, images:product_images(*), brand:brands(id,name,slug,logo_url), tags:product_tags(tag:tags(id,name,slug,color))'
      )
      .in('id', ids)
      .eq('is_active', true)
      .then(({ data }) => {
        setProducts((data ?? []) as unknown as Product[]);
        setLoading(false);
      });
  }, [ids]);

  return (
    <div className="min-h-screen bg-cream py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[{ label: 'الرئيسية', href: '/' }, { label: 'المفضلة' }]}
          className="mb-6"
        />

        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h1 className="font-cairo font-black text-3xl text-elite-text">المفضلة</h1>
            {ids.length > 0 && (
              <span className="w-7 h-7 bg-primary text-white text-sm font-tajawal font-bold rounded-full flex items-center justify-center">
                {ids.length}
              </span>
            )}
          </div>
          {ids.length > 0 && (
            <Button variant="danger" size="sm" onClick={clear} icon={<Trash2 className="w-4 h-4" />}>
              مسح الكل
            </Button>
          )}
        </div>

        {ids.length === 0 ? (
          <EmptyState
            icon={<Heart className="w-8 h-8" />}
            title="قائمة المفضلة فارغة"
            subtitle="لم تضف أي منتجات إلى المفضلة بعد"
            actionLabel="تسوّق الآن"
            actionHref="/shop"
          />
        ) : (
          <ProductGrid products={products} loading={loading} emptyMessage="المنتجات المفضلة غير متوفرة حالياً" />
        )}
      </div>
    </div>
  );
}
