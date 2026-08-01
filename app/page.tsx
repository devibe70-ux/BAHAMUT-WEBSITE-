'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Shield, ArrowRight, CheckCircle2, Ruler, Truck, ShieldCheck, Flame, Star, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';

export default function DynamicHomepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      title: 'Pure Woven Cotton.',
      subtitle: 'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
      tag: 'LIVE IN BAHAMUT • AHMEDABAD MILLS',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'De Vibe Classic Woven Chambray',
      itemPrice: '₹1,299',
      rating: 4.9,
      reviews: 148
    },
    {
      title: 'Vanguard Streetwear & Kinetic Prints.',
      subtitle: 'High-density reactive graphic prints, comfortable drape, 220 GSM woven cotton built for mobility.',
      tag: 'UNIFIED APPAREL LINE',
      img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'BahaMut Kinetic Graphic Print',
      itemPrice: '₹1,499',
      rating: 4.9,
      reviews: 210
    },
    {
      title: 'Executive Oxford Woven Solids.',
      subtitle: 'Refined long-staple cotton weave, structured collar stays, and superior breathability for all-age distinction.',
      tag: 'UNIFIED APPAREL LINE',
      img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'De Vibe Executive Oxford Cotton',
      itemPrice: '₹1,399',
      rating: 4.8,
      reviews: 124
    }
  ];

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentHero = heroSlides[heroIndex];

  return (
    <div className="space-y-16 pb-24 font-sans">
      {/* Levi's Style Interactive Hero Campaign Slider */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-levis-red text-white px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
              <Flame className="w-4 h-4 text-yellow-300 animate-pulse" /> {currentHero.tag}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none transition-all duration-500">
              {currentHero.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium transition-all duration-500">
              {currentHero.subtitle}
            </p>

            {/* Amazon-style Verified Rating Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-3 bg-slate-800/80 backdrop-blur-md px-4 py-2.5 rounded-2xl w-fit border border-slate-700 mx-auto lg:mx-0">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-black text-white">4.9/5 Rating</span>
              <span className="text-xs text-slate-400 font-semibold">• 2,400+ Verified Orders</span>
            </div>

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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Breathable Woven Cotton
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

          {/* Interactive Hero Image */}
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
                <p className="text-xs text-slate-300 font-bold">{currentHero.itemPrice} • ₹200 Advance Deposit COD</p>
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

      {/* Amazon-style Category Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-300">
            BAHAMUT APPAREL CATEGORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Explore Collection Highlights</h2>
          <p className="text-xs text-slate-600 font-semibold">
            Unified 100% Breathable Woven Cotton shirts tailored for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="bg-blue-50 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase border border-blue-200">
                STREETWEAR & PRINTS
              </span>
              <h3 className="text-2xl font-black text-slate-900">Kinetic Street Prints</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                High-density reactive graphic prints on 220 GSM woven cotton built for comfort and style across all ages.
              </p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-levis-red uppercase tracking-wider pt-4"
            >
              Explore Streetwear <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase border border-emerald-200">
                STRUCTURED EXECUTIVE
              </span>
              <h3 className="text-2xl font-black text-slate-900">Oxford Woven Solids</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Crisp high-density Oxford weave with reinforced collars and sweat-wicking thermal ventilation.
              </p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-levis-red uppercase tracking-wider pt-4"
            >
              Explore Oxford Solids <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="bg-amber-50 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase border border-amber-200">
                RESORT & CASUAL
              </span>
              <h3 className="text-2xl font-black text-slate-900">Tropics Cuban Shirts</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Effortless Cuban collar designs with hand-cut botanical patterns for sunny outdoor occasions.
              </p>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 group-hover:text-levis-red uppercase tracking-wider pt-4"
            >
              Explore Cuban Shirts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-levis-red" /> Ahmedabad Mill Direct Collection
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-semibold">
              Explore 100% Breathable Woven Cotton apparel with ₹200 Partial COD deposit option.
            </p>
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

      {/* Fabric Heritage Trust Pillars */}
      <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 bg-white px-4 py-1.5 rounded-full border border-slate-300 shadow-sm">
              AHMEDABAD TEXTILE MILL EXCLUSIVITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Direct 100% Woven Cotton Superiority Matters
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Unlike cheap synthetic blends, BahaMut garments are crafted with long-staple natural cotton yarns for maximum thermal breathability across Indian climates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit border border-blue-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Zero Synthetic Blends</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Pure 100% woven cotton guarantees skin-friendly softness, preventing sweat rashes and odor retention even during high activity.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Pre-Shrunk Fit Silhouette</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Sanforized pre-shrunk fabric processing ensures your shirt retains its exact collar alignment, chest width, and sleeve length after repeated machine washes.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit border border-amber-200">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">₹200 Partial COD Deposit</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Zero risk checkout. Lock in your order with a small ₹200 advance deposit via Razorpay; inspect and pay the remaining balance cash at delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Assistant Modal */}
      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
