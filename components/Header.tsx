'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Shield, Sparkles, Flame, Ruler, MapPin, Truck, ChevronDown, Percent, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';

export default function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans border-b border-slate-200">
      {/* Top Offer Banner */}
      <div className="bg-slate-900 text-white text-[11px] font-bold py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-devibe-red text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Flame className="w-3 h-3 text-yellow-300" /> OFFICIAL LAUNCH
            </span>
            <span className="hidden sm:inline font-semibold">
              Direct-from-Mill 100% Breathable Woven Cotton • Pay just ₹200 Advance Deposit (Partial COD)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-400">
              <MapPin className="w-3.5 h-3.5" /> Deliver to Ahmedabad - 380015
            </span>
            <span className="hidden lg:inline text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-200 font-extrabold">
              <Truck className="w-3.5 h-3.5 text-blue-400" /> FREE All-India Express Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Branding */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col group py-1">
              <div className="flex items-center gap-2">
                <div className="devibe-tab px-3 py-1 rounded-md flex items-center group-hover:scale-105 transition-transform shadow-md">
                  <span className="text-2xl sm:text-3xl font-black tracking-tighter">BahaMut</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-slate-900 bg-amber-300 text-slate-900 px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                    by De Vibe
                  </span>
                  <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest mt-0.5">
                    ★ ASSURED QUALITY
                  </span>
                </div>
              </div>
            </Link>

            {/* Pincode Selector (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 cursor-pointer transition-all">
              <MapPin className="w-5 h-5 text-devibe-red shrink-0" />
              <div className="text-left text-xs leading-tight">
                <span className="text-slate-400 block text-[10px] font-bold">Deliver to</span>
                <span className="font-black text-slate-900">Ahmedabad 380015</span>
              </div>
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full flex items-center">
              <select
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
                className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-2xl text-xs font-black text-slate-700 px-3 py-2.5 outline-none hover:bg-slate-200 cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                <option value="SHIRT">Shirts (38–46)</option>
                <option value="BOTTOMWEAR">Bottomwear (28–38)</option>
                <option value="TEE">Tees (S–XXL)</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search Chambray Shirts, Chinos, Denim Jeans, Graphic Tees..."
                className="w-full min-h-[44px] px-4 text-xs font-semibold bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <Link
                href={`/catalog${searchQuery ? '?q=' + encodeURIComponent(searchQuery) : ''}`}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-r-2xl min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-3">
            {/* Fit Assistant Button */}
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="hidden sm:flex min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black text-slate-800 hover:text-devibe-red hover:bg-slate-100 items-center gap-1.5 transition-all border border-slate-200"
            >
              <Ruler className="w-4 h-4 text-blue-600" />
              <span>Fit Guide</span>
            </button>

            {/* Shopping Bag Button with Badge */}
            <Link
              href="/cart"
              className="min-w-[44px] min-h-[44px] px-3 py-2 relative text-slate-900 hover:text-devibe-red rounded-xl hover:bg-slate-100 flex items-center gap-2 transition-all border border-slate-200"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-devibe-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-black uppercase tracking-wider">Cart</span>
            </Link>

            {/* Seller Portal Link */}
            <Link
              href="/admin/login"
              className="hidden lg:flex min-h-[44px] px-3.5 text-xs font-black text-white bg-slate-900 hover:bg-slate-800 rounded-xl items-center gap-1.5 shadow-sm transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>De Vibe Seller</span>
            </Link>
          </div>
        </div>

        {/* Secondary Sub-Header Navigation Bar */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-slate-100 text-xs font-extrabold text-slate-800">
          <div className="flex items-center gap-6">
            <Link href="/catalog" className="flex items-center gap-1.5 text-slate-900 hover:text-devibe-red font-black">
              <Sparkles className="w-4 h-4 text-blue-600" /> All Categories
            </Link>
            <Link href="/catalog?cat=SHIRT" className="hover:text-devibe-red transition-colors">
              👔 Shirts (Numeric 38–46)
            </Link>
            <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-devibe-red transition-colors">
              👖 Bottomwear (Numeric 28–38)
            </Link>
            <Link href="/catalog?cat=TEE" className="hover:text-devibe-red transition-colors">
              👕 T-Shirts (Alphabetical S–XXL)
            </Link>
            <Link href="/track/BM-2026-1001" className="hover:text-devibe-red transition-colors flex items-center gap-1">
              🚚 Track Shipment
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-600">
            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200 font-black">
              ✓ 100% Pre-Shrunk Ahmedabad Cotton
            </span>
            <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded border border-amber-200 font-black">
              ★ 4.9 Star Customer Ratings
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
          {/* Search bar inside mobile menu */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Shirts, Chinos, Denim, Tees..."
              className="w-full min-h-[44px] px-4 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl"
            />
            <Link
              href={`/catalog${searchQuery ? '?q=' + encodeURIComponent(searchQuery) : ''}`}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-2 top-2 bg-slate-900 text-white p-2 rounded-lg"
            >
              <Search className="w-4 h-4" />
            </Link>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-xs font-black text-slate-900 hover:bg-slate-100"
          >
            Home Page
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-xs font-black text-slate-900 bg-slate-100 border border-slate-300"
          >
            All Apparel Collection
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSizeModalOpen(true);
            }}
            className="w-full text-left block px-4 py-3 rounded-xl text-xs font-black text-slate-800 hover:bg-slate-100"
          >
            Fit Assistant Guide
          </button>
          <Link
            href="/track/BM-2026-1001"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-xs font-extrabold text-slate-700 hover:bg-slate-100"
          >
            Track Shipment
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-xs font-black text-white bg-slate-900"
          >
            De Vibe Seller Portal
          </Link>
        </div>
      )}

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </header>
  );
}
