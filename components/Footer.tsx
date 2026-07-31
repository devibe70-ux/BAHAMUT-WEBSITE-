'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, Sparkles, Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05080F] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-white">100% Breathable Woven Cotton</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct-from-manufacturer woven cotton yarns sourced directly from Ahmedabad mills.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-white">Partial COD (₹200 Deposit)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay ₹200 advance deposit securely via Razorpay; pay remaining balance at your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 shadow-md">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-white">Pre-Shrunk Fit Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive size assistant guide ensures accurate chest measurement before ordering.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-base text-white">Ahmedabad Hub Hub</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Marketed, billed, and dispatched from Revdi Bazar, Kalupur, Ahmedabad, Gujarat.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-slate-800/80">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight gradient-text-indigo">BahaMut</span>
              <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase">
                by De Vibe
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pioneering direct-to-consumer structured woven solids for classic gentlemen and high-density statement streetwear prints for youth.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" /> De Vibe, Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380015
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> +91 79 2213 4099 / support@bahamut.in
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest mb-4">Shop Collections</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/catalog?demographic=YOUTH" className="hover:text-blue-400 transition-colors">
                  Youth Prints & Streetwear (13–25)
                </Link>
              </li>
              <li>
                <Link href="/catalog?demographic=CLASSIC" className="hover:text-emerald-400 transition-colors">
                  Classic Structured Solids (26–65)
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Full 100% Cotton Catalog
                </Link>
              </li>
              <li>
                <Link href="/catalog?sleeve=Full+Sleeve" className="hover:text-white transition-colors">
                  Formal Full Sleeve Shirts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/track/BM-2026-1001" className="hover:text-white transition-colors">
                  Track Your Shipment Milestone
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart & Partial COD
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Interactive Fit Assistant Guide</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Shipping & Delivery Policy</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest mb-4">Payment & Shipping</h5>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              We process secure advance deposits via Razorpay (UPI, Credit Cards, NetBanking) and fulfill orders through Shipyaari & Delhivery Direct.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-black text-slate-300">
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm">RAZORPAY SECURE</span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm">SHIPYAARI</span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm">DELHIVERY</span>
            </div>
          </div>
        </div>

        {/* Legal Line Enforcement */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-300 tracking-wide">
            © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span>Target: bahamut.in</span>
            <span>•</span>
            <span>Revdi Bazar, Kalupur, Ahmedabad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
