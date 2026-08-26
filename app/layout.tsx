import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, UnifrakturMaguntia } from 'next/font/google';
import Script from 'next/script';
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
  title: {
    default: 'BahaMut by DE VIBE | Selvedge Denim & Woven Cotton Apparel',
    template: '%s | BahaMut by DE VIBE'
  },
  description:
    'Buy direct-from-manufacturer 100% Woven Cotton Denim Jeans & Apparel engineered at Ahmedabad textile mills. Registered Trademark (TM No. 5018168, Class 25). Billed & fulfilled by DE VIBE (GSTIN: 24ASHPS9777R1ZE), Ambawadi, Ahmedabad. All products ₹1,499 with Partial COD.',
  keywords: [
    'BahaMut',
    'DE VIBE',
    'BahaMut Jeans',
    'BahaMut Denim',
    'Men Denim Jeans India',
    '100% Woven Cotton Denim',
    'Heavyweight Denim Jeans',
    'Ahmedabad Textile Mills',
    'Ambawadi Ahmedabad Office',
    'Selvedge Denim India',
    'Class 25 Garments',
    'GSTIN 24ASHPS9777R1ZE',
    'TM 5018168',
    'Buy Jeans Online India',
    'Partial COD Jeans'
  ],
  authors: [{ name: 'DE VIBE', url: 'https://bahamut.in' }],
  creator: 'DE VIBE',
  publisher: 'DE VIBE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://bahamut.in',
  },
  openGraph: {
    title: 'BahaMut by DE VIBE | Selvedge Denim & Cotton Apparel',
    description:
      'Direct-from-manufacturer 100% Woven Cotton Denim Jeans & Apparel from Ahmedabad textile mills. Registered TM No. 5018168 (Class 25). Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). ₹1,499 with Partial COD.',
    url: 'https://bahamut.in',
    siteName: 'BahaMut by DE VIBE',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://bahamut.in/images/products/bm-art-21-1.jpg',
        width: 1200,
        height: 630,
        alt: 'BahaMut 100% Woven Cotton Denim Jeans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BahaMut by DE VIBE | Selvedge Denim & Cotton Apparel',
    description:
      'Direct-from-manufacturer 100% Woven Cotton Denim Jeans & Apparel from Ahmedabad. TM No. 5018168. Billed by DE VIBE (GSTIN: 24ASHPS9777R1ZE), Ambawadi, Ahmedabad.',
    images: ['https://bahamut.in/images/products/bm-art-21-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DE VIBE',
  legalName: 'DE VIBE',
  brand: {
    '@type': 'Brand',
    name: 'BahaMut',
    legalName: 'BahaMut (TM No. 5018168, Class 25 Readymade Garments)',
  },
  url: 'https://bahamut.in',
  logo: 'https://bahamut.in/images/products/bm-art-21-1.jpg',
  taxID: '24ASHPS9777R1ZE',
  foundingLocation: 'Ambawadi, Ahmedabad, Gujarat, India',
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
    telephone: '+91 97270 24519',
    contactType: 'customer service & sales',
    email: 'devibe70@gmail.com',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
  },
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BahaMut by DE VIBE',
  url: 'https://bahamut.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bahamut.in/catalog?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is BahaMut by DE VIBE and where is it manufactured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BahaMut is a registered Trademark (TM No. 5018168, Class 25 Readymade Garments). All apparel is crafted from 100% Breathable Woven Cotton Denim engineered at Ahmedabad textile mills, and billed, marketed & fulfilled by DE VIBE, Ambawadi, Ahmedabad, Gujarat - 380015 (GSTIN: 24ASHPS9777R1ZE).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the price of BahaMut Denim Jeans and are taxes included?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All BahaMut Master Products are priced at ₹1,499 flat, which is fully inclusive of statutory 5% GST (Intra-state Gujarat: 2.5% CGST + 2.5% SGST under HSN 62034290; Inter-state: 5% IGST).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Partial Cash on Delivery (COD) available on BahaMut.in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! BahaMut offers Partial COD checkout where you pay a flat ₹200 advance deposit online via Cashfree Payments Gateway and pay the remaining balance in cash or UPI at your doorstep upon delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What sizes are available in BahaMut Denim Jeans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BahaMut denim jeans feature numeric waist sizes ranging from 28, 30, 32, 34, 36, to 38 in a pre-shrunk precision fit.',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        {/* Google AdSense Integration */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7107715238624071"
          crossOrigin="anonymous"
          strategy="afterInteractive"
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
