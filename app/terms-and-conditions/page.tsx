import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | BahaMut by De Vibe',
  description: 'Terms and Conditions governing the use of BahaMut by De Vibe e-commerce website and services.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-levis-red" /> Terms & Conditions
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-2">
          Effective Date: August 1, 2026 | Legal Entity: De Vibe Apparel Hub, Ahmedabad, Gujarat
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">1. Acceptance of Terms</h2>
          <p className="text-slate-600 font-medium">
            Welcome to BahaMut by De Vibe (&quot;Website&quot;, &quot;bahamut.in&quot;). By accessing, browsing, or placing an order on this website, you agree to be legally bound by these Terms & Conditions. If you do not agree to these terms, please refrain from using our services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">2. Business & Merchant Information</h2>
          <p className="text-slate-600 font-medium">
            This website is owned and operated by <strong>De Vibe</strong>, an Indian apparel manufacturer and retailer registered in Ahmedabad, Gujarat.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-700 space-y-1">
            <p><strong>Merchant Name:</strong> De Vibe Apparel Fulfillment Hub</p>
            <p><strong>Registered Address:</strong> Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380015</p>
            <p><strong>Support Email:</strong> devibe70@gmail.com / support@devibe.in</p>
            <p><strong>Contact Phone:</strong> +91 79 2213 4099</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">3. Products, Pricing & Availability</h2>
          <p className="text-slate-600 font-medium">
            All prices listed on bahamut.in are in Indian Rupees (INR ₹) and are inclusive of applicable GST taxes. We reserve the right to modify prices and product availability without prior notice. Products manufactured from 100% Woven Cotton are subject to standard fabric care instructions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">4. Payment Terms & Razorpay Payment Gateway</h2>
          <p className="text-slate-600 font-medium">
            We accept payments via <strong>Razorpay Payment Gateway</strong> including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Netbanking, and Partial COD (Cash on Delivery).
          </p>
          <p className="text-slate-600 font-medium">
            For Partial COD orders, a fixed advance deposit of ₹200 is collected online via Razorpay at checkout to cover doorstep shipping validation. The remaining balance amount is collected in cash by the courier agent upon doorstep delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">5. Intellectual Property</h2>
          <p className="text-slate-600 font-medium">
            All content on bahamut.in including brand names, logos, product designs, imagery, and text are the intellectual property of De Vibe and may not be reproduced without written permission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">6. Governing Law & Jurisdiction</h2>
          <p className="text-slate-600 font-medium">
            These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
          </p>
        </section>
      </div>
    </div>
  );
}
