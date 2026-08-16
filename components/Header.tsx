'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Shield, Sparkles, Flame, Ruler, MapPin, Truck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';

export default function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0b]/95 backdrop-blur-md border-b border-[#26262c] shadow-2xl font-sans">
      {/* Top Announcement Strip */}
      <div className="bg-[#121215] text-[#ececed] text-[11px] font-bold py-1.5 px-4 flex items-center justify-between border-b border-[#26262c]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-[#8b0018] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1 animate-pulse shadow">
              <Flame className="w-3 h-3 text-yellow-300" /> CLASS 25 E-COMMERCE
            </span>
            <span className="hidden sm:inline text-slate-300 font-semibold">
              Bahamut Registered Trademark • Exclusively Manufactured & Operated by De Vibe
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:flex items-center gap-1 text-[11px] font-bold text-emerald-400">
              <MapPin className="w-3.5 h-3.5" /> Deliver to Ahmedabad - 380015
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300 font-extrabold">
              <Truck className="w-3.5 h-3.5 text-[#b3001f]" /> FREE Express Shipping
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1b1b20] flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Gothic Brand Lockup */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col group text-decoration-none">
              <div className="flex items-center gap-1">
                <span className="font-gothic text-3xl sm:text-4xl text-white tracking-wider leading-none">
                  Baha<span className="text-[#b3001f]">mut</span>
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8b8b94] font-semibold mt-0.5">
                Operated by De Vibe
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-[#8b8b94]">
            <Link href="/" className="hover:text-white transition-colors">
              Collection
            </Link>
            <Link href="/catalog?cat=SHIRT" className="hover:text-white transition-colors">
              Shirts (38–46)
            </Link>
            <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-white transition-colors">
              Bottomwear (28–38)
            </Link>
            <Link href="/catalog?cat=TEE" className="hover:text-white transition-colors">
              Tees (S–XXL)
            </Link>
            <button
              onClick={() => setIsSizeModalOpen(true)}
              className="hover:text-white transition-colors flex items-center gap-1 text-[#b3001f]"
            >
              <Ruler className="w-4 h-4" /> Fit Assistant
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="min-w-[44px] min-h-[44px] px-4 py-2 relative bg-[#121215] text-white hover:border-[#8b0018] rounded-md border border-[#26262c] flex items-center gap-2 transition-all hover:bg-[#8b0018]/20"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#b3001f]" />
              <span className="text-xs font-extrabold tracking-widest uppercase">Bag</span>
              <span className="bg-[#8b0018] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                {itemCount}
              </span>
            </Link>

            <Link
              href="/admin/login"
              className="hidden lg:flex min-h-[44px] px-3.5 text-xs font-extrabold text-white bg-[#8b0018] hover:bg-[#b3001f] rounded-md items-center gap-1.5 shadow-lg transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              <span>Seller Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121215] border-b border-[#26262c] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-md text-xs font-bold text-white hover:bg-[#1b1b20]"
          >
            Collection
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-md text-xs font-bold text-white bg-[#1b1b20] border border-[#26262c]"
          >
            All Arrivals (Class 25)
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSizeModalOpen(true);
            }}
            className="w-full text-left block px-4 py-3 rounded-md text-xs font-bold text-[#b3001f] hover:bg-[#1b1b20]"
          >
            Fit Assistant Guide
          </button>
          <Link
            href="/track/BM-2026-1001"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-md text-xs font-bold text-slate-300 hover:bg-[#1b1b20]"
          >
            Track Shipment
          </Link>
        </div>
      )}

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </header>
  );
}
