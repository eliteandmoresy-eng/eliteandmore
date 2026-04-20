'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Home, Package, Layers, Info, Heart, ShoppingCart, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';
import { Brand } from '@/types';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  brands: Brand[];
}

export default function MobileMenu({ open, onClose, brands }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <div className="fixed inset-0 z-[70] flex md:hidden" dir="rtl">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Drawer — slides from right (Start in RTL) */}
      <div className="relative me-auto w-80 max-w-[85vw] bg-primary h-full shadow-2xl animate-slide-in-right flex flex-col border-e border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1.5 scrollbar-hide">

          {/* الرئيسية */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-tajawal font-bold transition-all',
              isActive('/') ? 'bg-white text-primary shadow-lg shadow-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            الرئيسية
          </Link>

          {/* كل المنتجات */}
          <Link
            href="/shop"
            className={cn(
              'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-tajawal font-bold transition-all',
              isActive('/shop') ? 'bg-white text-primary shadow-lg shadow-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            <Package className="w-5 h-5 flex-shrink-0" />
            كل المنتجات
          </Link>

          {/* المفضلة */}
          <Link
            href="/favorites"
            className={cn(
              'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-tajawal font-bold transition-all',
              isActive('/favorites') ? 'bg-white text-primary shadow-lg shadow-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            <Heart className="w-5 h-5 flex-shrink-0" />
            المفضلة
          </Link>

          {/* السلة */}
          <Link
            href="/cart"
            className={cn(
              'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-tajawal font-bold transition-all',
              isActive('/cart') ? 'bg-white text-primary shadow-lg shadow-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'
            )}
          >
            <ShoppingCart className="w-5 h-5 flex-shrink-0" />
            سلة الشراء
          </Link>

          {/* ── البرندات ── */}
          {brands.length > 0 && (
            <div className="pt-5">
              <div className="flex items-center justify-between px-4 pb-3">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] font-tajawal">
                  البرندات المميزة
                </span>
                <Link
                  href="/brands"
                  className="text-[11px] font-tajawal font-black text-gold hover:text-white flex items-center gap-0.5 transition-colors"
                >
                  عرض الكل
                  <ChevronLeft className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-1">
                {brands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/brands/${brand.slug}`}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-xl font-tajawal text-sm transition-all',
                      pathname === `/brands/${brand.slug}`
                        ? 'bg-white/20 text-white font-bold ring-1 ring-white/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {brand.logo_url && (
                      <div className="relative w-7 h-7 flex-shrink-0 rounded-lg overflow-hidden bg-white/20 p-0.5">
                        <Image
                          src={brand.logo_url}
                          alt={brand.name}
                          fill
                          className="object-contain"
                          sizes="28px"
                        />
                      </div>
                    )}
                    {!brand.logo_url && <Layers className="w-4 h-4 text-white/30 flex-shrink-0" />}
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── من نحن ── */}
          <div className="pt-4 mt-2 border-t border-white/10">
            <Link
              href="/about"
              className={cn(
                'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-tajawal font-bold transition-all',
                isActive('/about') ? 'bg-white text-primary shadow-lg shadow-white/10' : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              <Info className="w-5 h-5 flex-shrink-0" />
              من نحن
            </Link>
          </div>
        </nav>

        {/* Footer Credit in Menu */}
        <div className="p-6 text-center border-t border-white/5 bg-black/10">
           <p className="text-[10px] font-tajawal text-white/30 uppercase tracking-widest font-black">Elite & More — 2026</p>
        </div>
      </div>
    </div>
  );
}
