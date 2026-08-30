import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = 'https://bahamut.in';

  const itemsXml = INITIAL_PRODUCTS.map((p) => {
    const primaryImg = p.images?.[0]?.startsWith('http')
      ? p.images[0]
      : `${baseUrl}${p.images?.[0] || ''}`;

    const additionalImages = (p.images || [])
      .slice(1)
      .map((img) => {
        const fullImg = img.startsWith('http') ? img : `${baseUrl}${img}`;
        return `<g:additional_image_link>${escapeXml(fullImg)}</g:additional_image_link>`;
      })
      .join('\n        ');

    const availableSizes = (p.available_sizes || p.sizes || []).join('/');
    const isOutOfStock = (p.stock_quantity || 0) <= 0;

    let googleCategory = 'Apparel & Accessories > Clothing > Pants > Jeans';
    let productType = 'Men > Clothing > Denim Jeans';
    if (p.category === 'SHIRT') {
      googleCategory = 'Apparel & Accessories > Clothing > Shirts & Tops';
      productType = 'Men > Clothing > Shirts';
    } else if (p.category === 'TEE') {
      googleCategory = 'Apparel & Accessories > Clothing > Shirts & Tops > T-Shirts';
      productType = 'Men > Clothing > T-Shirts';
    }

    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${escapeXml(p.description)}</g:description>
      <g:link>${baseUrl}/product/${escapeXml(p.slug)}</g:link>
      <g:image_link>${escapeXml(primaryImg)}</g:image_link>
      ${additionalImages}
      <g:availability>${isOutOfStock ? 'out_of_stock' : 'in_stock'}</g:availability>
      <g:price>${p.original_mrp || 1999}.00 INR</g:price>
      <g:sale_price>${p.price || 1499}.00 INR</g:sale_price>
      <g:brand>BahaMut by DE VIBE</g:brand>
      <g:gtin>${p.gtin || '8901234501824'}</g:gtin>
      <g:mpn>${escapeXml(p.mpn || p.id)}</g:mpn>
      <g:identifier_exists>yes</g:identifier_exists>
      <g:condition>new</g:condition>
      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>
      <g:product_type>${escapeXml(productType)}</g:product_type>
      <g:gender>male</g:gender>
      <g:age_group>adult</g:age_group>
      <g:size>${escapeXml(availableSizes)}</g:size>
      <g:color>Indigo Denim</g:color>
      <g:material>100% Ring-Spun Woven Cotton (12 oz)</g:material>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Express Delivery</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>BahaMut by DE VIBE — Official Google Merchant Shopping Feed</title>
    <link>${baseUrl}</link>
    <description>Direct-from-manufacturer 100% Breathable Woven Cotton Denim Jeans &amp; Apparel engineered at Ahmedabad textile mills. Billed &amp; fulfilled by DE VIBE (GSTIN: 24ASHPS9777R1ZE).</description>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(xmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
