'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Globe, CreditCard, Share2, Info, Save, Settings, Phone, MapPin, Clock, MessageSquare, Facebook, QrCode } from 'lucide-react';
import { settingsSchema } from '@/lib/validators';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Switch from '@/components/ui/Switch';
import Button from '@/components/ui/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import HelpTooltip from '@/components/admin/HelpTooltip';

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [fetching, setFetching] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      exchange_rate_syp: 14000,
      free_shipping_threshold: null,
      whatsapp_number: '',
      facebook_url: '',
      contact_phone: '',
      contact_address: '',
      working_hours: '',
      about_short: '',
      about_full: '',
      sham_cash_enabled: false,
      sham_cash_phone: '',
      sham_cash_account: '',
      sham_cash_barcode_url: '',
    },
  });

  const shamCashEnabled = watch('sham_cash_enabled');
  const shamCashBarcodeUrl = watch('sham_cash_barcode_url');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/settings');
        const json = await res.json();
        if (json.data) {
          const s = json.data;
          reset({
            exchange_rate_syp: s.exchange_rate_syp,
            free_shipping_threshold: s.free_shipping_threshold ?? null,
            whatsapp_number: s.whatsapp_number ?? '',
            facebook_url: s.facebook_url ?? '',
            contact_phone: s.contact_phone ?? '',
            contact_address: s.contact_address ?? '',
            working_hours: s.working_hours ?? '',
            about_short: s.about_short ?? '',
            about_full: s.about_full ?? '',
            sham_cash_enabled: s.sham_cash_enabled ?? false,
            sham_cash_phone: s.sham_cash_phone ?? '',
            sham_cash_account: s.sham_cash_account ?? '',
            sham_cash_barcode_url: s.sham_cash_barcode_url ?? '',
          });
        }
      } catch {
        toast.error('فشل تحميل الإعدادات');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [reset]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'فشل الحفظ');
      toast.success('تم حفظ الإعدادات بنجاح');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'فشل الحفظ');
    }
  };

  const cardClass = 'bg-white rounded-[32px] shadow-soft p-6 md:p-8 border border-white/50 backdrop-blur-sm space-y-6';
  const sectionHeaderClass = 'flex items-center gap-3 mb-2';
  const sectionTitleClass = 'text-lg font-bold font-cairo text-elite-text leading-none';
  const sectionDescClass = 'text-xs text-elite-muted mb-4 block';

  if (fetching) {
    return (
      <div dir="rtl" className="max-w-4xl mx-auto space-y-8 pb-20 px-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl animate-pulse" />
          <div className="space-y-2">
            <div className="h-8 w-48 bg-white rounded-xl animate-pulse" />
            <div className="h-4 w-32 bg-white rounded-lg animate-pulse" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-[32px] shadow-soft p-8 space-y-6">
            <div className="h-12 w-full bg-surface-dim rounded-2xl animate-pulse" />
            <div className="h-12 w-full bg-surface-dim rounded-2xl animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div dir="rtl" className="font-tajawal max-w-4xl mx-auto pb-40 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-cairo text-elite-text flex items-center gap-3">
             <Settings className="w-8 h-8 text-gold" />
             الإعدادات العامة
          </h1>
          <p className="text-sm text-elite-muted mt-1">تخصيص الموقع، روابط التواصل الاجتماعي وإعدادات الدفع</p>
        </div>
        
        <Button 
          onClick={handleSubmit(onSubmit)} 
          loading={isSubmitting}
          variant="gold"
          className="rounded-2xl px-10 shadow-lg shadow-gold/20 font-bold"
        >
          <Save className="w-4 h-4 ml-2" />
          حفظ كافة الإعدادات
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Section 1: Pricing & Logistics */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-primary/5 text-primary rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>التسعير واللوجستيات</h2>
          </div>
          <p className={sectionDescClass}>ضبط معدلات الصرف وقوانين الشحن المجاني</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="سعر الصرف (ل.س / $1)"
              required
              type="number"
              error={errors.exchange_rate_syp?.message}
              {...register('exchange_rate_syp', { valueAsNumber: true })}
              className="bg-surface-dim/40 border-none rounded-2xl text-lg font-black text-primary"
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm font-bold text-elite-text flex items-center gap-2">
                   <CreditCard className="w-4 h-4 text-gold" />
                   حد الشحن المجاني (ل.س)
                </label>
                <HelpTooltip text="إذا تجاوز إجمالي الطلب هذا المبلغ، يصبح الشحن مجاناً. اترك الحقل فارغاً لتعطيل الميزة." />
              </div>
              <input
                type="number"
                min={0}
                placeholder="اتركه فارغاً لتعطيل"
                className={`w-full border-none rounded-2xl px-5 py-3.5 text-sm font-tajawal text-elite-text bg-surface-dim/40 focus:ring-2 focus:ring-gold/30 transition-all ${errors.free_shipping_threshold ? 'ring-2 ring-red-500' : ''}`}
                {...register('free_shipping_threshold', {
                  setValueAs: (v) => (v === '' || v === null || v === undefined ? null : Number(v)),
                })}
              />
              {errors.free_shipping_threshold && (
                <p className="text-xs text-[#EF4444] font-bold mt-1 px-1">{errors.free_shipping_threshold.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Contact Channels */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>قنوات التواصل</h2>
          </div>
          <p className={sectionDescClass}>البيانات التي تظهر للزبائن في المتجر وواتساب</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="رقم الواتساب للطلبات"
                icon={<MessageSquare className="w-4 h-4" />}
                required
                error={errors.whatsapp_number?.message}
                {...register('whatsapp_number')}
                dir="ltr"
                placeholder="+9639xxxxxxxx"
                className="bg-surface-dim/40 border-none rounded-2xl"
              />

              <Input
                label="رابط الفيسبوك"
                icon={<Facebook className="w-4 h-4" />}
                error={errors.facebook_url?.message}
                {...register('facebook_url')}
                dir="ltr"
                placeholder="https://facebook.com/..."
                className="bg-surface-dim/40 border-none rounded-2xl"
              />
            </div>

            <div className="space-y-4">
              <Input
                label="هاتف خدمة العملاء"
                icon={<Phone className="w-4 h-4" />}
                required
                error={errors.contact_phone?.message}
                {...register('contact_phone')}
                dir="ltr"
                className="bg-surface-dim/40 border-none rounded-2xl"
              />

              <Input
                label="ساعات الدوام الرسمية"
                icon={<Clock className="w-4 h-4" />}
                error={errors.working_hours?.message}
                {...register('working_hours')}
                placeholder="مثال: 10:00 AM - 11:00 PM"
                className="bg-surface-dim/40 border-none rounded-2xl"
              />
            </div>

            <div className="md:col-span-2">
               <Input
                label="عنوان المعرض الرئيسي"
                icon={<MapPin className="w-4 h-4" />}
                error={errors.contact_address?.message}
                {...register('contact_address')}
                placeholder="دمشق - المزة - مقابل..."
                className="bg-surface-dim/40 border-none rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Brand Identity */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Info className="w-5 h-5" />
            </div>
            <h2 className={sectionTitleClass}>هوية المتجر (من نحن)</h2>
          </div>
          <p className={sectionDescClass}>توصيف المتجر الذي يظهر في الفوتر والصفحات التعريفية</p>

          <div className="space-y-6">
            <Textarea
              label="توصيف مختصر (يظهر في أسفل الموقع)"
              rows={2}
              error={errors.about_short?.message}
              {...register('about_short')}
              className="bg-surface-dim/40 border-none rounded-2xl p-5"
            />

            <Textarea
              label="التفاصيل الكاملة (تظهر في صفحة من نحن)"
              rows={5}
              error={errors.about_full?.message}
              {...register('about_full')}
              className="bg-surface-dim/40 border-none rounded-[32px] p-6 lg:p-8"
            />
          </div>
        </div>

        {/* Section 4: Payments Gateway */}
        <div className={cardClass}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className={sectionTitleClass}>بوابة شام كاش (Sham Cash)</h2>
            </div>
            
            <div className="flex items-center gap-3 bg-surface-dim/30 px-4 py-2 rounded-2xl border border-white/50">
               <span className="text-xs font-bold text-elite-text">تفعيل هذه البوابة</span>
               <Controller
                name="sham_cash_enabled"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <p className={sectionDescClass}>إعدادات استلام الدفعات عبر تطبيق شام كاش</p>

          {shamCashEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-6">
                <Input
                  label="رقم حساب التاجر"
                  error={errors.sham_cash_account?.message}
                  {...register('sham_cash_account')}
                  className="bg-surface-dim/40 border-none rounded-2xl font-bold"
                />

                <Input
                  label="رقم الهاتف المرتبط"
                  error={errors.sham_cash_phone?.message}
                  {...register('sham_cash_phone')}
                  dir="ltr"
                  className="bg-surface-dim/40 border-none rounded-2xl font-bold"
                />
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-3xl bg-surface-dim/20 border border-white/50 items-center justify-center min-h-[200px]">
                <div className="flex items-center gap-2 mb-2">
                   <QrCode className="w-5 h-5 text-elite-muted" />
                   <label className="text-sm font-bold text-elite-text">باركود الدفع (QR Code)</label>
                </div>
                <div className="w-full max-w-[200px]">
                  <Controller
                    name="sham_cash_barcode_url"
                    control={control}
                    render={() => (
                      <ImageUploader
                        images={shamCashBarcodeUrl ? [shamCashBarcodeUrl] : []}
                        onImagesChange={(imgs) => setValue('sham_cash_barcode_url', imgs[0] ?? '')}
                        maxImages={1}
                        folder="settings"
                        className="aspect-square rounded-2xl overflow-hidden"
                      />
                    )}
                  />
                </div>
                <p className="text-[10px] text-elite-muted font-bold text-center mt-2 px-4 italic leading-relaxed">سيظهر هذا الباركد للمستخدمين في صفحة إتمام الطلب عند اختيار الدفع الإلكتروني</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sticky Save Mobile Only or similar? */}
        <div className="md:hidden pb-10 pt-4">
           <Button 
            onClick={handleSubmit(onSubmit)} 
            loading={isSubmitting}
            variant="gold"
            className="rounded-2xl w-full py-4 shadow-lg shadow-gold/20 font-bold"
          >
            <Save className="w-5 h-5 ml-2" />
            حفظ كافة الإعدادات
          </Button>
        </div>
      </div>
    </div>
  );
}

