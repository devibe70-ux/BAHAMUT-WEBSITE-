import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bahamut.in'),
  title: 'BAHAMUT by DE VIBE | 100% Breathable Woven Cotton Apparel',
  description:
    'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub. Official Registered Trademark (TM No. 5018168, Class 25). Ambawadi, Ahmedabad, Gujarat - 380015.',
  keywords: [
    'BAHAMUT',
    'DE VIBE',
    'Woven Cotton Shirts',
    'Ahmedabad Textile Mills',
    'Partial COD Apparel',
    'Class 25 Garments',
    'Ambawadi Ahmedabad'
  ],
  alternates: {
    canonical: 'https://bahamut.in',
  },
  openGraph: {
    title: 'BAHAMUT by DE VIBE - Woven Cotton Apparel',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
    url: 'https://bahamut.in',
    siteName: 'BAHAMUT by DE VIBE',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} h-full`}>
      <body className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-red-600 selection:text-white">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
