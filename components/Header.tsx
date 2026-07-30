'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Shield, PackageCheck, Sparkles, Flame } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[48px] min-h-[48px] p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Sub-Branding Lockup (Levi's Red Tab Style) */}
          <div className="flex items-center">
            <Link href="/" className="flex flex-col group py-1">
              <div className="flex items-center gap-2">
                {/* Red Tab Badge */}
                <div className="levis-tab px-3 py-1 rounded-md flex items-center gap-1 group-hover:scale-105 transition-transform">
                  <span className="text-xl sm:text-2xl font-black tracking-tighter">BahaMut</span>
                </div>
                <span className="text-xs sm:text-sm font-extrabold tracking-wider text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 uppercase">
                  by De Vibe
                </span>
              </div>
              <span className="text-[10px] text-slate-500 tracking-wide font-extrabold mt-0.5">
                100% Woven Cotton • Ahmedabad Textiles
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop (UCB Benetton Color-Block Accents) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <Link
              href="/"
              className="min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-800 hover:text-levis-red hover:bg-slate-50 flex items-center transition-all"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-800 hover:text-levis-red hover:bg-slate-50 flex items-center transition-all"
            >
              All Apparel Catalog
            </Link>
            <Link
              href="/catalog?demographic=YOUTH"
              className="min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Youth Prints (13–25)
            </Link>
            <Link
              href="/catalog?demographic=CLASSIC"
              className="min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1.5 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Classic Solids (26–65)
            </Link>
            <Link
              href="/track/BM-2026-1001"
              className="min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-all"
            >
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              Track Order
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <Link
              href="/catalog"
              className="min-w-[48px] min-h-[48px] p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="min-w-[48px] min-h-[48px] p-2 relative text-slate-800 hover:text-levis-red rounded-full hover:bg-slate-100 flex items-center justify-center transition-all"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-levis-red text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/admin/login"
              className="hidden lg:flex min-h-[48px] px-3.5 text-xs font-black text-slate-700 hover:text-slate-900 items-center gap-1.5 border border-slate-300 bg-slate-50 rounded-xl hover:border-slate-400 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              De Vibe Seller
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-extrabold text-slate-800 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-extrabold text-slate-800 hover:bg-slate-100"
          >
            All Apparel Catalog
          </Link>
          <Link
            href="/catalog?demographic=YOUTH"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-black text-blue-700 bg-blue-50 border border-blue-200"
          >
            Youth Prints & Streetwear (13–25)
          </Link>
          <Link
            href="/catalog?demographic=CLASSIC"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-black text-emerald-800 bg-emerald-50 border border-emerald-200"
          >
            Classic Structured Solids (26–65)
          </Link>
          <Link
            href="/track/BM-2026-1001"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-extrabold text-slate-700 hover:bg-slate-100"
          >
            Track Shipment
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-extrabold text-slate-600 hover:bg-slate-100"
          >
            De Vibe Admin Portal
          </Link>
        </div>
      )}
    </header>
  );
}
