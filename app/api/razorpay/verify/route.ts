import { NextRequest, NextResponse } from 'next/server';

// Legacy Razorpay Verification Route - Deprecated in favor of Cashfree Payments (/api/cashfree/verify)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id') || searchParams.get('razorpay_order_id');
  
  if (orderId) {
    return NextResponse.redirect(new URL(`/api/cashfree/verify?order_id=${orderId}`, req.url));
  }
  
  return NextResponse.redirect(new URL('/checkout?error=deprecated_gateway', req.url));
}

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      error: 'Razorpay integration is deprecated. BahaMut uses Cashfree Payments (/api/cashfree/verify).',
      gateway: 'Cashfree'
    },
    { status: 410 }
  );
}
