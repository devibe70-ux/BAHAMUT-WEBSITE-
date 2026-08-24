'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ShieldCheck, Truck, RefreshCw, PhoneCall, Mail, FileText, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-neutral-400 border-t border-neutral-800 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <ShieldCheck className="w-6 h-6 text-white" />
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Class 25 Registered</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              BahaMut Trademarked Line (TM No. 5018168) engineered with woven cotton textiles.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2">
            <Truck className="w-6 h-6 text-white" />
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Partial COD Available</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Pay ₹200 advance deposit online; pay remaining balance at your doorstep.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2">
            <RefreshCw className="w-6 h-6 text-white" />
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">7-Day Fit Guarantee</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Numeric & Alphabetical size guide ensures pre-shrunk precision fit.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-2">
            <MapPin className="w-6 h-6 text-white" />
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Billed by DEVIBE</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              GSTIN: 24ASHPS9777R1ZE. Dispatched from Ambawadi, Ahmedabad, Gujarat, India - 380015.
            </p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-gothic text-3xl font-normal text-white tracking-wider">
                BahaMut
              </span>
              <span className="text-xs font-bold text-neutral-400 uppercase">
                BY DEVIBE
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel from Ambawadi, Ahmedabad.
            </p>
            <div className="text-xs text-neutral-300 space-y-1 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white flex-shrink-0" /> DE VIBE, Ambawadi, Ahmedabad, Gujarat - 380015
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-white flex-shrink-0" /> +91 79 2213 4099 / devibe70@gmail.com
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4">Class 25 Catalog</h5>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-medium">
              <li>
                <Link href="/catalog?cat=SHIRT" className="hover:text-white transition-colors">
                  Woven Cotton Shirts (Numeric 38–46)
                </Link>
              </li>
              <li>
                <Link href="/catalog?cat=BOTTOMWEAR" className="hover:text-white transition-colors">
                  Chino Trousers & Denim (Numeric 28–36)
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
            <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4">Merchant & Legal Policies</h5>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-medium">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" /> Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" /> Contact Us & Office Address
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4">Fulfillment & Payment Partners</h5>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              Cashfree Payment Gateway (UPI, GPay, PhonePe, Cards, NetBanking). Direct invoice sync with myBillBook inventory database under DEVIBE (GSTIN: 24ASHPS9777R1ZE).
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-neutral-300">
              <span className="bg-neutral-900 px-3 py-1 border border-neutral-800 text-white">CASHFREE PAYMENTS</span>
              <span className="bg-neutral-900 px-3 py-1 border border-neutral-800">MYBILLBOOK DB</span>
              <span className="bg-neutral-900 px-3 py-1 border border-neutral-800">5% STATUTORY GST</span>
            </div>
          </div>
        </div>

        {/* Legal & Operations Footer */}
        <div className="text-center space-y-1.5 text-xs text-neutral-400 font-medium">
          <p><strong className="font-gothic text-base text-white font-normal">BahaMut</strong> is a Registered Trademark (TM No. 5018168, Class 25).</p>
          <p>Exclusively Marketed, Billed & Sold under authorization by <strong className="text-white">DEVIBE</strong> (GSTIN: 24ASHPS9777R1ZE).</p>
          <p className="text-[11px] text-neutral-500 pt-2">
            &copy; 2026 DEVIBE. All Rights Reserved. Statutory 5% GST Apparel Compliance (HSN 6203 / 6109).
          </p>
        </div>
      </div>
    </footer>
  );
}
