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

const BannerContent = ({ banner }: { banner?: Banner }) => (
  <div className="absolute inset-0 flex items-end md:items-center z-20 pointer-events-none">
    {/* gradient: darker at bottom where text sits on mobile, right-oriented on desktop */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-transparent" />

    <div className="relative w-full px-6 pb-16 md:pb-0 md:px-16 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-right gap-4 md:gap-7">
        
        {/* Elite Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/15 border border-gold/30 backdrop-blur-md animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="font-tajawal text-[11px] md:text-sm font-black text-gold uppercase tracking-widest">
            Elite Quality
          </span>
        </div>

        <div className="space-y-3 md:space-y-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-cairo font-black text-4xl md:text-8xl text-white leading-[1.1] drop-shadow-2xl">
            {banner?.title || 'Elite & More'}
          </h1>
          <p className="font-cairo font-bold text-lg md:text-3xl text-gold/90 drop-shadow-lg max-w-2xl">
            {banner?.description || 'وجهتك للعناية والتنظيف الأصلي'}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center gap-4 mt-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link
            href={banner?.link_url || '/shop'}
            className="inline-flex items-center gap-2 font-tajawal font-black text-sm md:text-base px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-gold text-primary-dark hover:bg-gold-dark transition-all duration-500 shadow-xl shadow-gold/20 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            تسوّق الآن
          </Link>
        </div>

        {/* Trust features — subtle and clean */}
        <div className="flex items-center justify-center md:justify-start gap-6 text-white/60 text-[10px] md:text-xs font-tajawal mt-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> شحن سريع</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> دفع عند الاستلام</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> أصلي 100%</span>
        </div>
      </div>
    </div>
  </div>
);

export default function HeroBanner({ banners }: HeroBannerProps) {
  const hasBanners = banners && banners.length > 0;

  return (
    <section className="relative w-full bg-primary" style={{ height: '500px' }}>
      {hasBanners ? (
        <Swiper
          className="w-full h-full"
          modules={[Autoplay, Pagination]}
          loop={banners.length > 1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={banner.image_url}
                  alt={banner.title ?? 'Elite & More'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/40 z-10" />
              </div>
              <BannerContent banner={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-black">
          <BannerContent />
        </div>
      )}
    </section>
  );
}
