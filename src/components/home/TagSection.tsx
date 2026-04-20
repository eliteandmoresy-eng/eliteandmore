'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Flame, Zap, ChevronLeft, ChevronRight, Crown, Gem, Star, Trophy, Sparkle } from 'lucide-react';
import { Tag, Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Personality detection from slug / name
 ───────────────────────────────────────────── */
type Personality = 'new' | 'popular' | 'sale' | 'default';

function detectPersonality(tag: Tag): Personality {
  const text = (tag.slug + ' ' + tag.name).toLowerCase();
  if (/جديد|new|حديث|latest|arrival|وصل/.test(text)) return 'new';
  if (/شعبي|مبيع|popular|hot|trending|best|طلب/.test(text)) return 'popular';
  if (/خاص|عرض|sale|offer|تخفيض|discount|deal|حصري/.test(text)) return 'sale';
  return 'default';
}

/* ─────────────────────────────────────────────
   Header Components
 ───────────────────────────────────────────── */
function NewHeader({ tag, count }: { tag: Tag; count: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-primary/10 via-primary/5 to-white border border-primary/10 px-5 md:px-8 py-6 md:py-8 mb-6 md:mb-10 group/header">
      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 md:w-18 md:h-18 rounded-[1.8rem] bg-white shadow-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-gold/20 animate-pulse" />
             <div className="relative">
               <Sparkles className="w-7 h-7 md:w-9 md:h-9 text-primary relative z-10" />
               <Star className="absolute -top-1 -right-1 w-3 h-3 text-gold fill-gold animate-bounce" />
             </div>
          </div>
          <div>
            <div className="hidden md:flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-primary-dark rounded-full text-[10px] font-tajawal font-black uppercase tracking-tighter border border-gold/20">
                <Sparkle className="w-3 h-3 text-gold" />
                وصل حديثاً للنخبة
              </span>
            </div>
            <h2 className="font-cairo font-black text-2xl md:text-4xl text-elite-text leading-tight group-hover/header:text-primary transition-colors">
              {tag.name}
            </h2>
            <p className="font-tajawal text-xs md:text-sm text-elite-muted mt-1 leading-relaxed">
              اكتشف {count} قطعة فريدة تم اختيارها بعناية لتناسب ذوقك
            </p>
          </div>
        </div>
        <Link
          href={`/shop?tag=${tag.slug}`}
          className="hidden md:inline-flex items-center gap-2 font-tajawal text-sm font-bold text-white bg-primary px-8 py-3 rounded-2xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30 group/btn"
        >
          استعرض الجديد
          <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="absolute top-1/2 -left-10 w-40 h-40 border border-primary/10 rounded-full -translate-y-1/2 animate-ping" />
    </div>
  );
}

function PopularHeader({ tag, count }: { tag: Tag; count: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-gold/20 via-gold/5 to-white border border-gold/20 px-5 md:px-8 py-6 md:py-8 mb-6 md:mb-10 shadow-sm group/header">
      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 md:w-18 md:h-18 rounded-[1.8rem] bg-gold flex items-center justify-center shadow-2xl shadow-gold/30 flex-shrink-0 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/30 animate-[pulse_3s_infinite]" />
             <Crown className="w-7 h-7 md:w-9 md:h-9 text-primary-dark relative z-10 drop-shadow-md" />
          </div>
          <div>
            <div className="hidden md:flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-gold rounded-full text-[10px] font-tajawal font-black uppercase tracking-tighter border border-primary/10">
                <Trophy className="w-3 h-3" />
                الأكثر طلباً ورواجاً
              </span>
            </div>
            <h2 className="font-cairo font-black text-2xl md:text-4xl text-elite-text leading-tight group-hover/header:text-primary transition-colors">
              {tag.name}
            </h2>
            <p className="font-tajawal text-xs md:text-sm text-elite-muted mt-1 leading-relaxed">
              مختارات يحبها آلاف العملاء - {count} منتج حصري
            </p>
          </div>
        </div>
        <Link
          href={`/shop?tag=${tag.slug}`}
          className="hidden md:inline-flex items-center gap-2 font-tajawal text-sm font-bold text-primary-dark bg-gold px-8 py-3 rounded-2xl hover:bg-gold-dark transition-all shadow-lg hover:shadow-gold/30 group/btn"
        >
          تسوّق الأكثر طلباً
          <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function SaleHeader({ tag, count }: { tag: Tag; count: number }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] mb-6 md:mb-10 bg-gradient-to-l from-[#1a0a2e] via-primary to-primary-dark border border-white/10 p-[1px] group/header">
      <div className="relative bg-[#160924] rounded-[calc(2.5rem-1px)] px-5 md:px-8 py-6 md:py-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-5 text-white">
            <div className="w-14 h-14 md:w-18 md:h-18 rounded-[1.8rem] bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-2xl shadow-gold/40 flex-shrink-0 relative">
              <Gem className="w-7 h-7 md:w-9 md:h-9 text-primary-dark relative z-10 animate-[pulse_2s_infinite]" />
            </div>
            <div>
              <div className="hidden md:flex items-center gap-2 mb-1.5">
                <span className="px-3 py-1 bg-gold text-primary-dark rounded-full text-[10px] font-tajawal font-black uppercase tracking-tighter border border-white/20">
                  عروض حصرية لفترة محدودة
                </span>
              </div>
              <h2 className="font-cairo font-black text-2xl md:text-4xl text-white leading-tight group-hover/header:text-gold transition-colors">
                {tag.name}
              </h2>
              <p className="font-tajawal text-xs md:text-sm text-white/50 mt-1 leading-relaxed">
                اقتنص الفرصة قبل فوات الأوان - خصومات كبرى بانتظارك
              </p>
            </div>
          </div>
          <Link
            href={`/shop?tag=${tag.slug}`}
            className="hidden md:inline-flex items-center gap-2 font-tajawal text-sm font-bold text-primary-dark bg-white hover:bg-gold px-8 py-3 rounded-2xl transition-all shadow-xl group/btn"
          >
            استعراض العروض
            <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DefaultHeader({ tag, count }: { tag: Tag; count: number }) {
  return (
    <div className="flex items-center justify-between mb-6 md:mb-8 md:px-2">
      <div className="flex items-center gap-4">
        <div
          className="w-2 h-10 md:h-12 rounded-full flex-shrink-0"
          style={{ backgroundColor: tag.color }}
        />
        <div>
          <span className="font-tajawal text-[10px] md:text-xs text-elite-muted uppercase tracking-widest font-bold block mb-0.5">مجموعة مميزة</span>
          <h2 className="font-cairo font-black text-2xl md:text-3xl text-elite-text leading-none">
            {tag.name}
          </h2>
        </div>
      </div>
      <Link
        href={`/shop?tag=${tag.slug}`}
        className="hidden md:inline-flex items-center gap-2 font-tajawal text-sm font-bold text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors"
      >
        عرض الكل
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </div>
  );
}

const sectionBg: Record<Personality, string> = {
  new: 'bg-white',
  popular: 'bg-white',
  sale: 'bg-white',
  default: 'bg-white',
};

/* ─────────────────────────────────────────────
   Main Export
 ───────────────────────────────────────────── */
interface TagSectionProps {
  tag: Tag;
  products: Product[];
}

export default function TagSection({ tag, products }: TagSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const absScroll = Math.abs(scrollLeft);

      // In RTL, Start (Right-most) is 0. 
      // Using 30px threshold to account for px-4 (16px) padding and browser quirks
      setShowRightArrow(absScroll > 30);
      setShowLeftArrow(absScroll + clientWidth < scrollWidth - 30);
    };

    checkScroll();
    const scroller = scrollRef.current;
    if (scroller) scroller.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    const timer = setTimeout(checkScroll, 500);

    return () => {
      if (scroller) scroller.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [products]);

  if (!products || products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const displayed = products.slice(0, 10);
  const personality = detectPersonality(tag);

  const HeaderComponent = {
    new: NewHeader,
    popular: PopularHeader,
    sale: SaleHeader,
    default: DefaultHeader,
  }[personality];

  return (
    <section className={`py-6 md:py-10 ${sectionBg[personality]} border-t border-elite-border/10`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <HeaderComponent tag={tag} count={displayed.length} />

        <div className="relative group/slider">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('right')}
            className={cn(
              "absolute right-2 md:-right-6 top-[35%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-20 shadow-xl transition-all duration-300",
              "bg-white border border-elite-border/50 rounded-full text-elite-text",
              "hover:bg-primary hover:text-white hover:scale-110 active:scale-95",
              mounted && showRightArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button 
            onClick={() => scroll('left')}
            className={cn(
              "absolute left-2 md:-left-6 top-[35%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-20 shadow-xl transition-all duration-300",
              "bg-white border border-elite-border/50 rounded-full text-elite-text",
              "hover:bg-primary hover:text-white hover:scale-110 active:scale-95",
              mounted && showLeftArrow ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-50 pointer-events-none"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6 pb-6 -mx-4 px-4 scroll-smooth"
          >
            {displayed.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px] snap-start"
              >
                <div className="h-full">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
            
            <Link 
              href={`/shop?tag=${tag.slug}`}
              className="flex-shrink-0 w-[140px] md:w-[200px] snap-start group/more"
            >
              <div className="h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-[2rem] border-2 border-dashed border-elite-border hover:border-primary/40 hover:bg-white transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover/more:scale-110 transition-transform">
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </div>
                <span className="font-tajawal font-black text-xs md:text-sm text-primary">عرض الكل</span>
              </div>
            </Link>
          </div>
          
          <div className="absolute top-0 right-0 bottom-6 w-10 bg-gradient-to-l from-cream/20 to-transparent pointer-events-none md:hidden" />
        </div>

      </div>
    </section>
  );
}
