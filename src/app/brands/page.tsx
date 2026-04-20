import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { Brand } from '@/types';

export const revalidate = 60;

export const metadata = {
  title: 'البرندات — Elite and More',
  description: 'تصفّح جميع براندات Elite and More',
};

export default async function BrandsPage() {
  const { data } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  const brands = (data ?? []) as Brand[];

  return (
    <div className="min-h-screen bg-cream pb-24" dir="rtl">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#160924] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply transition-all duration-700">
          <Image 
            src="/2.jpg" 
            alt="Brands Background" 
            fill 
            className="object-cover object-center" 
            sizes="100vw" 
            priority 
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/40" />
        </div>

        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary-light/15 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold font-tajawal text-xs font-bold mb-5">
            <Layers className="w-3.5 h-3.5" />
            {brands.length} برند متوفر
          </div>
          <h1 className="font-cairo font-black text-3xl md:text-5xl text-white mb-3">
            تسوّق حسب البراند
          </h1>
          <p className="font-tajawal text-white/70 text-base max-w-lg mx-auto">
            اختر براندك المفضل واستعرض جميع منتجاته بمكان واحد
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 font-tajawal text-sm text-elite-muted">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-elite-text font-semibold">البرندات</span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4">
        {brands.length === 0 ? (
          <div className="text-center py-24 text-elite-muted font-tajawal">
            لا توجد براندات متاحة حالياً
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {brands.map((brand, i) => (
              <Link
                key={brand.id}
                href={`/brands/${brand.slug}`}
                className="group relative flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-elite-border shadow-card hover:shadow-card-hover hover:border-primary/25 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Rank badge for top 3 */}
                {i < 3 && (
                  <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gold flex items-center justify-center text-[10px] font-cairo font-black text-primary-dark shadow-sm z-10">
                    {i + 1}
                  </span>
                )}

                {/* Logo */}
                <div className="relative w-full h-20 md:h-24">
                  <Image
                    src={brand.logo_url}
                    alt={brand.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                  />
                </div>

                {/* Name */}
                <p className="relative font-cairo font-bold text-sm text-elite-text group-hover:text-primary transition-colors text-center leading-tight">
                  {brand.name}
                </p>

                {/* Description */}
                {brand.description && (
                  <p className="relative font-tajawal text-[11px] text-elite-muted text-center line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                )}

                {/* Arrow */}
                <div className="relative flex items-center gap-1 font-tajawal text-xs text-primary/0 group-hover:text-primary transition-all duration-200 font-semibold">
                  تصفّح المنتجات
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
