import { Product, CartItem } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1124702c74f631712060794',
    slug: 'bahamut-21-1-cotton-apparel',
    title: 'BahaMut 21 (1) Cotton Apparel (Class 25)',
    category: 'SHIRT',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton shirt from Ambawadi, Ahmedabad. ' +
      'Features structured collar, pre-shrunk finish, and paired 5-size matrix.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 50,
    rating: 4.9,
    review_count: 215,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-21-1.jpg'],
    sizes: ['38', '40', '42', '44', '46'],
    available_sizes: ['38', '40', '42', '44', '46'],
    gtin: '8901234501824',
    mpn: 'BM-2026-ART-21-1',
    mybillbook_item_id: '1124702c74f631712060794',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: '1124742c74f681712061497',
    slug: 'bahamut-21-2-cotton-apparel',
    title: 'BahaMut 21 (2) Cotton Apparel (Class 25)',
    category: 'SHIRT',
    description:
      'Direct-from-manufacturer 100% Breathable Woven Cotton shirt with paired 5-size matrix.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 45,
    rating: 4.8,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-21-2.jpg'],
    sizes: ['38', '40', '42', '44', '46'],
    available_sizes: ['38', '40', '42', '44', '46'],
    gtin: '8901234501825',
    mpn: 'BM-2026-ART-21-2',
    mybillbook_item_id: '1124742c74f681712061497',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: '1124718c74f6a1712061725',
    slug: 'bahamut-21-3-cotton-apparel',
    title: 'BahaMut 21 (3) Cotton Apparel (Class 25)',
    category: 'SHIRT',
    description:
      'Direct-from-manufacturer 100% Woven Cotton shirt crafted for all-day comfort.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Breathable Woven Cotton',
    price: 1299,
    original_mrp: 2499,
    stock_quantity: 40,
    rating: 4.8,
    review_count: 155,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-21-3.jpg'],
    sizes: ['38', '40', '42', '44', '46'],
    available_sizes: ['38', '40', '42', '44', '46'],
    gtin: '8901234501826',
    mpn: 'BM-2026-ART-21-3',
    mybillbook_item_id: '1124718c74f6a1712061725',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: '112477ec755421712257777',
    slug: 'bahamut-22-1-selvedge-denim',
    title: 'BahaMut 22 (1) SELVEDGE DENIM (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Authentic Heavyweight Red-Line Selvedge Denim Jeans crafted in Ambawadi mills.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Heavyweight Woven Cotton Selvedge Denim',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 50,
    rating: 5.0,
    review_count: 310,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-22-1-selvedge.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501827',
    mpn: 'BM-2026-SELVEDGE-22-1',
    mybillbook_item_id: '112477ec755421712257777',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: '1124702c755461712258316',
    slug: 'bahamut-22-2-selvedge-denim',
    title: 'BahaMut 22 (2) SELVEDGE DENIM (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Premium Heavyweight Woven Cotton Selvedge Denim Jeans. Features authentic red-line selvedge ID, pre-shrunk waist fit, and 5-pocket classic construction.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Heavyweight Woven Cotton Selvedge Denim',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 45,
    rating: 4.9,
    review_count: 240,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-22-2-selvedge.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501828',
    mpn: 'BM-2026-SELVEDGE-22-2',
    mybillbook_item_id: '1124702c755461712258316',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: '11247a2c84b341720510327',
    slug: 'bahamut-23-selvedge-denim',
    title: 'BahaMut 23 SELVEDGE DENIM (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Direct-from-mill Heavyweight Woven Cotton Selvedge Denim in Deep Blue.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Selvedge Denim',
    price: 1599,
    original_mrp: 2199,
    stock_quantity: 35,
    rating: 4.8,
    review_count: 190,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-23-selvedge.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501829',
    mpn: 'BM-2026-SELVEDGE-23',
    mybillbook_item_id: '11247a2c84b341720510327',
    is_active: true,
    created_at: '2026-08-02T10:00:00Z'
  },
  {
    id: '11247e2c84b371720510811',
    slug: 'bahamut-24-black-denim',
    title: 'BahaMut 24 BLACK DENIM (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Heavyweight Jet Black Woven Cotton Denim with pre-shrunk waist fit.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Black Denim',
    price: 1599,
    original_mrp: 2299,
    stock_quantity: 30,
    rating: 4.9,
    review_count: 165,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-24-black-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34'],
    gtin: '8901234501830',
    mpn: 'BM-2026-DENIM-24',
    mybillbook_item_id: '11247e2c84b371720510811',
    is_active: true,
    created_at: '2026-08-02T10:00:00Z'
  },
  {
    id: '112476cc84b431720512288',
    slug: 'bahamut-25-white-denim',
    title: 'BahaMut 25 WHITE DENIM (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Pure White Woven Cotton Denim Trousers engineered for tropical comfort.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton White Denim',
    price: 1599,
    original_mrp: 2299,
    stock_quantity: 30,
    rating: 4.7,
    review_count: 140,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-25-white-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34'],
    gtin: '8901234501831',
    mpn: 'BM-2026-DENIM-25',
    mybillbook_item_id: '112476cc84b431720512288',
    is_active: true,
    created_at: '2026-08-03T10:00:00Z'
  },
  {
    id: '112478ec8a7ff1723623935',
    slug: 'bahamut-26-raw-denim',
    title: 'BahaMut 26 Raw Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Raw Rigid Woven Cotton Denim with authentic indigo wash finish.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Raw Denim',
    price: 1499,
    original_mrp: 2199,
    stock_quantity: 40,
    rating: 4.8,
    review_count: 175,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-26-raw-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501832',
    mpn: 'BM-2026-DENIM-26',
    mybillbook_item_id: '112478ec8a7ff1723623935',
    is_active: true,
    created_at: '2026-08-03T10:00:00Z'
  },
  {
    id: '11247ecc862681721289006',
    slug: 'bahamut-27-1-denim',
    title: 'BahaMut 27 (1) Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Classic Ahmedabad Woven Cotton Denim with utility pockets.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim',
    price: 1499,
    original_mrp: 2199,
    stock_quantity: 35,
    rating: 4.8,
    review_count: 160,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-27-1-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34'],
    gtin: '8901234501833',
    mpn: 'BM-2026-DENIM-27-1',
    mybillbook_item_id: '11247ecc862681721289006',
    is_active: true,
    created_at: '2026-08-04T10:00:00Z'
  },
  {
    id: '11247d6c85fa21721195834',
    slug: 'bahamut-28-1-lycra-denim',
    title: 'BahaMut 28 (1) Lycra Stretch Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Flexible Woven Cotton Lycra Blend Denim for maximum mobility.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '98% Woven Cotton, 2% Lycra Stretch',
    price: 1699,
    original_mrp: 2499,
    stock_quantity: 45,
    rating: 4.9,
    review_count: 210,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-28-1-lycra.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501834',
    mpn: 'BM-2026-LYCRA-28-1',
    mybillbook_item_id: '11247d6c85fa21721195834',
    is_active: true,
    created_at: '2026-08-04T10:00:00Z'
  },
  {
    id: '11247b0c85fa41721196128',
    slug: 'bahamut-28-2-lycra-denim',
    title: 'BahaMut 28 (2) Lycra Stretch Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Premium Woven Cotton Lycra Stretch Denim in Mid Indigo.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '98% Woven Cotton, 2% Lycra Stretch',
    price: 1699,
    original_mrp: 2499,
    stock_quantity: 40,
    rating: 4.9,
    review_count: 195,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-28-2-lycra.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501835',
    mpn: 'BM-2026-LYCRA-28-2',
    mybillbook_item_id: '11247b0c85fa41721196128',
    is_active: true,
    created_at: '2026-08-05T10:00:00Z'
  },
  {
    id: '11247eec8a8041723624638',
    slug: 'bahamut-31-1-denim',
    title: 'BahaMut 31 (1) Woven Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Heavyweight 100% Woven Cotton Denim Jeans engineered in Ahmedabad mills.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Heavyweight Woven Cotton Denim',
    price: 1599,
    original_mrp: 2399,
    stock_quantity: 45,
    rating: 4.8,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-31-1-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501836',
    mpn: 'BM-2026-DENIM-31-1',
    mybillbook_item_id: '11247eec8a8041723624638',
    is_active: true,
    created_at: '2026-08-05T10:00:00Z'
  },
  {
    id: '11247eec8a8061723624967',
    slug: 'bahamut-31-2-denim',
    title: 'BahaMut 31 (2) Woven Denim (Class 25)',
    category: 'BOTTOMWEAR',
    description:
      'Heavyweight 100% Woven Cotton Denim Jeans in Deep Vintage Wash.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Heavyweight Woven Cotton Denim',
    price: 1599,
    original_mrp: 2399,
    stock_quantity: 40,
    rating: 4.8,
    review_count: 165,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bahamut-31-2-denim.jpg'],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '8901234501837',
    mpn: 'BM-2026-DENIM-31-2',
    mybillbook_item_id: '11247eec8a8061723624967',
    is_active: true,
    created_at: '2026-08-05T10:00:00Z'
  }
];

export function getProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_smartbiz_products_v20');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved SmartBiz products', e);
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
    localStorage.setItem('bahamut_smartbiz_products_v20', JSON.stringify(updated));
  }
  return updated;
}

export function deleteProduct(idOrSlug: string): Product[] {
  const current = getProducts();
  const updated = current.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v20', JSON.stringify(updated));
  }
  return updated;
}

export function deductStockForOrder(items: CartItem[]): Product[] {
  let products = getProducts();
  items.forEach(cartItem => {
    const index = products.findIndex(p => p.id === cartItem.product.id || p.slug === cartItem.product.slug);
    if (index >= 0) {
      const currentStock = products[index].stock_quantity || 0;
      const newStock = Math.max(0, currentStock - cartItem.quantity);
      products[index] = {
        ...products[index],
        stock_quantity: newStock
      };
    }
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v20', JSON.stringify(products));
  }
  return products;
}

export function updateProductStock(idOrSlug: string, newStock: number): Product[] {
  const products = getProducts();
  const updated = products.map(p => {
    if (p.id === idOrSlug || p.slug === idOrSlug) {
      return { ...p, stock_quantity: Math.max(0, newStock) };
    }
    return p;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v20', JSON.stringify(updated));
  }
  return updated;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
