import React from 'react';
import Link from 'next/link';
import { Mail, PhoneCall, MapPin, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | BahaMut by De Vibe',
  description: 'Contact details, business address, support phone, and email for De Vibe Apparel Fulfillment Hub in Ahmedabad.'
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8 text-slate-800">
      <div className="border-b border-slate-200 pb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
          <PhoneCall className="w-8 h-8 text-emerald-600" /> Contact Us
        </h1>
        <p className="text-xs text-slate-500 font-bold mt-2">
          De Vibe Apparel Hub — Direct Manufacturer Support Desk
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-slate-900 font-black text-base border-b border-slate-100 pb-3">
            <MapPin className="w-5 h-5 text-levis-red" /> Merchant Registered Physical Address
          </div>
          <div className="text-xs text-slate-600 space-y-1 font-medium">
            <p className="font-bold text-slate-900">De Vibe Apparel Fulfillment Hub</p>
            <p>Revdi Bazar, Kalupur</p>
            <p>Ahmedabad, Gujarat - 380015</p>
            <p>India</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-slate-900 font-black text-base border-b border-slate-100 pb-3">
            <Mail className="w-5 h-5 text-blue-600" /> Customer Support Desk
          </div>
          <div className="text-xs text-slate-600 space-y-2 font-medium">
            <p className="flex items-center gap-2">
              <strong className="text-slate-900">Official Email:</strong> devibe70@gmail.com / support@devibe.in
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-slate-900">Helpline Phone:</strong> +91 79 2213 4099
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-slate-900">Support Hours:</strong> Monday – Saturday (10:00 AM – 7:30 PM IST)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
        <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Merchant Legal Details & Regulatory Compliance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-bold text-[10px]">LEGAL ENTITY</span>
            <span className="font-black text-slate-900">De Vibe</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-bold text-[10px]">WEBSITE DOMAIN</span>
            <span className="font-black text-slate-900">https://bahamut.in</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block font-bold text-[10px]">PAYMENT GATEWAY</span>
            <span className="font-black text-slate-900">Razorpay Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
