'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { SlidersHorizontal, X, Search, Sparkles, Flame, Zap } from 'lucide-react';
import { Governorate, Product } from '@/types';
import { formatSYP, cn } from '@/lib/utils';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import Switch from '@/components/ui/Switch';

interface Brand {
  id: string;
  name: string;
  slug: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 12, total: 0, totalPages: 1 });

  // Filter state
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [governorate, setGovernorate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [available, setAvailable] = useState(false);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);

  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load filter options once and handle initial tag
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    if (tag) setSelectedTag(tag);
    const brand = urlParams.get('brand');
    if (brand) setSelectedBrands([brand]);

    Promise.all([
      fetch('/api/brands').then((r) => r.json()),
      fetch('/api/governorates').then((r) => r.json()),
    ]).then(([brandsData, govData]) => {
      setBrands(brandsData.data ?? []);
      setGovernorates(govData.data ?? []);
    });
  }, []);

  // Debounce search
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [search]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedBrands.length === 1) params.set('brand', selectedBrands[0]);
    if (governorate) params.set('governorate', governorate);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (available) params.set('available', 'true');
    if (selectedTag) params.set('tag', selectedTag);

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
  }, [debouncedSearch, selectedBrands, governorate, minPrice, maxPrice, available, sort, page, selectedTag]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const activeFilterCount =
    selectedBrands.length +
    (governorate ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (available ? 1 : 0) +
    (debouncedSearch ? 1 : 0) +
    (selectedTag ? 1 : 0);

  const sidebar = (
    <div className="bg-white rounded-2xl p-4 shadow-card flex flex-col gap-5">
      {/* Classification filter */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-elite-text font-tajawal">التصنيفات</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'كل المنتجات', value: null },
            { label: 'وصل حديثاً', value: 'new', icon: <Sparkles className="w-3 h-3 text-gold" /> },
            { label: 'الأكثر مبيعاً', value: 'popular', icon: <Flame className="w-3 h-3 text-orange-500" /> },
            { label: 'عروض خاصة', value: 'sale', icon: <Zap className="w-3 h-3 text-emerald-400" /> },
          ].map((t) => (
            <button
              key={t.label}
              onClick={() => { setSelectedTag(t.value); setPage(1); }}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-tajawal font-medium border transition-all",
                selectedTag === t.value 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-surface-dim text-elite-muted border-elite-border hover:border-primary/30"
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Governorate filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-primary font-tajawal">اختر محافظتك</label>
        <select
          value={governorate}
          onChange={(e) => { setGovernorate(e.target.value); setPage(1); }}
          className="w-full border border-elite-border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all cursor-pointer"
        >
          <option value="">كل المحافظات</option>
          {governorates.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      {/* Brand filter */}
      {brands.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-elite-text font-tajawal">فلتر البرند</p>
          <div className="flex flex-col gap-1.5">
            {brands.map((brand) => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.slug)}
                  onChange={() => toggleBrand(brand.slug)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm font-tajawal text-elite-text">{brand.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price filter */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-elite-text font-tajawal">فلتر السعر</p>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
            placeholder="من (ل.س)"
            className="w-1/2 border border-elite-border rounded-xl px-3 py-2 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all placeholder:text-elite-muted/60"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
            placeholder="إلى (ل.س)"
            className="w-1/2 border border-elite-border rounded-xl px-3 py-2 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all placeholder:text-elite-muted/60"
          />
        </div>
      </div>

      {/* Available only */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-tajawal text-elite-text">المتوفر فقط</span>
        <Switch
          checked={available}
          onChange={(v) => { setAvailable(v); setPage(1); }}
        />
      </div>

      {/* Clear filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => {
            setSearch('');
            setDebouncedSearch('');
            setSelectedBrands([]);
            setGovernorate('');
            setMinPrice('');
            setMaxPrice('');
            setAvailable(false);
            setPage(1);
          }}
          className="flex items-center justify-center gap-1.5 text-sm font-tajawal text-red-500 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
          مسح الفلاتر
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-cream py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[{ label: 'الرئيسية', href: '/' }, { label: 'المتجر' }]}
          className="mb-6"
        />

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-cairo font-black text-3xl text-elite-text">المتجر</h1>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden flex items-center gap-2 border border-elite-border rounded-xl px-4 py-2 text-sm font-tajawal text-elite-text bg-white relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            الفلاتر
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -end-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-tajawal">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile sidebar overlay */}
        {filtersOpen && (
          <div className="md:hidden mb-6">
            {sidebar}
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0 sticky top-24 self-start">
            {sidebar}
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Above grid controls */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <span className="text-sm font-tajawal text-elite-muted">
                {pagination.total} منتج
              </span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="border border-elite-border rounded-xl px-4 py-2 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all cursor-pointer"
              >
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="price_asc">السعر ↑</option>
                <option value="price_desc">السعر ↓</option>
                <option value="name">الاسم</option>
              </select>
            </div>

            <ProductGrid products={products} loading={loading} emptyMessage="لا توجد منتجات تطابق الفلاتر المحددة" />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-elite-border rounded-xl text-sm font-tajawal text-elite-text bg-white hover:bg-surface-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  السابقة
                </button>
                <span className="px-4 py-2 text-sm font-tajawal text-elite-text font-semibold">
                  الصفحة {page} من {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 border border-elite-border rounded-xl text-sm font-tajawal text-elite-text bg-white hover:bg-surface-dim disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  التالية
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
