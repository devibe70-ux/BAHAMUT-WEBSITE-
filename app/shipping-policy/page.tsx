import React from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | BahaMut by De Vibe',
  description: 'Shipping and Delivery Policy detailing delivery timelines, partners, and charges for BahaMut by De Vibe orders.'
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <Truck className="w-8 h-8 text-devibe-red" /> Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-2">
          Effective Date: August 1, 2026 | De Vibe Ahmedabad Fulfillment Center
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">1. Delivery Timelines & Processing</h2>
          <p className="text-slate-600 font-medium">
            All orders placed on bahamut.in are processed and dispatched within <strong>24 hours</strong> from our central hub in Ahmedabad, Gujarat.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 space-y-2">
            <p>• <strong>Local Delivery (Gujarat / Ahmedabad):</strong> Delivered in <strong>1 to 2 business days</strong>.</p>
            <p>• <strong>All-India Express Shipping:</strong> Delivered in <strong>2 to 5 business days</strong> across major Indian cities and pincodes.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">2. Shipping Charges</h2>
          <p className="text-slate-600 font-medium">
            We offer <strong>FREE All-India Express Delivery</strong> on all orders. There are no hidden delivery or handling charges at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">3. Order Tracking & Courier Partners</h2>
          <p className="text-slate-600 font-medium">
            Once your order is dispatched, you will receive an AWB tracking number via SMS and email. You can track your order live anytime on our website at <Link href="/track/BM-2026-1001" className="text-blue-700 font-bold underline">Track Shipment Page</Link>.
          </p>
          <p className="text-slate-600 font-medium">
            Our official logistics partners include <strong>Shipyaari, Bluedart, Delhivery, and Xpressbees</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">4. Partial COD Deposit Shipping</h2>
          <p className="text-slate-600 font-medium">
            For Partial COD orders, paying the ₹200 advance deposit online validates your doorstep shipping address and ensures priority dispatch. The remaining balance amount is payable in cash to the courier agent upon doorstep delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">5. Contact Shipping Team</h2>
          <p className="text-slate-600 font-medium">
            If you have questions regarding shipping or delivery status, please contact our logistics desk at <strong>devibe70@gmail.com</strong> or call <strong>+91 79 2213 4099</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
