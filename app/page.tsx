'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts, INITIAL_PRODUCTS } from '@/lib/products';
import { Product } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';
import {
  ShieldCheck,
  Truck,
  ChevronRight,
  Ruler,
  Tag,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Lock,
  Award
} from 'lucide-react';

export default function HomePage() {
  // Pre-populate with INITIAL_PRODUCTS to guarantee SSR renders catalog immediately
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="space-y-12 font-sans bg-[#F7F7F8] pb-20">
      {/* Category Navigation Strip with Sizing Units */}
      <section className="bg-white border-b border-[#E5E5E5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/catalog?cat=BOTTOMWEAR"
              onClick={() => trackEvent('view_product', { category: 'BOTTOMWEAR' })}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image
                  src="https://m.media-amazon.com/images/X/bxt1/M/Vbxt1xFDXEjlWBe.jpg"
                  alt="BahaMut Woven Cotton Denim Jeans"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#111111]">Jeans — Waist 28–38</span>
            </Link>

            <Link
              href="/catalog?cat=SHIRT"
              onClick={() => trackEvent('view_product', { category: 'SHIRT' })}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image
                  src="https://m.media-amazon.com/images/X/bxt1/M/sbxt1RP-UepvYiL.png"
                  alt="Woven Cotton Shirts"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#111111]">Shirts — Collar 38–46 cm</span>
            </Link>

            <Link
              href="/catalog?cat=TEE"
              onClick={() => trackEvent('view_product', { category: 'TEE' })}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] transition-all p-1 relative overflow-hidden">
                <Image
                  src="https://m.media-amazon.com/images/X/bxr1/M/qbxr1BFTrxlNxfw.png"
                  alt="Graphic Tees"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#111111]">T-Shirts — Chest S–XXL</span>
            </Link>

            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] flex items-center justify-center transition-all">
                <Ruler className="w-6 h-6 text-[#111111]" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Fit Assistant Guide 📏</span>
            </button>

            <Link
              href="/track/BM-2026-1001"
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F8] border border-[#E5E5E5] group-hover:border-[#111111] flex items-center justify-center transition-all">
                <Truck className="w-6 h-6 text-[#111111]" />
              </div>
              <span className="text-xs font-bold text-[#111111]">Track Order 🚚</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Showcase with Customer-Focused Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E5E5] p-6 sm:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
              OFFICIAL STORE & MANUFACTURER CATALOG
            </div>

            <h1 className="text-3xl sm:text-5xl text-[#111111] font-black tracking-tight leading-tight">
              Ahmedabad-made 100% Woven Cotton Apparel & Selvedge Denim
            </h1>

            <p className="text-[#666666] text-xs sm:text-sm max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Direct-from-manufacturer 100% Breathable Woven Cotton Denim Jeans & Apparel engineered at Ahmedabad textile mills. Registered Trademark (TM No. 5018168, Class 25). Billed & fulfilled by <strong>DE VIBE</strong>, Ambawadi, Ahmedabad, Gujarat - 380015 (GSTIN: <code>24ASHPS9777R1ZE</code>).
            </p>

            {/* Dual CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/catalog?cat=BOTTOMWEAR"
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                Shop Jeans (₹1,499) <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/catalog?cat=SHIRT"
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 bg-[#F7F7F8] hover:bg-[#E5E5E5] text-[#111111] font-bold text-xs uppercase tracking-widest border border-[#E5E5E5] flex items-center justify-center gap-2 transition-all"
              >
                Shop Shirts & Tees
              </Link>
            </div>
          </div>

          <Link
            href="/product/bm-art-21-1"
            className="lg:col-span-5 relative h-80 sm:h-96 w-full bg-[#F7F7F8] border border-[#E5E5E5] overflow-hidden group block"
          >
            <Image
              src="/images/products/bm-art-21-1.jpg"
              alt="BahaMut 100% Woven Cotton Denim Jeans Art 21 Front View"
              fill
              priority
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <span className="bg-white text-[#111111] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                100% Woven Cotton Mill Quality
              </span>
              <h3 className="text-base font-bold">BahaMut Men Regular Fit Jeans - Art 21</h3>
              <p className="text-xs text-neutral-200 font-medium">₹1,499 (MRP: ₹1,999 — Inclusive of 5% GST)</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Offer Terms Banner (Replaces Resetting Countdown Timer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white text-[#111111] text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-widest">
              CHECKOUT PERKS & DISCOUNTS
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Flat ₹200 Advance Partial COD | 5% Extra Off Prepaid</h2>
            <p className="text-xs text-neutral-400">
              FREE Nationwide Express Delivery from DE VIBE, Ahmedabad + 7-Day Free Easy Exchanges
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              className="px-6 py-3 bg-white hover:bg-neutral-200 text-[#111111] font-bold text-xs uppercase tracking-widest transition-all"
            >
              Order Now with Partial COD
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Breakdown: How Partial COD Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 border border-[#E5E5E5] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#666666] uppercase tracking-widest">Transparent Payment Policy</span>
            <h3 className="text-2xl font-black text-[#111111]">How Partial Cash on Delivery (COD) Works</h3>
            <p className="text-xs text-[#666666] font-medium">
              We offer Partial COD to ensure high delivery commitment while giving you complete peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#F7F7F8] p-5 border border-[#E5E5E5] space-y-3 relative">
              <div className="w-8 h-8 bg-[#111111] text-white font-black text-xs rounded-full flex items-center justify-center">1</div>
              <h4 className="font-bold text-sm text-[#111111]">Pay ₹200 Advance Online</h4>
              <p className="text-xs text-[#666666] leading-relaxed font-medium">
                Pay a flat ₹200 deposit via Cashfree Payment Gateway using UPI (GPay, PhonePe, Paytm) or Card. 100% refundable if cancelled before dispatch.
              </p>
            </div>

            <div className="bg-[#F7F7F8] p-5 border border-[#E5E5E5] space-y-3 relative">
              <div className="w-8 h-8 bg-[#111111] text-white font-black text-xs rounded-full flex items-center justify-center">2</div>
              <h4 className="font-bold text-sm text-[#111111]">Express Dispatch in 24 Hours</h4>
              <p className="text-xs text-[#666666] leading-relaxed font-medium">
                Your order is packed and dispatched directly from DE VIBE in Ambawadi, Ahmedabad with live tracking link sent to your SMS/WhatsApp.
              </p>
            </div>

            <div className="bg-[#F7F7F8] p-5 border border-[#E5E5E5] space-y-3 relative">
              <div className="w-8 h-8 bg-[#111111] text-white font-black text-xs rounded-full flex items-center justify-center">3</div>
              <h4 className="font-bold text-sm text-[#111111]">Pay Balance at Doorstep</h4>
              <p className="text-xs text-[#666666] leading-relaxed font-medium">
                Pay the remaining balance (Total Price minus ₹200 deposit) in cash or UPI to the courier delivery executive upon arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why BahaMut? 5 Brand Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-10 border border-[#E5E5E5] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#666666] uppercase tracking-widest">Brand Quality Promise</span>
            <h3 className="text-2xl font-black text-[#111111]">Why Choose BahaMut by DE VIBE?</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-center space-y-2">
              <Award className="w-6 h-6 text-[#111111] mx-auto" />
              <h4 className="font-bold text-xs text-[#111111]">Ahmedabad Crafted</h4>
              <p className="text-[11px] text-[#666666]">Direct from textile hub</p>
            </div>

            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-center space-y-2">
              <Sparkles className="w-6 h-6 text-[#111111] mx-auto" />
              <h4 className="font-bold text-xs text-[#111111]">100% Breathable Cotton</h4>
              <p className="text-[11px] text-[#666666]">12 oz ring-spun denim</p>
            </div>

            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#111111] mx-auto" />
              <h4 className="font-bold text-xs text-[#111111]">Small-Batch Quality</h4>
              <p className="text-[11px] text-[#666666]">Pre-shrunk matrix fit</p>
            </div>

            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-center space-y-2">
              <RefreshCw className="w-6 h-6 text-[#111111] mx-auto" />
              <h4 className="font-bold text-xs text-[#111111]">7-Day Easy Exchange</h4>
              <p className="text-[11px] text-[#666666]">Hassle-free sizing</p>
            </div>

            <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-center space-y-2">
              <Lock className="w-6 h-6 text-[#111111] mx-auto" />
              <h4 className="font-bold text-xs text-[#111111]">Secure Payments</h4>
              <p className="text-[11px] text-[#666666]">Cashfree verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#666666]">Direct Manufacturer Collection</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-wider mt-1">
              <span className="font-gothic text-2xl sm:text-3xl font-normal">BahaMut</span> Master Catalog
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

      {/* Statutory Disclosures & SEO Knowledge Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white border border-[#E5E5E5] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#666666] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" /> Statutory Disclosures & Brand Verification
          </div>
          <h3 className="text-2xl font-bold text-[#111111]">
            Statutory & Legal Declarations (Consumer Protection Rules 2020)
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed font-medium">
            BahaMut is an officially registered Trademark (Trade Mark No. 5018168, Class 25 Readymade Garments) owned by Pooja Textile and exclusively marketed, billed, and fulfilled by <strong>DE VIBE</strong> (GSTIN: <code>24ASHPS9777R1ZE</code>), located at Ambawadi, Ahmedabad, Gujarat - 380015, India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E5E5E5]">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#111111] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#111111]" /> Statutory 5% GST & HSN Code
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                All listed MRPs are inclusive of 5.00% Statutory GST (CGST + SGST for Gujarat; IGST for rest of India) under HSN <code>62034290</code> (100% Woven Cotton Jeans).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#111111] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#111111]" /> Pre-Shrunk 5-Size Matrix
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Engineered with pre-shrunk precision weave. Numeric waist sizes 28, 30, 32, 34, 36, and 38 deliver shape retention and long-lasting durability.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-[#111111] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#111111]" /> Country of Origin & Packer
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Country of Origin: India. Manufactured at Ahmedabad textile mills and packed/fulfilled by DE VIBE, Ambawadi, Ahmedabad, Gujarat - 380015.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
