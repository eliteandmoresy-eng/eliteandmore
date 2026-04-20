'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { Banner } from '@/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroBannerProps {
  banners: Banner[];
}

const Overlay = () => (
  <div className="absolute inset-0 flex items-end md:items-center z-10 pointer-events-none">
    {/* gradient: darker at bottom where text sits on mobile, right-oriented on desktop */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#160924]/95 via-transparent to-transparent md:bg-gradient-to-r md:from-[#160924]/80 md:via-transparent" />

    <div className="relative w-full px-6 pb-12 md:pb-0 md:px-16 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-right gap-5 md:gap-7">
        
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 backdrop-blur-sm animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="font-tajawal text-[11px] md:text-sm font-bold text-gold tracking-wide">
            منتجات أصلية 100%
          </span>
        </div>

        <div className="space-y-2 md:space-y-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-cairo font-black text-4xl md:text-7xl text-white leading-[1.1] drop-shadow-2xl">
            Elite <span className="text-gold">&</span> More
          </h1>
          <p className="font-cairo font-bold text-xl md:text-3xl text-gold/90 drop-shadow-lg">
            وجهتك للعناية والتنظيف الأصلي
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center gap-3 mt-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-tajawal font-bold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-2xl bg-gold text-primary-dark hover:bg-gold-dark transition-all duration-300 shadow-lg active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            تسوّق الآن
          </Link>
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 font-tajawal font-bold text-sm md:text-base px-7 md:px-9 py-3.5 md:py-4 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all duration-300 active:scale-95"
          >
            البرندات
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust features — subtle and clean */}
        <div className="flex items-center justify-center md:justify-start gap-5 text-white/50 text-[10px] md:text-xs font-tajawal mt-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> شحن لكل سوريا</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> دفع عند الاستلام</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> منتجات مضمونة</span>
        </div>
      </div>
    </div>
  </div>
);

export default function HeroBanner({ banners }: HeroBannerProps) {
  const hasBanners = banners && banners.length > 0;

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'clamp(440px, 85vw, 680px)' }}>
      {hasBanners ? (
        <Swiper
          className="w-full h-full hero-swiper"
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          loop={banners.length > 1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          style={{ height: '100%' }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} className="relative w-full h-full">
              <div className="absolute inset-0">
                <Image
                  src={banner.image_url}
                  alt={banner.title ?? 'Elite & More'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <Overlay />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-[#1a0a2e]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <Overlay />
        </div>
      )}
      
      {/* Decorative top/bottom accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent z-20" />
    </section>
  );
}
