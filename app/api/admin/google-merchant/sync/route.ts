import { NextResponse } from 'next/server';
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
