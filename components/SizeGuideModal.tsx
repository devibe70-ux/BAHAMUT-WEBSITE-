'use client';

import React, { useState, useEffect } from 'react';
import { X, Ruler, CheckCircle2, Shield } from 'lucide-react';
import { ProductCategory } from '@/lib/types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ProductCategory;
}

export default function SizeGuideModal({ isOpen, onClose, initialCategory }: SizeGuideModalProps) {
  const [tab, setTab] = useState<'SHIRT' | 'BOTTOMWEAR' | 'TEE'>('SHIRT');

  useEffect(() => {
    if (initialCategory) {
      setTab(initialCategory);
    }
  }, [initialCategory, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in font-sans"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-levis-red text-white rounded-xl">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Official De Vibe Fit & Size Assistant</h2>
              <p className="text-xs text-slate-400 font-semibold">
                Numeric sizing for Shirts & Bottomwear • Alphabetical sizing for Tees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-all border border-slate-700"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 space-y-6">
          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setTab('SHIRT')}
              className={`py-2.5 px-3 text-xs font-black rounded-xl transition-all ${
                tab === 'SHIRT'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Shirts (Numeric 38–46)
            </button>

            <button
              onClick={() => setTab('BOTTOMWEAR')}
              className={`py-2.5 px-3 text-xs font-black rounded-xl transition-all ${
                tab === 'BOTTOMWEAR'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Bottomwear (Numeric 28–38)
            </button>

            <button
              onClick={() => setTab('TEE')}
              className={`py-2.5 px-3 text-xs font-black rounded-xl transition-all ${
                tab === 'TEE'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              T-Shirts (Alphabetical S–XXL)
            </button>
          </div>

          {/* Sizing Tables */}
          {tab === 'SHIRT' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Numeric Shirt Sizing (Indian Standard Collar/Chest)</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-black">100% Woven Cotton</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left text-slate-800">
                  <thead className="bg-slate-50 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Numeric Size</th>
                      <th className="px-4 py-3">Chest (Inches)</th>
                      <th className="px-4 py-3">Collar (Inches)</th>
                      <th className="px-4 py-3">Shoulder (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr><td className="px-4 py-3 font-black text-slate-900">38</td><td className="px-4 py-3">38" - 39"</td><td className="px-4 py-3">15.0"</td><td className="px-4 py-3">17.5"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">40</td><td className="px-4 py-3">40" - 41"</td><td className="px-4 py-3">15.5"</td><td className="px-4 py-3">18.0"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">42</td><td className="px-4 py-3">42" - 43"</td><td className="px-4 py-3">16.0"</td><td className="px-4 py-3">18.5"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">46</td><td className="px-4 py-3">46" - 47"</td><td className="px-4 py-3">17.0"</td><td className="px-4 py-3">19.5"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'BOTTOMWEAR' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Numeric Bottomwear Sizing (Chinos & Denim Waist)</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-black">Pre-Shrunk Denim/Twill</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left text-slate-800">
                  <thead className="bg-slate-50 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Waist Size</th>
                      <th className="px-4 py-3">Waist (Inches)</th>
                      <th className="px-4 py-3">Hip (Inches)</th>
                      <th className="px-4 py-3">Inseam Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr><td className="px-4 py-3 font-black text-slate-900">28</td><td className="px-4 py-3">28" - 29"</td><td className="px-4 py-3">36"</td><td className="px-4 py-3">32"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">30</td><td className="px-4 py-3">30" - 31"</td><td className="px-4 py-3">38"</td><td className="px-4 py-3">32"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">32</td><td className="px-4 py-3">32" - 33"</td><td className="px-4 py-3">40"</td><td className="px-4 py-3">32"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">34</td><td className="px-4 py-3">34" - 35"</td><td className="px-4 py-3">42"</td><td className="px-4 py-3">32"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">36</td><td className="px-4 py-3">36" - 37"</td><td className="px-4 py-3">44"</td><td className="px-4 py-3">32"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">38</td><td className="px-4 py-3">38" - 39"</td><td className="px-4 py-3">46"</td><td className="px-4 py-3">32"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'TEE' && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Alphabetical T-Shirt Sizing (S, M, L, XL, XXL)</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-black">Heavyweight 220 GSM</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-xs text-left text-slate-800">
                  <thead className="bg-slate-50 text-slate-900 font-black uppercase text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Alphabetical Size</th>
                      <th className="px-4 py-3">Chest (Inches)</th>
                      <th className="px-4 py-3">Body Length</th>
                      <th className="px-4 py-3">Sleeve Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    <tr><td className="px-4 py-3 font-black text-slate-900">S</td><td className="px-4 py-3">36" - 38"</td><td className="px-4 py-3">27.0"</td><td className="px-4 py-3">8.5"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">M</td><td className="px-4 py-3">38" - 40"</td><td className="px-4 py-3">28.0"</td><td className="px-4 py-3">9.0"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">L</td><td className="px-4 py-3">40" - 42"</td><td className="px-4 py-3">29.0"</td><td className="px-4 py-3">9.5"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">XL</td><td className="px-4 py-3">42" - 44"</td><td className="px-4 py-3">30.0"</td><td className="px-4 py-3">10.0"</td></tr>
                    <tr><td className="px-4 py-3 font-black text-slate-900">XXL</td><td className="px-4 py-3">44" - 46"</td><td className="px-4 py-3">31.0"</td><td className="px-4 py-3">10.5"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guarantee Note */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Pre-shrunk at Ahmedabad mills to ensure 100% size retention after washing.</span>
            </div>

            {/* Bottom Close Button */}
            <button
              onClick={onClose}
              className="min-h-[40px] px-5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center gap-1.5 transition-all flex-shrink-0"
            >
              <X className="w-4 h-4" /> Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
