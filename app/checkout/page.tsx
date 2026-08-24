'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { saveOrderToMemory, OrderDetails } from '@/lib/orders';
import { getPincodeRtoRisk } from '@/lib/rtoRules';
import { MapPin, ShieldCheck, CreditCard, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    Cashfree?: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('380015');
  const [paymentType, setPaymentType] = useState<'PARTIAL_COD' | 'PREPAID'>('PARTIAL_COD');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load Cashfree SDK v3
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const totalAmount = cartTotal;
  const advanceAmountToPay = Math.min(200, totalAmount);
  const codBalanceToPayAtDoorstep = Math.max(0, totalAmount - advanceAmountToPay);

  const rtoRisk = getPincodeRtoRisk(pincode);

  const isPincodeValid = pincode.trim().length === 6 && /^\d{6}$/.test(pincode);
  const isPhoneValid = customerPhone.trim().length === 10 && /^\d{10}$/.test(customerPhone);
  const isFormValid =
    customerName.trim().length > 2 &&
    customerEmail.includes('@') &&
    isPhoneValid &&
    addressLine.trim().length > 5 &&
    isPincodeValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || cart.length === 0) return;

    setLoading(true);

    try {
      const isPartial = paymentType === 'PARTIAL_COD' && !rtoRisk.isBlacklisted;
      const amountToChargeOnline = isPartial ? advanceAmountToPay : totalAmount;

      // 1. Call Cashfree Order Creation API
      const response = await fetch('/api/cashfree/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount,
          paymentType: isPartial ? 'PARTIAL_COD' : 'PREPAID',
          customerDetails: {
            fullName: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: addressLine,
            city,
            state,
            pincode
          },
          cartItems: cart
        })
      });

      const data = await response.json();

      if (!response.ok || !data.payment_session_id) {
        throw new Error(data.error || 'Failed to initiate Cashfree payment session');
      }

      // Save order details to local memory
      const orderPayload: OrderDetails = {
        id: data.order_id,
        order_number: data.order_id,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        shipping_address: `${addressLine}, ${city}, ${state} - ${pincode}`,
        pincode: pincode,
        items: cart,
        total_amount: totalAmount,
        advance_paid: amountToChargeOnline,
        cod_balance: isPartial ? codBalanceToPayAtDoorstep : 0,
        payment_type: isPartial ? 'PARTIAL_COD' : 'PREPAID',
        payment_status: 'PAID_ADVANCE',
        fulfillment_status: 'UNFULFILLED',
        rto_risk_level: rtoRisk.level,
        created_at: new Date().toISOString(),
      };

      saveOrderToMemory(orderPayload);

      // 2. Launch Cashfree SDK Checkout modal/redirect
      if (window.Cashfree) {
        const cashfree = window.Cashfree({ mode: 'production' });
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: '_self'
        });
      } else {
        // Fallback redirect if SDK fails to mount
        window.location.href = `/api/cashfree/verify?order_id=${data.order_id}&payment_type=${paymentType}&total_amount=${totalAmount}`;
      }
    } catch (err: any) {
      console.error('Checkout failed', err);
      alert(err.message || 'Transaction failed. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F7F7F8] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-sans text-2xl font-bold text-[#111111] uppercase mb-2">Bag is Empty</h2>
        <p className="text-xs text-[#666666] mb-6">Please add items to your shopping bag before proceeding.</p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F8] text-[#111111] min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E5E5E5] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> CASHFREE VERIFIED GATEWAY
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#111111]" /> Secure Checkout
            </h1>
          </div>

          <div className="text-xs text-[#666666] font-medium flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
              256-BIT SSL ENCRYPTED
            </span>
            <span>Cashfree Production Gateway Active</span>
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Address Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="text-base font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#111111]" /> 1. Shipping & Customer Details
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                Pincode Check Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onBlur={() => handleBlur('customerName')}
                  placeholder="Enter full name"
                  className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  Phone Number (10 Digits) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  onBlur={() => handleBlur('customerPhone')}
                  placeholder="10-digit mobile number"
                  className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                onBlur={() => handleBlur('customerEmail')}
                placeholder="email@domain.com"
                className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                Flat, House No., Building & Street Address *
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                onBlur={() => handleBlur('addressLine')}
                placeholder="House No, Street name, Locality"
                className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  onBlur={() => handleBlur('pincode')}
                  className="w-full min-h-[46px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4 border-t border-[#E5E5E5]">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#111111]" /> 2. Cashfree Payment Options
              </h4>

              <div className="space-y-3">
                <div
                  onClick={() => setPaymentType('PARTIAL_COD')}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentType === 'PARTIAL_COD'
                      ? 'border-[#111111] bg-[#F7F7F8]'
                      : 'border-[#E5E5E5] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'PARTIAL_COD'}
                        onChange={() => setPaymentType('PARTIAL_COD')}
                        className="accent-[#111111] w-4 h-4"
                      />
                      <span className="text-xs font-bold text-[#111111]">Partial COD (₹200 Cashfree Advance)</span>
                    </div>
                    <span className="bg-[#111111] text-white text-[9px] font-bold px-2 py-0.5 uppercase">RECOMMENDED</span>
                  </div>
                  <p className="text-xs text-[#666666] mt-2 leading-relaxed pl-6 font-medium">
                    Pay ₹200 advance deposit via Cashfree (UPI, GPay, PhonePe, Cards); pay remaining ₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')} cash at doorstep.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentType('PREPAID')}
                  className={`p-4 border cursor-pointer transition-all ${
                    paymentType === 'PREPAID'
                      ? 'border-[#111111] bg-[#F7F7F8]'
                      : 'border-[#E5E5E5] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'PREPAID'}
                        onChange={() => setPaymentType('PREPAID')}
                        className="accent-[#111111] w-4 h-4"
                      />
                      <span className="text-xs font-bold text-[#111111]">Full Prepaid Online Payment</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold px-2 py-0.5 uppercase">5% INSTANT OFF</span>
                  </div>
                  <p className="text-xs text-[#666666] mt-2 leading-relaxed pl-6 font-medium">
                    Pay full ₹{totalAmount.toLocaleString('en-IN')} online via Cashfree Payment Gateway.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary & Order Button */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6 h-fit">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E5E5E5] pb-4">
              Items in Bag ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#111111] block">{item.product.title}</span>
                    <span className="text-[#666666]">Size: {item.selectedSize} × {item.quantity}</span>
                  </div>
                  <span className="text-[#111111] font-bold">
                    ₹{((item.product.price || 1299) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-[#E5E5E5] pt-4 text-xs">
              <div className="flex justify-between text-[#666666]">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Express Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between border-t border-[#E5E5E5] pt-2 text-sm text-[#111111] font-bold">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-[#111111]">
                <span>Payable via Cashfree:</span>
                <span className="text-[#111111] font-black text-base">
                  ₹{(paymentType === 'PARTIAL_COD' ? advanceAmountToPay : totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
              {paymentType === 'PARTIAL_COD' && (
                <div className="flex justify-between text-[#666666]">
                  <span>Balance at Doorstep:</span>
                  <span>₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full min-h-[52px] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                loading || !isFormValid
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300'
                  : 'bg-[#111111] hover:bg-black text-white active:scale-95'
              }`}
            >
              {loading ? 'Initializing Cashfree Gateway...' : `Pay ₹${(paymentType === 'PARTIAL_COD' ? advanceAmountToPay : totalAmount).toLocaleString('en-IN')} via Cashfree`}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
