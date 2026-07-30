'use client';

import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, Shield } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'INCHES' | 'CM'>('INCHES');

  if (!isOpen) return null;

  const measurements = [
    { size: 'S', chestInc: 38, chestCm: 96.5, shoulderInc: 17, shoulderCm: 43.2, lengthInc: 28, lengthCm: 71.1 },
    { size: 'M', chestInc: 40, chestCm: 101.6, shoulderInc: 17.5, shoulderCm: 44.5, lengthInc: 29, lengthCm: 73.7 },
    { size: 'L', chestInc: 42, chestCm: 106.7, shoulderInc: 18, shoulderCm: 45.7, lengthInc: 30, lengthCm: 76.2 },
    { size: 'XL', chestInc: 44, chestCm: 111.8, shoulderInc: 19, shoulderCm: 48.3, lengthInc: 31, lengthCm: 78.7 },
    { size: 'XXL', chestInc: 46, chestCm: 116.8, shoulderInc: 20, shoulderCm: 50.8, lengthInc: 32, lengthCm: 81.3 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] overflow-y-auto font-sans text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200">
              <Ruler className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">BahaMut Fit Verification Guide</h3>
              <p className="text-xs text-slate-500 font-extrabold">
                100% Breathable Woven Cotton (Sanforized Pre-Shrunk Silhouettes)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-w-[48px] min-h-[48px] p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Unit Switcher */}
        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl mb-6 border border-slate-200">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Select Unit:</span>
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setUnit('INCHES')}
              className={`min-h-[40px] px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                unit === 'INCHES'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('CM')}
              className={`min-h-[40px] px-4 py-1.5 text-xs font-black rounded-lg transition-all ${
                unit === 'CM'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-6 shadow-sm bg-white">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-4 px-5">Tag Size</th>
                <th className="py-4 px-5">Garment Chest</th>
                <th className="py-4 px-5">Shoulder Width</th>
                <th className="py-4 px-5">Front Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {measurements.map(m => (
                <tr key={m.size} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-black text-levis-red text-base">
                    {m.size}
                  </td>
                  <td className="py-4 px-5 text-slate-800 font-bold">
                    {unit === 'INCHES' ? `${m.chestInc}"` : `${m.chestCm} cm`}
                  </td>
                  <td className="py-4 px-5 text-slate-800 font-bold">
                    {unit === 'INCHES' ? `${m.shoulderInc}"` : `${m.shoulderCm} cm`}
                  </td>
                  <td className="py-4 px-5 text-slate-800 font-bold">
                    {unit === 'INCHES' ? `${m.lengthInc}"` : `${m.lengthCm} cm`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Tip */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed font-semibold">
            <strong>De Vibe Zero-Return Fit Tip:</strong> Measure your best-fitting casual shirt laid flat across the chest from armpit to armpit and double the number. Since our woven cotton is pre-shrunk, select your true size.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[48px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-colors uppercase tracking-wider"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
