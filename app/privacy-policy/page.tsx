'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Lock className="w-8 h-8 text-[#b3001f]" /> Privacy Policy
          </h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Effective Date: August 1, 2026 | Legal Company Entity: DE VIBE, Ambawadi, Ahmedabad - 380015
          </p>
        </div>

        <div className="bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-2xl space-y-6 text-xs text-[#8b8b94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              1. Information Collection & Usage
            </h2>
            <p>
              At <strong>BahaMut</strong> (marketed, billed & sold under authorization by DE VIBE, GSTIN: 24ASHPS9777R1ZE), we respect your privacy. When you place an order on <strong>https://bahamut.in</strong>, we collect your name, shipping address, mobile number, and email address solely for order fulfillment, shipment tracking, and customer service.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              2. Data Protection & Payment Security
            </h2>
            <p>
              We do not store or process your credit card, debit card, or UPI PIN details. All financial transactions are transmitted directly over 256-bit SSL encrypted channels to PCI-DSS compliant payment gateways (Cashfree Payments).
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              3. Contact Privacy Officer
            </h2>
            <p>
              For any questions regarding your personal data, contact us at <strong>devibe70@gmail.com</strong> or call <strong>+91 79 2213 4099</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
