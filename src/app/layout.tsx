import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import PublicLayout from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://elite-and-more.com'),
  title: 'Elite and More — The Best In your Hands',
  description: 'وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: 'Elite and More — The Best In your Hands',
    description: 'وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا',
    url: 'https://elite-and-more.com',
    siteName: 'Elite and More',
    images: [
      {
        url: '/images/logo.jpg',
        width: 800,
        height: 800,
        alt: 'Elite and More Logo',
      },
    ],
    locale: 'ar_SY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite and More',
    description: 'وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا',
    images: ['/images/logo.jpg'],
  },
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
