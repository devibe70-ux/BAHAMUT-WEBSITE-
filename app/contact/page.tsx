'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PhoneCall, Mail, MapPin, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <PhoneCall className="w-8 h-8 text-[#b3001f]" /> Contact Us
          </h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Registered Legal Company Entity: De Vibe (Proprietor: Mr. Akshay Alkeshbhai Shah)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registered Address Box */}
          <div className="bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-white font-heading text-sm border-b border-[#26262c] pb-3 uppercase">
              <MapPin className="w-5 h-5 text-[#b3001f]" /> Registered Address & Hub
            </div>
            <div className="text-xs text-[#8b8b94] space-y-1 font-medium">
              <p className="font-bold text-white">De Vibe Apparel Hub</p>
              <p>69, Sindhi Cloth Market, Revdi Bazar, Kalupur</p>
              <p>Ahmedabad, Gujarat, India — PIN: 380015</p>
              <p className="text-[11px] text-amber-400 pt-1 font-bold">Trade Mark No: 5018168 (Class 25)</p>
            </div>

            <div className="pt-3 border-t border-[#26262c] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>devibe70@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>+91 79 2213 4099</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-xl space-y-4">
            <h3 className="font-heading text-sm text-white uppercase border-b border-[#26262c] pb-3">
              Send Support Query
            </h3>

            {submitted ? (
              <div className="bg-[#1b1b20] p-6 text-center space-y-2 border border-emerald-800 rounded-[2px]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-heading text-sm text-white">Message Received</h4>
                <p className="text-xs text-[#8b8b94]">Our support team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full min-h-[44px] px-3.5 bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email Address"
                  className="w-full min-h-[44px] px-3.5 bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="How can we assist you with your order?"
                  className="w-full p-3 bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full min-h-[44px] bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-wider rounded-[2px] shadow-lg flex items-center justify-center gap-2 transition-all glow-crimson"
                >
                  <Send className="w-4 h-4" /> Submit Query
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
