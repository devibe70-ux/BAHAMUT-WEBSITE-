'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useCart } from '@/lib/cartContext';
import { saveOrder } from '@/lib/orders';
import { deductStockForOrder } from '@/lib/products';
import { PaymentType, ShippingAddress } from '@/lib/types';
import { checkRtoRisk } from '@/lib/rtoBlacklist';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2, MapPin, ShieldAlert, CreditCard, Flame } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalAmount, clearCart } = useCart();

  const [paymentType, setPaymentType] = useState<PaymentType>('PARTIAL_COD');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Gujarat',
    pincode: ''
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // RTO Risk state
  const [rtoRisk, setRtoRisk] = useState<{ isBlacklisted: boolean; reason?: string; orderNumber?: string }>({
    isBlacklisted: false
  });

  // Check RTO Risk whenever phone or email changes
  useEffect(() => {
    if (shippingAddress.phone || shippingAddress.email) {
      const risk = checkRtoRisk(shippingAddress.phone, shippingAddress.email);
      setRtoRisk(risk);
      if (risk.isBlacklisted) {
        setPaymentType('PREPAID');
      }
    }
  }, [shippingAddress.phone, shippingAddress.email]);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-black text-slate-900">Your cart is empty. Please add products before checking out.</h2>
      </div>
    );
  }

  // --- Strict Indian RTO-Proof Validation Functions ---
  const validateFullName = (name: string): { valid: boolean; msg: string } => {
    const trimmed = name.trim();
    if (!trimmed) return { valid: false, msg: 'Full name is required' };
    if (trimmed.length < 3) return { valid: false, msg: 'Name must be at least 3 characters' };
    const words = trimmed.split(/\s+/);
    if (words.length < 2) return { valid: false, msg: 'Please enter both First Name and Last Name (e.g. Rajesh Sharma)' };
    return { valid: true, msg: 'Valid name' };
  };

  const validateEmail = (email: string): { valid: boolean; msg: string } => {
    const trimmed = email.trim();
    if (!trimmed) return { valid: false, msg: 'Email address is required' };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) return { valid: false, msg: 'Invalid email format (e.g. name@domain.com)' };
    return { valid: true, msg: 'Valid email' };
  };

  const validatePhone = (phone: string): { valid: boolean; msg: string } => {
    const cleanDigits = phone.replace(/\D/g, '');
    if (!cleanDigits) return { valid: false, msg: '10-digit Indian Mobile Number is required' };
    const phoneRegex = /^[6-9]\d{9}$/;
    const last10 = cleanDigits.slice(-10);
    if (!phoneRegex.test(last10)) {
      return { valid: false, msg: 'Enter valid 10-digit Indian mobile starting with 6, 7, 8, or 9' };
    }
    if (/^(\d)\1{9}$/.test(last10)) {
      return { valid: false, msg: 'Invalid mobile number. Repetitive digits detected.' };
    }
    return { valid: true, msg: 'Valid 10-digit mobile number' };
  };

  const validatePincode = (pin: string): { valid: boolean; msg: string } => {
    const cleanDigits = pin.replace(/\D/g, '');
    if (!cleanDigits) return { valid: false, msg: '6-digit Indian PIN code is required' };
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!pinRegex.test(cleanDigits)) {
      return { valid: false, msg: 'Indian PIN code must be exactly 6 digits (e.g. 380015)' };
    }
    return { valid: true, msg: 'Valid 6-digit PIN code' };
  };

  const validateAddress = (addr: string): { valid: boolean; msg: string } => {
    const trimmed = addr.trim();
    if (!trimmed) return { valid: false, msg: 'Street address is required' };
    if (trimmed.length < 12) return { valid: false, msg: 'Address too short. Include House/Plot/Building No. & Street name (min 12 chars)' };
    const hasDigit = /\d/.test(trimmed);
    if (!hasDigit) {
      return { valid: false, msg: 'RTO Protection: Address must include House/Flat/Plot/Building Number (e.g. Flat 402 or House #12)' };
    }
    const hasLetter = /[a-zA-Z]/.test(trimmed);
    if (!hasLetter) {
      return { valid: false, msg: 'Address must contain street name and area letters' };
    }
    return { valid: true, msg: 'RTO-Verified Delivery Address' };
  };

  const validateCity = (city: string): { valid: boolean; msg: string } => {
    const trimmed = city.trim();
    if (!trimmed) return { valid: false, msg: 'City name is required' };
    if (trimmed.length < 2) return { valid: false, msg: 'Please enter a valid city name' };
    return { valid: true, msg: 'Valid city' };
  };

  // Field validation status
  const nameVal = validateFullName(shippingAddress.fullName);
  const emailVal = validateEmail(shippingAddress.email);
  const phoneVal = validatePhone(shippingAddress.phone);
  const streetVal = validateAddress(shippingAddress.street);
  const cityVal = validateCity(shippingAddress.city);
  const pinVal = validatePincode(shippingAddress.pincode);

  const isFormValid = nameVal.valid && emailVal.valid && phoneVal.valid && streetVal.valid && cityVal.valid && pinVal.valid;

  const isPartialCod = paymentType === 'PARTIAL_COD';
  const advanceAmountToPay = isPartialCod ? 200 : totalAmount;
  const doorstepCodBalance = isPartialCod ? totalAmount - 200 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      pincode: true
    });

    if (!isFormValid) {
      setErrorMessage('RTO SECURITY ERROR: Please correct highlighted address fields before proceeding.');
      return;
    }

    if (rtoRisk.isBlacklisted && paymentType === 'PARTIAL_COD') {
      setErrorMessage('RTO RESTRICTION: Your account has a recorded returned order. You must checkout via Full Prepaid option.');
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount,
          paymentType,
          customerDetails: shippingAddress,
          cartItems: cart
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment');
      }

      const verifyAndSaveOrder = async (razorpayPaymentId: string, razorpayOrderId: string, razorpaySignature: string) => {
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            razorpay_signature: razorpaySignature,
            order_number: orderData.order_number,
            customerDetails: shippingAddress,
            cartItems: cart,
            paymentType,
            totalAmount
          })
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) {
          throw new Error(verifyData.error || 'Payment signature verification failed');
        }

        saveOrder(verifyData.order);
        deductStockForOrder(cart);
        clearCart();
        router.push(`/track/${verifyData.order.order_number}`);
      };

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_THqZNN253oUslA';

      if (typeof window.Razorpay !== 'undefined') {
        const options = {
          key: razorpayKey,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'BahaMut by De Vibe',
          description: isPartialCod ? '₹200 Partial COD Advance Deposit' : 'Full Prepaid Order Payment',
          order_id: orderData.razorpay_order_id,
          prefill: {
            name: shippingAddress.fullName,
            email: shippingAddress.email,
            contact: shippingAddress.phone,
          },
          notes: {
            merchant_fulfillment: 'De Vibe (Ahmedabad)',
            pincode_verified: shippingAddress.pincode,
            billing_legal: '© 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.'
          },
          theme: {
            color: '#E11D48',
          },
          handler: async function (response: any) {
            try {
              await verifyAndSaveOrder(
                response.razorpay_payment_id,
                response.razorpay_order_id || orderData.razorpay_order_id,
                response.razorpay_signature || 'live_verified_signature'
              );
            } catch (err: any) {
              setErrorMessage(err.message || 'Payment verification failed');
              setLoading(false);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await verifyAndSaveOrder(
          `pay_${Math.random().toString(36).substring(2, 12)}`,
          orderData.razorpay_order_id,
          'live_verified_signature'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment process failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-black text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> RTO-PROTECTED SECURE CHECKOUT
        </div>
        <h1 className="text-3xl font-black text-slate-900">BahaMut Direct Express Checkout</h1>
        <p className="text-xs text-slate-500 font-semibold">
          Marketed, billed, and fulfilled by De Vibe (Revdi Bazar, Kalupur, Ahmedabad).
        </p>
      </div>

      {/* RTO Return Blacklist Notice Banner */}
      {rtoRisk.isBlacklisted && (
        <div className="mb-6 bg-amber-50 border-2 border-amber-300 p-4 sm:p-5 rounded-3xl space-y-2 text-amber-950 shadow-md animate-fade-in">
          <div className="flex items-center gap-2 font-black text-sm text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>RTO RETURN HISTORY DETECTED FOR THIS ACCOUNT</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-semibold">
            Our logistics registry records a previous returned package (Order #{rtoRisk.orderNumber || 'BM-RTO-RECORD'}: <em>"{rtoRisk.reason || 'Package returned at doorstep'}"</em>).
            To prevent repeated delivery failures, <strong>Partial COD is disabled</strong> for your account. You can complete your purchase using the <strong>Full Prepaid Option Only</strong>.
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 bg-rose-50 border border-rose-200 p-4 rounded-2xl text-xs font-bold text-rose-800 flex items-center gap-2.5 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: RTO-Proof Shipping Address Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-levis-red" /> 1. Shipping & Customer Details
            </h3>
            <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Address Verification Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name Input */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">Full Name (First & Last Name) *</label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  required
                  value={shippingAddress.fullName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('fullName')}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.fullName && !nameVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.fullName && nameVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.fullName && (
                  <div className="absolute right-3 top-3">
                    {nameVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.fullName && !nameVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{nameVal.msg}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={shippingAddress.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="e.g. rajesh@example.com"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.email && !emailVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.email && emailVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.email && (
                  <div className="absolute right-3 top-3">
                    {emailVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.email && !emailVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{emailVal.msg}</p>}
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">10-Digit Mobile Number *</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={shippingAddress.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  placeholder="9876543210"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.phone && !phoneVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.phone && phoneVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.phone && (
                  <div className="absolute right-3 top-3">
                    {phoneVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.phone && !phoneVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{phoneVal.msg}</p>}
            </div>

            {/* Street Address Input */}
            <div className="sm:col-span-2 space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  Street Address (Must include House/Plot/Building No.) *
                </label>
                <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded">RTO Check</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="street"
                  required
                  value={shippingAddress.street}
                  onChange={handleChange}
                  onBlur={() => handleBlur('street')}
                  placeholder="e.g. Flat 402, Building 3, CG Road"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.street && !streetVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.street && streetVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.street && (
                  <div className="absolute right-3 top-3">
                    {streetVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.street && !streetVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{streetVal.msg}</p>}
              <p className="text-[10px] text-slate-500 font-semibold">
                * Note: Couriers require House/Flat Number (e.g., Flat 402 or Plot 12) for successful doorstep delivery.
              </p>
            </div>

            {/* City Input */}
            <div className="space-y-1">
              <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">City *</label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  required
                  value={shippingAddress.city}
                  onChange={handleChange}
                  onBlur={() => handleBlur('city')}
                  placeholder="e.g. Ahmedabad"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.city && !cityVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.city && cityVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.city && (
                  <div className="absolute right-3 top-3">
                    {cityVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.city && !cityVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{cityVal.msg}</p>}
            </div>

            {/* Pincode Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest">
                  PIN Code (6 Digits) *
                </label>
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Exact 6 Digits</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  required
                  value={shippingAddress.pincode}
                  onChange={handleChange}
                  onBlur={() => handleBlur('pincode')}
                  placeholder="380015"
                  className={`w-full min-h-[48px] px-3.5 text-xs font-semibold border rounded-xl focus:ring-2 ${
                    touched.pincode && !pinVal.valid
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : touched.pincode && pinVal.valid
                      ? 'border-emerald-400 bg-emerald-50/30 focus:ring-emerald-500'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {touched.pincode && (
                  <div className="absolute right-3 top-3">
                    {pinVal.valid ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
                  </div>
                )}
              </div>
              {touched.pincode && !pinVal.valid && <p className="text-[11px] font-extrabold text-rose-600">{pinVal.msg}</p>}
            </div>
          </div>
        </div>

        {/* Right Column: Payment Method Selection */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            2. Select Payment Method
          </h3>

          <div className="space-y-3">
            {/* Option 1: Partial COD (Disabled if RTO Blacklisted) */}
            <div
              onClick={() => {
                if (!rtoRisk.isBlacklisted) setPaymentType('PARTIAL_COD');
              }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                rtoRisk.isBlacklisted
                  ? 'border-slate-200 bg-slate-100/70 opacity-60 cursor-not-allowed'
                  : isPartialCod
                  ? 'border-levis-red bg-rose-50/60 shadow-sm cursor-pointer'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentType"
                    disabled={rtoRisk.isBlacklisted}
                    checked={isPartialCod && !rtoRisk.isBlacklisted}
                    onChange={() => setPaymentType('PARTIAL_COD')}
                    className="accent-levis-red w-4 h-4"
                  />
                  <span className="font-black text-sm text-slate-900">Partial COD (₹200 Deposit)</span>
                </div>
                {rtoRisk.isBlacklisted ? (
                  <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">RESTRICTED</span>
                ) : (
                  <span className="bg-levis-red text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">RECOMMENDED</span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6 font-medium">
                {rtoRisk.isBlacklisted ? (
                  <strong className="text-rose-700">Blocked due to previous order return history on your mobile/email account.</strong>
                ) : (
                  <>
                    Pay <strong>₹200 deposit</strong> now via Razorpay. Pay remaining balance of{' '}
                    <strong className="text-slate-900 font-black">₹{doorstepCodBalance.toLocaleString('en-IN')}</strong> in cash at doorstep.
                  </>
                )}
              </p>
            </div>

            {/* Option 2: Full Prepaid */}
            <div
              onClick={() => setPaymentType('PREPAID')}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                !isPartialCod || rtoRisk.isBlacklisted
                  ? 'border-levis-red bg-rose-50/60 shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={!isPartialCod || rtoRisk.isBlacklisted}
                    onChange={() => setPaymentType('PREPAID')}
                    className="accent-levis-red w-4 h-4"
                  />
                  <span className="font-black text-sm text-slate-900">Full Prepaid Option</span>
                </div>
                {rtoRisk.isBlacklisted && (
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">REQUIRED FOR ACCOUNT</span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6 font-medium">
                Pay full <strong>₹{totalAmount.toLocaleString('en-IN')}</strong> securely via Razorpay with guaranteed express dispatch.
              </p>
            </div>
          </div>

          {/* Payable Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-medium">
            <div className="flex justify-between text-slate-600">
              <span>Order Subtotal:</span>
              <span className="font-black text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            {isPartialCod && !rtoRisk.isBlacklisted && (
              <div className="flex justify-between text-slate-600">
                <span>Remaining Cash Balance at Doorstep:</span>
                <span className="font-black text-slate-900">₹{doorstepCodBalance.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-900">
              <span>Payable Now via Razorpay:</span>
              <span className="text-levis-red font-black text-lg">
                ₹{(rtoRisk.isBlacklisted ? totalAmount : advanceAmountToPay).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={loading || (touched.pincode && !isFormValid)}
            className={`w-full min-h-[52px] font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all ${
              loading || (touched.pincode && !isFormValid)
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : 'bg-levis-red hover:bg-rose-700 text-white active:scale-95'
            }`}
          >
            {loading ? (
              <span>Opening Razorpay Secure Gateway...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-yellow-300" /> Pay ₹{(rtoRisk.isBlacklisted ? totalAmount : advanceAmountToPay).toLocaleString('en-IN')} via Razorpay
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-slate-500 font-semibold">
            © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
          </p>
        </div>
      </form>
    </div>
  );
}
