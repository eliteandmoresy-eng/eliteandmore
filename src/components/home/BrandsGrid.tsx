'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { Brand } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BrandsGridProps {
  brands: Brand[];
}

export default function BrandsGrid({ brands }: BrandsGridProps) {
  if (!brands || brands.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-4 md:py-8 px-0 md:px-0">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-16 border border-primary/10 relative overflow-hidden shadow-sm">
          {/* Subtle background decorative element for the container */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Section header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6 text-center md:text-right">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-white shadow-soft border border-elite-border flex items-center justify-center flex-shrink-0 rotate-3">
                  <Layers className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <span className="font-tajawal text-[10px] md:text-xs text-primary font-black uppercase tracking-[0.2em] block mb-1">تسوّق عبر ماركاتك المفضلة</span>
                  <h2 className="font-cairo font-black text-2xl md:text-4xl lg:text-5xl text-elite-text leading-tight">
                    براندات موثوقة
                  </h2>
                </div>
              </div>

              <Link
                href="/brands"
                className="hidden md:inline-flex items-center gap-2 font-tajawal text-sm font-bold text-primary hover:text-white border-2 border-primary/10 hover:bg-primary px-8 py-3 rounded-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                عرض كل البراندات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid */}
            <motion.div 
              className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {brands.map((brand, i) => {
                const isOddCount = brands.length % 2 !== 0;
                // Only apply the "Large First" logic on Mobile (screens smaller than md)
                const isFirstAndOddMobile = isOddCount && i === 0;
                
                return (
                  <motion.div 
                    key={brand.id} 
                    variants={itemVariants}
                    className={cn(
                      "md:w-[220px]", // Consistent width on desktop if using flex
                      isFirstAndOddMobile ? "col-span-2 md:col-span-1" : ""
                    )}
                  >
                    <Link
                      href={`/brands/${brand.slug}`}
                      className={cn(
                        "group relative flex flex-col items-center gap-3 md:gap-4 p-4 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border-2 border-elite-border/60 hover:border-gold/40 shadow-none hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 overflow-hidden h-full",
                        isFirstAndOddMobile ? "flex-col justify-center" : "justify-center"
                      )}
                    >
                      {/* Cover Image Background */}
                      {brand.cover_url && (
                        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                          <Image
                            src={brand.cover_url}
                            alt={`${brand.name} cover`}
                            fill
                            className="object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                            sizes="(max-width: 768px) 200px, 300px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                        </div>
                      )}

                      {/* Logo container */}
                      <div className={cn(
                        "relative flex items-center justify-center z-10",
                        isFirstAndOddMobile ? "w-full h-16 md:h-20" : "w-full h-10 md:h-20"
                      )}>
                        <Image
                          src={brand.logo_url}
                          alt={brand.name}
                          width={isFirstAndOddMobile ? 180 : 140}
                          height={isFirstAndOddMobile ? 120 : 100}
                          className="object-contain max-h-full max-w-full drop-shadow-sm group-hover:drop-shadow-md group-hover:scale-110 transition-all duration-500 ease-out p-0.5 md:p-1 relative z-10"
                        />
                      </div>

                      {/* Info */}
                      <div className="z-10 text-center">
                        <p className={cn(
                          "font-cairo font-black text-elite-text group-hover:text-primary transition-colors duration-300",
                          isFirstAndOddMobile ? "text-lg md:text-sm" : "text-xs md:text-sm"
                        )}>
                          {brand.name}
                        </p>
                        <div className="h-0.5 w-6 mx-auto bg-gold/20 group-hover:w-full group-hover:bg-gold/40 rounded-full mt-2 transition-all duration-500" />
                      </div>

                      {/* Decorations */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full scale-0 group-hover:scale-[8] transition-all duration-700 ease-in-out pointer-events-none z-0 blur-xl" />
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/5 rounded-full scale-0 group-hover:scale-[4] transition-all duration-500 ease-in-out delay-100 pointer-events-none z-0 blur-lg" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile view all items inside at the bottom */}
            <div className="flex justify-center mt-12 md:hidden">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 font-tajawal text-[13px] font-bold text-primary border-2 border-primary/10 bg-white/60 px-10 py-4 rounded-2xl active:scale-95 transition-all"
              >
                استعراض جميع الماركات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
