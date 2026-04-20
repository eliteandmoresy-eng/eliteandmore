'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Truck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  text: string | null;
}

const values = [
  {
    icon: ShieldCheck,
    label: 'منتجات أصلية 100%',
    desc: 'ضمان الجودة الكاملة على كل منتج نقدّمه',
  },
  {
    icon: Truck,
    label: 'توصيل لكل سوريا',
    desc: 'نوصّل لجميع المحافظات الـ 14 بدفع عند الاستلام',
  },
  {
    icon: Star,
    label: 'خدمة عملاء متميزة',
    desc: 'فريقنا جاهز للإجابة على كل استفساراتك',
  },
];

export default function AboutSection({ text }: AboutSectionProps) {
  if (!text) return null;

  return (
    <section className="py-12 md:py-20 px-4 md:px-0 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* ── Boxed Container ── */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-primary/10 shadow-sm relative">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Visual Side (Purple/Brand) ── */}
            <div className="relative bg-gradient-to-br from-primary to-primary-dark p-10 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden min-h-[400px]">
              
              {/* Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[3rem] bg-white/10 backdrop-blur-md border-2 border-white/20 p-2 shadow-2xl relative">
                  <div className="absolute inset-0 bg-gold/10 rounded-[3rem] blur-xl animate-pulse" />
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white">
                    <Image
                      src="/images/logo.jpg"
                      alt="Elite and More"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              <div className="relative z-10 mt-8 space-y-3">
                <h3 className="font-cairo font-black text-2xl md:text-3xl text-white">Elite and More</h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-8 h-px bg-gold/40" />
                  <p className="font-tajawal text-gold text-xs font-black uppercase tracking-widest">Premium Selection</p>
                  <span className="w-8 h-px bg-gold/40" />
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="relative z-10 grid grid-cols-3 gap-3 mt-10 w-full max-w-sm">
                {[
                  { val: '100%', lbl: 'أصلي' },
                  { val: '14', lbl: 'محافظة' },
                  { val: 'COD', lbl: 'دفع آمن' }
                ].map((s) => (
                  <div key={s.lbl} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl py-3 px-1">
                    <p className="font-cairo font-black text-lg text-gold leading-none">{s.val}</p>
                    <p className="font-tajawal text-white/50 text-[10px] mt-1">{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Content Side (White/Content) ── */}
            <div className="p-10 md:p-16 flex flex-col justify-center gap-8 bg-transparent" dir="rtl">
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-tajawal text-xs font-black uppercase tracking-tighter">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  من نحن
                </span>
              </div>

              <p className="font-tajawal text-elite-muted leading-[2] text-sm md:text-base max-w-xl">
                {text}
              </p>

              {/* Values */}
              <div className="grid grid-cols-1 gap-3">
                {values.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="group flex items-start gap-4 p-4 rounded-2xl bg-surface-dim/50 border border-elite-border/50 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-cairo font-bold text-sm text-elite-text">{label}</p>
                      <p className="font-tajawal text-xs text-elite-muted mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-tajawal font-bold text-sm px-8 py-4 rounded-2xl bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  اقرأ المزيد عنّـا
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
