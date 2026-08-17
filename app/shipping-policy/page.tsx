'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck } from 'lucide-react';

export default function ShippingPolicyPage() {
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
            <Truck className="w-8 h-8 text-[#b3001f]" /> Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Effective Date: August 1, 2026 | Fulfillment Hub: De Vibe, Ahmedabad - 380015
          </p>
        </div>

        <div className="bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-2xl space-y-6 text-xs text-[#8b8b94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              1. Order Dispatch & Delivery Timelines
            </h2>
            <p>
              All orders placed on <strong>https://bahamut.in</strong> are dispatched within <strong>24 hours</strong> from our registered Ahmedabad hub. Delivery timelines across metro cities range between <strong>2 to 4 business days</strong>, and <strong>3 to 5 business days</strong> for rest of India.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              2. Shipping Charges & Partial COD
            </h2>
            <p>
              We offer <strong>FREE Express Shipping</strong> on all prepaid and Partial COD orders. For Partial COD, a ₹200 advance deposit is collected online, and the remaining balance is collected in cash by our logistics partner (Shipyaari / Blue Dart) at your doorstep.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
