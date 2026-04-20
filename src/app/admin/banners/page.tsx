'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Eye, EyeOff, Layout, Link as LinkIcon, Settings2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Banner } from '@/types';
import { bannerSchema } from '@/lib/validators';
import { cn } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Badge from '@/components/ui/Badge';

type BannerFormData = z.infer<typeof bannerSchema>;

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: '',
      image_url: '',
      link_url: '',
      link_target: 'internal',
      sort_order: 0,
      is_active: true,
    },
  });

  const imageUrl = watch('image_url');
  const linkUrl = watch('link_url');

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      setBanners(data.data ?? []);
    } catch {
      toast.error('فشل تحميل البانرات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const openAdd = () => {
    reset({ title: '', image_url: '', link_url: '', link_target: 'internal', sort_order: banners.length, is_active: true });
    setEditingId(null);
    setModalOpen(true);
  };

  const openEdit = (banner: Banner) => {
    reset({
      title: banner.title ?? '',
      image_url: banner.image_url,
      link_url: banner.link_url ?? '',
      link_target: banner.link_target,
      sort_order: banner.sort_order,
      is_active: banner.is_active,
    });
    setEditingId(banner.id);
    setModalOpen(true);
  };

  const toggleActive = async (banner: Banner) => {
    setToggling(banner.id);
    try {
      const res = await fetch(`/api/banners/${banner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !banner.is_active }),
      });
      if (!res.ok) throw new Error('فشل التحديث');
      fetchBanners();
    } catch {
      toast.error('فشل تغيير الحالة');
    } finally {
      setToggling(null);
    }
  };

  const onSubmit = async (data: BannerFormData) => {
    try {
      const url = editingId ? `/api/banners/${editingId}` : '/api/banners';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success(editingId ? 'تم تحديث الصورة بنجاح' : 'تم إضافة الصورة بنجاح');
      setModalOpen(false);
      fetchBanners();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/banners/${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'فشل الحذف');
      }
      toast.success('تم حذف الصورة بنجاح');
      setDeleteId(null);
      fetchBanners();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const sortOptions = Array.from({ length: Math.max(banners.length + 1, 10) }, (_, i) => ({
    label: `المركز ${i + 1}`,
    value: i.toString(),
  }));

  const linkTargetOptions = [
    { value: 'internal', label: 'داخلي' },
    { value: 'external', label: 'خارجي' },
    { value: 'none', label: 'لا شيء' },
  ];

  return (
    <div dir="rtl" className="font-tajawal space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text">سلايدر الصور</h1>
          <p className="text-sm text-elite-muted mt-1">إدارة الصور المتحركة التي تظهر في الواجهة الرئيسية للمتجر</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center justify-center gap-2 bg-gold text-primary-dark font-bold px-6 py-3 rounded-2xl hover:bg-gold-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-gold/20 text-sm whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          إضافة صورة جديدة
        </button>
      </div>

      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-[24px] border border-primary/10 text-sm text-primary font-medium">
        <Layout className="w-5 h-5 flex-shrink-0" />
        <p>نصيحة: استخدم صوراً بنسبة 2:1 (مثلاً 1600×800 بكسل) للحصول على أفضل مظهر للسلايدر.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[32px] shadow-soft overflow-hidden animate-pulse">
              <div className="aspect-[2/1] bg-surface-dim" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-48 bg-surface-dim rounded-lg" />
                <div className="h-4 w-32 bg-surface-dim rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white rounded-[40px] shadow-soft p-20 text-center border-2 border-dashed border-elite-border flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-surface-dim flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-elite-muted/40" />
          </div>
          <p className="text-elite-muted font-bold text-lg">لا توجد صور في السلايدر حالياً</p>
          <Button variant="gold" onClick={openAdd} size="sm" className="rounded-xl mt-2 px-8">ابدأ بإضافة أول صورة</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div key={banner.id} className="group bg-white rounded-[32px] shadow-soft overflow-hidden border border-white hover:border-gold/30 hover:shadow-gold/10 transition-all duration-500">
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={banner.image_url}
                  alt={banner.title ?? ''}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Status Overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge variant={banner.is_active ? 'success' : 'danger'} className="shadow-lg backdrop-blur-md bg-white/90">
                    {banner.is_active ? 'مفعّل' : 'معطّل'}
                  </Badge>
                  <span className="bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-lg">
                    المركز {banner.sort_order + 1}
                  </span>
                </div>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                   <button
                    onClick={() => openEdit(banner)}
                    className="w-12 h-12 bg-white text-primary-dark rounded-full flex items-center justify-center hover:bg-gold transition-colors shadow-xl"
                    title="تعديل"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(banner.id)}
                    className="w-12 h-12 bg-white text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-xl"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-bold text-elite-text text-lg truncate">
                      {banner.title || <span className="text-elite-muted/50 font-normal italic">بدون عنوان</span>}
                    </p>
                    {banner.link_url && (
                      <div className="flex items-center gap-1.5 text-elite-muted mt-1">
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span className="text-xs truncate max-w-[200px]">{banner.link_url}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleActive(banner)}
                    disabled={toggling === banner.id}
                    className={cn(
                      'p-2 rounded-xl border transition-all duration-300',
                      banner.is_active
                        ? 'border-orange-100 text-orange-500 hover:bg-orange-50'
                        : 'border-green-100 text-green-500 hover:bg-green-50'
                    )}
                    title={banner.is_active ? 'إخفاء من الواجهة' : 'إظهار في الواجهة'}
                  >
                    {banner.is_active ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Tool */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'تعديل بيانات الصورة' : 'إضافة صورة جديدة للسلايدر'}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
          {/* Section: Content */}
          <div className="space-y-5">
             <div className="flex items-center gap-2 text-elite-text mb-1">
              <ImageIcon className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">محتوى السلايدر</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-elite-text">
                  الصورة <span className="text-red-500 mr-1">*</span>
                </label>
                <span className="text-[10px] text-elite-muted bg-surface-dim px-2 py-1 rounded-lg">يفضل 1600×800 بكسل</span>
              </div>
              <Controller
                name="image_url"
                control={control}
                render={() => (
                  <ImageUploader
                    images={imageUrl ? [imageUrl] : []}
                    onImagesChange={(imgs) => setValue('image_url', imgs[0] ?? '', { shouldValidate: true })}
                    maxImages={1}
                    folder="banners"
                  />
                )}
              />
              {errors.image_url && (
                <p className="text-xs text-red-500 font-medium">{errors.image_url.message}</p>
              )}
            </div>

            <Input
              label="العنوان (يظهر في لوحة التحكم فقط)"
              placeholder="مثال: عرض الصيف"
              error={errors.title?.message}
              {...register('title')}
              className="bg-surface-dim/50 border-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <div className="h-px bg-elite-border/50" />

          {/* Section: Redirection */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <LinkIcon className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">الرابط والتحويل</span>
            </div>

            <Input
              label="رابط الانتقال (URL)"
              placeholder="https://elitedz.com/category/..."
              error={errors.link_url?.message}
              {...register('link_url')}
              dir="ltr"
              className="bg-surface-dim/50 border-none focus:ring-2 focus:ring-gold/30"
            />

            {linkUrl && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-elite-text">مكان فتح الرابط</label>
                <div className="flex gap-2">
                  {linkTargetOptions.map((opt) => (
                    <label 
                      key={opt.value} 
                      className={cn(
                        "flex-1 flex items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer font-tajawal text-sm font-bold",
                        watch('link_target') === opt.value 
                          ? "border-gold bg-gold/5 text-primary-dark" 
                          : "border-elite-border/50 text-elite-muted hover:border-gold/30"
                      )}
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        {...register('link_target')}
                        className="hidden"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-elite-border/50" />

          {/* Section: Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-elite-text mb-1">
              <Settings2 className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold">الإعدادات</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-elite-text">الترتيب</label>
                <Controller
                  name="sort_order"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={sortOptions}
                      value={field.value.toString()}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      className="bg-surface-dim/50 border-none"
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-dim/30 mt-auto h-[46px]">
                <span className="text-sm font-bold">حالة التفعيل</span>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <Switch checked={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="flex-1 rounded-2xl py-4">
              إلغاء
            </Button>
            <Button type="submit" variant="gold" loading={isSubmitting} className="flex-[2] rounded-2xl py-4 shadow-gold/20">
              حفظ التعديلات
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="حذف الصورة من السلايدر"
        message={`هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء وسيتم إيقاف ظهورها في الواجهة فوراً.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}

