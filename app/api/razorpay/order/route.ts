import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalAmount, paymentType, customerDetails, cartItems } = body;

    if (!totalAmount || !customerDetails) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'SERVER SECURITY ERROR: Razorpay API environment variables are missing' },
        { status: 500 }
      );
    }

    const isPartialCod = paymentType === 'PARTIAL_COD';
    const advanceDeposit = isPartialCod ? 200 : totalAmount;
    const amountInPaise = Math.round(advanceDeposit * 100);

    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;
    const orderNumber = `BM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      razorpay_order_id: razorpayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      order_number: orderNumber,
      payment_type: paymentType,
      advance_deposit: advanceDeposit,
      cod_balance_due: isPartialCod ? totalAmount - 200 : 0
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Order initialization failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
