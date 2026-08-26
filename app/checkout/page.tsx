'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { saveOrderToMemory, OrderDetails } from '@/lib/orders';
import { getPincodeRtoRisk } from '@/lib/rtoRules';
import { trackEvent } from '@/lib/analytics';
import {
  MapPin,
  ShieldCheck,
  CreditCard,
  Lock,
  ChevronDown,
  ChevronUp,
  Truck,
  Check,
  AlertCircle,
  RefreshCw,
  PhoneCall,
  Minus,
  Plus,
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

declare global {
  interface Window {
    Cashfree?: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, addToCart, removeFromCart, clearCart } = useCart();

  // Contact Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Address Form State (Pincode First)
  const [pincode, setPincode] = useState('380015');
  const [addressLine, setAddressLine] = useState('');
  const [areaLocality, setAreaLocality] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [state, setState] = useState('Gujarat');
  const [addressType, setAddressType] = useState<'HOME' | 'WORK'>('HOME');
  const [showLandmark, setShowLandmark] = useState(false);
  const [landmark, setLandmark] = useState('');

  // Payment State
  const [paymentType, setPaymentType] = useState<'PARTIAL_COD' | 'PREPAID'>('PARTIAL_COD');
  const [paymentMethod, setPaymentMethod] = useState<'UPI_INTENT' | 'CARD' | 'NETBANKING' | 'PARTIAL_COD'>('UPI_INTENT');
  const [loading, setLoading] = useState(false);

  // Failure Modal & Recovery State
  const [errorState, setErrorState] = useState<'NONE' | 'PROCESSING' | 'TEMPORARY_FAILURE' | 'PENDING' | 'DEFINITIVE_FAILURE'>('NONE');
  const [errorMessage, setErrorMessage] = useState('');

  // Accordion Sections Open/Closed for Mobile Single-Page Experience
  const [openSection, setOpenSection] = useState<'CONTACT' | 'ADDRESS' | 'PAYMENT' | 'REVIEW'>('CONTACT');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load Cashfree Web SDK v3
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

  // Pincode Auto-Fill for City & State
  useEffect(() => {
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      if (pincode.startsWith('380') || pincode.startsWith('382')) {
        setCity('Ahmedabad');
        setState('Gujarat');
      } else if (pincode.startsWith('400')) {
        setCity('Mumbai');
        setState('Maharashtra');
      } else if (pincode.startsWith('110')) {
        setCity('New Delhi');
        setState('Delhi');
      } else if (pincode.startsWith('560')) {
        setCity('Bengaluru');
        setState('Karnataka');
      }
    }
  }, [pincode]);

  // Financial Calculations: 5% Instant Prepaid Discount vs ₹200 Deposit
  const rawSubtotal = cartTotal;
  const isPrepaid = paymentType === 'PREPAID';
  const prepaidDiscount = isPrepaid ? Math.round(rawSubtotal * 0.05) : 0;
  const finalOrderTotal = Math.max(0, rawSubtotal - prepaidDiscount);

  const advanceAmountToPay = isPrepaid ? finalOrderTotal : Math.min(200, finalOrderTotal);
  const codBalanceToPayAtDoorstep = isPrepaid ? 0 : Math.max(0, finalOrderTotal - advanceAmountToPay);

  const rtoRisk = getPincodeRtoRisk(pincode);

  // Form Validation Flags
  const isPincodeValid = pincode.trim().length === 6 && /^\d{6}$/.test(pincode);
  const isPhoneValid = customerPhone.trim().length === 10 && /^\d{10}$/.test(customerPhone);
  const isContactValid = customerName.trim().length >= 2 && isPhoneValid;
  const isAddressValid = isPincodeValid && addressLine.trim().length >= 5;
  const isFormValid = isContactValid && isAddressValid;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || cart.length === 0) return;

    setLoading(true);
    setErrorState('PROCESSING');

    trackEvent('begin_checkout', {
      value: advanceAmountToPay,
      payment_type: paymentType,
      method: paymentMethod,
      pincode: pincode,
    });

    try {
      const isPartial = paymentType === 'PARTIAL_COD' && !rtoRisk.isBlacklisted;

      // 1. Call Cashfree Order Creation API
      const response = await fetch('/api/cashfree/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: finalOrderTotal,
          paymentType: isPartial ? 'PARTIAL_COD' : 'PREPAID',
          customerDetails: {
            fullName: customerName,
            email: customerEmail || `${customerPhone}@bahamut.in`,
            phone: customerPhone,
            address: `${addressLine}${areaLocality ? ', ' + areaLocality : ''}${landmark ? ' (Landmark: ' + landmark + ')' : ''}`,
            city,
            state,
            pincode,
            addressType,
          },
          cartItems: cart,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.payment_session_id) {
        throw new Error(data.error || 'Failed to initiate Cashfree payment session');
      }

      // Save order payload locally
      const orderPayload: OrderDetails = {
        id: data.order_id,
        order_number: data.order_id,
        customer_name: customerName,
        customer_email: customerEmail || `${customerPhone}@bahamut.in`,
        customer_phone: customerPhone,
        shipping_address: `${addressLine}, ${areaLocality ? areaLocality + ', ' : ''}${city}, ${state} - ${pincode}`,
        pincode: pincode,
        items: cart,
        total_amount: finalOrderTotal,
        advance_paid: advanceAmountToPay,
        cod_balance: isPartial ? codBalanceToPayAtDoorstep : 0,
        payment_type: isPartial ? 'PARTIAL_COD' : 'PREPAID',
        payment_status: 'PAID_ADVANCE',
        fulfillment_status: 'UNFULFILLED',
        rto_risk_level: rtoRisk.level,
        created_at: new Date().toISOString(),
      };

      saveOrderToMemory(orderPayload);

      trackEvent('upi_intent_opened', {
        order_id: data.order_id,
        payment_type: paymentType,
      });

      // 2. Launch Cashfree SDK Checkout (UPI Intent on mobile / Gateway modal on Desktop)
      if (window.Cashfree) {
        const cashfree = window.Cashfree({ mode: 'production' });
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: '_self',
        });
      } else {
        window.location.href = `/api/cashfree/verify?order_id=${data.order_id}&payment_type=${paymentType}&total_amount=${finalOrderTotal}`;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorState('TEMPORARY_FAILURE');
      setErrorMessage(err.message || 'Payment provider did not respond. Your cart and details are safe.');
      setLoading(false);

      trackEvent('payment_failed', {
        error_message: err.message,
        payment_type: paymentType,
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#F7F7F8] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h2 className="text-2xl font-black text-[#111111] uppercase mb-2">Shopping Bag is Empty</h2>
        <p className="text-xs text-[#666666] mb-6 font-medium">Add 100% Woven Cotton Denim or Shirts to proceed to checkout.</p>
        <Link
          href="/catalog"
          className="px-8 py-3.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest shadow-lg"
        >
          Explore Apparel Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F8] text-[#111111] min-h-screen pb-32 font-sans relative">
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E5E5E5] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#111111] text-white text-[9px] font-black px-2.5 py-0.5 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> CASHFREE VERIFIED SECURE CHECKOUT
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#111111]" /> Guest Checkout
            </h1>
          </div>

          <div className="text-right">
            <span className="text-xs font-black text-[#111111] block">Billed by DE VIBE</span>
            <span className="text-[10px] text-[#666666] font-medium block">GSTIN: 24ASHPS9777R1ZE</span>
          </div>
        </div>
      </section>

      {/* Main Single-Page Mobile Accordion Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-4">
        <form onSubmit={handleCreateOrder} className="space-y-4">
          {/* SECTION 1: CONTACT INFORMATION */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm">
            <div
              onClick={() => setOpenSection('CONTACT')}
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-white hover:bg-[#F7F7F8] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${isContactValid ? 'bg-emerald-600 text-white' : 'bg-[#111111] text-white'}`}>
                  {isContactValid ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#111111] uppercase tracking-wider">Contact Details</h3>
                  {customerName && customerPhone && (
                    <p className="text-xs text-[#666666] font-medium">{customerName} • +91 {customerPhone}</p>
                  )}
                </div>
              </div>
              {openSection === 'CONTACT' ? <ChevronUp className="w-5 h-5 text-[#666666]" /> : <ChevronDown className="w-5 h-5 text-[#666666]" />}
            </div>

            {openSection === 'CONTACT' && (
              <div className="p-4 sm:p-5 border-t border-[#E5E5E5] space-y-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Input First for Mobile Convenience */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      onBlur={() => handleBlur('customerPhone')}
                      placeholder="10-digit mobile number"
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#111111] focus:outline-none"
                    />
                    <p className="text-[10px] text-[#666666] font-medium">Used only for order updates and delivery support.</p>
                    {touched.customerPhone && !isPhoneValid && (
                      <p className="text-[10px] font-bold text-red-600">Enter a valid 10-digit Indian mobile number.</p>
                    )}
                  </div>

                  <div className="space-y-1">
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
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#111111] focus:outline-none"
                    />
                    {touched.customerName && customerName.trim().length < 2 && (
                      <p className="text-[10px] font-bold text-red-600">Please enter your full name.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    inputMode="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@domain.com (Optional for digital invoice)"
                    className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#111111] focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (isContactValid) {
                      trackEvent('address_started');
                      setOpenSection('ADDRESS');
                    }
                  }}
                  disabled={!isContactValid}
                  className="w-full min-h-[48px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                >
                  Continue to Delivery Address
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: DELIVERY ADDRESS (PINCODE FIRST) */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm">
            <div
              onClick={() => setOpenSection('ADDRESS')}
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-white hover:bg-[#F7F7F8] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center ${isAddressValid ? 'bg-emerald-600 text-white' : 'bg-[#111111] text-white'}`}>
                  {isAddressValid ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#111111] uppercase tracking-wider">Delivery Address</h3>
                  {addressLine && (
                    <p className="text-xs text-[#666666] font-medium truncate max-w-xs">{addressLine}, {city} - {pincode}</p>
                  )}
                </div>
              </div>
              {openSection === 'ADDRESS' ? <ChevronUp className="w-5 h-5 text-[#666666]" /> : <ChevronDown className="w-5 h-5 text-[#666666]" />}
            </div>

            {openSection === 'ADDRESS' && (
              <div className="p-4 sm:p-5 border-t border-[#E5E5E5] space-y-4 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Pincode First Entry */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      onBlur={() => handleBlur('pincode')}
                      placeholder="6-digit PIN code"
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#111111] focus:outline-none"
                    />
                    {touched.pincode && !isPincodeValid && (
                      <p className="text-[10px] font-bold text-red-600">Enter a valid 6-digit Indian pincode.</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      City (Auto-filled)
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      State (Auto-filled)
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                    House / Flat No., Building & Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    onBlur={() => handleBlur('addressLine')}
                    placeholder="House/Flat No., Street Name"
                    className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl focus:ring-2 focus:ring-[#111111] focus:outline-none"
                  />
                  {touched.addressLine && addressLine.trim().length < 5 && (
                    <p className="text-[10px] font-bold text-red-600">Please enter your detailed street address.</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    value={areaLocality}
                    onChange={(e) => setAreaLocality(e.target.value)}
                    placeholder="Sector, Locality, Area"
                    className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl"
                  />
                </div>

                {/* Address Type Badges & Collapsible Landmark */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#666666]">Address Type:</span>
                    <button
                      type="button"
                      onClick={() => setAddressType('HOME')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${addressType === 'HOME' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#F7F7F8] text-[#111111] border-[#E5E5E5]'}`}
                    >
                      Home
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddressType('WORK')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${addressType === 'WORK' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#F7F7F8] text-[#111111] border-[#E5E5E5]'}`}
                    >
                      Work
                    </button>
                  </div>

                  {!showLandmark && (
                    <button
                      type="button"
                      onClick={() => setShowLandmark(true)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      + Add Landmark
                    </button>
                  )}
                </div>

                {showLandmark && (
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near bank, school, temple..."
                      className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] rounded-xl"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (isAddressValid) {
                      trackEvent('address_completed', { pincode, city, state });
                      setOpenSection('PAYMENT');
                    }
                  }}
                  disabled={!isAddressValid}
                  className="w-full min-h-[48px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                >
                  Continue to Payment Options
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: DELIVERY TIMEFRAME */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#111111]" /> Delivery Timeframe Guarantee
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                FREE EXPRESS SHIPPING
              </span>
            </div>
            <p className="text-xs text-slate-800 font-bold">
              Estimated Delivery: <strong>Between 28 August – 1 September</strong> (Dispatched in 24h from DE VIBE, Ambawadi, Ahmedabad).
            </p>
          </div>

          {/* SECTION 4: PAYMENT OPTIONS (SIDE-BY-SIDE COMPARISON & UPI INTENT LEAD) */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm">
            <div
              onClick={() => setOpenSection('PAYMENT')}
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer bg-white hover:bg-[#F7F7F8] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#111111] text-white text-xs font-black flex items-center justify-center">
                  3
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#111111] uppercase tracking-wider">Select Payment Method</h3>
                  <p className="text-xs text-[#666666] font-medium">
                    {paymentType === 'PREPAID' ? 'Full Prepaid (5% Instant Off)' : `Partial COD (Pay ₹200 Deposit)`}
                  </p>
                </div>
              </div>
              {openSection === 'PAYMENT' ? <ChevronUp className="w-5 h-5 text-[#666666]" /> : <ChevronDown className="w-5 h-5 text-[#666666]" />}
            </div>

            {openSection === 'PAYMENT' && (
              <div className="p-4 sm:p-5 border-t border-[#E5E5E5] space-y-6 bg-white">
                {/* Transparent Comparative Cards: Prepaid vs Partial COD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Full Prepaid */}
                  <div
                    onClick={() => {
                      setPaymentType('PREPAID');
                      trackEvent('payment_method_selected', { payment_type: 'PREPAID' });
                    }}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 relative ${
                      paymentType === 'PREPAID' ? 'border-[#111111] bg-[#F7F7F8] shadow-md' : 'border-[#E5E5E5] bg-white opacity-80'
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
                        <span className="text-xs font-black text-[#111111]">Full Prepaid Online</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        SAVE ₹{prepaidDiscount} (5% OFF)
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-[#666666] font-medium border-t border-[#E5E5E5] pt-2">
                      <p className="flex justify-between"><span>Pay Today Online:</span> <strong className="text-[#111111]">₹{finalOrderTotal.toLocaleString('en-IN')}</strong></p>
                      <p className="flex justify-between"><span>Balance at Delivery:</span> <strong className="text-emerald-700">₹0 (Fully Paid)</strong></p>
                      <p className="text-[11px] text-emerald-800 pt-1">✓ Fastest order confirmation & contactless delivery</p>
                    </div>
                  </div>

                  {/* Option 2: Partial COD */}
                  <div
                    onClick={() => {
                      setPaymentType('PARTIAL_COD');
                      trackEvent('cod_selected');
                    }}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 relative ${
                      paymentType === 'PARTIAL_COD' ? 'border-[#111111] bg-[#F7F7F8] shadow-md' : 'border-[#E5E5E5] bg-white opacity-80'
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
                        <span className="text-xs font-black text-[#111111]">Partial Cash on Delivery</span>
                      </div>
                      <span className="bg-[#111111] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                        POPULAR
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-[#666666] font-medium border-t border-[#E5E5E5] pt-2">
                      <p className="flex justify-between"><span>Pay Today (Advance Deposit):</span> <strong className="text-[#111111]">₹{advanceAmountToPay.toLocaleString('en-IN')}</strong></p>
                      <p className="flex justify-between"><span>Pay at Doorstep (Cash/UPI):</span> <strong className="text-[#111111]">₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')}</strong></p>
                      <p className="flex justify-between"><span>Total Order Price:</span> <strong>₹{rawSubtotal.toLocaleString('en-IN')}</strong></p>
                      <p className="text-[10px] text-[#666666] pt-1 italic">₹200 deposit is 100% refundable if cancelled prior to dispatch.</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Preferred Payment Apps Order */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-black text-[#111111] uppercase tracking-wider block">
                    Preferred Mobile Gateway Option:
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI_INTENT')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'UPI_INTENT' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111]'}`}
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>UPI Apps (GPay/PhonePe)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'CARD' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111]'}`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit / Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('NETBANKING')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'NETBANKING' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111]'}`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Net Banking</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('PARTIAL_COD')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'PARTIAL_COD' ? 'border-[#111111] bg-[#111111] text-white' : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111]'}`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Partial COD</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenSection('REVIEW')}
                  className="w-full min-h-[48px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Review Items & Finalize Order
                </button>
              </div>
            )}
          </div>

          {/* SECTION 5: ORDER REVIEW & ITEM QUANTITY MODIFIERS */}
          <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#111111] uppercase tracking-wider border-b border-[#E5E5E5] pb-3">
              Order Summary ({cart.length} Items)
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs border-b border-[#F7F7F8] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.product.images?.[0] || ''} alt={item.product.title} fill className="object-cover object-top" />
                    </div>
                    <div>
                      <span className="font-bold text-[#111111] block line-clamp-1">{item.product.title}</span>
                      <span className="text-[#666666] font-medium block">Fit Size: <strong>{item.selectedSize}</strong></span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => addToCart(item.product, item.selectedSize, -1)}
                          className="w-5 h-5 bg-[#F7F7F8] border border-[#E5E5E5] rounded flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3 h-3 text-[#111111]" />
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.product, item.selectedSize, 1)}
                          className="w-5 h-5 bg-[#F7F7F8] border border-[#E5E5E5] rounded flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3 text-[#111111]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="font-extrabold text-[#111111]">
                    ₹{((item.product.price || 1499) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary Box */}
            <div className="space-y-2 border-t border-[#E5E5E5] pt-3 text-xs font-medium">
              <div className="flex justify-between text-[#666666]">
                <span>Items MRP Total:</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {isPrepaid && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>5% Instant Prepaid Discount:</span>
                  <span>-₹{prepaidDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Nationwide Shipping:</span>
                <span>FREE</span>
              </div>

              <div className="flex justify-between text-sm text-[#111111] font-black border-t border-[#E5E5E5] pt-2">
                <span>Total Payable Order Value:</span>
                <span>₹{finalOrderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-[#F7F7F8] p-4 rounded-xl border border-[#E5E5E5] space-y-1 text-xs">
              <div className="flex justify-between font-black text-[#111111]">
                <span>Amount Due Online Today:</span>
                <span className="text-base text-[#111111]">₹{advanceAmountToPay.toLocaleString('en-IN')}</span>
              </div>
              {paymentType === 'PARTIAL_COD' && (
                <div className="flex justify-between text-[#666666] font-medium">
                  <span>Balance Payable at Doorstep:</span>
                  <span>₹{codBalanceToPayAtDoorstep.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Main Submit Button for Desktop View */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`hidden md:flex w-full min-h-[52px] font-black text-xs uppercase tracking-widest items-center justify-center gap-2 rounded-xl transition-all shadow-xl ${
                loading || !isFormValid
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300'
                  : 'bg-[#111111] hover:bg-black text-white active:scale-95'
              }`}
            >
              {loading
                ? 'Redirecting to Cashfree Gateway...'
                : paymentType === 'PARTIAL_COD'
                ? `Pay ₹${advanceAmountToPay.toLocaleString('en-IN')} Advance Deposit`
                : `Pay ₹${finalOrderTotal.toLocaleString('en-IN')} Securely Now`}
            </button>
          </div>
        </form>
      </main>

      {/* STICKY MOBILE BOTTOM PAYMENT BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-2xl md:hidden flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#666666] font-bold block uppercase">Total Payable Today</span>
          <span className="text-base font-black text-[#111111] block">₹{advanceAmountToPay.toLocaleString('en-IN')}</span>
        </div>

        <button
          onClick={handleCreateOrder}
          disabled={loading || !isFormValid}
          className={`min-h-[48px] px-6 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-1.5 ${
            loading || !isFormValid
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : 'bg-[#111111] text-white'
          }`}
        >
          {loading
            ? 'Processing...'
            : paymentType === 'PARTIAL_COD'
            ? `Pay ₹${advanceAmountToPay} Deposit`
            : `Pay ₹${finalOrderTotal} Now`}
        </button>
      </div>

      {/* PAYMENT FAILURE & SINGLE-TAP RETRY MODAL */}
      {errorState === 'TEMPORARY_FAILURE' && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl space-y-4 text-center shadow-2xl font-sans">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Payment Not Completed</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {errorMessage || 'Your payment application or bank did not complete the transaction. Your cart, selected size, and address are safe.'}
            </p>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={(e) => {
                  setErrorState('NONE');
                  handleCreateOrder(e);
                }}
                className="w-full min-h-[48px] bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-4 h-4" /> Try Payment Again
              </button>

              <button
                type="button"
                onClick={() => setErrorState('NONE')}
                className="w-full min-h-[44px] bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Change Payment Method
              </button>

              <a
                href="https://wa.me/919727024519?text=Hi%20DE%20VIBE,%20I%20need%20help%20completing%20my%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline pt-2"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Need Assistance? Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
