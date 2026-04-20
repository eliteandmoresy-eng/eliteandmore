'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, Menu, ChevronDown, X, Package, Home, Tag, Info, LayoutGrid } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import Logo from '@/components/ui/Logo';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { Brand } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const brandsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = useCartStore((s) => s.totalItems());
  const favCount = useFavoritesStore((s) => s.count());

  useEffect(() => {
    fetch('/api/brands')
      .then((r) => r.json())
      .then((d) => { if (d.data) setBrands(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandsRef.current && !brandsRef.current.contains(e.target as Node)) {
        setBrandsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setBrandsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* ── Full-screen mobile search overlay ── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-primary flex flex-col md:hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن أي منتج..."
                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 pe-10 text-sm font-tajawal text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-white/70" />
              </button>
            </form>
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="p-2.5 rounded-xl bg-white/10 text-white flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center text-white/50 font-tajawal text-sm">
            اكتب للبحث في المنتجات
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-primary border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center h-[64px] md:h-[76px] justify-between relative px-2">
            
            {/* ── MOBILE HAMBURGER (Right side in RTL) ── */}
            <div className="flex items-center md:hidden order-1 min-w-[110px] justify-start">
              <button
                onClick={() => setMobileOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/10 text-white transition-colors"
                aria-label="القائمة"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* ── LOGO (Centered on mobile) ── */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start order-2">
              <Logo size="sm" />
            </div>

            {/* ── DESKTOP NAV (Hidden on mobile) ── */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center order-3">
              <Link
                href="/"
                className={cn(
                  'relative px-4 py-2 text-sm font-tajawal font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5',
                  isActive('/') ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <Home className="w-4 h-4" />
                الرئيسية
                {isActive('/') && <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-4 h-0.5 bg-gold rounded-full" />}
              </Link>

              <Link
                href="/shop"
                className={cn(
                  'relative px-4 py-2 text-sm font-tajawal font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5',
                  isActive('/shop') ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <Package className="w-4 h-4" />
                كل المنتجات
                {isActive('/shop') && <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-4 h-0.5 bg-gold rounded-full" />}
              </Link>

              <div className="relative" ref={brandsRef}>
                <button
                  onClick={() => setBrandsOpen(!brandsOpen)}
                  onMouseEnter={() => setBrandsOpen(true)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-tajawal font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5',
                    pathname.startsWith('/brands') ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  <Tag className="w-4 h-4" />
                  البرندات
                  <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', brandsOpen && 'rotate-180')} />
                </button>

                {brandsOpen && (
                  <div 
                    onMouseLeave={() => setBrandsOpen(false)}
                    className="absolute top-full right-0 mt-1 w-56 bg-primary border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in"
                  >
                    <Link
                      href="/brands"
                      onClick={() => setBrandsOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-tajawal font-bold text-white hover:bg-white/10 transition-colors border-b border-white/10 mb-1"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      عرض كل البرندات
                    </Link>
                    {brands.map((brand) => (
                      <Link
                        key={brand.id}
                        href={`/brands/${brand.slug}`}
                        onClick={() => setBrandsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-tajawal text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {brand.logo_url && (
                          <div className="relative w-5 h-5 flex-shrink-0">
                            <Image src={brand.logo_url} alt={brand.name} fill className="object-contain" sizes="20px" />
                          </div>
                        )}
                        {brand.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={cn(
                  'relative px-4 py-2 text-sm font-tajawal font-semibold rounded-xl transition-colors whitespace-nowrap flex items-center gap-1.5',
                  isActive('/about') ? 'text-white bg-white/20' : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <Info className="w-4 h-4" />
                من نحن
              </Link>
            </nav>

            {/* ── ACTIONS (Left side in RTL) ── */}
            <div className="flex items-center gap-1 order-4 min-w-[110px] justify-end">
              {/* Mobile Actions Only */}
              <div className="flex md:hidden items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/10 text-white active:scale-95 transition-transform"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Link
                  href="/favorites"
                  className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white/10 text-white active:scale-95 transition-transform"
                >
                  <Heart className="w-5 h-5" />
                  {mounted && favCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border border-primary" />
                  )}
                </Link>

                <Link
                  href="/cart"
                  className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white text-primary shadow-lg shadow-black/20 active:scale-95 transition-transform"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-gold text-primary-dark text-[9px] font-black rounded-full flex items-center justify-center px-1 border-2 border-primary">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Desktop Actions Only */}
              <div className="hidden md:flex items-center gap-2">
                {searchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center gap-2 animate-fade-in">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث..."
                        className="rounded-full bg-white/10 border border-white/20 px-4 py-2 w-48 text-sm font-tajawal text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium placeholder:text-white/40"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    </div>
                  </form>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                )}
                
                <Link href="/favorites" className="relative p-2.5 rounded-xl hover:bg-white/10 text-white transition-colors">
                  <Heart className="w-5 h-5" />
                  {mounted && favCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full border border-primary" />
                  )}
                </Link>

                <Link href="/cart" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary hover:bg-gold hover:text-primary-dark transition-all shadow-lg shadow-black/10">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-tajawal font-bold text-sm">
                    {mounted && cartCount > 0 ? cartCount : 'السلة'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} brands={brands} />
    </>
  );
}
