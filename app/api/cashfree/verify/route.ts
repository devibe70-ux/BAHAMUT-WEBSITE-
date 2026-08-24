import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');
    const paymentType = searchParams.get('payment_type') || 'PARTIAL_COD';
    const totalAmount = searchParams.get('total_amount') || '0';

    if (!orderId) {
      return NextResponse.redirect(new URL('/checkout?error=invalid_order', req.url));
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.redirect(new URL('/checkout?error=cashfree_keys_missing', req.url));
    }

    const isProd = process.env.CASHFREE_ENV === 'PRODUCTION' || true;
    const cashfreeHost = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

    const res = await fetch(`${cashfreeHost}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
      },
      cache: 'no-store'
    });

    const cfData = await res.json();

    if (res.ok && (cfData.order_status === 'PAID' || cfData.order_status === 'ACTIVE')) {
      // Payment Successful / Active Session: Redirect to tracking page
      const trackUrl = new URL(`/track/${orderId}`, req.url);
      trackUrl.searchParams.set('payment', 'success');
      trackUrl.searchParams.set('gateway', 'cashfree');
      trackUrl.searchParams.set('amount_paid', cfData.order_amount || '200');
      return NextResponse.redirect(trackUrl);
    } else {
      console.warn('Cashfree payment status:', cfData);
      const checkoutUrl = new URL('/checkout', req.url);
      checkoutUrl.searchParams.set('error', 'payment_failed');
      return NextResponse.redirect(checkoutUrl);
    }
  } catch (error: unknown) {
    console.error('Cashfree Verification Error:', error);
    const checkoutUrl = new URL('/checkout', req.url);
    checkoutUrl.searchParams.set('error', 'verification_exception');
    return NextResponse.redirect(checkoutUrl);
  }
}
