import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, UnifrakturMaguntia } from 'next/font/google';
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

const unifraktur = UnifrakturMaguntia({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-unifraktur',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bahamut.in'),
  title: 'BAHAMUT by DE VIBE | Woven Cotton Apparel',
  description:
    'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub. Official Registered Trademark (TM No. 5018168, Class 25). Ambawadi, Ahmedabad, Gujarat - 380015.',
  keywords: [
    'BAHAMUT',
    'DE VIBE',
    'Woven Cotton Shirts',
    'Class 25 Garments',
    'Ambawadi Ahmedabad'
  ],
  alternates: {
    canonical: 'https://bahamut.in',
  },
  openGraph: {
    title: 'BAHAMUT by DE VIBE',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
    url: 'https://bahamut.in',
    siteName: 'BAHAMUT by DE VIBE',
    locale: 'en_IN',
    type: 'website',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DE VIBE',
  legalName: 'DE VIBE',
  brand: 'BAHAMUT',
  url: 'https://bahamut.in',
  logo: 'https://bahamut.in/logo.png',
  foundingLocation: 'Ahmedabad, Gujarat, India',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ambawadi',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-79-2213-4099',
    contactType: 'customer service',
    email: 'devibe70@gmail.com',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'gu'],
  },
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where is BAHAMUT by DE VIBE manufactured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BAHAMUT apparel is direct-from-manufacturer 100% Breathable Woven Cotton engineered at textile mills in Ambawadi, Ahmedabad, Gujarat - 380015.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Partial Cash on Delivery (COD) available on BAHAMUT.in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, BAHAMUT offers Partial COD checkout where customers pay a flat ₹200 advance deposit online and pay the remaining balance in cash at their doorstep upon delivery.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} ${unifraktur.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#F7F7F8] text-[#111111] font-sans antialiased selection:bg-black selection:text-white">
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
