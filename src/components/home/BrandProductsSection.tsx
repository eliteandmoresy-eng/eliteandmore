'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Brand, Category, Product } from '@/types';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';

interface BrandProductsSectionProps {
  brand: Brand;
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
  allProducts: Product[];
}

export default function BrandProductsSection({
  brand,
  categories,
  productsByCategory,
  allProducts,
}: BrandProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const showTabs = brand.has_categories && categories.length > 0;
  const displayedProducts =
    activeTab === 'all' ? allProducts : (productsByCategory[activeTab] ?? []);

  if (allProducts.length === 0) return null;

  return (
    <section id={brand.slug} className="py-12 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Unified Brand Header Section - More compact & focused */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-white/50 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-elite-border shadow-soft flex flex-col items-center text-center relative overflow-hidden">
            {/* Background Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16" />
            
            {/* Logo */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white border border-elite-border p-2 mb-6 shadow-md z-10">
              <Image src={brand.logo_url} alt={brand.name} fill className="object-contain" sizes="96px" />
            </div>

            {/* Name & Desc */}
            <h2 className="font-cairo font-black text-3xl md:text-5xl text-elite-text mb-4 z-10">{brand.name}</h2>
            {brand.description && (
              <p className="font-tajawal text-sm md:text-base text-elite-muted max-w-xl leading-relaxed mb-8 z-10">
                {brand.description}
              </p>
            )}

            {/* Centered Categories inside the same header block for cohesion */}
            {showTabs && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 z-10">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-tajawal text-sm font-bold transition-all border',
                    activeTab === 'all'
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-white border-elite-border text-elite-text hover:border-primary/40'
                  )}
                >
                  جميع الأقسام
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={cn(
                      'px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-tajawal text-sm font-bold transition-all border',
                      activeTab === cat.id
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white border-elite-border text-elite-text hover:border-primary/40'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full">

            {/* Products */}
            {displayedProducts.length > 0 ? (
              <>
            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {displayedProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile Grid - 2 columns */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {displayedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile Fallback link if there are more than 8 products */}
            {displayedProducts.length > 8 && (
              <div className="flex justify-center mt-4 md:hidden">
                <Link
                  href={`/brands/${brand.slug}`}
                  className="font-tajawal text-sm font-bold text-primary/70 hover:text-primary transition-colors"
                >
                  عرض المزيد من المنتجات...
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-elite-border text-elite-muted font-tajawal">
            لا توجد منتجات في هذا القسم حالياً
          </div>
        )}
      </div> 
    </div> 
</section>
  );
}
