const fs = require('fs');
const path = require('path');

const productsTsText = fs.readFileSync(path.join(__dirname, '..', 'lib', 'products.ts'), 'utf8');

// Update app/api/admin/google-merchant/sync/route.ts
const routeContent = `import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products';

export async function POST(req: Request) {
  try {
    const { merchantEmail = 'bahamut.india@gmail.com', brandName = 'BahaMut by DE VIBE' } = await req.json();

    const googleMerchantProducts = INITIAL_PRODUCTS.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.description,
      price: p.price,
      original_mrp: p.original_mrp,
      stock_quantity: p.stock_quantity,
      images: p.images,
      sizes: p.sizes,
      available_sizes: p.available_sizes,
      gtin: p.gtin,
      mpn: p.mpn,
      is_active: p.is_active
    }));

    return NextResponse.json({
      success: true,
      account: merchantEmail,
      brand: brandName,
      synced_count: googleMerchantProducts.length,
      products: googleMerchantProducts
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'app', 'api', 'admin', 'google-merchant', 'sync', 'route.ts'), routeContent, 'utf8');
console.log('✅ Updated app/api/admin/google-merchant/sync/route.ts!');

// Update public/products.csv
const csvHeaders = 'id,title,description,link,image_link,additional_image_link,availability,price,sale_price,brand,gtin,mpn,google_product_category,product_type,condition,gender,age_group,color,size,fabric_details';

// Extract products from INITIAL_PRODUCTS array text using regex
const matches = [...productsTsText.matchAll(/id:\s*'([^']+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?title:\s*'([^']+)',[\s\S]*?price:\s*(\d+),[\s\S]*?original_mrp:\s*(\d+),[\s\S]*?images:\s*\['([^']+)'\],[\s\S]*?available_sizes:\s*(\[[^\]]+\]),[\s\S]*?gtin:\s*'([^']+)',[\s\S]*?mpn:\s*'([^']+)'/g)];

const csvLines = [csvHeaders];
matches.forEach(m => {
  const id = m[1];
  const slug = m[2];
  const title = m[3];
  const price = m[4];
  const mrp = m[5];
  const img = m[6];
  const sizes = JSON.parse(m[7]).join(', ');
  const gtin = m[8];
  const mpn = m[9];

  csvLines.push(`${id},"${title}","BahaMut Men Regular Fit Jeans. Statutory HSN 62034290. Billed by DEVIBE.","https://bahamut.in/product/${slug}","https://bahamut.in${img}","",in_stock,${mrp} INR,${price} INR,DE VIBE BAHAMUT,${gtin},${mpn},"Apparel & Accessories > Clothing > Pants",BOTTOMWEAR,new,unisex,adult,Indigo Denim,"${sizes}","100% Woven Cotton Denim"`);
});

fs.writeFileSync(path.join(__dirname, '..', 'public', 'products.csv'), csvLines.join('\n'), 'utf8');
console.log(`✅ Updated public/products.csv with ${matches.length} products!`);
