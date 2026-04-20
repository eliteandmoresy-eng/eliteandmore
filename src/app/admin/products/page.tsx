'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, ChevronRight, ChevronLeft, Search, Filter, Box, Tag, Building2, ImageIcon, MoreVertical, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { Brand, Category, Product } from '@/types';
import { formatSYP } from '@/lib/utils';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [filterBrand, setFilterBrand] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/brands?all=true')
      .then((r) => r.json())
      .then((d) => setBrands(d.data ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!filterBrand) {
      setCategories([]);
      setFilterCategory('');
      return;
    }
    fetch(`/api/categories?brand_id=${filterBrand}`)
      .then((r) => r.json())
      .then((d) => setCategories(d.data ?? []))
      .catch(() => {});
    setFilterCategory('');
  }, [filterBrand]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '20');
      if (filterBrand) params.set('brand_id', filterBrand);
      if (filterCategory) params.set('category_id', filterCategory);
      if (filterStatus) params.set('is_active', filterStatus === 'active' ? 'true' : 'false');
      if (search) params.set('search', search);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.data ?? []);
      setTotalPages(data.pagination?.totalPages ?? 1);
      setTotalItems(data.pagination?.totalItems ?? 0);
    } catch {
      toast.error('فشل تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  }, [page, filterBrand, filterCategory, filterStatus, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف المنتج بنجاح');
      setDeleteId(null);
      fetchProducts();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const deletingProduct = products.find((p) => p.id === deleteId);

  const brandOptions = [
    { value: '', label: 'جميع البرندات' },
    ...brands.map((b) => ({ value: b.id, label: b.name })),
  ];
  const categoryOptions = [
    { value: '', label: 'جميع التصنيفات' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];
  const statusOptions = [
    { value: '', label: 'جميع الحالات' },
    { value: 'active', label: 'منتجات فعالة' },
    { value: 'inactive', label: 'منتجات معطلة' },
  ];

  return (
    <div dir="rtl" className="font-tajawal space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">المنتجات</h1>
          <p className="text-sm text-elite-muted mt-1">تتبع المخزون والأسعار وإدارة عرض المنتجات</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </Link>
      </div>

      {/* Stats & Filters */}
      <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-elite-muted" />
              <input
                type="text"
                placeholder="بحث باسم المنتج أو الكود..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pr-12 pl-4 py-3.5 bg-white border-none rounded-2xl shadow-soft focus:ring-2 focus:ring-gold/30 transition-all text-sm"
              />
            </div>
            <div className="bg-white rounded-2xl shadow-soft px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 text-primary rounded-xl">
                  <Box className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-elite-muted">إجمالي المنتجات</span>
              </div>
              <span className="text-xl font-bold text-elite-text">{totalItems}</span>
            </div>
            <div className="bg-white rounded-2xl shadow-soft px-4 py-3.5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/5 text-gold rounded-xl">
                  <Filter className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-elite-muted">تصفية ذكية</span>
              </div>
              <Badge variant="gold" size="sm" className="font-bold">متاح</Badge>
            </div>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Select
              options={brandOptions}
              value={filterBrand}
              onChange={(e) => { setFilterBrand(e.target.value); setPage(1); }}
              className="bg-white border-none shadow-soft text-xs font-bold"
              placeholder="تصفية بالبرند"
            />
            <Select
              options={categoryOptions}
              value={filterCategory}
              disabled={!filterBrand}
              onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
              className="bg-white border-none shadow-soft text-xs font-bold disabled:opacity-50"
              placeholder="تصفية بالتصنيف"
            />
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="bg-white border-none shadow-soft text-xs font-bold"
              placeholder="تصفية بالحالة"
            />
            <button 
              onClick={() => { setSearch(''); setFilterBrand(''); setFilterCategory(''); setFilterStatus(''); setPage(1); }}
              className="bg-surface-dim text-elite-muted font-bold text-xs rounded-2xl py-3 px-4 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              إعادة تعيين
            </button>
         </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-soft overflow-hidden border border-white/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-dim/30 border-b border-elite-border/50">
                <th className="text-start p-5 text-elite-muted font-bold">المنتج</th>
                <th className="text-start p-5 text-elite-muted font-bold">البرند / التصنيف</th>
                <th className="text-start p-5 text-elite-muted font-bold text-center">السعر</th>
                <th className="text-start p-5 text-elite-muted font-bold text-center">الحالة</th>
                <th className="text-center p-5 text-elite-muted font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-elite-border/40">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="flex gap-4"><div className="w-16 h-16 bg-surface-dim rounded-2xl" /><div className="space-y-2 mt-2"><div className="h-4 w-40 bg-surface-dim rounded"/><div className="h-3 w-20 bg-surface-dim rounded"/></div></div></td>
                    <td className="p-5"><div className="h-5 w-24 bg-surface-dim rounded-md"/></td>
                    <td className="p-5 text-center"><div className="h-6 w-20 bg-surface-dim rounded-md mx-auto"/></td>
                    <td className="p-5 text-center"><div className="h-5 w-12 bg-surface-dim rounded-full mx-auto"/></td>
                    <td className="p-5 text-center"><div className="h-8 w-24 bg-surface-dim rounded-xl mx-auto"/></td>
                  </tr>
                ))
              ) : products.length > 0 ? (
                products.map((product) => {
                  const primaryImg = product.images?.find((i) => i.is_primary)?.url ?? product.images?.[0]?.url;
                  return (
                    <tr key={product.id} className="group hover:bg-surface-dim/30 transition-all duration-300">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                            {primaryImg ? (
                              <Image src={primaryImg} alt={product.name} fill className="object-cover" sizes="64px" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-elite-muted/40">
                                <ImageIcon className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-elite-text text-base leading-tight line-clamp-1 mb-1">{product.name}</p>
                            <div className="flex items-center gap-1.5 grayscale opacity-60">
                               <Tag className="w-3 h-3 text-gold" />
                               <span className="text-[10px] font-bold uppercase tracking-wider">{product.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                         <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-elite-text">
                               <Building2 className="w-3.5 h-3.5 text-elite-muted" />
                               <span className="font-bold text-xs">{product.brand?.name ?? '—'}</span>
                            </div>
                            <Badge variant="blue" size="sm" className="text-[9px] px-2 py-0.5 border-none font-bold">
                               {product.category?.name ?? 'بدون تصنيف'}
                            </Badge>
                         </div>
                      </td>
                      <td className="p-5 text-center">
                         <div className="flex flex-col items-center">
                             {product.sale_enabled && product.sale_price_syp ? (
                               <>
                                 <span className="text-[10px] text-elite-muted line-through font-bold">{formatSYP(product.price_syp)}</span>
                                 <span className="text-sm font-black text-primary">{formatSYP(product.sale_price_syp)}</span>
                               </>
                             ) : (
                               <span className="text-base font-black text-primary">{formatSYP(product.price_syp)}</span>
                             )}
                         </div>
                      </td>
                      <td className="p-5 text-center">
                        <Badge variant={product.is_active ? 'success' : 'danger'} size="sm">
                          {product.is_active ? 'فعال' : 'معطل'}
                        </Badge>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 rounded-xl border border-elite-border text-elite-text hover:bg-gold hover:border-gold hover:text-primary-dark transition-all"
                            title="تعديل"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                   <td colSpan={5} className="p-12 text-center text-elite-muted font-bold">لم يتم العثور على أي منتجات</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Desktop */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-8 py-5 border-t border-elite-border/40 bg-surface-dim/20">
            <p className="text-xs text-elite-muted font-bold">
              عرض من <span className="text-elite-text">{(page - 1) * 20 + 1}</span> إلى <span className="text-elite-text">{Math.min(page * 20, totalItems)}</span> من أصل <span className="text-elite-text">{totalItems}</span> منتج
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-10 h-10 rounded-xl border border-elite-border flex items-center justify-center hover:bg-white transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                   const pNum = page > 3 ? (page - 2 + i > totalPages ? totalPages - 4 + i : page - 2 + i) : i + 1;
                   if (pNum <= 0) return null;
                   return (
                      <button
                        key={pNum}
                        onClick={() => setPage(pNum)}
                        className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${page === pNum ? 'bg-gold text-primary-dark shadow-gold/20' : 'hover:bg-white'}`}
                      >
                        {pNum}
                      </button>
                   );
                 })}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-10 h-10 rounded-xl border border-elite-border flex items-center justify-center hover:bg-white transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Feed */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[28px] p-5 animate-pulse space-y-4">
               <div className="flex gap-4">
                  <div className="w-16 h-16 bg-surface-dim rounded-2xl" />
                  <div className="flex-1 space-y-2 mt-1">
                    <div className="h-4 w-32 bg-surface-dim rounded" />
                    <div className="h-3 w-20 bg-surface-dim rounded" />
                  </div>
               </div>
               <div className="h-10 bg-surface-dim rounded-2xl w-full" />
            </div>
          ))
        ) : products.map((product) => {
          const primaryImg = product.images?.find((i) => i.is_primary)?.url ?? product.images?.[0]?.url;
          return (
            <div key={product.id} className="bg-white rounded-[32px] p-5 shadow-soft border border-white active:scale-[0.98] transition-all relative overflow-hidden group">
               <div className="flex items-start gap-4 mb-5">
                  <div className="relative w-20 h-20 rounded-[22px] overflow-hidden border border-elite-border bg-gray-50 flex-shrink-0">
                    {primaryImg ? (
                      <Image src={primaryImg} alt={product.name} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-elite-muted/20">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                     <div className="flex items-start justify-between mb-1">
                        <Badge variant={product.is_active ? 'success' : 'danger'} size="sm" className="text-[8px] px-1.5 py-0 min-h-0 h-4 border-none font-black uppercase">
                          {product.is_active ? 'متاح' : 'مخفي'}
                        </Badge>
                        <span className="text-[10px] font-black text-elite-muted tracking-tighter">#{product.slug.split('-').pop()}</span>
                     </div>
                     <p className="font-bold text-elite-text text-base leading-tight mb-2 line-clamp-2">{product.name}</p>
                     
                     <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-elite-muted bg-surface-dim px-2 py-0.5 rounded-lg">{product.brand?.name}</span>
                        {product.category && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">{product.category.name}</span>}
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between p-4 bg-surface-dim/40 rounded-[24px] mb-5">
                  <div>
                     <p className="text-[10px] font-bold text-elite-muted mb-0.5 leading-none">السعر الحالي</p>
                     <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-primary leading-none">{formatSYP(product.sale_enabled && product.sale_price_syp ? product.sale_price_syp : product.price_syp)}</span>
                        {(product.sale_enabled && product.sale_price_syp) && (
                           <span className="text-[10px] text-elite-muted line-through font-bold">{formatSYP(product.price_syp)}</span>
                        )}
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Link
                       href={`/admin/products/${product.id}/edit`}
                       className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-elite-text active:bg-gold transition-colors"
                     >
                       <Pencil className="w-4 h-4" />
                     </Link>
                     <button
                       onClick={() => setDeleteId(product.id)}
                       className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-500 active:bg-red-500 active:text-white transition-colors"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               <Link 
                 href={`/products/${product.slug}`}
                 target="_blank"
                 className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-white font-bold text-xs hover:opacity-90 transition-opacity"
               >
                 <ExternalLink className="w-3.5 h-3.5" />
                 معاينة في المتجر
               </Link>
            </div>
          );
        })}

        {/* Mobile Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 py-4 px-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white shadow-soft font-bold text-xs disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
              السابق
            </button>
            <div className="px-4 py-2 bg-white rounded-xl shadow-soft text-xs font-black">
               {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white shadow-soft font-bold text-xs disabled:opacity-30"
            >
              التالي
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="حذف المنتج نهائياً"
        message={`هل أنت متأكد من حذف "${deletingProduct?.name}"؟ هذا الإجراء سيقوم بحذف كافة الصور والبيانات المرتبطة بالمنتج ولا يمكن التراجع عنه.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

