import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'ahmedabad-woven-chambray-navy',
    title: 'De Vibe Classic Chambray Shirt - Deep Navy (Ages 13–65)',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton crafted in Ahmedabad. ' +
      'Designed for structured elegance, superior ventilation, and wrinkle-resistant longevity. ' +
      'Suitable for all age groups from 13 to 65.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 45,
    rating: 4.8,
    review_count: 148,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Solid Woven',
    fit: 'Universal Regular Fit (13–65)',
    sleeve: 'Full Sleeve',
    color: 'Navy Blue',
    is_active: true,
    created_at: '2026-07-01T10:00:00Z'
  },
  {
    id: 'prod-002',
    slug: 'cyber-street-graffiti-oversized-shirt',
    title: 'BahaMut Kinetic Graphic Print Shirt - Acid Black (Ages 13–65)',
    description:
      'Expressive kinetic print shirt featuring high-density reactive printing on premium ' +
      '100% Woven Cotton canvas. Breathable fabric engineered for comfort across all ages.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton (220 GSM)',
    price: 1499,
    original_mrp: 2999,
    stock_quantity: 30,
    rating: 4.9,
    review_count: 210,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Graphic Kinetic Print',
    fit: 'Universal Comfort Fit',
    sleeve: 'Half Sleeve',
    color: 'Acid Wash Black',
    is_active: true,
    created_at: '2026-07-05T12:00:00Z'
  },
  {
    id: 'prod-003',
    slug: 'textured-oxford-solid-khaki',
    title: 'De Vibe Executive Oxford Cotton Shirt - Pure Khaki (Ages 13–65)',
    description:
      'Refined weave with high thread density. Tailored for comfort across hot and humid climates. ' +
      'Features premium resin buttons and reinforced collar stay.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton',
    price: 1399,
    original_mrp: 2699,
    stock_quantity: 50,
    rating: 4.7,
    review_count: 124,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Oxford Solid',
    fit: 'Universal Structured Fit',
    sleeve: 'Full Sleeve',
    color: 'Khaki Beige',
    is_active: true,
    created_at: '2026-07-10T14:30:00Z'
  },
  {
    id: 'prod-004',
    slug: 'neo-tokyo-botanical-cuban-shirt',
    title: 'BahaMut Tropics Resort Cuban Shirt - Emerald Wave (Ages 13–65)',
    description:
      'Cuban collar relaxed style with hand-cut botanical prints on pure breathable ' +
      'Ahmedabad woven cotton. Lightweight and effortless for everyday casual wear.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Lightweight Woven Cotton',
    price: 1199,
    original_mrp: 2299,
    stock_quantity: 25,
    rating: 4.8,
    review_count: 96,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Botanical Print',
    fit: 'Universal Cuban Fit',
    sleeve: 'Half Sleeve',
    color: 'Emerald Green',
    is_active: true,
    created_at: '2026-07-12T09:15:00Z'
  },
  {
    id: 'prod-005',
    slug: 'micro-check-linen-cotton-blue',
    title: 'De Vibe Royal Micro-Check Woven Shirt - Sky White (Ages 13–65)',
    description:
      'Crisp micro-check pattern woven with long-staple cotton yarn. ' +
      'Highly absorbent and breathable for year-round comfort.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Long-Staple Woven Cotton',
    price: 1449,
    original_mrp: 2799,
    stock_quantity: 40,
    rating: 4.9,
    review_count: 175,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Micro-Check',
    fit: 'Universal Regular Fit',
    sleeve: 'Full Sleeve',
    color: 'Sky Blue / White',
    is_active: true,
    created_at: '2026-07-15T11:00:00Z'
  },
  {
    id: 'prod-006',
    slug: 'monochrome-abstract-street-shirt',
    title: 'BahaMut Vanguard Abstract Resort Shirt - Slate Monochrome (Ages 13–65)',
    description:
      'High-contrast abstract geometric design tailored for modern all-age style. ' +
      'Pre-shrunk 100% Woven Cotton fabric ensures sharp silhouette retention.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Pre-Shrunk Woven Cotton',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 35,
    rating: 4.8,
    review_count: 132,
    express_delivery: 'FREE Express Delivery by Tomorrow',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    pattern: 'Abstract Geometric',
    fit: 'Universal Comfort Fit',
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
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
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
