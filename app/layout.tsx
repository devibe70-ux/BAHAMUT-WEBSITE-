import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cinzel, UnifrakturMaguntia } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const unifraktur = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-unifraktur',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bahamut.in'),
  title: 'BAHAMUT | Operated by De Vibe — Darkness Tailored (Class 25)',
  description:
    'Luxury streetwear engineered with premium heavy-gauge textiles and mythological gothic silhouettes. Direct-from-manufacturer 100% Breathable Woven Cotton apparel.',
  keywords: [
    'BAHAMUT',
    'De Vibe',
    'Class 25 E-Commerce',
    'Obsidian Crimson Apparel',
    'Woven Cotton Shirts',
    'Ahmedabad Textile Mills',
    'Partial COD Apparel',
    'Draconic Heavyweight'
  ],
  alternates: {
    canonical: 'https://bahamut.in',
  },
  openGraph: {
    title: 'BAHAMUT | Operated by De Vibe',
    description:
      'Darkness Tailored. Luxury streetwear & 100% Woven Cotton apparel engineered at Ahmedabad mills.',
    url: 'https://bahamut.in',
    siteName: 'BAHAMUT | Operated by De Vibe',
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
    <html lang="en" className={`${plusJakarta.variable} ${cinzel.variable} ${unifraktur.variable} h-full`}>
      <body className="flex flex-col min-h-screen bg-[#0a0a0b] text-[#ececed] font-sans antialiased selection:bg-crimson selection:text-white">
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
