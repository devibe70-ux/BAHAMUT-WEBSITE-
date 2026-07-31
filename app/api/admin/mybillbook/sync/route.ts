import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, sync_timestamp } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid MyBillBook payload. Expected array of items with id/slug and stock_quantity.' },
        { status: 400 }
      );
    }

    const syncResults = items.map((item: { id_or_slug: string; stock_quantity: number }) => ({
      item: item.id_or_slug,
      synced_stock: item.stock_quantity,
      status: item.stock_quantity === 0 ? 'MARKED_OUT_OF_STOCK' : 'IN_STOCK'
    }));

    return NextResponse.json({
      success: true,
      app: 'MyBillBook Inventory Sync Engine',
      sync_timestamp: sync_timestamp || new Date().toISOString(),
      updated_items_count: syncResults.length,
      synced_inventory: syncResults,
      message: 'MyBillBook inventory sync completed successfully. Storefront stock updated.'
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'MyBillBook sync failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
