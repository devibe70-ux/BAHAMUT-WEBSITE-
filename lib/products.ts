import { Product, CartItem, Size } from './types';

// Map strictly from Master Excel Column K: Size Chart (28/36 vs 30/38)
const SIZE_CHART_30_38_ARTICLES = [
  'BM-ART-21-1',
  'BM-ART-21-2',
  'BM-ART-21-3',
  'BM-ART-23-1',
  'BM-ART-30-1',
  'BM-ART-34-1',
  'BM-ART-34-2',
];

export function getStandard5Sizes(product: Product): Size[] {
  if (product.category === 'SHIRT') {
    return ['38', '40', '42', '44', '46'];
  }
  if (product.category === 'TEE') {
    return ['S', 'M', 'L', 'XL', 'XXL'];
  }

  // BOTTOMWEAR / Denim Articles:
  const articleId = product.mpn || product.id;
  if (SIZE_CHART_30_38_ARTICLES.includes(articleId)) {
    return ['30', '32', '34', '36', '38'];
  }

  // All other denim articles from Column K are 28/36
  return ['28', '30', '32', '34', '36'];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'BM-ART-20-1',
    slug: 'bm-art-20-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 20 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 20, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 4,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRna6AI5Mus0d4QgHJ8VdA-jOt9_lrCi7zoL1eBNaFYU3hVLdoF',
      '/images/products/bahamut-22-1-selvedge.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO',
      '/images/products/bm-art-21-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['30', '32'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 32,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYSBmdJrv2t5kNVTNjThY3ndV2OPYOMhY2jzPBV27wox2DeHO',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQGt18T6ys07FTlLidKJJZWUUV1gjZy1d3W5AXut-hqDcSLmIrF',
      '/images/products/bahamut-21-1.jpg',
      '/images/products/bm-art-21-2.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '34', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 44,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTztnYJMOW5wfUgdNQSPrT_E1DYLUsWaY5yXZ5lYhAEkNJ6xBAS',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSA9l5lKwwu5ZSf5ybJY6wbLCw_55J1AauWyGCNZU2eUO6Wwglf',
      '/images/products/bahamut-21-2.jpg',
      '/images/products/bm-art-21-1.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '34', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 21, Wash 3). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 52,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-3.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS4BD5xSVZbTTPZF0YfsDUHnlXGzxcwPPNhzs0lsY5XB1efOb4L',
      '/images/products/bahamut-21-3.jpg',
      '/images/products/bm-art-21-1.jpg',
      '/images/products/bm-art-21-2.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '34', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 22, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-22-2.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcStIOrcEmk1Go6TVsJViN64gj0DT-Pq4pEV9PhxWwmvK6epG9mQ',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRis9ERrkH4GyadO6142YyYUZkvNniUx5NS2g5ZS6OI4DutMecQ',
      '/images/products/bahamut-22-2-selvedge-denim-1.jpg',
      '/images/products/bahamut-22-2-selvedge.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 23, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 7,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-23-1.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBmlwWUDbgYUXJ6t26eDWTUzrgfK5isNhbkTLoiB4aZBl3c-W',
      '/images/products/bahamut-23-selvedge.jpg',
      '/images/products/bm-art-22-2.jpg',
      '/images/products/bm-art-24-1.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 24, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 14,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-24-1.jpg',
      'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQCND_G3IlaHr0qDFS1w6-XGuryzxEUupBUyAXd4rIM_TIBuiBb',
      '/images/products/bahamut-24-black-denim.jpg',
      '/images/products/bm-art-26-1.jpg',
      '/images/products/bm-art-23-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 26, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-26-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_AZ73G3gpjxKceRjmLTg0hbJhdpIH808OO6GUeZFl-A82kNHO',
      '/images/products/bahamut-26-raw-denim.jpg',
      '/images/products/bm-art-24-1.jpg',
      '/images/products/bm-art-27-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['32', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 27, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 9,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-27-1.jpg',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U',
      '/images/products/bahamut-27-1-denim.jpg',
      '/images/products/bm-art-28-1.jpg',
      '/images/products/bm-art-26-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 27, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRIY3mZZqiLrnV5lOrt7G00g0YlCCFKiYK1UbSDF_jWsdYyS26U',
      '/images/products/bahamut-27-1-denim.jpg',
      '/images/products/bm-art-27-1.jpg',
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4WMSYAz-8v7Ku4t8cyuwJ5SYW_cE0BwxN3CFNSbY-SgCaZFi3',
      '/images/products/bm-art-28-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 28, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-28-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M',
      '/images/products/bahamut-28-1-lycra.jpg',
      '/images/products/bahamut-28-2-lycra.jpg',
      '/images/products/bm-art-27-1.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 29, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 1,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRsZ7Boj_iQL-e7mAlu4oTb8JauKxBXyG3QiGBXqdEKeRO4OXeh',
      '/images/products/bahamut-28-2-lycra.jpg',
      '/images/products/bm-art-28-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGK7XbzL6rxDlW7y-09_UW_k9eUz08mITQh-eSAHDbouj7qM4M'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['30'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 29, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 3,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4WMSYAz-8v7Ku4t8cyuwJ5SYW_cE0BwxN3CFNSbY-SgCaZFi3',
      '/images/products/bahamut-25-white-denim.jpg',
      '/images/products/bm-art-28-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRsZ7Boj_iQL-e7mAlu4oTb8JauKxBXyG3QiGBXqdEKeRO4OXeh'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 30, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 2,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/ahmedabad-woven-chambray-navy-1.png',
      '/images/products/textured-oxford-solid-khaki-1.png',
      '/images/products/bm-art-21-1.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['32', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 31, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 6,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-31-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM',
      '/images/products/bahamut-31-1-denim.jpg',
      '/images/products/bm-art-31-2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0nfdd0isZyHHHLsWKzyRBuY1-E7KviQB4Z30lAlIwU607qct'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 31, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 3,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-31-2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0nfdd0isZyHHHLsWKzyRBuY1-E7KviQB4Z30lAlIwU607qct',
      '/images/products/bahamut-31-2-denim.jpg',
      '/images/products/bm-art-31-1.jpg',
      'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8DuMi0O9RJ9QGsTYLO40yRvuYs1ILPcMfIa_GEexzriTd89JM'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['32', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 32, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 15,
    rating: 4.9,
    review_count: 140,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/cyber-street-graffiti-oversized-tee-1.png',
      '/images/products/bahamut-draconic-heavyweight-tee-1.png',
      '/images/products/blood-flame-oversized-hoodie-1.png'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 33, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 120,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-1.jpg',
      '/images/products/bm-art-21-2.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 33, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 5,
    rating: 4.9,
    review_count: 110,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-2.jpg',
      '/images/products/bm-art-21-3.jpg'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['30', '32', '34', '36'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 34, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 20,
    rating: 4.9,
    review_count: 145,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-21-3.jpg',
      '/images/products/bm-art-21-1.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '34', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 34, Wash 2). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 10,
    rating: 4.9,
    review_count: 130,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/bm-art-22-2.jpg',
      '/images/products/bm-art-23-1.jpg'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    available_sizes: ['30', '32', '34', '36', '38'],
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
    description: 'BahaMut Men Regular Fit Jeans (Art 35, Wash 1). Crafted from 100% Ring-Spun Woven Cotton Denim engineered at Ahmedabad textile mills. Billed & fulfilled by DE VIBE, Ambawadi, Ahmedabad (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim • 12 oz (380 GSM)',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 38,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery nationwide from Ahmedabad',
    images: [
      '/images/products/blood-flame-oversized-hoodie-1.png',
      '/images/products/bahamut-draconic-heavyweight-tee-1.png',
      '/images/products/cyber-street-graffiti-oversized-tee-1.png'
    ],
    sizes: ['28', '30', '32', '34', '36'],
    available_sizes: ['28', '30', '32', '34', '36'],
    gtin: '612066059780',
    mpn: 'BM-ART-35-1',
    mybillbook_item_id: 'BM-ART-35-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  }
];

export function getProducts(): Product[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_smartbiz_products_v30');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(p => ({
            ...p,
            sizes: getStandard5Sizes(p)
          }));
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
    localStorage.setItem('bahamut_smartbiz_products_v30', JSON.stringify(updated));
  }
  return updated;
}

export function deleteProduct(idOrSlug: string): Product[] {
  const current = getProducts();
  const updated = current.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_smartbiz_products_v30', JSON.stringify(updated));
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
    localStorage.setItem('bahamut_smartbiz_products_v30', JSON.stringify(products));
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
    localStorage.setItem('bahamut_smartbiz_products_v30', JSON.stringify(updated));
  }
  return updated;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
