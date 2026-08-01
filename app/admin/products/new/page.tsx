'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct } from '@/lib/products';
import { Product, Demographic } from '@/lib/types';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Wand2, RefreshCw } from 'lucide-react';

export default function NewProductAiPage() {
  const router = useRouter();

  const [titleHint, setTitleHint] = useState('Chambray Woven Shirt');
  const [demographic, setDemographic] = useState<Demographic>('CLASSIC');
  const [pattern, setPattern] = useState('Solid Woven');
  const [color, setColor] = useState('Navy Blue');
  const [targetPrice, setTargetPrice] = useState('1299');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProduct, setGeneratedProduct] = useState<Product | null>(null);

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/admin/products/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleHint,
          demographic,
          pattern,
          color,
          targetPrice
        })
      });

      const data = await res.json();
      if (res.ok && data.product) {
        setGeneratedProduct(data.product);
      }
    } catch (err) {
      alert('AI Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishProduct = () => {
    if (generatedProduct) {
      saveProduct(generatedProduct);
      alert(`Product "${generatedProduct.title}" published to live catalog in <60s!`);
      router.push('/catalog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-white min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 text-blue-400" /> Back to Dashboard
      </button>

      <div className="glass-panel p-8 rounded-3xl space-y-3 border border-slate-700/80">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-black text-blue-400">
          <Sparkles className="w-4 h-4 text-blue-400" /> AI CATALOGING SUITE (&lt;60 SECONDS)
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">AI Product Publisher</h1>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          Provide basic garment inputs. Our AI engine auto-generates De Vibe master mill titles, fabric descriptions, size matrixes, and demographic badges tailored for BahaMut by De Vibe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Questionnaire Form */}
        <form onSubmit={handleAiGenerate} className="md:col-span-6 glass-card p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="font-black text-base text-white border-b border-slate-800 pb-3">
            Garment Quick Questionnaire
          </h3>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Title Hint / Style Name</label>
            <input
              type="text"
              required
              value={titleHint}
              onChange={e => setTitleHint(e.target.value)}
              placeholder="e.g. Oxford Micro-Check"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Target Demographic Track</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDemographic('YOUTH')}
                className={`min-h-[44px] text-xs font-black rounded-xl border flex items-center justify-center gap-1 transition-all ${
                  demographic === 'YOUTH'
                    ? 'border-blue-500 bg-blue-600/20 text-blue-400'
                    : 'border-slate-800 bg-slate-900 text-slate-300'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Youth (13–25)
              </button>
              <button
                type="button"
                onClick={() => setDemographic('CLASSIC')}
                className={`min-h-[44px] text-xs font-black rounded-xl border flex items-center justify-center gap-1 transition-all ${
                  demographic === 'CLASSIC'
                    ? 'border-emerald-500 bg-emerald-600/20 text-emerald-400'
                    : 'border-slate-800 bg-slate-900 text-slate-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Classic (26–65)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Weave Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="Solid Woven, Street Graphic, Oxford..."
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Primary Color</label>
            <input
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
              placeholder="Deep Navy, Emerald Green..."
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Selling Price (₹)</label>
            <input
              type="number"
              value={targetPrice}
              onChange={e => setTargetPrice(e.target.value)}
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full min-h-[52px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 glow-blue"
          >
            {isGenerating ? (
              <span>Generating AI Catalog Entry...</span>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Auto-Generate Catalog Specs (&lt;60s)
              </>
            )}
          </button>
        </form>

        {/* AI Preview Box */}
        <div className="md:col-span-6 space-y-4">
          {generatedProduct ? (
            <div className="glass-card p-6 rounded-3xl space-y-4 animate-fade-in border border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> AI Generated Preview
                </span>
                <span className="text-[11px] font-bold text-slate-400">Ready in 3 seconds</span>
              </div>

              <div>
                <h4 className="text-lg font-black text-white">{generatedProduct.title}</h4>
                <p className="text-xs text-blue-400 font-extrabold mt-0.5">
                  Demographic: {generatedProduct.target_demographic} • ₹{generatedProduct.price} (MRP: ₹{generatedProduct.original_mrp})
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed space-y-2 border border-slate-800 font-medium">
                <p><strong>Description:</strong> {generatedProduct.description}</p>
                <p><strong>Fabric:</strong> {generatedProduct.fabric_details}</p>
                <p><strong>Sizes Matrix:</strong> {generatedProduct.sizes.join(', ')}</p>
              </div>

              <button
                onClick={handlePublishProduct}
                className="w-full min-h-[52px] bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Publish Live to bahamut.in Catalog
              </button>
            </div>
          ) : (
            <div className="glass-card border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center text-xs text-slate-400 space-y-2">
              <Wand2 className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-black text-white text-sm">No Product Generated Yet</p>
              <p className="font-medium">Fill in the questionnaire on the left and click "Auto-Generate Catalog Specs".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
