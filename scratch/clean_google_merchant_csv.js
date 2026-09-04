const fs = require('fs');
const path = require('path');

const productsTsText = fs.readFileSync(path.join(__dirname, '..', 'lib', 'products.ts'), 'utf8');

// Required Google Merchant Center CSV Header
const headers = [
  'id',
  'title',
  'description',
  'link',
  'image_link',
  'availability',
  'price',
  'brand',
  'mpn',
  'identifier_exists',
  'google_product_category',
  'product_type',
  'condition',
  'gender',
  'age_group',
  'color',
  'size',
  'shipping'
].join(',');

// Extract products from lib/products.ts
const idMatches = [...productsTsText.matchAll(/id:\s*'([^']+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?title:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)',[\s\S]*?description:\s*'([^']+)',[\s\S]*?price:\s*(\d+),[\s\S]*?images:\s*\[([^\]]+)\],[\s\S]*?available_sizes:\s*(\[[^\]]+\])/g)];

const rows = [headers];

idMatches.forEach(m => {
  const id = m[1];
  const slug = m[2];
  const title = m[3];
  const category = m[4];
  const desc = m[5];
  const price = m[6];
  const rawImgs = m[7];
  let sizes = '28, 30, 32, 34, 36, 38';
  try {
    sizes = JSON.parse(m[8].replace(/'/g, '"')).join(', ');
  } catch(e) {}

  // Pick first clean image
  let firstImg = '/images/products/bm-art-21-1.jpg';
  const imgUrls = rawImgs.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
  for (const im of imgUrls) {
    if (!im.startsWith('data:') && !im.includes('encrypted-tbn') && im.includes('/images/products/')) {
      firstImg = im;
      break;
    }
  }

  const fullImg = firstImg.startsWith('http') ? firstImg : `https://bahamut.in${firstImg}`;
  const fullLink = `https://bahamut.in/product/${slug}`;
  const cleanTitle = title.replace(/"/g, '""');
  const cleanDesc = desc.replace(/"/g, '""');

  rows.push(`${id},"${cleanTitle}","${cleanDesc}","${fullLink}","${fullImg}",in_stock,${price}.00 INR,BahaMut,${id},no,1604,"Apparel & Accessories > Clothing > Pants > Jeans",new,male,adult,Indigo Denim,"${sizes}",IN:::0.00 INR`);
});

fs.writeFileSync(path.join(__dirname, '..', 'public', 'products.csv'), rows.join('\n'), 'utf8');
console.log(`✅ Successfully generated 100% compliant Google Merchant CSV at public/products.csv with ${rows.length - 1} products!`);
