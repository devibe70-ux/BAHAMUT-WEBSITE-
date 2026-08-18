'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct } from '@/lib/products';
import { Product, Demographic } from '@/lib/types';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Wand2, RefreshCw, Download, Store, FileSpreadsheet } from 'lucide-react';

export default function NewProductAiPage() {
  const router = useRouter();

  const [titleHint, setTitleHint] = useState('Chambray Woven Shirt');
  const [demographic, setDemographic] = useState<Demographic>('CLASSIC');
  const [pattern, setPattern] = useState('Solid Woven');
  const [color, setColor] = useState('Navy Blue');
  const [targetPrice, setTargetPrice] = useState('1299');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncingGoogle, setIsSyncingGoogle] = useState(false);
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

  const handleGoogleMerchantSync = async () => {
    setIsSyncingGoogle(true);
    try {
      const res = await fetch('/api/admin/google-merchant/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantEmail: 'bahamut.india@gmail.com',
          brandName: 'BahaMut by De Vibe'
        })
      });

      const data = await res.json();
      if (res.ok && data.products) {
        data.products.forEach((p: Product) => saveProduct(p));
        alert(`Successfully imported & synced ${data.synced_count} products from Google Business / Merchant profile (bahamut.india@gmail.com)!`);
        router.push('/catalog');
      }
    } catch (err) {
      alert('Google Merchant sync failed');
    } finally {
      setIsSyncingGoogle(false);
    }
  };

  const handleDownloadCsv = () => {
    window.open('/api/admin/products/export-csv', '_blank');
  };

  const handlePublishProduct = () => {
    if (generatedProduct) {
      saveProduct(generatedProduct);
      alert(`Product "${generatedProduct.title}" published to live catalog in <60s!`);
      router.push('/catalog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8 bg-[#0a0a0b] text-[#ececed] min-h-screen">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-heading text-[#8b8b94] hover:text-white min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 text-[#b3001f]" /> Back to Seller Dashboard
      </button>

      {/* Top Banner with Google Merchant Sync & CSV Export Buttons */}
      <div className="bg-[#121215] p-8 rounded-[2px] border border-[#26262c] space-y-4 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#8b0018] text-white px-3.5 py-1 rounded-[2px] text-xs font-heading tracking-widest uppercase">
            <Sparkles className="w-4 h-4" /> GOOGLE MERCHANT & CSV FEED ENGINE
          </div>
          <h1 className="text-3xl font-heading text-white uppercase tracking-wider">Manufacturer Feed Importer</h1>
          <p className="text-xs text-[#8b8b94] font-medium">
            Sync products from Google Merchant / Business profile (<strong>bahamut.india@gmail.com</strong>) or export CSV.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGoogleMerchantSync}
            disabled={isSyncingGoogle}
            className="min-h-[48px] px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 font-heading text-xs uppercase tracking-widest rounded-[2px] border border-emerald-800 flex items-center justify-center gap-2 transition-all shadow-xl"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            {isSyncingGoogle ? 'Syncing...' : 'Sync Google Feed'}
          </button>

          <button
            onClick={handleDownloadCsv}
            className="min-h-[48px] px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-blue-300 font-heading text-xs uppercase tracking-widest rounded-[2px] border border-blue-800 flex items-center justify-center gap-2 transition-all shadow-xl"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            Download Products CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Questionnaire Form */}
        <form onSubmit={handleAiGenerate} className="md:col-span-6 bg-[#121215] p-6 sm:p-8 rounded-[2px] border border-[#26262c] space-y-4 shadow-xl">
          <h3 className="font-heading text-base text-white border-b border-[#26262c] pb-3 uppercase">
            Garment Quick Questionnaire
          </h3>

          <div>
            <label className="block text-[11px] font-heading text-[#8b8b94] uppercase tracking-widest mb-1">Title Hint / Style Name</label>
            <input
              type="text"
              required
              value={titleHint}
              onChange={e => setTitleHint(e.target.value)}
              placeholder="e.g. Oxford Micro-Check"
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-heading text-[#8b8b94] uppercase tracking-widest mb-1">Weave Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="Solid Woven, Street Graphic, Oxford..."
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-heading text-[#8b8b94] uppercase tracking-widest mb-1">Primary Color</label>
            <input
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
              placeholder="Deep Navy, Emerald Green..."
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-heading text-[#8b8b94] uppercase tracking-widest mb-1">Selling Price (₹)</label>
            <input
              type="number"
              value={targetPrice}
              onChange={e => setTargetPrice(e.target.value)}
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full min-h-[52px] bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 glow-crimson"
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
            <div className="bg-[#121215] p-6 rounded-[2px] space-y-4 border border-[#8b0018] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#26262c] pb-3">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> AI Generated Preview
                </span>
              </div>

              <div>
                <h4 className="text-lg font-heading text-white">{generatedProduct.title}</h4>
                <p className="text-xs text-[#b3001f] font-bold mt-0.5">
                  ₹{generatedProduct.price} (MRP: ₹{generatedProduct.original_mrp})
                </p>
              </div>

              <div className="bg-[#1b1b20] p-4 rounded-[2px] text-xs text-[#8b8b94] leading-relaxed space-y-2 border border-[#26262c]">
                <p><strong className="text-white">Description:</strong> {generatedProduct.description}</p>
                <p><strong className="text-white">Fabric:</strong> {generatedProduct.fabric_details}</p>
                <p><strong className="text-white">Sizes Matrix:</strong> {generatedProduct.sizes.join(', ')}</p>
              </div>

              <button
                onClick={handlePublishProduct}
                className="w-full min-h-[52px] bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 glow-crimson"
              >
                Publish Live to bahamut.in Catalog
              </button>
            </div>
          ) : (
            <div className="bg-[#121215] border-2 border-dashed border-[#26262c] rounded-[2px] p-12 text-center text-xs text-[#8b8b94] space-y-2">
              <Wand2 className="w-10 h-10 text-[#8b0018] mx-auto" />
              <p className="font-heading text-white text-sm">Google Merchant & CSV Importer Active</p>
              <p className="font-medium">Sync listings from bahamut.india@gmail.com or download products.csv to local machine.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
