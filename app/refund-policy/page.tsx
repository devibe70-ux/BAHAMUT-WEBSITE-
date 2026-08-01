import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, CheckCircle2, ShieldAlert, AlertTriangle, Scale, Gavel, Video } from 'lucide-react';

export const metadata = {
  title: 'Refund, Return & Cancellation Policy | BahaMut by De Vibe',
  description: 'Refund, Return and Cancellation Policy including statutory Indian Criminal Law provisions (BNS 318, 316, 349 & IT Act 66D).'
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
            All returned parcels undergo mandatory 3-tier HD CCTV unboxing video recording at our central hub in Ahmedabad (`380015`). Returning used items, altered garments, counterfeit products, or swapped items is strictly prohibited and constitutes criminal offences under Indian Law.
          </p>
        </div>

        {/* Compact Statutory Legal Notice */}
        <section className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
            <Gavel className="w-4 h-4 text-rose-500" /> STATUTORY LEGAL NOTICE (INDIAN PENAL LAW)
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            De Vibe enforces zero tolerance against return theft, product swapping, or returning used/washed apparel. Any fraudulent refund claims or fake product returns will be prosecuted under <strong>BNS § 318 / IPC § 420 (Cheating)</strong>, <strong>BNS § 316 / IPC § 406 (Criminal Breach of Trust)</strong>, <strong>BNS § 349 (Counterfeit Goods)</strong>, and <strong>IT Act § 66D (Cyber Fraud)</strong>. All unboxing video footage (recorded under HD CCTV per Indian Evidence Act § 65B) will be submitted to the Cyber Crime Cell and local police authorities to file a formal FIR.
          </p>
        </section>

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

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">2. Strictly No Refund for Used Products</h2>
          <p className="text-slate-600 font-medium">
            If an item returned shows any signs of wear, usage, washing, perfume scents, stains, fabric alteration, or removed brand tags during quality control inspection, <strong>STRICTLY NO REFUND OR EXCHANGE WILL BE ISSUED</strong>. The used item will be rejected and re-shipped back to the buyer at the buyer&apos;s expense.
          </p>
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
