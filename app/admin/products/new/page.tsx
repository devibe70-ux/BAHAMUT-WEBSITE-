'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct } from '@/lib/products';
import { Product, Demographic } from '@/lib/types';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Wand2, RefreshCw, Download, Store, FileSpreadsheet, Upload, FileCheck } from 'lucide-react';

export default function NewProductAiPage() {
  const router = useRouter();

  const [titleHint, setTitleHint] = useState('Chambray Woven Shirt');
  const [demographic, setDemographic] = useState<Demographic>('CLASSIC');
  const [pattern, setPattern] = useState('Solid Woven');
  const [color, setColor] = useState('Navy Blue');
  const [targetPrice, setTargetPrice] = useState('1299');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSyncingGoogle, setIsSyncingGoogle] = useState(false);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [csvText, setCsvText] = useState('');
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

  const handleCsvFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCsv(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/products/import-csv', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.products) {
        data.products.forEach((p: Product) => saveProduct(p));
        alert(`🎉 Success! Uploaded and imported ${data.imported_count} products from ${file.name}!`);
        router.push('/catalog');
      } else {
        alert(data.error || 'Failed to import CSV');
      }
    } catch (err) {
      alert('CSV upload failed');
    } finally {
      setIsUploadingCsv(false);
    }
  };

  const handleCsvTextImport = async () => {
    if (!csvText.trim()) return;

    setIsUploadingCsv(true);
    try {
      const res = await fetch('/api/admin/products/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText })
      });

      const data = await res.json();
      if (res.ok && data.products) {
        data.products.forEach((p: Product) => saveProduct(p));
        alert(`🎉 Success! Imported ${data.imported_count} products from CSV data!`);
        router.push('/catalog');
      } else {
        alert(data.error || 'Failed to parse CSV text');
      }
    } catch (err) {
      alert('CSV text import failed');
    } finally {
      setIsUploadingCsv(false);
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8 bg-[#F7F7F8] text-[#111111] min-h-screen">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#666666] hover:text-[#111111] min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 text-[#111111]" /> Back to Seller Dashboard
      </button>

      {/* Top Banner with Google Merchant Sync & CSV Export Buttons */}
      <div className="bg-white p-8 border border-[#E5E5E5] space-y-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-3.5 py-1 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" /> GOOGLE MERCHANT & CSV FEED ENGINE
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] uppercase tracking-wider">Manufacturer Product Feed Importer</h1>
          <p className="text-xs text-[#666666] font-medium">
            Upload CSV file directly or sync products from Google Merchant profile (<strong>bahamut.india@gmail.com</strong>).
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleGoogleMerchantSync}
            disabled={isSyncingGoogle}
            className="min-h-[48px] px-5 py-2.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest border border-[#111111] flex items-center justify-center gap-2 transition-all"
          >
            <Store className="w-4 h-4 text-white" />
            {isSyncingGoogle ? 'Syncing...' : 'Sync Google Feed'}
          </button>

          <button
            onClick={handleDownloadCsv}
            className="min-h-[48px] px-5 py-2.5 bg-white hover:bg-[#F7F7F8] text-[#111111] font-bold text-xs uppercase tracking-widest border border-[#E5E5E5] flex items-center justify-center gap-2 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#111111]" />
            Download Feed CSV
          </button>
        </div>
      </div>

      {/* 1-Click CSV Drag & Drop Upload Card */}
      <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#111111]" /> 1-Click Upload Products CSV
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
            Auto-Sync Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <label className="border-2 border-dashed border-[#E5E5E5] hover:border-[#111111] p-8 text-center bg-[#F7F7F8] cursor-pointer block transition-colors space-y-2">
            <FileCheck className="w-8 h-8 text-[#111111] mx-auto" />
            <span className="text-xs font-bold text-[#111111] block">Click or Drag & Drop Product CSV File</span>
            <span className="text-[11px] text-[#666666] block font-medium">Supports Shopify, Google Merchant, WooCommerce, Amazon CSVs</span>
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleCsvFileUpload}
              disabled={isUploadingCsv}
              className="hidden"
            />
          </label>

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">Or Paste CSV Raw Text</label>
            <textarea
              rows={4}
              value={csvText}
              onChange={e => setCsvText(e.target.value)}
              placeholder="Paste id,title,description,price,image_link..."
              className="w-full p-3 text-xs font-mono bg-[#F7F7F8] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleCsvTextImport}
              disabled={isUploadingCsv || !csvText.trim()}
              className="w-full min-h-[44px] bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {isUploadingCsv ? 'Processing CSV...' : 'Import Products from CSV Text'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Questionnaire Form */}
        <form onSubmit={handleAiGenerate} className="md:col-span-6 bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-4">
          <h3 className="font-bold text-base text-[#111111] border-b border-[#E5E5E5] pb-3 uppercase">
            Add Single Garment Entry
          </h3>

          <div>
            <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-widest mb-1">Title / Style Name</label>
            <input
              type="text"
              required
              value={titleHint}
              onChange={e => setTitleHint(e.target.value)}
              placeholder="e.g. Oxford Micro-Check Shirt"
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-widest mb-1">Weave Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="Solid Woven, Street Graphic, Oxford..."
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-widest mb-1">Primary Color</label>
            <input
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
              placeholder="Deep Navy, Emerald Green..."
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#666666] uppercase tracking-widest mb-1">Selling Price (₹)</label>
            <input
              type="number"
              value={targetPrice}
              onChange={e => setTargetPrice(e.target.value)}
              className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full min-h-[52px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <span>Generating AI Catalog Entry...</span>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Auto-Generate Specs
              </>
            )}
          </button>
        </form>

        {/* AI Preview Box */}
        <div className="md:col-span-6 space-y-4">
          {generatedProduct ? (
            <div className="bg-white p-6 border border-[#111111] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> AI Generated Preview
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#111111]">{generatedProduct.title}</h4>
                <p className="text-xs text-[#111111] font-bold mt-0.5">
                  ₹{generatedProduct.price} (MRP: ₹{generatedProduct.original_mrp})
                </p>
              </div>

              <div className="bg-[#F7F7F8] p-4 text-xs text-[#666666] leading-relaxed space-y-2 border border-[#E5E5E5]">
                <p><strong className="text-[#111111]">Description:</strong> {generatedProduct.description}</p>
                <p><strong className="text-[#111111]">Fabric:</strong> {generatedProduct.fabric_details}</p>
                <p><strong className="text-[#111111]">Sizes Matrix:</strong> {generatedProduct.sizes.join(', ')}</p>
              </div>

              <button
                onClick={handlePublishProduct}
                className="w-full min-h-[52px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Publish Live to bahamut.in Catalog
              </button>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-[#E5E5E5] p-12 text-center text-xs text-[#666666] space-y-2">
              <Wand2 className="w-10 h-10 text-[#111111] mx-auto" />
              <p className="font-bold text-[#111111] text-sm">Google Merchant & CSV Importer Active</p>
              <p className="font-medium">Upload any CSV file above to import all products automatically into your store.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
