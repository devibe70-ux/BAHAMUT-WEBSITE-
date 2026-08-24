import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalAmount, paymentType, customerDetails, cartItems } = body;

    if (!totalAmount || !customerDetails || !customerDetails.fullName || !customerDetails.phone) {
      return NextResponse.json({ error: 'Missing required customer or order details' }, { status: 400 });
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      return NextResponse.json({ error: 'Cashfree API credentials not configured in environment' }, { status: 500 });
    }

    const isProd = process.env.CASHFREE_ENV === 'PRODUCTION' || true;
    const cashfreeHost = isProd ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

    const isPartialCod = paymentType === 'PARTIAL_COD';
    const advanceDeposit = isPartialCod ? 200 : Number(totalAmount);
    const orderNumber = `BM-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const hostUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bahamut.in';

    // Format item details for MyBillBook inventory mapping & Cashfree order note
    const mappedItemsSummary = (cartItems || []).map((item: any) => {
      const p = item.product || {};
      return `${p.title || 'Apparel'} (Size: ${item.selectedSize || 'Standard'}, MB_ID: ${p.mybillbook_item_id || p.id || 'N/A'}, Qty: ${item.quantity || 1})`;
    }).join('; ');

    const requestBody = {
      order_id: orderNumber,
      order_amount: advanceDeposit,
      order_currency: 'INR',
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: customerDetails.fullName,
        customer_email: customerDetails.email || 'devibe70@gmail.com',
        customer_phone: customerDetails.phone.replace(/\D/g, '').slice(-10) || '9727024519',
      },
      order_meta: {
        return_url: `${hostUrl}/api/cashfree/verify?order_id={order_id}&payment_type=${paymentType}&total_amount=${totalAmount}`,
      },
      order_note: `BAHAMUT ${paymentType} Order - ${orderNumber} | Items: ${mappedItemsSummary.slice(0, 200)}`
    };

    const res = await fetch(`${cashfreeHost}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store'
    });

    const cfData = await res.json();

    if (!res.ok) {
      console.error('Cashfree Order Error:', cfData);
      return NextResponse.json({ error: cfData.message || 'Cashfree Order creation failed' }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      order_id: orderNumber,
      payment_session_id: cfData.payment_session_id,
      cf_order_id: cfData.cf_order_id,
      order_amount: advanceDeposit,
      payment_type: paymentType,
      cod_balance_due: isPartialCod ? totalAmount - 200 : 0
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Cashfree payment initialization error';
    console.error('Cashfree Exception:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
