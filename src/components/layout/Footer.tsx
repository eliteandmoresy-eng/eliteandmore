'use client';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { Phone, MapPin, Clock, Facebook, Instagram, MessageCircle, Home, ShoppingBag, Info, Heart, ShoppingCart, Grid3X3 } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import {
  WHATSAPP_NUMBER,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  CONTACT_PHONE,
  WORKING_HOURS,
} from '@/lib/constants';

export default function Footer() {
  const { settings } = useSettings();
  
  const waNumber = settings.whatsapp_number || WHATSAPP_NUMBER;
  const fbUrl = settings.facebook_url || FACEBOOK_URL;
  const instaUrl = settings.instagram_url || INSTAGRAM_URL;
  const contactPhone = settings.contact_phone || CONTACT_PHONE;
  const workingHours = settings.working_hours || WORKING_HOURS;

  const waLink = `https://wa.me/${waNumber.replace(/\D/g, '')}`;

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Logo + About */}
          <div className="space-y-4">
            <Logo size="md" dark />
            <p className="text-sm leading-relaxed text-white/75 font-tajawal">
              وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا. جودة تثق بها وخدمة تستحقها.
            </p>
            <p className="text-gold-light text-sm italic font-inter">
              The Best In your Hands
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-white">روابط سريعة</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'الرئيسية', icon: Home },
                { href: '/shop', label: 'المتجر', icon: ShoppingBag },
                { href: '/brands', label: 'البرندات', icon: Grid3X3 },
                { href: '/about', label: 'من نحن', icon: Info },
                { href: '/favorites', label: 'المفضلة', icon: Heart },
                { href: '/cart', label: 'السلة', icon: ShoppingCart },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2.5 text-sm font-tajawal text-white/75 hover:text-white transition-all hover:pr-1 group"
                  >
                    <link.icon className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-white">التواصل</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contactPhone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2.5 text-sm font-tajawal text-white/75 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span dir="ltr">{contactPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-tajawal text-white/75 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                  واتساب — تواصل معنا
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm font-tajawal text-white/75">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>سوريا</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm font-tajawal text-white/75">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{workingHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social + Promise */}
          <div className="space-y-4">
            <h3 className="font-cairo font-bold text-lg text-white">تابعنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] rounded-xl text-sm font-tajawal font-semibold hover:bg-[#166fe5] transition-colors"
              >
                <Facebook className="w-5 h-5" />
                فيسبوك
              </a>

              <a
                href={instaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-xl text-sm font-tajawal font-semibold hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
                إنستغرام
              </a>
            </div>

            <div className="border border-gold/40 rounded-xl p-4 mt-4 space-y-1">
              <p className="text-gold font-cairo font-bold text-sm">وعدنا بالجودة</p>
              <p className="text-white/65 text-xs font-tajawal leading-relaxed">
                كل منتج نبيعه أصلي 100% ونضمن وصوله إليك بأمان لكل محافظات سوريا.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15 py-5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm font-tajawal text-white/60">
          جميع الحقوق محفوظة © 2026 Elite and More
        </div>
      </div>
    </footer>
  );
}
