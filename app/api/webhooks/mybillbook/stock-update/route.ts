import { NextRequest, NextResponse } from 'next/server';
import { updateProductStock } from '@/lib/products';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { item_code, current_stock, sku } = body;

    const targetSku = item_code || sku;
    if (!targetSku) {
      return NextResponse.json({ error: 'Missing item_code or sku in webhook payload' }, { status: 400 });
    }

    const stockNumber = parseInt(current_stock, 10);
    const updatedProducts = updateProductStock(targetSku, isNaN(stockNumber) ? 0 : stockNumber);

    return NextResponse.json({
      status: 'success',
      item_code: targetSku,
      updated_stock: isNaN(stockNumber) ? 0 : stockNumber,
      total_products: updatedProducts.length
    });
  } catch (error: any) {
    console.error('myBillBook Webhook Stock Sync Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
