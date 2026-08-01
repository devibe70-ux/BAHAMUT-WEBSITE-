import React from 'react';
import Link from 'next/link';
import { Lock, Shield, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | BahaMut by De Vibe',
  description: 'Privacy Policy describing how BahaMut by De Vibe collects, uses, and protects customer personal information.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <Lock className="w-8 h-8 text-emerald-600" /> Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-2">
          Last Updated: August 1, 2026 | BahaMut by De Vibe
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">1. Information We Collect</h2>
          <p className="text-slate-600 font-medium">
            When you purchase apparel or interact with bahamut.in, we collect personal information necessary to process your orders and provide customer support:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
            <li>Customer Name and Contact Details (Mobile Phone Number, Email Address)</li>
            <li>Shipping Address, City, State, and 6-digit Indian PIN Code</li>
            <li>Order Details, Size Preferences, and Payment Transaction Identifiers</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">2. How Information is Used</h2>
          <p className="text-slate-600 font-medium">
            We use your personal information solely for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
            <li>Processing, fulfilling, and dispatching your apparel orders via courier partners (e.g. Shipyaari)</li>
            <li>Sending order updates, SMS/WhatsApp tracking notifications, and GST Tax Invoices</li>
            <li>Processing payments securely through Razorpay Payment Gateway</li>
            <li>Preventing fraudulent transactions and ensuring RTO (Return to Origin) verification</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">3. Payment Security & Data Protection</h2>
          <p className="text-slate-600 font-medium">
            We do NOT store or process sensitive payment card numbers, UPI PINs, or netbanking passwords on our servers. All payment transactions are encrypted using 256-bit SSL encryption and securely processed through <strong>Razorpay Payment Gateway (PCI-DSS Compliant)</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">4. Sharing Information with Third Parties</h2>
          <p className="text-slate-600 font-medium">
            We do not sell, rent, or trade your personal information. We only share necessary delivery data with authorized logistics providers (Shipyaari) and billing software (MyBillBook) to complete your order fulfillment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900">5. Contact Us</h2>
          <p className="text-slate-600 font-medium">
            If you have questions regarding our Privacy Policy or data handling, please contact our Privacy Team at <strong>devibe70@gmail.com</strong> or visit us at De Vibe, Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380015.
          </p>
        </section>
      </div>
    </div>
  );
}
