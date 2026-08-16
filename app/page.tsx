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
    <div className="space-y-12 font-sans bg-[#0a0a0b] text-[#ececed] pb-24">
      {/* Gothic Hero Section */}
      <section className="relative py-20 px-6 text-center border-b border-[#26262c] bg-[radial-gradient(circle_at_center,rgba(139,0,24,0.15)_0%,rgba(10,10,11,0)_70%)]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block border border-[#8b0018] bg-[#8b0018]/20 text-[#ffffff] text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-[2px] shadow-lg">
            Drop 01 / Draconic Heavyweights & Woven Cotton
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-wider text-white uppercase leading-tight">
            Darkness Tailored
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base font-normal leading-relaxed">
            Luxury streetwear engineered with premium heavy-gauge textiles, mythological gothic silhouettes, and 100% Breathable Woven Cotton directly from Ahmedabad mills.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="min-h-[52px] px-8 py-3.5 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] transition-all glow-crimson flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Explore Arrivals (Class 25)
            </Link>
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="min-h-[52px] px-8 py-3.5 bg-[#121215] hover:bg-[#1b1b20] text-slate-200 font-heading text-xs uppercase tracking-widest rounded-[2px] border border-[#26262c] flex items-center gap-2 transition-all"
            >
              <Ruler className="w-4 h-4 text-[#b3001f]" /> Fit Assistant Guide
            </button>
          </div>
        </div>
      </section>

      {/* Flash Drop Timer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121215] rounded-[4px] p-6 border border-[#8b0018] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#8b0018] text-white text-[10px] font-black px-3 py-1 rounded-[2px] uppercase tracking-widest">
              <Zap className="w-4 h-4 fill-white" /> CART HOLD TIMER ACTIVE
            </div>
            <h2 className="font-heading text-xl sm:text-2xl text-white">Cart items held for 10:00 drop access window</h2>
            <p className="text-xs text-slate-400 font-medium">
              Free Express Shipping + ₹200 Partial COD Advance Deposit Option Available All-India
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#0a0a0b] p-4 rounded-[4px] border border-[#26262c]">
            <div className="flex items-center gap-2 text-xs font-heading tracking-widest text-[#b3001f] uppercase">
              <Clock className="w-5 h-5 animate-spin text-[#b3001f]" /> Drop Timer:
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-xl text-white">
              <span className="bg-[#1b1b20] px-3 py-1.5 rounded-[2px] border border-[#26262c]">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-[#1b1b20] px-3 py-1.5 rounded-[2px] border border-[#26262c]">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-[#8b0018] text-white px-3 py-1.5 rounded-[2px] animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#121215] p-5 rounded-[4px] border border-[#26262c] flex items-center gap-3">
            <div className="p-3 bg-[#8b0018]/20 text-[#b3001f] rounded-[2px] flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-xs sm:text-sm text-white">Class 25 Registered</h4>
              <p className="text-[11px] text-slate-400">BAHAMUT Trademarked Line</p>
            </div>
          </div>

          <div className="bg-[#121215] p-5 rounded-[4px] border border-[#26262c] flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-[2px] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-xs sm:text-sm text-white">Free Express Shipping</h4>
              <p className="text-[11px] text-slate-400">Direct from Ahmedabad Hub</p>
            </div>
          </div>

          <div className="bg-[#121215] p-5 rounded-[4px] border border-[#26262c] flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-[2px] flex-shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-xs sm:text-sm text-white">₹200 Partial COD</h4>
              <p className="text-[11px] text-slate-400">Pay deposit & balance at doorstep</p>
            </div>
          </div>

          <div className="bg-[#121215] p-5 rounded-[4px] border border-[#26262c] flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-[2px] flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-xs sm:text-sm text-white">Operated by De Vibe</h4>
              <p className="text-[11px] text-slate-400">100% Woven Cotton Mills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-[#26262c] pb-6 mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8b8b94]">
              CLASS 25 E-COMMERCE CATALOG
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-white mt-1">
              Latest Arrivals & Drops
            </h2>
          </div>

          <Link
            href="/catalog"
            className="min-h-[44px] px-6 py-2.5 bg-[#121215] hover:bg-[#1b1b20] border border-[#26262c] text-white font-heading text-xs uppercase tracking-wider rounded-[2px] flex items-center gap-2 transition-all w-fit"
          >
            Showing All Available Items ({products.length}) <ArrowRight className="w-4 h-4 text-[#b3001f]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
