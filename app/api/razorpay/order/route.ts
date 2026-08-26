import { NextRequest, NextResponse } from 'next/server';

// Legacy Razorpay Route - Deprecated in favor of Cashfree Payments API (/api/cashfree/order)
export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Razorpay integration is deprecated. BahaMut uses Cashfree Payments (/api/cashfree/order).',
      gateway: 'Cashfree'
    },
    { status: 410 }
  );
}
