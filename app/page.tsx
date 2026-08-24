'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { ShieldCheck, Truck, ChevronRight, Ruler, Clock, Tag, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-10 font-sans bg-[#F7F7F8] pb-20">
      {/* Minimal Category Strip */}
      <section className="bg-white border-b border-[#E5E5E5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 overflow-x-auto pb-2 scrollbar-none">
            <Link href="/catalog?cat=BOTTOMWEAR" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image src="https://m.media-amazon.com/images/X/bxt1/M/Vbxt1xFDXEjlWBe.jpg" alt="Selvedge Denim" fill className="object-cover" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Selvedge Denim (28–38)</span>
            </Link>

            <Link href="/catalog?cat=SHIRT" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image src="https://m.media-amazon.com/images/X/bxt1/M/sbxt1RP-UepvYiL.png" alt="Shirts" fill className="object-cover" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Woven Shirts (38–46)</span>
            </Link>

            <Link href="/catalog?cat=TEE" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image src="https://m.media-amazon.com/images/X/bxr1/M/qbxr1BFTrxlNxfw.png" alt="Heavyweight Tees" fill className="object-cover" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Graphic Tees (S–XXL)</span>
            </Link>

            <button onClick={() => setIsSizeModalOpen(true)} className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] flex items-center justify-center transition-all">
                <Ruler className="w-6 h-6 text-[#111111]" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Size Guide 📏</span>
            </button>

            <Link href="/track/BM-2026-1001" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] flex items-center justify-center transition-all">
                <Truck className="w-6 h-6 text-[#111111]" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Track Order 🚚</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Hero Showcase with Trademark Blackletter Title & Amazon SmartBiz Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E5E5] p-6 sm:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
              OFFICIAL SMARTBIZ STORE LISTING
            </div>

            <h1 className="text-4xl sm:text-6xl text-[#111111] tracking-tight leading-tight">
              <span className="font-gothic font-normal">BahaMut</span> <span className="font-sans font-light text-[#666666] text-3xl sm:text-4xl">by DE VIBE</span>
            </h1>

            <p className="text-[#666666] text-xs sm:text-sm max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel & Authentic Selvedge Denim engineered at Ambawadi, Ahmedabad mills. Official Registered Trademark (TM No. 5018168, Class 25).
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                Shop All Apparel
              </Link>
              <button
                onClick={() => setIsSizeModalOpen(true)}
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#F7F7F8] hover:bg-[#E5E5E5] text-[#111111] font-bold text-xs uppercase tracking-widest border border-[#E5E5E5] flex items-center justify-center gap-2 transition-all"
              >
                <Ruler className="w-4 h-4 text-[#666666]" /> Fit Assistant Guide
              </button>
            </div>
          </div>

          <Link href="/product/bahamut-22-2-selvedge-denim" className="lg:col-span-5 relative h-80 sm:h-96 w-full bg-[#F7F7F8] border border-[#E5E5E5] overflow-hidden group block">
            <Image
              src="https://m.media-amazon.com/images/X/bxt1/M/Vbxt1xFDXEjlWBe.jpg"
              alt="BahaMut 22 (2) SELVEDGE DENIM"
              fill
              priority
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="bg-white text-[#111111] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                Amazon SmartBiz Verified
              </span>
              <h3 className="text-base font-bold">BahaMut 22 (2) SELVEDGE DENIM</h3>
              <p className="text-xs text-neutral-200 font-medium">₹1,499 (MRP: ₹1,999 — 25% Off)</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Minimal Flash Deal Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white text-[#111111] text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-widest">
              LAUNCH OFFER
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Flat ₹200 Advance Partial COD Option</h2>
            <p className="text-xs text-neutral-400">
              Free Express Delivery + Extra 5% Off on Full Prepaid Checkout
            </p>
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 px-4 py-2 border border-neutral-800 text-xs font-mono">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span className="text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>
      </section>

      {/* Minimal Trust Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 border border-[#E5E5E5] flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#111111] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#111111]">Class 25 Registered</h4>
              <p className="text-[11px] text-[#666666]">TM No. 5018168</p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E5E5] flex items-center gap-3">
            <Truck className="w-6 h-6 text-[#111111] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#111111]">Free Express Shipping</h4>
              <p className="text-[11px] text-[#666666]">Ambawadi Ahmedabad Hub</p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E5E5] flex items-center gap-3">
            <Tag className="w-6 h-6 text-[#111111] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#111111]">₹200 Partial COD</h4>
              <p className="text-[11px] text-[#666666]">Pay deposit & balance at doorstep</p>
            </div>
          </div>

          <div className="bg-white p-5 border border-[#E5E5E5] flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#111111] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#111111]">Operated by DE VIBE</h4>
              <p className="text-[11px] text-[#666666]">100% Woven Cotton Mills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Collection Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#666666]">Curated Ahmedabad Collection</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-wider mt-1">
              <span className="font-gothic text-2xl sm:text-3xl font-normal">BahaMut</span> Bestsellers Collection
            </h2>
          </div>

          <Link
            href="/catalog"
            className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1"
          >
            View All ({products.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
