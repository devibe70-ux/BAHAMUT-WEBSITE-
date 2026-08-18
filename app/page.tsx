'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { Sparkles, Flame, ShieldCheck, Truck, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Ruler, Tag, Clock, Zap, ShoppingBag } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 45 });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 22, seconds: 45 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10 font-sans bg-slate-50/50 pb-20">
      {/* Quick Category Circles Strip */}
      <section className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            <Link href="/catalog" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-devibe-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80" alt="Shirts" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-devibe-red">Shirts (38–46)</span>
            </Link>

            <Link href="/catalog?cat=BOTTOMWEAR" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-devibe-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=200&q=80" alt="Bottomwear" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-devibe-red">Bottomwear (28–38)</span>
            </Link>

            <Link href="/catalog?cat=TEE" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-devibe-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=200&q=80" alt="T-Shirts" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-devibe-red">Tees (S–XXL)</span>
            </Link>

            <button onClick={() => setIsSizeModalOpen(true)} className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 border-2 border-blue-300 group-hover:border-blue-600 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm">
                <Ruler className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xs font-black text-blue-700">Size Guide 📏</span>
            </button>

            <Link href="/track/BM-2026-1001" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 group-hover:border-emerald-600 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="text-xs font-black text-emerald-800">Track Order 🚚</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Showcase Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-devibe-red text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <Sparkles className="w-4 h-4 text-yellow-300" /> OFFICIAL LAUNCH COLLECTION
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              BAHAMUT <span className="text-amber-400">by DE VIBE</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel engineered at Ahmedabad textile hub. Official Registered Trademark (TM No. 5018168, Class 25). Ambawadi, Ahmedabad, Gujarat - 380015.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-devibe-red hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" /> Shop All Apparel
              </Link>
              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Ruler className="w-4 h-4 text-blue-400" /> Fit Assistant Guide
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <Image
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
              alt="BAHAMUT Classic Collection"
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                100% Woven Cotton
              </span>
              <h3 className="text-lg font-black">De Vibe Classic Chambray Shirt</h3>
              <p className="text-xs text-slate-300 font-bold">₹1,299 (MRP: ₹2,499)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Flash Sale CountDown Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-red-500">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-slate-900" /> OFFICIAL LAUNCH FLASH DEAL
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Flat ₹200 Advance Partial COD Option</h2>
            <p className="text-xs text-red-100 font-semibold">
              Free Express All-India Delivery + Extra 5% Off on Full Prepaid Checkout
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase">
              <Clock className="w-5 h-5 animate-spin" /> Ends In:
            </div>
            <div className="flex items-center gap-2 font-mono font-black text-xl text-white">
              <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-slate-900">Class 25 Registered</h4>
              <p className="text-[11px] text-slate-500 font-medium">TM No. 5018168</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-slate-900">Free Express Shipping</h4>
              <p className="text-[11px] text-slate-500 font-medium">Ambawadi Ahmedabad Hub</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-slate-900">₹200 Partial COD</h4>
              <p className="text-[11px] text-slate-500 font-medium">Pay deposit & balance at doorstep</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm text-slate-900">Operated by DE VIBE</h4>
              <p className="text-[11px] text-slate-500 font-medium">100% Woven Cotton Mills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Collection Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div>
            <span className="text-xs font-bold text-slate-500">Curated Ahmedabad Collection</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <Flame className="w-6 h-6 text-devibe-red" /> BahaMut Bestsellers Collection
            </h2>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All ({products.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
