import { supabase } from '@/lib/supabase';
import { Phone, Clock, MapPin, MessageCircle, Facebook, Instagram, ShieldCheck, Truck, Star, Sparkles, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/types';
import { WHATSAPP_NUMBER, FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/whatsapp';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const values = [
  {
    icon: ShieldCheck,
    title: 'منتجات أصلية 100%',
    desc: 'نضمن لك أن كل منتج وصل إليك أصلي ومعتمد من الشركة المصنّعة بدون أي تنازل عن الجودة.',
  },
  {
    icon: Truck,
    title: 'توصيل لكل سوريا',
    desc: 'نوصّل طلباتك إلى جميع المحافظات السورية الـ 14 مع خيار الدفع عند الاستلام لراحة تامة.',
  },
  {
    icon: Star,
    title: 'خدمة عملاء متميزة',
    desc: 'فريقنا متاح للرد على استفساراتك وحل أي مشكلة في أسرع وقت ممكن.',
  },
];

export default async function AboutPage() {
  const { data: settings } = await supabase
    .from('settings')
    .select('contact_phone, working_hours, contact_address, about_full, facebook_url, instagram_url, whatsapp_number')
    .single();

  const s = (settings ?? {}) as Partial<SiteSettings>;

  const whatsappPhone = s.whatsapp_number ?? WHATSAPP_NUMBER;
  const facebookUrl = s.facebook_url ?? FACEBOOK_URL;
  const instagramUrl = s.instagram_url ?? INSTAGRAM_URL;
  const whatsappLink = getWhatsAppLink(whatsappPhone, 'مرحباً، أريد الاستفسار عن منتجاتكم.');

  return (
    <div className="min-h-screen bg-cream md:bg-[#F9F7FC] pb-24" dir="rtl">

      <div className="max-w-6xl mx-auto px-4 mt-8 md:mt-24 space-y-12 md:space-y-20">
        
        {/* ── BLOCK 1: THE STORY ── */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-white rounded-[3rem] md:rounded-[4rem] border border-primary/10 overflow-hidden shadow-sm relative">
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative bg-gradient-to-br from-primary to-primary-dark p-12 md:p-20 flex flex-col items-center justify-center text-center overflow-hidden min-h-[450px]">
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[4rem] bg-white/10 backdrop-blur-md border-2 border-white/20 p-2 shadow-2xl">
                         <div className="absolute inset-0 bg-gold/10 rounded-[4rem] blur-2xl animate-pulse" />
                         <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-white">
                            <Image src="/images/logo.jpg" alt="Elite and More" fill className="object-cover" />
                         </div>
                    </div>
                </div>

                <div className="p-10 md:p-20 flex flex-col justify-center gap-8 bg-white/40">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-tajawal text-[10px] font-black uppercase tracking-tighter">
                            <Sparkles className="w-3 h-3" />
                            قصتنا ورؤيتنا
                        </span>
                        <h2 className="font-cairo font-black text-3xl md:text-5xl text-elite-text leading-tight uppercase">
                            Elite and More <br/>
                            <span className="text-gold italic">وجهتك للتميز</span>
                        </h2>
                    </div>

                    {s.about_full && (
                        <p className="font-tajawal text-elite-muted leading-[2.2] text-sm md:text-lg whitespace-pre-wrap">
                            {s.about_full}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* ── BLOCK 2: OUR VALUES ── */}
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <p className="font-tajawal text-primary font-black text-xs uppercase tracking-[0.3em]">Core Values</p>
                <h3 className="font-cairo font-black text-2xl md:text-4xl text-elite-text">القيم التي نعتز بها</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {values.map((v, i) => (
                    <div key={v.title} className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-elite-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
                        {/* Decorative number */}
                        <span className="absolute -top-4 -left-4 text-8xl font-black text-primary/5 group-hover:text-primary/[0.08] transition-colors">0{i+1}</span>
                        
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <v.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-cairo font-black text-lg text-elite-text">{v.title}</h4>
                                <p className="font-tajawal text-sm text-elite-muted leading-relaxed">{v.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* ── BLOCK 3: CONTACT & SUPPORT ── */}
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] border border-elite-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-10 md:p-16 space-y-10">
                    <div className="space-y-3">
                        <h3 className="font-cairo font-black text-2xl md:text-3xl text-elite-text">تواصل معنا دائماً</h3>
                        <p className="font-tajawal text-elite-muted text-sm">نحن متاحون للرد على استفساراتكم عبر كافة الوسائل المتاحة</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[{I:Phone, l:'رقم الهاتف', v:s.contact_phone}, {I:Clock, l:'ساعات العمل', v:s.working_hours}, {I:MapPin, l:'العنوان', v:s.contact_address}].map((c,idx)=>(
                            c.v && (
                                <div key={idx} className="flex items-center gap-5 p-5 rounded-3xl bg-surface-dim/50 border border-elite-border group hover:bg-white hover:border-primary/20 transition-all">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-elite-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <c.I className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-elite-muted font-black uppercase tracking-widest mb-0.5">{c.l}</p>
                                        <p className="font-tajawal font-bold text-base text-elite-text" dir="ltr">{c.v}</p>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-gold/5 p-10 md:p-16 flex flex-col justify-center gap-6 border-r border-elite-border/50">
                    <div className="text-center md:text-right space-y-2 mb-4">
                        <h4 className="font-cairo font-black text-xl text-primary">ابدأ المحادثة</h4>
                        <p className="font-tajawal text-xs text-elite-muted">اختر الوسيلة التي تفضلها للتواصل السريع</p>
                    </div>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 bg-[#25D366] hover:bg-[#20bd5c] text-white font-tajawal font-black py-5 px-8 rounded-3xl transition-all shadow-xl shadow-green-500/20 active:scale-95 group"
                    >
                        <div className="flex items-center gap-4">
                            <MessageCircle className="w-7 h-7" />
                            <span className="text-lg">واتساب مباشر</span>
                        </div>
                        <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
                    </a>

                    {facebookUrl && (
                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-tajawal font-black py-5 px-8 rounded-3xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 group"
                        >
                            <div className="flex items-center gap-4">
                                <Facebook className="w-7 h-7" />
                                <span className="text-lg">فيسبوك</span>
                            </div>
                            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
                        </a>
                    )}

                    {instagramUrl && (
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white font-tajawal font-black py-5 px-8 rounded-3xl transition-all shadow-xl shadow-purple-500/20 active:scale-95 group"
                        >
                            <div className="flex items-center gap-4">
                                <Instagram className="w-7 h-7" />
                                <span className="text-lg">إنستغرام</span>
                            </div>
                            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
