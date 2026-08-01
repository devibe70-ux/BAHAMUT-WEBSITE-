'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { Sparkles, Flame, ShieldCheck, Truck, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Ruler, Award, RefreshCw, Star, Tag, Clock, Zap } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  // Flash sale countdown timer state (Amazon/Flipkart style)
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

  const heroSlides = [
    {
      title: 'Pure Woven Cotton Craftsmanship.',
      subtitle: 'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
      tag: 'LIVE IN BAHAMUT • AHMEDABAD MILLS',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'Classic Chambray Full Sleeve Shirt',
      itemPrice: '₹1,299',
      itemMrp: '₹2,499'
    },
    {
      title: 'Vanguard Streetwear & Kinetic Prints.',
      subtitle: 'High-density reactive graphic prints, comfortable drape, 220 GSM woven cotton built for mobility.',
      tag: 'UNIFIED APPAREL LINE',
      img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'BahaMut Kinetic Graphic Print',
      itemPrice: '₹1,099',
      itemMrp: '₹2,199'
    },
    {
      title: 'Executive Oxford Woven Solids.',
      subtitle: 'Refined long-staple cotton weave, structured collar stays, and superior breathability for all-age distinction.',
      tag: 'UNIFIED APPAREL LINE',
      img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'De Vibe Executive Oxford Cotton',
      itemPrice: '₹1,399',
      itemMrp: '₹2,699'
    }
  ];

  const currentHero = heroSlides[heroIndex];

  return (
    <div className="space-y-10 font-sans bg-slate-50/50 pb-20">
      {/* Flipkart Style Quick Category Circles Strip */}
      <section className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            <Link href="/catalog" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-levis-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80" alt="Shirts" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-levis-red">Shirts (38–46)</span>
            </Link>

            <Link href="/catalog?cat=BOTTOMWEAR" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-levis-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=200&q=80" alt="Bottomwear" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-levis-red">Bottomwear (28–38)</span>
            </Link>

            <Link href="/catalog?cat=TEE" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-slate-300 group-hover:border-levis-red group-hover:scale-105 transition-all p-1 overflow-hidden shadow-sm relative">
                <Image src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=200&q=80" alt="T-Shirts" fill className="object-cover rounded-full" />
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-levis-red">Tees (S–XXL)</span>
            </Link>

            <button onClick={() => setIsSizeModalOpen(true)} className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 border-2 border-blue-300 group-hover:border-blue-600 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm">
                <Ruler className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xs font-black text-blue-700">Fit Guide 📏</span>
            </button>

            <Link href="/catalog" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-50 border-2 border-amber-300 group-hover:border-amber-500 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm">
                <Flame className="w-8 h-8 text-amber-600" />
              </div>
              <span className="text-xs font-black text-amber-800">Deal of the Day 🔥</span>
            </Link>

            <Link href="/track/BM-2026-1001" className="flex flex-col items-center gap-2 group flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 group-hover:border-emerald-600 group-hover:scale-105 transition-all flex items-center justify-center shadow-sm">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="text-xs font-black text-emerald-800">Track Order 🚚</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-800">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-levis-red text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <Sparkles className="w-4 h-4 text-yellow-300" /> {currentHero.tag}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {currentHero.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {currentHero.subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-levis-red hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
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

            {/* Quick Guarantees */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 font-extrabold">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Woven Cotton
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" /> ₹200 Partial COD Deposit
                </span>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      heroIndex === idx ? 'bg-levis-red w-8 shadow-md' : 'bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
              <Image
                src={currentHero.img}
                alt={currentHero.itemTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
                <span className="bg-levis-red text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured Bestseller
                </span>
                <h3 className="text-xl font-black">{currentHero.itemTitle}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{currentHero.itemPrice}</span>
                  <span className="text-xs text-slate-400 line-through font-semibold">{currentHero.itemMrp}</span>
                  <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded">SAVE 48%</span>
                </div>
              </div>

              <button
                onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center p-2 opacity-80 hover:opacity-100 transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full flex items-center justify-center p-2 opacity-80 hover:opacity-100 transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon India Style Flash Sale / Deal of the Day Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-red-500">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-slate-900" /> LIMITED TIME FLASH SALE
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">Ahmedabad Mill Launch Offer — Up to 50% OFF</h2>
            <p className="text-xs text-rose-100 font-medium">
              Free Express Delivery + ₹200 Partial COD Advance Deposit Option Available All-India
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-yellow-300">
              <Clock className="w-5 h-5 animate-spin text-yellow-400" /> Offer Ends In:
            </div>
            <div className="flex items-center gap-2 font-mono font-black text-xl">
              <span className="bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span>:</span>
              <span className="bg-white text-rose-600 px-3 py-1.5 rounded-xl shadow animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flipkart Style Trust Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">De Vibe Assured</h4>
              <p className="text-[11px] text-slate-500 font-semibold">100% Authentic Ahmedabad Mill Quality</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Free Express Delivery</h4>
              <p className="text-[11px] text-slate-500 font-semibold">Delivered by Tomorrow to Pincode 380015</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">₹200 Partial COD</h4>
              <p className="text-[11px] text-slate-500 font-semibold">Pay ₹200 now & balance at doorstep</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Easy Fit Exchange</h4>
              <p className="text-[11px] text-slate-500 font-semibold">Hassle-free 7-Day Size Exchange</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                BUYER SELECTION
              </span>
              <span className="text-xs font-bold text-slate-500">Curated Ahmedabad Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2 mt-1">
              <Flame className="w-6 h-6 text-levis-red" /> BahaMut Bestsellers Collection
            </h2>
          </div>

          <Link
            href="/catalog"
            className="min-h-[48px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-all w-fit"
          >
            View Full Catalog ({products.length} items) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
