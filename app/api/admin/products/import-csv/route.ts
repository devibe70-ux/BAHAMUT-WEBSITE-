import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let csvText = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ error: 'No CSV file uploaded' }, { status: 400 });
      }
      csvText = await file.text();
    } else {
      const body = await req.json();
      csvText = body.csvText || '';
    }

    if (!csvText.trim()) {
      return NextResponse.json({ error: 'Empty CSV content' }, { status: 400 });
    }

    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length <= 1) {
      return NextResponse.json({ error: 'CSV file contains no product data rows' }, { status: 400 });
    }

    // Helper to parse CSV line respecting quotes
    const parseCsvLine = (text: string) => {
      const result: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
          result.push(cur.trim().replace(/^"|"$/g, ''));
          cur = '';
        } else {
          cur += c;
        }
      }
      result.push(cur.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());
    const products = [];

    for (let i = 1; i < lines.length; i++) {
      const row = parseCsvLine(lines[i]);
      if (row.length < 2) continue;

      const getVal = (field: string) => {
        const idx = headers.findIndex(h => h.includes(field));
        return idx >= 0 && row[idx] ? row[idx] : '';
      };

      const title = getVal('title') || getVal('name') || `Product ${i}`;
      const priceStr = getVal('sale_price') || getVal('price') || '1299';
      const mrpStr = getVal('price') || getVal('mrp') || '2499';

      const price = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 1299;
      const original_mrp = parseFloat(mrpStr.replace(/[^\d.]/g, '')) || 2499;

      const imageLink = getVal('image_link') || getVal('image') || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
      const additionalImg = getVal('additional_image_link');

      const id = getVal('id') || `csv-${Date.now()}-${i}`;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const sizesStr = getVal('size') || getVal('sizes') || '38, 40, 42, 44, 46';
      const sizes = sizesStr.split(/[,|]/).map(s => s.trim()).filter(Boolean);

      let category: 'SHIRT' | 'BOTTOMWEAR' | 'TEE' = 'SHIRT';
      const prodType = (getVal('product_type') || getVal('category') || '').toUpperCase();
      if (prodType.includes('BOTTOM') || prodType.includes('PANT') || prodType.includes('DENIM') || prodType.includes('JEAN')) {
        category = 'BOTTOMWEAR';
      } else if (prodType.includes('TEE') || prodType.includes('T-SHIRT') || prodType.includes('HOODIE')) {
        category = 'TEE';
      }

      products.push({
        id,
        slug: slug || id,
        title,
        category,
        description: getVal('description') || `${title} - Direct-from-manufacturer 100% Woven Cotton apparel from DE VIBE Ahmedabad.`,
        target_demographic: 'UNIFIED_13_65',
        fabric_details: getVal('fabric_details') || '100% Breathable Woven Cotton (Ahmedabad Mills)',
        price,
        original_mrp: Math.max(price, original_mrp),
        stock_quantity: parseInt(getVal('stock')) || 40,
        rating: 4.8,
        review_count: 150,
        express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
        images: additionalImg ? [imageLink, additionalImg] : [imageLink],
        sizes: sizes.length > 0 ? sizes : ['38', '40', '42', '44', '46'],
        color: getVal('color') || 'Classic',
        gtin: getVal('gtin') || '',
        mpn: getVal('mpn') || `BM-2026-CSV-${i}`,
        is_active: true,
        created_at: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${products.length} products from CSV!`,
      imported_count: products.length,
      products
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'CSV parsing failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
