'use client';

import React from 'react';
import { Truck, ShieldCheck, Tag, Flame } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#0F172A] text-slate-100 text-xs py-2.5 px-4 font-sans border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
          <span className="bg-devibe-red text-white px-2.5 py-0.5 rounded text-[10px] uppercase font-black tracking-widest flex items-center gap-1 shadow-sm">
            <Flame className="w-3 h-3 text-yellow-300" /> DIRECT MANUFACTURER
          </span>
          <span className="font-extrabold text-slate-200 text-[11px] sm:text-xs">
            100% Breathable Woven Cotton • Ahmedabad Textile Hub
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-slate-300 text-xs font-bold">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-400" /> All-India Express Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-400" /> ₹200 Partial COD Deposit
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Fit Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
