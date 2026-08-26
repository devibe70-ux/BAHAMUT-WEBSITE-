const fs = require('fs');
const path = require('path');

const productsTsPath = path.join(__dirname, '..', 'lib', 'products.ts');
let content = fs.readFileSync(productsTsPath, 'utf8');

// Replace the miscategorized BM-ART-30-1 object block with correct Denim Jeans specifications
const oldBlockRegex = /\{\s*id:\s*'BM-ART-30-1',[\s\S]*?created_at:\s*'2026-08-01T10:00:00Z'\s*\}/;

const newBlock = `{
    id: 'BM-ART-30-1',
    slug: 'bm-art-30-1',
    title: 'BahaMut Men Regular Fit Jeans - Art 30 (Wash 1)',
    category: 'BOTTOMWEAR',
    description: 'BahaMut Men Regular Fit Jeans (Art 30, Wash 1). Crafted from 100% Woven Cotton Denim at Ambawadi, Ahmedabad. Statutory 8-digit HSN 62034290. Billed by DEVIBE.',
    target_demographic: 'UNIFIED_13_65',
    fabric_details: '100% Woven Cotton Denim',
    price: 1499,
    original_mrp: 1999,
    stock_quantity: 12,
    rating: 4.9,
    review_count: 180,
    express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
    images: ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="%23111111"><rect width="600" height="750" fill="%2318181b"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="28" font-weight="900">BahaMut</text><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="%23a1a1aa" font-family="sans-serif" font-size="16" font-weight="700">PHOTOSHOOT PENDING</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="sans-serif" font-size="12">100% Woven Cotton Denim • Ambawadi Ahmedabad</text></svg>'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    available_sizes: ['32', '38'],
    gtin: '531906085732',
    mpn: 'BM-ART-30-1',
    mybillbook_item_id: 'BM-ART-30-1',
    is_active: true,
    created_at: '2026-08-01T10:00:00Z'
  }`;

content = content.replace(oldBlockRegex, newBlock);

// Upgrade localStorage cache key to bahamut_smartbiz_products_v24 to force browser refresh
content = content.replace(/bahamut_smartbiz_products_v23/g, 'bahamut_smartbiz_products_v24');

fs.writeFileSync(productsTsPath, content, 'utf8');
console.log('✅ Corrected BM-ART-30-1: Re-categorized from SHIRT to BOTTOMWEAR (Denim Jeans with sizes 32, 38)!');

// Run sync script for Google Merchant route & public/products.csv
require('./sync_merchant_and_public_csv.js');
