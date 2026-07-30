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
  title: 'BahaMut by De Vibe | 100% Breathable Woven Cotton Apparel',
  description:
    'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub. Shop Youth Prints (13-25) & Classic Solids (26-65). ₹200 Partial COD available.',
  keywords: [
    'BahaMut',
    'De Vibe',
    'Woven Cotton Shirts',
    'Ahmedabad Textile Mills',
    'Partial COD Apparel',
    'Youth Prints',
    'Classic Solids'
  ],
  alternates: {
    canonical: 'https://bahamut.in',
  },
  openGraph: {
    title: 'BahaMut by De Vibe - Woven Cotton Apparel',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
    url: 'https://bahamut.in',
    siteName: 'BahaMut by De Vibe',
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
