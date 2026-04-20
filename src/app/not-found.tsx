import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="font-cairo font-bold text-7xl text-gold leading-none">404</p>
      <h1 className="font-cairo font-bold text-2xl text-elite-text">الصفحة غير موجودة</h1>
      <p className="font-tajawal text-elite-muted text-base max-w-sm">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <Button variant="primary" size="lg" href="/">
        العودة للرئيسية
      </Button>
    </div>
  );
}
