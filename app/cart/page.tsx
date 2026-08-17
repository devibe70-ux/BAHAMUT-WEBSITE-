'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, MapPin, Truck } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  const advanceAmount = Math.min(200, cartTotal);
  const remainingCodBalance = Math.max(0, cartTotal - advanceAmount);

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
              <ShoppingBag className="w-7 h-7 text-[#b3001f]" /> Shopping Bag ({itemCount})
            </h1>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-bold text-[#8b8b94] hover:text-white flex items-center gap-1 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </section>

      {/* Main Cart Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {cart.length === 0 ? (
          <div className="bg-[#121215] rounded-[2px] p-12 text-center border border-[#26262c] space-y-4 max-w-lg mx-auto shadow-2xl">
            <ShoppingBag className="w-16 h-16 text-[#8b0018] mx-auto opacity-70" />
            <h3 className="font-heading text-xl text-white uppercase">Your Bag is Empty</h3>
            <p className="text-xs text-[#8b8b94]">Explore our Class 25 Trademarked Garments Drop.</p>
            <Link
              href="/catalog"
              className="inline-block min-h-[48px] px-8 py-3 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] transition-all glow-crimson"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item, idx) => {
                const itemPrice = item.product.price || 1299;
                const imageSrc = item.product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80';

                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${idx}`}
                    className="bg-[#121215] p-4 sm:p-6 rounded-[2px] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-[#26262c] shadow-lg"
                  >
                    <div className="relative w-24 h-32 rounded-[2px] overflow-hidden bg-black flex-shrink-0 border border-[#26262c]">
                      <Image
                        src={imageSrc}
                        alt={item.product.title}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <h3 className="font-heading text-sm text-white">{item.product.title}</h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#8b8b94]">
                        <span>Fit Size: <strong className="text-white font-bold">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Fabric: <strong className="text-white">{item.product.fabric_details || '100% Woven Cotton'}</strong></span>
                      </div>

                      <div className="text-sm font-heading text-[#b3001f] font-bold pt-1">
                        ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#26262c] rounded-[2px] bg-[#1b1b20]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="p-2 text-slate-400 hover:text-[#b3001f] transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-xl space-y-6 h-fit">
              <h3 className="font-heading text-sm text-white uppercase tracking-wider border-b border-[#26262c] pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs font-medium text-slate-300">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="text-white font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Express Shipping:</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between border-t border-[#26262c] pt-3 text-sm text-white font-heading font-bold">
                  <span>Total Payable:</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Partial COD Breakdown Box */}
              <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#8b0018]/40 space-y-2">
                <span className="text-[11px] font-heading text-[#b3001f] uppercase tracking-wider block">
                  Partial COD Payment Split:
                </span>
                <div className="text-xs space-y-1 text-slate-300">
                  <div className="flex justify-between font-bold text-white">
                    <span>Payable Now (Deposit):</span>
                    <span className="text-[#b3001f]">₹{advanceAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pay at Doorstep (Cash):</span>
                    <span>₹{remainingCodBalance.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full min-h-[52px] bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 glow-crimson"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
