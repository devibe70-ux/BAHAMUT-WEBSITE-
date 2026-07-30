'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Shield, ArrowRight, CheckCircle2, Ruler, Truck, ShieldCheck, Flame, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';

export default function DynamicHomepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeDemographic, setActiveDemographic] = useState<'ALL' | 'YOUTH' | 'CLASSIC'>('ALL');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      title: 'Pure Woven Cotton. Unmatched Quality.',
      subtitle: 'Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.',
      tag: 'LIVE IN BAHAMUT • AHMEDABAD MILLS',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'De Vibe Classic Woven Chambray',
      itemPrice: '₹1,299',
      demographic: 'CLASSIC'
    },
    {
      title: 'Youth Kinetic Streetwear Prints.',
      subtitle: 'High-density reactive graphic prints, oversized boxy drape, 220 GSM woven cotton built for mobility.',
      tag: 'YOUTH STREETWEAR LINE (13–25)',
      img: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'BahaMut Kinetic Graphic Print',
      itemPrice: '₹1,499',
      demographic: 'YOUTH'
    },
    {
      title: 'Executive Oxford Woven Solids.',
      subtitle: 'Refined long-staple cotton weave, structured collar stays, and superior breathability for year-round distinction.',
      tag: 'CLASSIC EXECUTIVE LINE (26–65)',
      img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80',
      itemTitle: 'De Vibe Executive Oxford Cotton',
      itemPrice: '₹1,399',
      demographic: 'CLASSIC'
    }
  ];

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Autoplay hero slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filteredProducts = products.filter(p => {
    if (activeDemographic === 'ALL') return true;
    return p.target_demographic === activeDemographic;
  });

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

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog?demographic=YOUTH"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" /> Shop Youth Prints (13–25)
              </Link>
              <Link
                href="/catalog?demographic=CLASSIC"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Shield className="w-4 h-4 text-amber-300" /> Shop Classic Solids (26–65)
              </Link>
            </div>

            {/* Quick Guarantees & Slider Controls */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300 font-extrabold">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Breathable Fabric
                </span>
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-400" /> ₹200 Partial COD Deposit
                </span>
              </div>

              {/* Slide Nav Dots */}
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
                  Campaign Hero Piece
                </span>
                <h3 className="text-xl font-black">{currentHero.itemTitle}</h3>
                <p className="text-xs text-slate-300 font-bold">{currentHero.itemPrice} • ₹200 Advance Deposit COD</p>
              </div>

              {/* Next/Prev Buttons */}
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

      {/* Benetton Style Color-Blocked Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            UNITED COLORS OF BAHAMUT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Tailored For Your Style Segment</h2>
          <p className="text-xs text-slate-600 font-semibold">
            Select your demographic age track to view specialized 100% Breathable Woven Cotton lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Youth Card (Benetton Vibrant Blue Block) */}
          <div className="ucb-block-blue text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <span className="bg-white text-blue-900 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Demographic Segment: 13–25
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">Youth Prints & Urban Streetwear</h3>
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                High-density reactive graphic prints, relaxed boxy silhouettes, kinetic patterns, and 220 GSM woven cotton built for street mobility.
              </p>
            </div>
            <div className="pt-8 relative z-10">
              <Link
                href="/catalog?demographic=YOUTH"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg group-hover:translate-x-1"
              >
                Shop Youth Streetwear <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Classic Card (Benetton Vibrant Emerald Block) */}
          <div className="ucb-block-green text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <span className="bg-white text-emerald-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> Demographic Segment: 26–65
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white">Classic Structured Woven Solids</h3>
              <p className="text-sm text-emerald-100 leading-relaxed font-medium">
                High thread-density Oxfords, crisp micro-checks, structured collars, and breathable long-staple cotton for corporate distinction.
              </p>
            </div>
            <div className="pt-8 relative z-10">
              <Link
                href="/catalog?demographic=CLASSIC"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3.5 bg-white text-emerald-950 font-black rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg group-hover:translate-x-1"
              >
                Shop Classic Solids <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Catalog Grid & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <Flame className="w-6 h-6 text-levis-red" /> Direct Mill Cotton Catalog
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-semibold">
              Explore 100% Breathable Woven Cotton apparel with ₹200 Partial COD deposit option.
            </p>
          </div>

          {/* Demographic Tab Filters */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveDemographic('ALL')}
              className={`min-h-[44px] px-4 text-xs font-black rounded-xl transition-all ${
                activeDemographic === 'ALL'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Shirts ({products.length})
            </button>
            <button
              onClick={() => setActiveDemographic('YOUTH')}
              className={`min-h-[44px] px-4 text-xs font-black rounded-xl transition-all ${
                activeDemographic === 'YOUTH'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Youth (13–25)
            </button>
            <button
              onClick={() => setActiveDemographic('CLASSIC')}
              className={`min-h-[44px] px-4 text-xs font-black rounded-xl transition-all ${
                activeDemographic === 'CLASSIC'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classic (26–65)
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
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
