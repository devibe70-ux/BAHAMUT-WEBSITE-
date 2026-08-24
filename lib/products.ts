import { Product, CartItem } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'BM-ART-20-1',
    slug: 'bm-art-20-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 20 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 20, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 4,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32"],
    gtin: '593155135819',
    mpn: 'BM-ART-20-1',
    mybillbook_item_id: 'BM-ART-20-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-21-1',
    slug: 'bm-art-21-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 21 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 32,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-21-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36","38"],
    gtin: '298901379936',
    mpn: 'BM-ART-21-1',
    mybillbook_item_id: 'BM-ART-21-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-21-2',
    slug: 'bm-art-21-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 21 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 44,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-21-2.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36","38"],
    gtin: '136730471277',
    mpn: 'BM-ART-21-2',
    mybillbook_item_id: 'BM-ART-21-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-21-3',
    slug: 'bm-art-21-3',
    title: 'BahaMut Men Regular Fit Jeans - Art 21 (Wash 3)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 3). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 52,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-21-3.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36","38"],
    gtin: '223397683935',
    mpn: 'BM-ART-21-3',
    mybillbook_item_id: 'BM-ART-21-3',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-22-2',
    slug: 'bm-art-22-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 22 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 22, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-22-2.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["36"],
    gtin: '194185806653',
    mpn: 'BM-ART-22-2',
    mybillbook_item_id: 'BM-ART-22-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-23-1',
    slug: 'bm-art-23-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 23 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 23, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 7,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-23-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","36","38"],
    gtin: '800863007328',
    mpn: 'BM-ART-23-1',
    mybillbook_item_id: 'BM-ART-23-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-24-1',
    slug: 'bm-art-24-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 24 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 24, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 14,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-24-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32"],
    gtin: '561445258509',
    mpn: 'BM-ART-24-1',
    mybillbook_item_id: 'BM-ART-24-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-26-1',
    slug: 'bm-art-26-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 26 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 26, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-26-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["32","36"],
    gtin: '793520800062',
    mpn: 'BM-ART-26-1',
    mybillbook_item_id: 'BM-ART-26-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-27-1',
    slug: 'bm-art-27-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 27 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 27, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 9,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-27-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32"],
    gtin: '151220505298',
    mpn: 'BM-ART-27-1',
    mybillbook_item_id: 'BM-ART-27-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-27-2',
    slug: 'bm-art-27-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 27 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 27, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32","34"],
    gtin: '619608930438',
    mpn: 'BM-ART-27-2',
    mybillbook_item_id: 'BM-ART-27-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-28-1',
    slug: 'bm-art-28-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 28 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 28, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-28-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32"],
    gtin: '475037947116',
    mpn: 'BM-ART-28-1',
    mybillbook_item_id: 'BM-ART-28-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-29-1',
    slug: 'bm-art-29-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 29 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 29, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 1,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30"],
    gtin: '459425143389',
    mpn: 'BM-ART-29-1',
    mybillbook_item_id: 'BM-ART-29-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-29-2',
    slug: 'bm-art-29-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 29 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 29, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 3,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30"],
    gtin: '152206584283',
    mpn: 'BM-ART-29-2',
    mybillbook_item_id: 'BM-ART-29-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-30-1',
    slug: 'bm-art-30-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 30 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 30, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["32","38"],
    gtin: '531906085732',
    mpn: 'BM-ART-30-1',
    mybillbook_item_id: 'BM-ART-30-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-31-1',
    slug: 'bm-art-31-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 31 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 31, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 6,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-31-1.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32","34","36"],
    gtin: '248014749326',
    mpn: 'BM-ART-31-1',
    mybillbook_item_id: 'BM-ART-31-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-31-2',
    slug: 'bm-art-31-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 31 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 31, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 3,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['/images/products/bm-art-31-2.jpg'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["32","36"],
    gtin: '484464547926',
    mpn: 'BM-ART-31-2',
    mybillbook_item_id: 'BM-ART-31-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-32-1',
    slug: 'bm-art-32-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 32 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 32, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 15,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32","34","36"],
    gtin: '643468307270',
    mpn: 'BM-ART-32-1',
    mybillbook_item_id: 'BM-ART-32-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-33-1',
    slug: 'bm-art-33-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 33 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 33, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32","34","36"],
    gtin: '193071487211',
    mpn: 'BM-ART-33-1',
    mybillbook_item_id: 'BM-ART-33-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-33-2',
    slug: 'bm-art-33-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 33 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 33, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36"],
    gtin: '894373059885',
    mpn: 'BM-ART-33-2',
    mybillbook_item_id: 'BM-ART-33-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-34-1',
    slug: 'bm-art-34-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 34 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 34, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 20,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36","38"],
    gtin: '471700028249',
    mpn: 'BM-ART-34-1',
    mybillbook_item_id: 'BM-ART-34-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-34-2',
    slug: 'bm-art-34-2',
    title: 'BahaMut Men Regular Fit Jeans - Art 34 (Wash 2)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 34, Wash 2). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 10,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["30","32","34","36","38"],
    gtin: '483596956691',
    mpn: 'BM-ART-34-2',
    mybillbook_item_id: 'BM-ART-34-2',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'BM-ART-35-1',
    slug: 'bm-art-35-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 35 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 35, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: 'Cotton Denim',
    price: 1049,
    original_mrp: 1999,
    stock_quantity: 38,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ["28","30","32","34","36"],
    gtin: '612066059780',
    mpn: 'BM-ART-35-1',
    mybillbook_item_id: 'BM-ART-35-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  }
];

export function getProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_smartbiz_products_v22');
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
    localStorage.setItem('bahamut_smartbiz_products_v22', JSON.stringify(updated));
  }
  return updated;
}

export function deleteProduct(idOrSlug: string): Product[] {
  const current = getProducts();
  const updated = current.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v22', JSON.stringify(updated));
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
    localStorage.setItem('bahamut_smartbiz_products_v22', JSON.stringify(products));
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
    localStorage.setItem('bahamut_smartbiz_products_v22', JSON.stringify(products));
  }
  return updated;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
