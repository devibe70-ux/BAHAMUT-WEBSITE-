import { NextRequest, NextResponse } from 'next/server';
import { generateMyBillBookCsv, convertOrdersToMyBillBookRows } from '@/lib/mybillbook';
import { INITIAL_ORDERS } from '@/lib/orders';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const orders = body.orders || INITIAL_ORDERS;

    const format = body.format || 'csv';

    if (format === 'json') {
      const myBillBookRows = convertOrdersToMyBillBookRows(orders);
      return NextResponse.json({
        success: true,
        app: 'MyBillBook Desktop Import Engine',
        total_invoices: myBillBookRows.length,
        invoices: myBillBookRows
      });
    }

    const csvData = generateMyBillBookCsv(orders);

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="MyBillBook_Sales_Import_${Date.now()}.csv"`
      }
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'MyBillBook export failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
