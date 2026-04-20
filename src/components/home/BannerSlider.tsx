'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Banner } from '@/types';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface BannerSliderProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
  if (!banners || banners.length < 1) return null;

  return (
    <Swiper
      className="banner-swiper w-full"
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      loop={banners.length > 1}
      autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }}
      pagination={{ clickable: true }}
    >
      {banners.map((banner) => {
        const slideContent = (
          <div className="relative w-full" style={{ aspectRatio: '2/1' }}>
            <Image
              src={banner.image_url}
              alt={banner.title ?? 'banner'}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        );

        if (banner.link_url && banner.link_target !== 'none') {
          const isExternal = banner.link_target === 'external';
          return (
            <SwiperSlide key={banner.id}>
              {isExternal ? (
                <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="block">
                  {slideContent}
                </a>
              ) : (
                <Link href={banner.link_url} className="block">
                  {slideContent}
                </Link>
              )}
            </SwiperSlide>
          );
        }

        return (
          <SwiperSlide key={banner.id}>
            {slideContent}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
