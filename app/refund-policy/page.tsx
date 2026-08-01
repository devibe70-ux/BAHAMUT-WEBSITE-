import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, CheckCircle2, ShieldAlert, AlertTriangle, Scale } from 'lucide-react';

export const metadata = {
  title: 'Refund, Return & Cancellation Policy | BahaMut by De Vibe',
  description: 'Refund, Return and Cancellation Policy including anti-fraud and anti-tampering terms for BahaMut by De Vibe.'
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-600" /> Refund, Return & Cancellation Policy
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-2">
          Effective Date: August 1, 2026 | De Vibe Ahmedabad Mill Direct Store
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        {/* Anti-Fraud Legal Alert Banner */}
        <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-300 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-rose-900 font-black text-base">
            <ShieldAlert className="w-6 h-6 text-rose-600 flex-shrink-0" />
            STRICT ZERO-TOLERANCE ANTI-FRAUD & RETURN INTEGRITY NOTICE
          </div>
          <p className="text-xs text-rose-900 font-bold leading-relaxed">
            All returned parcels undergo 3-tier inspection and unboxing video verification at our central hub in Ahmedabad. Returning used items, altered garments, counterfeit products, or swapped items is strictly prohibited and constitutes criminal offence under Indian Law.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">1. 7-Day Return & Size Exchange Eligibility</h2>
          <p className="text-slate-600 font-medium">
            At BahaMut by De Vibe, we accept returns or size exchanges within <strong>7 days of delivery</strong>, provided all strict condition guidelines are met.
          </p>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-900 space-y-1">
            <p className="flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mandatory Eligibility Conditions:
            </p>
            <p>• Items must be 100% brand new, unwashed, unworn, and un-ironed.</p>
            <p>• All original De Vibe brand tags, size labels, resin buttons, and packaging must be intact.</p>
            <p>• Returns due to fitting issues receive free size exchange (Numeric 38–46 or 28–38 / Tees S–XXL).</p>
          </div>
        </section>

        {/* User-Requested Used Product & Fake Product Terms */}
        <section className="space-y-3 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> 2. Strict No-Refund Policy for Used & Fake Products
          </h2>

          <div className="space-y-3 text-xs text-slate-300 font-medium leading-relaxed">
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
              <h3 className="font-black text-amber-300 text-sm mb-1">A. Used, Worn, or Damaged Items = NO REFUND</h3>
              <p>
                If an item returned by a customer shows any signs of wear, usage, washing, body odor, perfume scents, stains, fabric alteration, or removed brand tags during quality control inspection, <strong>STRICTLY NO REFUND OR EXCHANGE WILL BE ISSUED</strong>. The damaged/used item will be rejected and re-shipped back to the buyer at the buyer&apos;s expense.
              </p>
            </div>

            <div className="bg-rose-950/80 p-4 rounded-2xl border border-rose-800/80">
              <h3 className="font-black text-rose-300 text-sm mb-1 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-rose-400" /> B. Counterfeit / Fake Product Swaps = NO REFUND & IMMEDIATE LEGAL ACTION
              </h3>
              <p className="text-rose-100">
                Attempting to return a non-De Vibe product, fake product, counterfeit item, or empty parcel in place of the original purchased apparel is a punishable crime. If a customer attempts a fraudulent return or product swap:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-rose-200 font-bold">
                <li>Zero refund will be issued under any circumstances.</li>
                <li>The buyer&apos;s account, phone number, and delivery address will be permanently blacklisted across all Indian logistics networks.</li>
                <li><strong>LEGAL PROSECUTION NOTICE:</strong> De Vibe will immediately file a criminal police complaint (FIR) under IPC Sections 415/420 (Cheating & Fraud) and Information Technology Act with the Cyber Crime Cell and local authorities against the perpetrator.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">3. Cancellation Policy</h2>
          <p className="text-slate-600 font-medium">
            Orders can be cancelled free of charge before dispatch from our Ahmedabad fulfillment center.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
            <li><strong>Pre-Dispatch Cancellation:</strong> Full 100% refund initiated immediately to your original payment method.</li>
            <li><strong>Post-Dispatch Cancellation:</strong> Return freight charges may be deducted.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">4. Refund Processing Timelines</h2>
          <p className="text-slate-600 font-medium">
            Once a verified return passes inspection at our Ahmedabad hub:
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 space-y-2">
            <p>• <strong>Prepaid / Razorpay Refunds:</strong> Refunds are processed back to the original source account (UPI, Credit Card, Debit Card, Netbanking) within <strong>5 to 7 business days</strong>.</p>
            <p>• <strong>Partial COD Refunds:</strong> COD refunds are credited directly to your bank account via UPI / NEFT within <strong>5 to 7 business days</strong>.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">5. How to Request Return or Exchange</h2>
          <p className="text-slate-600 font-medium">
            Email us at <strong>devibe70@gmail.com</strong> with your Order Number (e.g. `BM-2026-1001`) and unboxing photos/videos. Our team will process eligible requests within 24 hours.
          </p>
        </section>
      </div>
    </div>
  );
}
