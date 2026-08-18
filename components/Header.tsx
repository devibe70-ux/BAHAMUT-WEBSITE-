'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Shield, Ruler, Truck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';

export default function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('ALL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}&cat=${searchCategory}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5] font-sans">
      {/* Top Announcement Bar (Clean & Unobtrusive) */}
      <div className="bg-[#111111] text-white text-[11px] font-semibold py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium text-neutral-300">
              Direct-from-Mill 100% Breathable Woven Cotton • Pay ₹200 Advance (Partial COD)
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1 text-white font-semibold">
              <Truck className="w-3.5 h-3.5 text-neutral-300" /> FREE All-India Express Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Minimal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2 text-[#111111] hover:bg-[#F7F7F8] flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo Branding (Trademark Blackletter Word Mark in Subtle Warm Cream) */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group py-1">
              <div className="bg-[#F5F5F0] border border-[#E5E5E0] text-[#222222] px-3.5 py-1.5 flex items-center transition-colors group-hover:bg-[#EFECE6]">
                <span className="font-gothic text-2xl sm:text-3xl font-normal tracking-wide">BahaMut</span>
              </div>
              <span className="text-[10px] font-bold text-[#666660] bg-[#F5F5F0] px-2 py-1 uppercase tracking-widest border border-[#E5E5E0]">
                BY DE VIBE
              </span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <form onSubmit={handleSearch} className="relative w-full flex items-center">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="h-10 bg-[#F7F7F8] border border-r-0 border-[#E5E5E5] px-3 text-xs font-semibold text-[#111111] focus:outline-none"
              >
                <option value="ALL">All Categories</option>
                <option value="SHIRT">Shirts (38–46)</option>
                <option value="BOTTOMWEAR">Bottomwear (28–38)</option>
                <option value="TEE">Tees (S–XXL)</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search woven cotton shirts, bottomwear, tees..."
                  className="w-full h-10 pl-4 pr-10 text-xs font-medium text-[#111111] bg-white border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                />
              </div>
              <button
                type="submit"
                className="h-10 px-4 bg-[#111111] hover:bg-black text-white font-bold flex items-center justify-center transition-colors"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Minimal Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="hidden sm:flex min-h-[40px] px-3.5 py-1.5 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8] items-center gap-1.5 transition-all border border-[#E5E5E5]"
            >
              <Ruler className="w-4 h-4 text-[#666666]" />
              <span>Fit Guide</span>
            </button>

            <Link
              href="/cart"
              className="min-w-[40px] min-h-[40px] px-3 py-1.5 relative text-[#111111] hover:bg-[#F7F7F8] flex items-center gap-2 transition-all border border-[#E5E5E5]"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#111111] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold">Bag</span>
            </Link>

            <Link
              href="/admin/login"
              className="hidden lg:flex min-h-[40px] px-3.5 py-1.5 text-xs font-bold text-white bg-[#111111] hover:bg-black items-center gap-1.5 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
              <span>Seller Portal</span>
            </Link>
          </div>
        </div>

        {/* Minimal Sub-Header Links */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-[#E5E5E5] text-xs font-bold text-[#666666]">
          <div className="flex items-center gap-8">
            <Link href="/catalog" className="text-[#111111] hover:text-black font-black uppercase tracking-wider">
              All Apparel
            </Link>
            <Link href="/catalog?cat=SHIRT" className="hover:text-[#111111] transition-colors">
              Shirts (Numeric 38–46)
            </Link>
            <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-[#111111] transition-colors">
              Bottomwear (Numeric 28–38)
            </Link>
            <Link href="/catalog?cat=TEE" className="hover:text-[#111111] transition-colors">
              T-Shirts (Alphabetical S–XXL)
            </Link>
            <Link href="/track/BM-2026-1001" className="hover:text-[#111111] transition-colors">
              Track Order
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[#666666] text-[11px]">
            <span>Need Help?</span>
            <Link href="/contact" className="text-[#111111] underline font-bold">
              Contact DE VIBE
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E5E5] px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 h-10 px-3 text-xs bg-[#F7F7F8] border border-[#E5E5E5]"
            />
            <button type="submit" className="h-10 px-4 bg-[#111111] text-white font-bold text-xs">
              Search
            </button>
          </form>

          <div className="space-y-1 pt-2">
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              All Categories
            </Link>
            <Link
              href="/catalog?cat=SHIRT"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              Shirts (Numeric 38–46)
            </Link>
            <Link
              href="/catalog?cat=BOTTOMWEAR"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              Bottomwear (Numeric 28–38)
            </Link>
            <Link
              href="/catalog?cat=TEE"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              T-Shirts (Alphabetical S–XXL)
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSizeModalOpen(true);
              }}
              className="w-full text-left block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              Fit Assistant Guide
            </button>
            <Link
              href="/track/BM-2026-1001"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-[#111111] hover:bg-[#F7F7F8]"
            >
              Track Order Status
            </Link>
          </div>
        </div>
      )}

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </header>
  );
}
