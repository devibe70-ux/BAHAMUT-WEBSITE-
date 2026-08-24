import { NextRequest, NextResponse } from 'next/server';
import { Product, Size } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No CSV file uploaded' }, { status: 400 });
    }

    const csvText = await file.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length <= 1) {
      return NextResponse.json({ error: 'CSV file is empty or missing headers' }, { status: 400 });
    }

    const header = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
    
    // Header Index Mapping
    const getIndex = (keys: string[]) => {
      return header.findIndex(h => keys.includes(h));
    };

    const handleIdx = getIndex(['handle', 'slug']);
    const titleIdx = getIndex(['title', 'name', 'product_name']);
    const skuIdx = getIndex(['sku', 'id', 'item_code', 'mpn']);
    const priceIdx = getIndex(['price', 'selling_price', 'sale_price']);
    const mrpIdx = getIndex(['mrp', 'original_mrp']);
    const stockIdx = getIndex(['stock', 'stock_quantity', 'qty', 'current_stock']);
    const hsnIdx = getIndex(['hsn', 'hsn_code', 'hsncode']);
    const image1Idx = getIndex(['image_url_1', 'image_link', 'image', 'images']);
    const image2Idx = getIndex(['image_url_2', 'additional_image_link']);
    const sizesIdx = getIndex(['size', 'sizes', 'available_sizes']);
    const categoryIdx = getIndex(['category', 'product_type']);

    const importedProducts: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      // Split CSV respecting quotes
      const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
      const cleanRow = row.map(cell => cell.trim().replace(/^["']|["']$/g, ''));

      if (cleanRow.length < 2) continue;

      const title = cleanRow[titleIdx >= 0 ? titleIdx : 1] || `Apparel Item ${i}`;
      const sku = cleanRow[skuIdx >= 0 ? skuIdx : 0] || `SKU-${Date.now()}-${i}`;
      const handle = cleanRow[handleIdx >= 0 ? handleIdx : 0] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const price = parseFloat(cleanRow[priceIdx >= 0 ? priceIdx : 2]) || 1299;
      const originalMrp = parseFloat(cleanRow[mrpIdx >= 0 ? mrpIdx : 3]) || (price * 1.6);
      const stock = parseInt(cleanRow[stockIdx >= 0 ? stockIdx : 4], 10) || 40;
      const hsn = cleanRow[hsnIdx >= 0 ? hsnIdx : 0] || '6203';
      const img1 = cleanRow[image1Idx >= 0 ? image1Idx : 0] || '/images/products/bahamut-22-2-selvedge-denim-1.jpg';
      const img2 = image2Idx >= 0 ? cleanRow[image2Idx] : '';

      const images = [img1];
      if (img2 && img2.length > 5) images.push(img2);

      let category: 'SHIRT' | 'BOTTOMWEAR' | 'TEE' = 'BOTTOMWEAR';
      const catText = (cleanRow[categoryIdx >= 0 ? categoryIdx : 0] || title).toUpperCase();
      if (catText.includes('SHIRT')) category = 'SHIRT';
      else if (catText.includes('TEE') || catText.includes('HOODIE')) category = 'TEE';

      let matrix5: Size[] = ['28', '30', '32', '34', '36'];
      if (category === 'SHIRT') matrix5 = ['38', '40', '42', '44', '46'];
      else if (category === 'TEE') matrix5 = ['S', 'M', 'L', 'XL', 'XXL'];

      const sizeCell = sizesIdx >= 0 ? cleanRow[sizesIdx] : '';
      let availSizes: Size[] = matrix5;
      if (sizeCell.length > 0) {
        availSizes = sizeCell.split(/[,;\s]+/).map(s => s.trim().toUpperCase() as Size).filter(Boolean);
      }

      const product: Product = {
        id: sku,
        slug: handle,
        title,
        category,
        description: `BahaMut 100% Woven Cotton Apparel. Statutory 5% GST Compliant (HSN: ${hsn}). Billed by DEVIBE.`,
        target_demographic: 'UNIFIED_13_65',
        fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
        price,
        original_mrp: Math.round(originalMrp),
        stock_quantity: stock,
        rating: 4.8,
        review_count: 150,
        images,
        sizes: matrix5,
        available_sizes: availSizes,
        mpn: sku,
        mybillbook_item_id: sku,
        is_active: stock > 0,
        created_at: new Date().toISOString()
      };

      importedProducts.push(product);
    }

    return NextResponse.json({
      success: true,
      imported_count: importedProducts.length,
      products: importedProducts
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process CSV file' }, { status: 500 });
  }
}
