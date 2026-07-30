import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalAmount, paymentType, customerDetails, cartItems } = body;

    if (!totalAmount || !paymentType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine advance deposit vs full payment
    // Partial COD charges fixed ₹200 deposit
    const isPartialCod = paymentType === 'PARTIAL_COD';
    const amountToChargeInRupees = isPartialCod ? 200 : totalAmount;
    const amountInPaise = Math.round(amountToChargeInRupees * 100);

    const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    const orderNumber = `BM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      razorpay_order_id: razorpayOrderId,
      order_number: orderNumber,
      amount: amountInPaise,
      currency: 'INR',
      payment_type: paymentType,
      advance_amount: amountToChargeInRupees,
      cod_balance_due: isPartialCod ? totalAmount - 200 : 0,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_key_id_here'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Razorpay order creation failed' }, { status: 500 });
  }
}
