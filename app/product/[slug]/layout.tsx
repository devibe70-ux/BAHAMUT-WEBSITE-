import { Metadata } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/products';

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'BahaMut by DE VIBE | 100% Woven Cotton Apparel',
      description: 'Direct-from-manufacturer 100% Breathable Woven Cotton denim jeans and apparel crafted in Ahmedabad.',
    };
  }

  const primaryImage = product.images?.[0]?.startsWith('http')
    ? product.images[0]
    : `https://bahamut.in${product.images?.[0] || '/images/products/bm-art-21-1.jpg'}`;

  const keywords = [
    product.title,
    '100% cotton denim jeans india',
    'buy men regular fit jeans online',
    'ahmedabad denim manufacturer',
    'selvedge denim jeans under 1500',
    'partial cod denim jeans',
    'de vibe clothing ahmedabad',
    'breathable woven cotton apparel',
    'indian penal code anti-fraud protected apparel',
    product.category || 'BOTTOMWEAR',
    product.mpn || product.id,
  ];

  return {
    title: `${product.title} (₹${product.price}) | BahaMut by DE VIBE`,
    description: `Buy ${product.title} online at ₹${product.price}. Crafted from 100% Ring-Spun Woven Cotton Denim in Ahmedabad. Flat ₹200 Partial COD, Free Express Shipping & 7-Day Returns.`,
    keywords: keywords.join(', '),
    alternates: {
      canonical: `https://bahamut.in/product/${encodeURIComponent(product.slug)}`,
    },
    openGraph: {
      title: `${product.title} — ₹${product.price} (Inclusive of GST)`,
      description: product.description,
      url: `https://bahamut.in/product/${encodeURIComponent(product.slug)}`,
      siteName: 'BahaMut by DE VIBE',
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 1000,
          alt: `${product.title} - BahaMut by DE VIBE Ahmedabad`,
        },
      ],
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — ₹${product.price} | BahaMut by DE VIBE`,
      description: `100% Woven Cotton Denim crafted in Ahmedabad. Flat ₹200 Advance Partial COD & 7-Day Returns.`,
      images: [primaryImage],
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
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
