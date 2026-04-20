'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Brand, Category, Governorate, Product } from '@/types';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';

interface BrandPageClientProps {
  brand: Brand & { categories?: Category[] };
  categories: Category[];
}

interface PaginationInfo {
  page: number; limit: number; total: number; totalPages: number;
}

export default function BrandPageClient({ brand, categories }: BrandPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/governorates').then((r) => r.json()).then((d) => setGovernorates(d.data ?? []));
  }, []);

  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('brand', brand.slug);
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (governorate) params.set('governorate', governorate);
    params.set('sort', sort);
    params.set('page', String(page));
    params.set('limit', '12');
    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const json = await res.json();
      setProducts(json.data ?? []);
      setPagination(json.pagination ?? { page: 1, limit: 12, total: 0, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, [brand.slug, activeCategory, debouncedSearch, governorate, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const showTabs = brand.has_categories && categories.length > 0;
  const hasActiveFilters = search || governorate || activeCategory !== 'all';

  const resetFilters = () => {
    setSearch(''); setGovernorate(''); setActiveCategory('all'); setPage(1);
  };

  return (
    <div className="min-h-screen bg-cream pb-24 md:pb-12">

      {/* ── Main content area ── */}
      <div className="max-w-7xl mx-auto px-4 pt-10 relative z-20">
        
        {/* Focused Brand Dashboard - Centered & Integrated */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-up">
          <div className="bg-white/80 backdrop-blur-md rounded-[3.5rem] p-8 md:p-14 border border-elite-border shadow-2xl shadow-black/[0.03] flex flex-col items-center text-center relative overflow-hidden">
            
            {/* Logo (Integrated) */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white border border-elite-border p-3 mb-8 shadow-lg group hover:scale-105 transition-transform duration-500">
              <Image src={brand.logo_url} alt={brand.name} fill className="object-contain" sizes="128px" priority />
            </div>

            {/* Brand Identity */}
            <h1 className="font-cairo font-black text-4xl md:text-6xl text-elite-text mb-4">{brand.name}</h1>
            {brand.description && (
              <p className="font-tajawal text-sm md:text-lg text-elite-muted max-w-2xl leading-relaxed mb-10">
                {brand.description}
              </p>
            )}

            {/* Categories (Integrated & Centered) */}
            {showTabs && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <button
                  onClick={() => { setActiveCategory('all'); setPage(1); }}
                  className={cn(
                    'px-6 py-3.5 md:px-9 md:py-4 rounded-2xl font-tajawal text-sm font-bold transition-all border shadow-sm',
                    activeCategory === 'all'
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-white border-elite-border text-elite-text hover:border-primary/40'
                  )}
                >
                  جميع الأقسام
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCategory(cat.id); setPage(1); }}
                    className={cn(
                      'px-6 py-3.5 md:px-9 md:py-4 rounded-2xl font-tajawal text-sm font-bold transition-all border shadow-sm',
                      activeCategory === cat.id
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white border-elite-border text-elite-text hover:border-primary/40'
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-elite-border p-3 md:p-4 mb-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center shadow-xl shadow-black/[0.03] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="absolute end-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-elite-muted/60 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن منتج معين..."
              className="w-full h-12 md:h-14 border border-elite-border rounded-2xl px-5 pe-12 text-sm font-tajawal text-elite-text bg-white/50 placeholder:text-elite-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
            />
          </div>

          <div className="flex flex-row gap-3">
            {/* Governorate Select */}
            <div className="relative flex-1 md:w-48">
              <select
                value={governorate}
                onChange={(e) => { setGovernorate(e.target.value); setPage(1); }}
                className="w-full h-12 md:h-14 appearance-none border border-elite-border rounded-2xl px-5 text-sm font-tajawal text-elite-text bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary cursor-pointer"
              >
                <option value="">كل المحافظات</option>
                {governorates.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-elite-muted/40 pointer-events-none" />
            </div>

            {/* Sort Select */}
            <div className="relative flex-1 md:w-44">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="w-full h-12 md:h-14 appearance-none border border-elite-border rounded-2xl px-5 text-sm font-tajawal text-elite-text bg-white/50 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary cursor-pointer"
              >
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="price_asc">السعر: الأقل</option>
                <option value="price_desc">السعر: الأعلى</option>
              </select>
              <div className="absolute end-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
            </div>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="h-12 md:h-14 flex items-center justify-center gap-2 text-sm font-tajawal font-bold text-red-500 bg-red-50 border border-red-100 px-6 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
              <X className="w-4 h-4" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>

        {/* ── Products grid ── */}
        <div className="w-full relative min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-elite-border overflow-hidden animate-pulse shadow-sm">
                <div className="aspect-square bg-surface-dim" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-3 bg-surface-dim rounded-full w-3/4" />
                  <div className="h-3 bg-surface-dim rounded-full w-1/2" />
                  <div className="h-10 bg-surface-dim rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6 bg-white/30 backdrop-blur-sm rounded-[3rem] border border-dashed border-elite-border">
            <div className="w-24 h-24 rounded-full bg-surface-dim flex items-center justify-center animate-bounce">
              <Search className="w-10 h-10 text-elite-muted/50" />
            </div>
            <div>
               <p className="font-cairo font-black text-2xl text-elite-text mb-2">لا توجد نتائج مطابقة</p>
               <p className="font-tajawal text-elite-muted">جرّب البحث بكلمات أخرى أو تغيير فلاتر التصفية</p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-8 py-3 rounded-2xl font-tajawal text-sm font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                إعادة ضبط كافة الفلاتر
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 animate-fade-in">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        </div>

        {/* ── Pagination ── */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16 md:mt-20">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-12 h-12 flex items-center justify-center border border-elite-border rounded-2xl bg-white hover:bg-surface-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`dots-${i}`} className="w-12 h-12 flex items-center justify-center text-elite-muted font-tajawal text-lg">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={cn(
                      'w-12 h-12 flex items-center justify-center rounded-2xl font-tajawal text-sm md:text-base font-bold border transition-all shadow-sm',
                      page === p
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10'
                        : 'bg-white border-elite-border text-elite-text hover:border-primary/50'
                    )}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="w-12 h-12 flex items-center justify-center border border-elite-border rounded-2xl bg-white hover:bg-surface-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
