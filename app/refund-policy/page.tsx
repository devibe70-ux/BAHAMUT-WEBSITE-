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

        {/* User-Requested Exact Statutory Indian Legal Clauses Banner */}
        <section className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-rose-600 space-y-5 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Gavel className="w-8 h-8 text-rose-500 flex-shrink-0" />
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
                STATUTORY CRIMINAL CLAUSES & LEGAL PENALTIES (INDIAN PENAL LAW)
              </h2>
              <p className="text-xs text-rose-400 font-bold">
                Explicit Statutory Warning for Return Fraud, Swapping & Used Apparel Theft
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            De Vibe enforces zero tolerance against e-commerce return fraud. Any customer attempting to swap products, return used/washed apparel, return fake/counterfeit items, or claim fraudulent refunds will be prosecuted under the following statutory provisions of Indian Law:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Clause 1: BNS Section 318 / IPC 420 */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-rose-900/50 space-y-1.5">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                BNS § 318 / IPC § 420
              </span>
              <h3 className="font-black text-rose-300 text-sm">Cheating & Dishonest Inducement</h3>
              <p className="text-slate-300 font-medium leading-normal">
                Inducing De Vibe to process a refund by deceit, fake return, or product swap is a non-bailable cognizable offence.
              </p>
              <p className="text-amber-400 font-bold text-[11px]">
                ⚖️ Penalty: Imprisonment up to 7 Years + Heavy Monetary Fine.
              </p>
            </div>

            {/* Clause 2: BNS Section 316 / IPC 406 */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-rose-900/50 space-y-1.5">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                BNS § 316 / IPC § 406
              </span>
              <h3 className="font-black text-rose-300 text-sm">Criminal Breach of Trust</h3>
              <p className="text-slate-300 font-medium leading-normal">
                Misappropriating or withholding original goods delivered for inspection and returning empty or fake packages.
              </p>
              <p className="text-amber-400 font-bold text-[11px]">
                ⚖️ Penalty: Imprisonment up to 5 Years + Fine.
              </p>
            </div>

            {/* Clause 3: BNS Section 349 */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-rose-900/50 space-y-1.5">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                BNS § 349
              </span>
              <h3 className="font-black text-rose-300 text-sm">Selling / Swapping Counterfeit Goods</h3>
              <p className="text-slate-300 font-medium leading-normal">
                Returning counterfeit, fake, or non-De Vibe branded merchandise in place of original mill cotton items.
              </p>
              <p className="text-amber-400 font-bold text-[11px]">
                ⚖️ Penalty: Imprisonment up to 3 Years + Fine.
              </p>
            </div>

            {/* Clause 4: IT Act Section 66D */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-rose-900/50 space-y-1.5">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                IT ACT § 66D
              </span>
              <h3 className="font-black text-rose-300 text-sm">Cyber Cheating by Personation</h3>
              <p className="text-slate-300 font-medium leading-normal">
                Using digital computer networks or online payment gateways to commit online return fraud or identity spoofing.
              </p>
              <p className="text-amber-400 font-bold text-[11px]">
                ⚖️ Penalty: Imprisonment up to 3 Years + ₹1,00,000 Fine.
              </p>
            </div>
          </div>

          <div className="bg-rose-950/80 p-4 rounded-2xl border border-rose-800 text-xs text-rose-200 space-y-2 font-medium">
            <p className="flex items-center gap-1.5 font-bold text-rose-100 text-sm">
              <Video className="w-4 h-4 text-rose-400" /> Digital Forensic Evidence Protocol (Indian Evidence Act § 65B):
            </p>
            <p>
              Every returned parcel unboxing is recorded under HD CCTV with AWB tracking barcode matching. In cases of return theft or product swapping, unboxing video footage, IP addresses, phone records, and shipping manifests will be submitted directly to the <strong>National Cyber Crime Reporting Portal (cybercrime.gov.in)</strong> and the <strong>Ahmedabad Police Station</strong> to file a formal FIR.
            </p>
          </div>
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
