'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, FileText, Lock, Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050507] text-[#8b8b94] border-t border-[#26262c] pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#26262c] text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-[#8b0018]/20 text-[#b3001f] rounded-[2px] border border-[#8b0018]/40 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider">Class 25 Registered</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              BAHAMUT Trademarked Line (TM No. 5018168) engineered with heavy-gauge woven cotton textiles.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-[2px] border border-emerald-500/20 shadow-md">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider">Partial COD Available</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pay ₹200 advance deposit online; pay remaining balance at your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-[2px] border border-purple-500/20 shadow-md">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider">7-Day Fit Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Numeric & Alphabetical size assistant guide ensures pre-shrunk precision fit.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2.5">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-[2px] border border-amber-500/20 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-sm text-white uppercase tracking-wider">Operated by De Vibe</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Marketed, billed, and dispatched from Ambawadi, Ahmedabad, Gujarat - 380015.
            </p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#26262c]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-gothic text-3xl text-white tracking-wider">
                Baha<span className="text-[#b3001f]">mut</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Darkness Tailored. Mythological gothic streetwear & 100% Breathable Woven Cotton apparel from Ahmedabad mills.
            </p>
            <div className="text-xs text-slate-400 space-y-1 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b3001f] flex-shrink-0" /> De Vibe Hub, Ambawadi, Ahmedabad, Gujarat, India - 380015
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> +91 79 2213 4099 / devibe70@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-heading text-xs text-white uppercase tracking-widest mb-4">Class 25 Catalog</h5>
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
            <h5 className="font-heading text-xs text-amber-400 uppercase tracking-widest mb-4">Merchant & Legal Policies</h5>
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
            <h5 className="font-heading text-xs text-white uppercase tracking-widest mb-4">Fulfillment Partners</h5>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Razorpay Secured Gateway (UPI, Cards, NetBanking). Automated invoice sync to MyBillBook app & Shipyaari logistics.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-black text-slate-300">
              <span className="bg-[#121215] px-3 py-1 rounded-[2px] border border-[#26262c] text-emerald-400">RAZORPAY VERIFIED</span>
              <span className="bg-[#121215] px-3 py-1 rounded-[2px] border border-[#26262c]">SHIPYAARI</span>
              <span className="bg-[#121215] px-3 py-1 rounded-[2px] border border-[#26262c]">MYBILLBOOK</span>
            </div>
          </div>
        </div>

        {/* Legal & Operations Footer */}
        <div className="text-center space-y-2 text-xs text-slate-400">
          <p><strong className="text-white font-heading tracking-widest">BAHAMUT</strong> is a Registered Trademark (TM No. 5018168, Class 25).</p>
          <p>Exclusively Marketed, Manufactured & Operated by <strong className="text-white">De Vibe</strong>.</p>
          <p className="text-[11px] text-slate-500 pt-2">
            &copy; 2026 De Vibe. All Rights Reserved. Compliant with Indian Consumer Protection (E-Commerce) Rules.
          </p>
        </div>
      </div>
    </footer>
  );
}
