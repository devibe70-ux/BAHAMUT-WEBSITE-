'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ShieldCheck, AlertTriangle, Gavel } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#0a0a0b] text-[#ececed] min-h-screen pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8b8b94] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Storefront
        </Link>

        <div className="border-b border-[#26262c] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#8b0018] text-white text-[10px] font-bold px-3 py-1 rounded-[2px] uppercase tracking-widest shadow">
            <ShieldCheck className="w-3.5 h-3.5" /> TM NO. 5018168 • CLASS 25
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading text-white uppercase tracking-wider flex items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#b3001f]" /> Refund & Return Policy
          </h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Effective Date: August 1, 2026 | Legal Entity: Pooja Textile (Proprietor: Mr. Akshay Alkeshbhai Shah)
          </p>
        </div>

        <div className="bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-2xl space-y-6 text-xs text-[#8b8b94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              1. 7-Day Fit & Quality Return Guarantee
            </h2>
            <p>
              We want you to be 100% satisfied with your Class 25 Trademarked garments. You may request a size exchange or return within <strong>7 days</strong> of delivery if the item is defective, damaged, or has sizing discrepancies.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              2. Refund Processing Timeline
            </h2>
            <p>
              Approved refunds are credited back to your original payment method (Bank Account, UPI, or Card) within <strong>5 to 7 business days</strong> after the returned parcel passes inspection at our Ahmedabad warehouse.
            </p>
          </section>

          {/* Compact Indian Criminal Law Anti-Fraud Provision */}
          <section className="bg-[#1b1b20] p-5 rounded-[2px] border border-[#8b0018]/60 space-y-3">
            <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider">
              <Gavel className="w-4 h-4 text-[#b3001f]" /> STATUTORY ANTI-FRAUD LEGAL NOTICE (INDIAN PENAL LAW)
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Pooja Textile / De Vibe enforces zero tolerance against return theft, product swapping, or returning used/washed apparel. Any fraudulent refund claims or fake product returns will be prosecuted under <strong>BNS § 318 / IPC § 420 (Cheating)</strong>, <strong>BNS § 316 / IPC § 406 (Criminal Breach of Trust)</strong>, <strong>BNS § 349 (Counterfeit Goods)</strong>, and <strong>IT Act § 66D (Cyber Fraud)</strong>. All unboxing video footage (recorded under HD CCTV per Indian Evidence Act § 65B) will be submitted to the Cyber Crime Cell and local police authorities to file a formal FIR.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
