import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const csvFilePath = path.join(process.cwd(), 'public', 'products.csv');
    if (!fs.existsSync(csvFilePath)) {
      return NextResponse.json({ error: 'products.csv file not found' }, { status: 404 });
    }

    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="bahamut_google_merchant_products.csv"',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
