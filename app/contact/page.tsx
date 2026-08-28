'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PhoneCall, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare, Navigation } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F7F7F8] text-[#111111] min-h-screen pb-24 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#666666] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Storefront
        </Link>

        {/* Header Title Section */}
        <div className="border-b border-[#E5E5E5] pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TM NO. 5018168 • CLASS 25
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-3">
            <PhoneCall className="w-8 h-8 text-[#111111]" /> Contact & Local Hub
          </h1>
          <p className="text-xs text-[#666666] font-semibold">
            Registered Legal Merchant: <strong>DE VIBE</strong> (GSTIN: <strong>24ASHPS9777R1ZE</strong>) • Ambawadi, Ahmedabad, Gujarat - 380015
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Registered Factory / Office Details Box */}
          <div className="bg-white p-6 border border-[#E5E5E5] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#111111] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#111111]" /> Official Merchant Hub
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                VERIFIED GSTIN
              </span>
            </div>

            <div className="text-xs text-[#666666] space-y-1.5">
              <p className="font-extrabold text-sm text-[#111111]">DE VIBE</p>
              <p className="font-medium">Ambawadi, Ahmedabad, Gujarat, India - 380015</p>
              <p className="text-[11px] font-bold text-neutral-800">GSTIN: 24ASHPS9777R1ZE (State Code: 24 Gujarat)</p>
              <p className="text-[11px] font-bold text-neutral-800">Trade Mark No: 5018168 (BahaMut Class 25)</p>
            </div>

            <div className="pt-3 border-t border-[#E5E5E5] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#111111]">
                <Clock className="w-4 h-4 text-[#666666]" />
                <span className="font-semibold">Business Hours: Mon – Sat (9:00 AM – 8:00 PM IST)</span>
              </div>
              <div className="flex items-center gap-2 text-[#111111]">
                <Mail className="w-4 h-4 text-[#666666]" />
                <a href="mailto:devibe70@gmail.com" className="font-bold underline hover:text-black">
                  devibe70@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#111111]">
                <PhoneCall className="w-4 h-4 text-[#666666]" />
                <a href="tel:+919727024519" className="font-bold underline hover:text-black">
                  +91 97270 24519
                </a>
              </div>
            </div>

            {/* Direct Google Maps & WhatsApp Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Ambawadi,+Ahmedabad,+Gujarat+380015"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[42px] px-4 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" /> View on Google Maps
              </a>
              <a
                href="https://wa.me/919727024519?text=Hello%20DE%20VIBE%20BahaMut%2C%20I%20have%20an%20inquiry%20regarding%20denim%20jeans."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[42px] px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" /> WhatsApp Support
              </a>
            </div>
          </div>

          {/* Direct Support Message Box */}
          <div className="bg-white p-6 border border-[#E5E5E5] shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-[#111111] uppercase tracking-wider border-b border-[#E5E5E5] pb-3">
              Send Support or Order Query
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 p-6 text-center space-y-2 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-[#111111]">Query Submitted Successfully</h4>
                <p className="text-xs text-[#666666]">Our Ahmedabad support team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-[#111111] uppercase mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full min-h-[42px] px-3.5 bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#111111] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full min-h-[42px] px-3.5 bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#111111] uppercase mb-1">Message / Order Query</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can we assist you with your order, sizing, or delivery?"
                    className="w-full p-3 bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full min-h-[44px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
                >
                  <Send className="w-4 h-4" /> Send Direct Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
