'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, Sparkles, Flame, FileText, Lock } from 'lucide-react';

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
            <h4 className="font-extrabold text-base text-white">Ahmedabad Fulfillment Hub</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Marketed, billed, and dispatched from Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380015.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-slate-800/80">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white">BahaMut</span>
              <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase">
                by De Vibe
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pioneering direct-to-consumer structured woven cotton apparel, raw indigo denim, and streetwear tees.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" /> De Vibe, Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380015
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> +91 79 2213 4099 / devibe70@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest mb-4">Shop Collections</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/catalog?cat=SHIRT" className="hover:text-blue-400 transition-colors">
                  Woven Cotton Shirts (Numeric 38–46)
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-emerald-400 transition-colors">
                  Chino Trousers & Denim (Numeric 28–38)
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=TEE" className="hover:text-white transition-colors">
                  Heavyweight Graphic Tees (S–XXL)
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  All Ahmedabad Mill Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Razorpay Mandatory Compliance Links */}
          <div>
            <h5 className="font-extrabold text-xs text-amber-400 uppercase tracking-widest mb-4">Merchant & Legal Policies</h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Refund, Return & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-rose-400" /> Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-purple-400" /> Contact Us & Registered Address
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest mb-4">Payment & Logistics</h5>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Payments are securely processed via Razorpay (UPI, Cards, NetBanking). Orders are fulfilled directly via Shipyaari & Delhivery.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-black text-slate-300">
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm text-emerald-400">RAZORPAY VERIFIED</span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm">SHIPYAARI</span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 shadow-sm">MYBILLBOOK SYNC</span>
            </div>
          </div>
        </div>

        {/* Legal Line Enforcement */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-300 tracking-wide">
            © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
            <span>https://bahamut.in</span>
            <span>•</span>
            <span>Revdi Bazar, Kalupur, Ahmedabad - 380015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
