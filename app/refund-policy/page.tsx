import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Refund, Return & Cancellation Policy | BahaMut by De Vibe',
  description: 'Refund, Return and Cancellation Policy for BahaMut by De Vibe e-commerce store.'
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
        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">1. 7-Day Easy Return & Size Exchange Policy</h2>
          <p className="text-slate-600 font-medium">
            At BahaMut by De Vibe, customer satisfaction is our highest priority. If you are not completely satisfied with the fitting, size, or quality of your 100% Woven Cotton apparel item, you may request a return or size exchange within <strong>7 days of delivery</strong>.
          </p>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-900 space-y-1">
            <p className="flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Return Condition Requirements:
            </p>
            <p>• Items must be unused, unwashed, unworn, and in original brand condition with tags attached.</p>
            <p>• Returns due to wrong size will receive free size exchange (Numeric 38–46 or 28–38).</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">2. Cancellation Policy</h2>
          <p className="text-slate-600 font-medium">
            Orders can be cancelled free of charge before the order is dispatched from our Ahmedabad fulfillment center.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
            <li><strong>Pre-Dispatch Cancellation:</strong> Full 100% refund initiated immediately to your original payment method.</li>
            <li><strong>Post-Dispatch Cancellation:</strong> If cancelled after shipping, return shipping fees may apply.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">3. Refund Processing Timelines</h2>
          <p className="text-slate-600 font-medium">
            Once a returned item is received and inspected at our Ahmedabad hub:
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 space-y-2">
            <p>• <strong>Prepaid / Razorpay Refunds:</strong> Refunds are processed back to the original source account (UPI, Credit Card, Debit Card, Netbanking) within <strong>5 to 7 business days</strong>.</p>
            <p>• <strong>Partial COD Refunds:</strong> For Cash on Delivery returns, refunds are credited directly to your bank account via UPI / NEFT within <strong>5 to 7 business days</strong> after bank detail verification.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">4. Damaged or Defective Items</h2>
          <p className="text-slate-600 font-medium">
            In the rare event that you receive a damaged, defective, or incorrect item, please email us at <strong>devibe70@gmail.com</strong> or call <strong>+91 79 2213 4099</strong> within 48 hours of delivery. We will arrange a free reverse pickup and dispatch a replacement immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">5. How to Initiate a Return or Refund</h2>
          <p className="text-slate-600 font-medium">
            To initiate a return or exchange:
          </p>
          <p className="text-slate-600 font-medium">
            Email us at <strong>devibe70@gmail.com</strong> with your Order Number (e.g. `BM-2026-1001`) and reason for return. Our support team will assist you within 24 hours.
          </p>
        </section>
      </div>
    </div>
  );
}
