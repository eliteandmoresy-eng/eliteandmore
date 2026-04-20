'use client';
import { Truck, Wallet, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Truck,
    title: 'شحن لكل سوريا',
    subtitle: 'نوصل لجميع المحافظات',
    color: 'primary'
  },
  {
    icon: Wallet,
    title: 'دفع عند الاستلام',
    subtitle: 'ادفع لمّا توصلك الطلبية',
    color: 'gold'
  },
  {
    icon: ShieldCheck,
    title: 'منتجات أصلية 100%',
    subtitle: 'جميع منتجاتنا مضمونة',
    color: 'primary'
  },
  {
    icon: Headphones,
    title: 'خدمة عملاء',
    subtitle: 'متاحون للمساعدة دائماً',
    color: 'gold'
  },
];

export default function FeaturesStrip() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-white py-6 md:py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map(({ icon: Icon, title, subtitle, color }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full flex flex-col md:flex-row items-center md:items-start gap-4 p-5 md:p-6 rounded-[2.5rem] bg-surface-dim/40 border border-elite-border/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 text-center md:text-right overflow-hidden">
                
                {/* Icon Container with Glow */}
                <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110
                  ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold-dark'}
                `}>
                   <div className={`absolute inset-0 rounded-2xl blur-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 
                    ${color === 'primary' ? 'bg-primary/20' : 'bg-gold/20'}
                   `} />
                   <Icon className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
                </div>

                <div className="space-y-1 relative z-10 mt-2 md:mt-0">
                  <h3 className="font-cairo font-black text-sm md:text-base text-elite-text group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="font-tajawal text-[11px] md:text-xs text-elite-muted leading-relaxed">
                    {subtitle}
                  </p>
                </div>
                
                {/* Abstract Background shape */}
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/50 rounded-full blur-2xl group-hover:bg-white transition-all" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
