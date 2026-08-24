const fs = require('fs');
const path = require('path');

const productsTsPath = path.join(__dirname, '..', 'lib', 'products.ts');
let productsTsContent = fs.readFileSync(productsTsPath, 'utf8');

// Replace all price: 1049 (or any selling price) with price: 1499 in lib/products.ts
productsTsContent = productsTsContent.replace(/price:\s*\d+/g, 'price: 1499');

// Update localStorage cache key to bahamut_smartbiz_products_v23 to force browser refresh
productsTsContent = productsTsContent.replace(/bahamut_smartbiz_products_v22/g, 'bahamut_smartbiz_products_v23');

fs.writeFileSync(productsTsPath, productsTsContent, 'utf8');
console.log('✅ Updated lib/products.ts: Storefront prices set to 1499 INR (Inclusive of 5% GST)!');

// Run sync script for Google Merchant route & public/products.csv
const syncScript = require('./sync_merchant_and_public_csv.js');
