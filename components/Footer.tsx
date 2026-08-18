'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, FileText, Lock, Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Class 25 Registered</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              BAHAMUT Trademarked Line (TM No. 5018168) engineered with heavy-gauge woven cotton textiles.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Partial COD Available</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Pay ₹200 advance deposit online; pay remaining balance at your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20 shadow-md">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">7-Day Fit Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Numeric & Alphabetical size assistant guide ensures pre-shrunk precision fit.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Operated by DE VIBE</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Marketed, billed, and dispatched from Ambawadi, Ahmedabad, Gujarat, India - 380015.
            </p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="devibe-tab px-3 py-1 rounded-md text-xl font-black text-white">
                BAHAMUT
              </span>
              <span className="text-xs font-black bg-amber-400 text-slate-900 px-2 py-0.5 rounded uppercase">
                by DE VIBE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ahmedabad textile hub.
            </p>
            <div className="text-xs text-slate-400 space-y-1 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> DE VIBE Hub, Ambawadi, Ahmedabad, Gujarat, India - 380015
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> +91 79 2213 4099 / devibe70@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-black text-xs text-white uppercase tracking-widest mb-4">Class 25 Catalog</h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/catalog?cat=SHIRT" className="hover:text-white transition-colors">
                  Woven Cotton Shirts (Numeric 38–46)
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-white transition-colors">
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

          {/* Legal Compliance */}
          <div>
            <h5 className="font-black text-xs text-amber-400 uppercase tracking-widest mb-4">Merchant & Legal Policies</h5>
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
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-rose-400" /> Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-purple-400" /> Contact Us & Office Address
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black text-xs text-white uppercase tracking-widest mb-4">Fulfillment Partners</h5>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">
              Razorpay Secured Gateway (UPI, Cards, NetBanking). Automated invoice sync to MyBillBook app & Shipyaari logistics.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-black text-slate-300">
              <span className="bg-slate-800 px-3 py-1 rounded border border-slate-700 text-emerald-400">RAZORPAY VERIFIED</span>
              <span className="bg-slate-800 px-3 py-1 rounded border border-slate-700">SHIPYAARI</span>
              <span className="bg-slate-800 px-3 py-1 rounded border border-slate-700">MYBILLBOOK</span>
            </div>
          </div>
        </div>

        {/* Legal & Operations Footer */}
        <div className="text-center space-y-2 text-xs text-slate-400 font-medium">
          <p><strong className="text-white font-black tracking-wider">BAHAMUT</strong> is a Registered Trademark (TM No. 5018168, Class 25).</p>
          <p>Exclusively Marketed, Manufactured & Operated by <strong className="text-white">DE VIBE</strong>.</p>
          <p className="text-[11px] text-slate-500 pt-2 font-semibold">
            &copy; 2026 DE VIBE. All Rights Reserved. Compliant with Indian Consumer Protection (E-Commerce) Rules.
          </p>
        </div>
      </div>
    </footer>
  );
}
