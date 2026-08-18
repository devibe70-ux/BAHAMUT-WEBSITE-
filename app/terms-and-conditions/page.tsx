'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, ShieldCheck, MapPin, Gavel } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
            <FileText className="w-8 h-8 text-[#b3001f]" /> Terms & Conditions
          </h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Effective Date: August 1, 2026 | Legal Operating Entity: De Vibe (Proprietor: Mr. Akshay Alkeshbhai Shah)
          </p>
        </div>

        <div className="bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] shadow-2xl space-y-6 text-xs text-[#8b8b94] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider flex items-center gap-2">
              1. Official Trademark & Business Disclosures
            </h2>
            <p>
              Welcome to <strong>https://bahamut.in</strong>. This e-commerce website is owned and operated by <strong>De Vibe</strong> (Proprietor: Mr. Akshay Alkeshbhai Shah).
            </p>
            <p>
              <strong>BAHAMUT</strong> is a legally registered Trademark under the Trade Marks Act, 1999 (Government of India, Trade Mark No. <strong>5018168</strong>, Certificate No. <strong>2877734</strong>, J. No. 2009, Class 25 in respect of Readymade Garments).
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              2. Registered Address & Physical Operations Hub
            </h2>
            <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#26262c] text-slate-300">
              <p className="font-bold text-white">De Vibe Apparel Hub</p>
              <p>Ambawadi, Ahmedabad, Gujarat, India - 380015</p>
              <p className="mt-1 text-[11px] text-[#8b8b94]">Support Email: devibe70@gmail.com | Phone: +91 79 2213 4099</p>
            </div>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              3. Orders & Payment Processing
            </h2>
            <p>
              All online payments are securely processed through Razorpay Payments. We offer full prepaid checkout (with 5% instant discount) and Partial COD checkout (where a ₹200 advance deposit is paid online and the remaining balance is paid cash at doorstep).
            </p>
          </section>

          <section className="space-y-2 border-t border-[#26262c] pt-4">
            <h2 className="font-heading text-sm text-white uppercase tracking-wider">
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with the use of this website shall be subject to the exclusive jurisdiction of the Courts at Ahmedabad, Gujarat.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
