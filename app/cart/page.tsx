'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalAmount, itemCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans space-y-6">
        <div className="p-4 bg-slate-100 rounded-3xl w-24 h-24 mx-auto flex items-center justify-center text-slate-400 border border-slate-200">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
          Explore our direct-from-manufacturer 100% Breathable Woven Cotton apparel collection.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all"
        >
          Explore Catalog Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <h1 className="text-3xl font-black text-slate-900 mb-8">
        Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${idx}`}
              className="bg-white p-4 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-slate-200 shadow-sm"
            >
              <div className="relative w-24 h-32 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-base text-slate-900 line-clamp-1">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-semibold">
                      Size: <span className="font-black text-blue-700">{item.selectedSize}</span> • {item.product.fabric_details}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="min-w-[40px] min-h-[40px] text-slate-400 hover:text-levis-red p-2 rounded-xl flex items-center justify-center transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-2xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                      className="min-w-[40px] min-h-[40px] p-2 text-slate-700 hover:bg-slate-200 flex items-center justify-center font-black"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-black text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                      className="min-w-[40px] min-h-[40px] p-2 text-slate-700 hover:bg-slate-200 flex items-center justify-center font-black"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-xl font-black text-slate-900">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-black text-lg text-slate-900 border-b border-slate-100 pb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({itemCount} items):</span>
              <span className="font-black text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Standard All-India Express:</span>
              <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">FREE</span>
            </div>
            <div className="flex justify-between text-slate-600 border-t border-slate-100 pt-3">
              <span className="font-black text-sm text-slate-900">Grand Total:</span>
              <span className="font-black text-xl text-slate-900">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Partial COD Breakdown Callout */}
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-blue-700 font-black">
              <Tag className="w-4 h-4" /> Razorpay Partial COD Perk
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              Pay just <strong className="text-blue-700 font-black">₹200 advance deposit</strong> now via Razorpay. Pay remaining balance of{' '}
              <strong className="text-slate-900 font-black">₹{(totalAmount - 200).toLocaleString('en-IN')}</strong> in cash upon doorstep delivery!
            </p>
          </div>

          <Link
            href="/checkout"
            className="w-full min-h-[52px] bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-2 text-center text-[11px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Encrypted & Secured Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
