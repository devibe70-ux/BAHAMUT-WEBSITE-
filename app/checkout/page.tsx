'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { saveOrderToMemory, OrderDetails } from '@/lib/orders';
import { getPincodeRtoRisk } from '@/lib/rtoRules';
import { MapPin, ShieldCheck, CreditCard, CheckCircle2, AlertTriangle, ArrowRight, Lock, PhoneCall } from 'lucide-react';



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
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
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

      const orderPayload: OrderDetails = {
        id: `BM-${Date.now().toString().slice(-6)}`,
        order_number: `BM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
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
      clearCart();

      router.push(`/track/${orderPayload.order_number}`);
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#0a0a0b] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading text-2xl text-white uppercase mb-2">Bag is Empty</h2>
        <p className="text-xs text-[#8b8b94] mb-6">Please add items to your shopping bag before proceeding.</p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px]"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0b] text-[#ececed] min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <section className="bg-[#121215] border-b border-[#26262c] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8b0018] text-white text-[10px] font-bold px-3 py-1 rounded-[2px] uppercase tracking-widest mb-2 shadow">
              <ShieldCheck className="w-3.5 h-3.5" /> TM NO. 5018168 • CLASS 25
            </div>
            <h1 className="font-heading text-3xl text-white uppercase tracking-wider flex items-center gap-3">
              <Lock className="w-7 h-7 text-[#b3001f]" /> Secure Checkout
            </h1>
          </div>

          <div className="text-xs text-[#8b8b94] font-medium">
            256-Bit SSL Encrypted Razorpay Gateway
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Address Form */}
          <div className="lg:col-span-7 bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#26262c] pb-4">
              <h3 className="font-heading text-base text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#b3001f]" /> 1. Shipping & Customer Details
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                Pincode Check Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onBlur={() => handleBlur('customerName')}
                  placeholder="Enter full name"
                  className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
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
                  className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                onBlur={() => handleBlur('customerEmail')}
                placeholder="email@domain.com"
                className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                Flat, House No., Building & Street Address *
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                onBlur={() => handleBlur('addressLine')}
                placeholder="House No, Street name, Locality"
                className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                  PIN Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  onBlur={() => handleBlur('pincode')}
                  className="w-full min-h-[46px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 pt-4 border-t border-[#26262c]">
              <h4 className="font-heading text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#b3001f]" /> 2. Payment Method
              </h4>

              <div className="space-y-3">
                <div
                  onClick={() => !rtoRisk.isBlacklisted && setPaymentType('PARTIAL_COD')}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all ${
                    paymentType === 'PARTIAL_COD'
                      ? 'border-[#8b0018] bg-[#8b0018]/15 shadow glow-crimson'
                      : 'border-[#26262c] bg-[#1b1b20]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'PARTIAL_COD'}
                        onChange={() => setPaymentType('PARTIAL_COD')}
                        className="accent-[#8b0018] w-4 h-4"
                      />
                      <span className="font-heading text-xs text-white">Partial COD (₹200 Advance Deposit)</span>
                    </div>
                    <span className="bg-[#8b0018] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">RECOMMENDED</span>
                  </div>
                  <p className="text-xs text-[#8b8b94] mt-2 leading-relaxed pl-6 font-medium">
                    Pay ₹200 advance deposit via Razorpay UPI/Card; pay remaining ₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')} cash at doorstep.
                  </p>
                </div>

                <div
                  onClick={() => setPaymentType('PREPAID')}
                  className={`p-4 rounded-[2px] border cursor-pointer transition-all ${
                    paymentType === 'PREPAID'
                      ? 'border-[#8b0018] bg-[#8b0018]/15 shadow glow-crimson'
                      : 'border-[#26262c] bg-[#1b1b20]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentType"
                        checked={paymentType === 'PREPAID'}
                        onChange={() => setPaymentType('PREPAID')}
                        className="accent-[#8b0018] w-4 h-4"
                      />
                      <span className="font-heading text-xs text-white">Full Prepaid Option</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase">5% INSTANT OFF</span>
                  </div>
                  <p className="text-xs text-[#8b8b94] mt-2 leading-relaxed pl-6 font-medium">
                    Pay full ₹{totalAmount.toLocaleString('en-IN')} online via Razorpay UPI, GPay, PhonePe, or Cards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary & Order Button */}
          <div className="lg:col-span-5 bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-xl space-y-6 h-fit">
            <h3 className="font-heading text-sm text-white uppercase tracking-wider border-b border-[#26262c] pb-4">
              Items in Bag ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{item.product.title}</span>
                    <span className="text-[#8b8b94]">Size: {item.selectedSize} × {item.quantity}</span>
                  </div>
                  <span className="font-heading text-white font-bold">
                    ₹{((item.product.price || 1299) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-[#26262c] pt-4 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Express Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between border-t border-[#26262c] pt-2 font-heading text-sm text-white font-bold">
                <span>Total Amount:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#26262c] space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-white">
                <span>Payable Online Now:</span>
                <span className="text-[#b3001f] font-heading font-bold text-base">
                  ₹{(paymentType === 'PARTIAL_COD' ? advanceAmountToPay : totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
              {paymentType === 'PARTIAL_COD' && (
                <div className="flex justify-between text-[#8b8b94]">
                  <span>Balance at Doorstep:</span>
                  <span>₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full min-h-[52px] font-heading text-xs uppercase tracking-widest rounded-[2px] shadow-xl flex items-center justify-center gap-2 transition-all ${
                loading || !isFormValid
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-[#26262c]'
                  : 'bg-[#8b0018] hover:bg-[#b3001f] text-white active:scale-95 glow-crimson'
              }`}
            >
              {loading ? 'Processing Transaction...' : `Pay ₹${(paymentType === 'PARTIAL_COD' ? advanceAmountToPay : totalAmount).toLocaleString('en-IN')} & Place Order`}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
