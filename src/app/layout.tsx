import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import PublicLayout from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'Elite and More — The Best In your Hands',
  description: 'وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-tajawal bg-cream text-elite-text">
        <Providers>
          <PublicLayout>{children}</PublicLayout>
        </Providers>
      </body>
    </html>
  );
}
