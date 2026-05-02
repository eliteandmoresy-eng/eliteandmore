'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageCircle } from 'lucide-react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Governorate } from '@/types';
import { formatSYP, cn } from '@/lib/utils';
import { buildOrderMessage, getWhatsAppLink } from '@/lib/whatsapp';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { checkoutSchema } from '@/lib/validators';
import { useCartStore } from '@/store/cartStore';
import { useSettings } from '@/hooks/useSettings';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotalFn = useCartStore((s) => s.subtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const { settings } = useSettings();

  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState<Governorate | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'sham_cash'>('cod');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: { payment_method: 'cod', notes: '' },
  });

  const notesValue = watch('notes');
  const isShamCash = paymentMethod === 'sham_cash';
  const shamCashNotesValid = !isShamCash || (notesValue && notesValue.trim().length >= 5);
  const isFormValid = isValid && selectedGovernorate !== null && shamCashNotesValid;

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  useEffect(() => {
    fetch('/api/governorates')
      .then((r) => r.json())
      .then((d) => setGovernorates(d.data ?? []));
  }, []);

  useEffect(() => {
    setValue('payment_method', paymentMethod);
  }, [paymentMethod, setValue]);

  const subtotal = subtotalFn();
  const shippingCost = selectedGovernorate?.shipping_cost ?? 0;
  const freeShipping =
    settings.free_shipping_threshold != null && subtotal >= settings.free_shipping_threshold;
  const effectiveShipping = freeShipping ? 0 : shippingCost;
  const total = subtotal + effectiveShipping;

  const handleGovernorateChange = (govId: string) => {
    const gov = governorates.find((g) => g.id === govId) ?? null;
    setSelectedGovernorate(gov);
    setValue('governorate_id', govId, { shouldValidate: true });
    setValue('governorate_name', gov?.name ?? '', { shouldValidate: true });
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setSubmitting(true);
    try {
      const message = buildOrderMessage({
        items,
        form: data,
        subtotal,
        shippingCost: effectiveShipping,
        total,
        exchangeRate: settings.exchange_rate_syp ?? 15000,
        freeShipping,
      });
      const phone = settings.whatsapp_number ?? WHATSAPP_NUMBER;
      const link = getWhatsAppLink(phone, message);
      window.open(link, '_blank');
      clearCart();
      toast.success('تم إرسال طلبك بنجاح!');
      router.push('/');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-cream py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سلة التسوق', href: '/cart' },
            { label: 'إتمام الطلب' },
          ]}
          className="mb-6"
        />

        <h1 className="font-cairo font-black text-3xl text-elite-text mb-8">إتمام الطلب</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Checkout form — 3/5 */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-elite-border p-6 shadow-card flex flex-col gap-5">
                <h2 className="font-cairo font-bold text-xl text-elite-text">بيانات التوصيل</h2>

                <Input
                  label="الاسم الكامل"
                  required
                  placeholder="أدخل اسمك الكامل"
                  error={errors.full_name?.message}
                  {...register('full_name')}
                />

                <Input
                  label="رقم الهاتف"
                  required
                  placeholder="09XXXXXXXX"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                {/* Governorate select */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-elite-text font-tajawal">
                    المحافظة <span className="text-[#EF4444] mr-1">*</span>
                  </label>
                  <select
                    value={selectedGovernorate?.id ?? ''}
                    onChange={(e) => handleGovernorateChange(e.target.value)}
                    className="w-full border border-elite-border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="">اختر المحافظة</option>
                    {governorates.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {gov.name} — شحن: {formatSYP(gov.shipping_cost)}
                      </option>
                    ))}
                  </select>
                  {errors.governorate_id && (
                    <p className="text-xs text-[#EF4444] font-tajawal">{errors.governorate_id.message}</p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-elite-text font-tajawal">
                    العنوان التفصيلي <span className="text-[#EF4444] mr-1">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="الحي، الشارع، رقم البناء..."
                    className="w-full border border-elite-border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white placeholder:text-elite-muted/60 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all resize-y"
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-xs text-[#EF4444] font-tajawal">{errors.address.message}</p>
                  )}
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-elite-text font-tajawal">
                    ملاحظات {isShamCash && <span className="text-[#EF4444] mr-1">*</span>}
                  </label>
                  
                  {isShamCash && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-col gap-1">
                      <p className="font-cairo font-bold text-amber-700 text-xs flex items-center gap-1.5">
                        <span>📝</span> مطلوب عند الدفع عبر شام كاش
                      </p>
                      <p className="font-tajawal text-[11px] text-amber-600 leading-relaxed">
                        يرجى كتابة: <span className="font-bold">اسمك الكامل</span>، <span className="font-bold">اسم المنتج/المنتجات</span>، و<span className="font-bold">المبلغ الإجمالي النهائي الذي قمت بتحويله</span> (ثمن المنتجات + التوصيل = <span className="font-black text-amber-800">{formatSYP(total)}</span>).
                      </p>
                    </div>
                  )}
                  
                  <textarea
                    rows={isShamCash ? 3 : 2}
                    placeholder={isShamCash 
                      ? `مثال: محمد أحمد - ${items.map(i => i.name).slice(0, 2).join('، ')}${items.length > 2 ? '...' : ''} - المبلغ المحوّل ${formatSYP(total)}` 
                      : "أي ملاحظات إضافية..."}
                    className={cn(
                      'w-full border rounded-xl px-4 py-2.5 text-sm font-tajawal text-elite-text bg-white placeholder:text-elite-muted/60 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary transition-all resize-y',
                      isShamCash && !shamCashNotesValid ? 'border-[#EF4444] bg-red-50/30' : 'border-elite-border'
                    )}
                    {...register('notes')}
                  />
                  {isShamCash && !shamCashNotesValid && (
                    <p className="text-xs text-[#EF4444] font-tajawal">يرجى كتابة الملاحظات المطلوبة لتأكيد الدفع عبر شام كاش</p>
                  )}
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-elite-border p-6 shadow-card flex flex-col gap-4">
                <h2 className="font-cairo font-bold text-xl text-elite-text">طريقة الدفع</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5'
                        : 'border-elite-border hover:border-primary/40'
                    }`}
                  >
                    <span className="text-2xl">💵</span>
                    <span className="font-tajawal font-semibold text-sm text-elite-text text-center">
                      الدفع عند الاستلام
                    </span>
                  </button>

                  {/* Sham Cash */}
                  {settings.sham_cash_enabled && (
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('sham_cash')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                        paymentMethod === 'sham_cash'
                          ? 'border-primary bg-primary/5'
                          : 'border-elite-border hover:border-primary/40'
                      }`}
                    >
                      <span className="text-2xl">📲</span>
                      <span className="font-tajawal font-semibold text-sm text-elite-text text-center">
                        شام كاش
                      </span>
                    </button>
                  )}
                </div>

                {/* Sham Cash instructions */}
                {paymentMethod === 'sham_cash' && settings.sham_cash_enabled && (
                  <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 flex flex-col gap-3">
                    <p className="font-cairo font-bold text-primary text-sm">تعليمات شام كاش</p>
                    {settings.sham_cash_account && (
                      <p className="font-tajawal text-sm text-elite-text">
                        <span className="font-semibold">رقم الحساب: </span>
                        {settings.sham_cash_account}
                      </p>
                    )}
                    {settings.sham_cash_phone && (
                      <p className="font-tajawal text-sm text-elite-text">
                        <span className="font-semibold">رقم الهاتف: </span>
                        {settings.sham_cash_phone}
                      </p>
                    )}
                    {settings.sham_cash_barcode_url && (
                      <div className="relative w-32 h-32 mx-auto">
                        <Image
                          src={settings.sham_cash_barcode_url}
                          alt="شام كاش باركود"
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  full
                  loading={submitting}
                  disabled={!isFormValid}
                  icon={isFormValid ? <MessageCircle className="w-5 h-5" /> : <span className="text-xl">🔒</span>}
                  className={cn(
                    'transition-all duration-300',
                    !isFormValid && 'bg-elite-muted/20 text-elite-muted grayscale opacity-70'
                  )}
                >
                  {isFormValid ? 'إرسال الطلب عبر الواتساب' : 'الزر معطل - بيانات ناقصة'}
                </Button>
                
                {!isFormValid && (
                  <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="font-cairo font-black text-red-600 text-sm flex items-center gap-2">
                      <span>⚠️</span> لماذا لا يمكنني الضغط على الزر؟
                    </p>
                    <p className="font-tajawal text-xs text-red-500 leading-relaxed">
                      يجب عليك تعبئة جميع الحقول التي بجانبها علامة (*) وهي: 
                      <span className="font-bold"> (الاسم، الهاتف، العنوان التفصيلي) </span> 
                      بالإضافة إلى ضرورة <span className="font-bold">اختيار المحافظة</span> من القائمة المنسدلة أعلاه.
                    </p>
                  </div>
                )}
                
                {isFormValid && (
                  <p className="text-[11px] text-green-600 font-bold font-tajawal text-center bg-green-50 py-2 rounded-xl">
                    ✅ رائع! جميع البيانات مكتملة، يمكنك الآن إرسال طلبك.
                  </p>
                )}
              </div>
            </div>

            {/* Cart summary — 2/5 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-elite-border p-6 shadow-card sticky top-24 flex flex-col gap-4">
                <h2 className="font-cairo font-bold text-xl text-elite-text">ملخص الطلب</h2>

                {/* Items list */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-surface-dim flex-shrink-0">
                        <Image
                          src={item.image || '/images/placeholder.png'}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-tajawal text-xs text-elite-text line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                        {item.variant_label && (
                          <p className="text-xs text-elite-muted font-tajawal">{item.variant_label}</p>
                        )}
                        <p className="text-xs text-elite-muted font-tajawal mt-0.5">
                          {item.quantity} × {formatSYP(item.price_syp)}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-primary font-tajawal flex-shrink-0">
                        {formatSYP(item.price_syp * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-elite-border pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-tajawal text-sm text-elite-muted">مجموع المنتجات</span>
                    <span className="font-tajawal font-bold text-elite-text">{formatSYP(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-tajawal text-sm text-elite-muted">الشحن</span>
                    {freeShipping ? (
                      <span className="font-tajawal font-bold text-green-600">مجاني</span>
                    ) : (
                      <span className="font-tajawal font-bold text-elite-text">
                        {selectedGovernorate ? formatSYP(shippingCost) : '—'}
                      </span>
                    )}
                  </div>
                  {freeShipping && (
                    <p className="text-xs text-green-600 font-tajawal text-center bg-green-50 rounded-xl py-1.5 px-3">
                      تهانينا! حصلت على شحن مجاني
                    </p>
                  )}
                  {!freeShipping && settings.free_shipping_threshold && (
                    <p className="text-xs text-elite-muted font-tajawal text-center">
                      أضف {formatSYP(settings.free_shipping_threshold - subtotal)} للحصول على شحن مجاني
                    </p>
                  )}
                </div>

                <div className="border-t border-elite-border pt-4 flex items-center justify-between">
                  <span className="font-cairo font-bold text-base text-elite-text">الإجمالي</span>
                  <span className="font-cairo font-black text-2xl text-gold">{formatSYP(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
