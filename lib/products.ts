import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'ahmedabad-woven-chambray-navy',
    title: 'De Vibe Classic Chambray Shirt - Deep Navy',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton crafted in Ahmedabad. ' +
      'Designed for structured elegance, superior ventilation, and wrinkle-resistant longevity. ' +
      'Perfect for workplace or evening wear.',
    target_demographic: 'CLASSIC',
    fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 45,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Solid Woven',
    fit: 'Regular Structured Fit',
    sleeve: 'Full Sleeve',
    color: 'Navy Blue',
    is_active: true,
    created_at: '2026-07-01T10:00:00Z'
  },
  {
    id: 'prod-002',
    slug: 'cyber-street-graffiti-oversized-shirt',
    title: 'BahaMut Youth Kinetic Print Shirt - Acid Black',
    description:
      'Expressive urban streetwear featuring heavy high-density reactive prints on premium ' +
      '100% Woven Cotton canvas. Breathable fabric keeps you cool while making a bold statement.',
    target_demographic: 'YOUTH',
    fabric_details: '100% Breathable Woven Cotton (220 GSM)',
    price: 1499,
    original_mrp: 2999,
    stock_quantity: 30,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    pattern: 'Streetwear Graphic Print',
    fit: 'Relaxed Oversized Fit',
    sleeve: 'Half Sleeve',
    color: 'Acid Wash Black',
    is_active: true,
    created_at: '2026-07-05T12:00:00Z'
  },
  {
    id: 'prod-003',
    slug: 'textured-oxford-solid-khaki',
    title: 'De Vibe Executive Oxford Cotton Shirt - Pure Khaki',
    description:
      'Refined weave with high thread density. Tailored for comfort across hot and humid climates. ' +
      'Features premium resin buttons and reinforced collar stay.',
    target_demographic: 'CLASSIC',
    fabric_details: '100% Breathable Woven Cotton',
    price: 1399,
    original_mrp: 2699,
    stock_quantity: 50,
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    pattern: 'Oxford Solid',
    fit: 'Classic Fit',
    sleeve: 'Full Sleeve',
    color: 'Khaki Beige',
    is_active: true,
    created_at: '2026-07-10T14:30:00Z'
  },
  {
    id: 'prod-004',
    slug: 'neo-tokyo-botanical-cuban-shirt',
    title: 'BahaMut Tropics Resort Cuban Shirt - Emerald Wave',
    description:
      'Youthful Cuban collar relaxed vibe with hand-cut botanical prints on pure breathable ' +
      'Ahmedabad woven cotton. Lightweight and effortless for sunny outdoor hangouts.',
    target_demographic: 'YOUTH',
    fabric_details: '100% Breathable Lightweight Woven Cotton',
    price: 1199,
    original_mrp: 2299,
    stock_quantity: 25,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    pattern: 'Botanical Print',
    fit: 'Relaxed Cuban Fit',
    sleeve: 'Half Sleeve',
    color: 'Emerald Green',
    is_active: true,
    created_at: '2026-07-12T09:15:00Z'
  },
  {
    id: 'prod-005',
    slug: 'micro-check-linen-cotton-blue',
    title: 'De Vibe Royal Micro-Check Woven Shirt - Sky White',
    description:
      'Crisp micro-check pattern woven with long-staple cotton yarn. ' +
      'Highly absorbent and breathable for year-round executive comfort.',
    target_demographic: 'CLASSIC',
    fabric_details: '100% Long-Staple Woven Cotton',
    price: 1449,
    original_mrp: 2799,
    stock_quantity: 40,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Micro-Check',
    fit: 'Tailored Regular',
    sleeve: 'Full Sleeve',
    color: 'Sky Blue / White',
    is_active: true,
    created_at: '2026-07-15T11:00:00Z'
  },
  {
    id: 'prod-006',
    slug: 'monochrome-abstract-street-shirt',
    title: 'BahaMut Vanguard Abstract Resort Shirt - Slate Monochrome',
    description:
      'High-contrast abstract geometric design tailored for the young modern trendsetter. ' +
      'Pre-shrunk 100% Woven Cotton fabric ensures sharp silhouette retention.',
    target_demographic: 'YOUTH',
    fabric_details: '100% Breathable Pre-Shrunk Woven Cotton',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 35,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    pattern: 'Abstract Geometric',
    fit: 'Street Boxy Fit',
    sleeve: 'Half Sleeve',
    color: 'Slate Grey & White',
    is_active: true,
    created_at: '2026-07-18T16:20:00Z'
  }
];

export function getProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
  }
  return INITIAL_PRODUCTS;
}

export function saveProduct(product: Product): Product[] {
  const current = getProducts();
  const index = current.findIndex(p => p.id === product.id || p.slug === product.slug);
  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = product;
  } else {
    updated = [product, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_products', JSON.stringify(updated));
  }
  return updated;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
