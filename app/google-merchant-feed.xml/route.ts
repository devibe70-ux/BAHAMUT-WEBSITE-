import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/lib/products';

export const dynamic = 'force-dynamic';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const itemsXml = INITIAL_PRODUCTS.map((p) => {
    // Ensure clean self-hosted image link
    let img = p.images?.[0] || '/images/products/bm-art-21-1.jpg';
    if (!img.startsWith('http')) {
      img = `https://bahamut.in${img}`;
    }
    // If it's a data URI or external thumbnail, fallback to self-hosted image
    if (img.startsWith('data:') || img.includes('encrypted-tbn')) {
      img = 'https://bahamut.in/images/products/bm-art-21-1.jpg';
    }

    const sizes = (p.available_sizes || p.sizes || []).join(', ');
    const desc = p.description || `${p.title}. 100% Woven Cotton Denim. Billed & fulfilled by DE VIBE (GSTIN: 24ASHPS9777R1ZE). HSN 62034290.`;

    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${escapeXml(desc)}</g:description>
      <g:link>https://bahamut.in/product/${escapeXml(p.slug)}</g:link>
      <g:image_link>${escapeXml(img)}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${p.price}.00 INR</g:price>
      <g:brand>BahaMut</g:brand>
      <g:mpn>${escapeXml(p.mpn || p.id)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:google_product_category>1604</g:google_product_category>
      <g:product_type>Apparel &gt; Clothing &gt; Pants &gt; Jeans</g:product_type>
      <g:gender>male</g:gender>
      <g:age_group>adult</g:age_group>
      <g:color>${escapeXml(p.color || 'Indigo Denim')}</g:color>
      <g:size>${escapeXml(sizes)}</g:size>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Free Express Delivery</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>BahaMut by DE VIBE — Official Google Merchant Catalog</title>
    <link>https://bahamut.in</link>
    <description>Direct-from-manufacturer 100% Breathable Woven Cotton Denim Jeans engineered at Ahmedabad textile mills.</description>
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
