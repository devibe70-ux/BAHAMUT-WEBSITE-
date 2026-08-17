'use client';

import React, { useState } from 'react';
import { X, Ruler, Check, ShieldCheck } from 'lucide-react';
import { Category } from '@/lib/types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: Category;
}

export default function SizeGuideModal({
  isOpen,
  onClose,
  initialCategory = 'SHIRT',
}: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'SHIRT' | 'BOTTOMWEAR' | 'TEE'>(
    initialCategory === 'BOTTOMWEAR'
      ? 'BOTTOMWEAR'
      : initialCategory === 'TEE'
      ? 'TEE'
      : 'SHIRT'
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#121215] w-full max-w-2xl rounded-[4px] border border-[#8b0018] shadow-2xl overflow-hidden space-y-0 max-h-[85vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#0a0a0b] text-white flex items-center justify-between border-b border-[#26262c] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#8b0018] text-white rounded-[2px] flex-shrink-0 glow-crimson">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg text-white">Size Assistant Guide</h3>
                <span className="bg-[#8b0018] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                  Class 25 Standard
                </span>
              </div>
              <p className="text-xs text-[#8b8b94]">
                Pre-shrunk 100% Woven Cotton fit matrix engineered at Ahmedabad mills
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="min-h-[44px] px-4 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs rounded-[2px] shadow-lg flex items-center gap-2 transition-all"
            aria-label="Close size guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#26262c] bg-[#0a0a0b] shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('SHIRT')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'SHIRT'
                ? 'border-[#8b0018] text-white bg-[#121215]'
                : 'border-transparent text-[#8b8b94] hover:text-slate-200'
            }`}
          >
            👔 Shirts (38–46)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('BOTTOMWEAR')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'BOTTOMWEAR'
                ? 'border-[#8b0018] text-white bg-[#121215]'
                : 'border-transparent text-[#8b8b94] hover:text-slate-200'
            }`}
          >
            👖 Bottomwear (28–38)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('TEE')}
            className={`flex-1 py-3 px-4 text-xs font-heading tracking-wider uppercase border-b-2 transition-all ${
              activeTab === 'TEE'
                ? 'border-[#8b0018] text-white bg-[#121215]'
                : 'border-transparent text-[#8b8b94] hover:text-slate-200'
            }`}
          >
            👕 Tees (S–XXL)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#ececed]">
          {activeTab === 'SHIRT' && (
            <div className="space-y-4">
              <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#26262c] flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider">Shirt Sizing Standard</span>
                <span className="text-[11px] font-extrabold text-[#b3001f] bg-[#8b0018]/20 px-2 py-0.5 rounded border border-[#8b0018]/40">
                  Indian Collar / Chest (38 to 46)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#26262c] text-white font-heading">
                      <th className="py-2.5 px-3">Numeric Size</th>
                      <th className="py-2.5 px-3">Collar (Inches)</th>
                      <th className="py-2.5 px-3">Chest (Inches)</th>
                      <th className="py-2.5 px-3">Shoulder (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26262c] text-[#8b8b94]">
                    <tr><td className="py-2 px-3 font-bold text-white">38 (M)</td><td className="py-2 px-3">15.0"</td><td className="py-2 px-3">40.0"</td><td className="py-2 px-3">17.5"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">40 (L)</td><td className="py-2 px-3">15.5"</td><td className="py-2 px-3">42.0"</td><td className="py-2 px-3">18.25"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">42 (XL)</td><td className="py-2 px-3">16.0"</td><td className="py-2 px-3">44.0"</td><td className="py-2 px-3">19.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">44 (XXL)</td><td className="py-2 px-3">16.5"</td><td className="py-2 px-3">46.0"</td><td className="py-2 px-3">19.75"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">46 (3XL)</td><td className="py-2 px-3">17.0"</td><td className="py-2 px-3">48.0"</td><td className="py-2 px-3">20.5"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'BOTTOMWEAR' && (
            <div className="space-y-4">
              <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#26262c] flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider">Bottomwear Waist Matrix</span>
                <span className="text-[11px] font-extrabold text-[#b3001f] bg-[#8b0018]/20 px-2 py-0.5 rounded border border-[#8b0018]/40">
                  Numeric Waist Size (28 to 38)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#26262c] text-white font-heading">
                      <th className="py-2.5 px-3">Numeric Waist</th>
                      <th className="py-2.5 px-3">Waist (Inches)</th>
                      <th className="py-2.5 px-3">Hip (Inches)</th>
                      <th className="py-2.5 px-3">Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26262c] text-[#8b8b94]">
                    <tr><td className="py-2 px-3 font-bold text-white">28</td><td className="py-2 px-3">28.0"</td><td className="py-2 px-3">36.0"</td><td className="py-2 px-3">41.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">30</td><td className="py-2 px-3">30.0"</td><td className="py-2 px-3">38.0"</td><td className="py-2 px-3">41.5"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">32</td><td className="py-2 px-3">32.0"</td><td className="py-2 px-3">40.0"</td><td className="py-2 px-3">42.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">34</td><td className="py-2 px-3">34.0"</td><td className="py-2 px-3">42.0"</td><td className="py-2 px-3">42.5"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">36</td><td className="py-2 px-3">36.0"</td><td className="py-2 px-3">44.0"</td><td className="py-2 px-3">43.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">38</td><td className="py-2 px-3">38.0"</td><td className="py-2 px-3">46.0"</td><td className="py-2 px-3">43.5"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'TEE' && (
            <div className="space-y-4">
              <div className="bg-[#1b1b20] p-4 rounded-[2px] border border-[#26262c] flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider">Heavyweight Tee Fit Matrix</span>
                <span className="text-[11px] font-extrabold text-[#b3001f] bg-[#8b0018]/20 px-2 py-0.5 rounded border border-[#8b0018]/40">
                  Alphabetical Sizing (S to XXL)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#26262c] text-white font-heading">
                      <th className="py-2.5 px-3">Size Code</th>
                      <th className="py-2.5 px-3">Chest (Inches)</th>
                      <th className="py-2.5 px-3">Length (Inches)</th>
                      <th className="py-2.5 px-3">Shoulder (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#26262c] text-[#8b8b94]">
                    <tr><td className="py-2 px-3 font-bold text-white">S</td><td className="py-2 px-3">38.0"</td><td className="py-2 px-3">27.5"</td><td className="py-2 px-3">18.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">M</td><td className="py-2 px-3">40.0"</td><td className="py-2 px-3">28.5"</td><td className="py-2 px-3">19.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">L</td><td className="py-2 px-3">42.0"</td><td className="py-2 px-3">29.5"</td><td className="py-2 px-3">20.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">XL</td><td className="py-2 px-3">44.0"</td><td className="py-2 px-3">30.5"</td><td className="py-2 px-3">21.0"</td></tr>
                    <tr><td className="py-2 px-3 font-bold text-white">XXL</td><td className="py-2 px-3">46.0"</td><td className="py-2 px-3">31.5"</td><td className="py-2 px-3">22.0"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
