'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct } from '@/lib/products';
import { Product, Size, ProductCategory } from '@/lib/types';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Download, Store, FileSpreadsheet, Upload, FileCheck, PlusCircle, RefreshCw } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();

  // Form State for manual product addition
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('SHIRT');
  const [price, setPrice] = useState('1299');
  const [originalMrp, setOriginalMrp] = useState('2499');
  const [description, setDescription] = useState('');
  const [fabricDetails, setFabricDetails] = useState('100% Breathable Woven Cotton (Ahmedabad Mills)');
  const [imageUrl, setImageUrl] = useState('');
  const [stockQuantity, setStockQuantity] = useState('40');

  // Available Sizes selection out of 5-size matrix
  const matrix5Sizes: Record<ProductCategory, Size[]> = {
    SHIRT: ['38', '40', '42', '44', '46'],
    BOTTOMWEAR: ['28', '30', '32', '34', '36'],
    TEE: ['S', 'M', 'L', 'XL', 'XXL']
  };

  const [availableSizes, setAvailableSizes] = useState<Size[]>(['38', '40', '42', '44', '46']);

  const [isSyncingMyBillBook, setIsSyncingMyBillBook] = useState(false);
  const [isUploadingCsv, setIsUploadingCsv] = useState(false);
  const [csvText, setCsvText] = useState('');

  const toggleSize = (size: Size) => {
    if (availableSizes.includes(size)) {
      setAvailableSizes(availableSizes.filter(s => s !== size));
    } else {
      setAvailableSizes([...availableSizes, size]);
    }
  };

  const handleCategoryChange = (newCat: ProductCategory) => {
    setCategory(newCat);
    setAvailableSizes(matrix5Sizes[newCat]);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !imageUrl.trim()) {
      alert('Please enter a product title and image URL link.');
      return;
    }

    const full5Matrix = matrix5Sizes[category];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProduct: Product = {
      id: `mb-${Date.now()}`,
      slug: slug || `product-${Date.now()}`,
      title,
      category,
      description: description || `${title} - Direct-from-manufacturer 100% Woven Cotton apparel from DE VIBE Ahmedabad.`,
      target_demographic: 'UNIFIED_13_65',
      fabric_details: fabricDetails,
      price: parseFloat(price) || 1299,
      original_mrp: parseFloat(originalMrp) || 2499,
      stock_quantity: parseInt(stockQuantity) || 40,
      rating: 4.8,
      review_count: 140,
      express_delivery: 'FREE Express Delivery from Ambawadi, Ahmedabad',
      images: [imageUrl],
      sizes: full5Matrix,
      available_sizes: availableSizes,
      color: 'Classic',
      is_active: true,
      created_at: new Date().toISOString()
    };

    saveProduct(newProduct);
    alert(`🎉 Product "${title}" created successfully! Sizes not selected (${full5Matrix.filter(s => !availableSizes.includes(s)).join(', ') || 'None'}) will display as SOLD OUT.`);
    router.push('/catalog');
  };

  const handleMyBillBookSync = async () => {
    setIsSyncingMyBillBook(true);
    try {
      const res = await fetch('/api/admin/mybillbook/sync', { method: 'GET' });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Connected to MyBillBook Inventory Database! Sync Status: ${data.status}`);
      }
    } catch (err) {
      alert('MyBillBook sync failed');
    } finally {
      setIsSyncingMyBillBook(false);
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8 bg-[#F7F7F8] text-[#111111] min-h-screen">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#666666] hover:text-[#111111] min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4 text-[#111111]" /> Back to Seller Dashboard
      </button>

      {/* Top Banner with MyBillBook Sync & Download Feed Buttons */}
      <div className="bg-white p-8 border border-[#E5E5E5] space-y-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-3.5 py-1 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4" /> MYBILLBOOK INVENTORY & CATALOG ENGINE
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] uppercase tracking-wider">Product Catalog & Stock Manager</h1>
          <p className="text-xs text-[#666666] font-medium">
            Sync live inventory from MyBillBook database or upload product CSV feeds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleMyBillBookSync}
            disabled={isSyncingMyBillBook}
            className="min-h-[48px] px-5 py-2.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest border border-[#111111] flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            {isSyncingMyBillBook ? 'Syncing...' : 'Sync MyBillBook DB'}
          </button>
        </div>
      </div>

      {/* Add New Product Form (With Standard 5-Size Matrix & SOLD OUT Toggles) */}
      <form onSubmit={handleCreateProduct} className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6">
        <div className="border-b border-[#E5E5E5] pb-4 flex items-center justify-between">
          <h3 className="font-bold text-base text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#111111]" /> Add New Product to Store Catalog
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
            5-Size Matrix Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. De Vibe Woven Cotton Chambray Shirt"
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Category (Determines 5-Size Matrix) *
              </label>
              <select
                value={category}
                onChange={e => handleCategoryChange(e.target.value as ProductCategory)}
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              >
                <option value="SHIRT">Shirts (Matrix: 38, 40, 42, 44, 46)</option>
                <option value="BOTTOMWEAR">Bottomwear (Matrix: 28, 30, 32, 34, 36)</option>
                <option value="TEE">Tees / Hoodies (Matrix: S, M, L, XL, XXL)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                  MRP (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={originalMrp}
                  onChange={e => setOriginalMrp(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Image Link (Image URL) *
              </label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://... or /images/products/..."
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="100% Breathable Woven Cotton crafted in Ambawadi, Ahmedabad..."
                className="w-full p-3 text-xs bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Fabric Details
              </label>
              <input
                type="text"
                value={fabricDetails}
                onChange={e => setFabricDetails(e.target.value)}
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
              />
            </div>

            {/* Standard 5-Size Selection Box */}
            <div className="space-y-2 bg-[#F7F7F8] p-4 border border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#111111] uppercase tracking-widest">
                  Available In-Stock Sizes (5-Size Matrix)
                </label>
                <span className="text-[10px] text-[#666666] font-medium">Unselected = SOLD OUT</span>
              </div>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {matrix5Sizes[category].map(sz => {
                  const isChecked = availableSizes.includes(sz);
                  return (
                    <button
                      type="button"
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`min-h-[44px] text-xs font-bold border transition-all ${
                        isChecked
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-red-600 border-[#E5E5E5] line-through'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full min-h-[52px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircle className="w-4 h-4" /> Publish Product to Store Catalog
        </button>
      </form>

      {/* 1-Click CSV Drag & Drop Upload Card */}
      <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#111111]" /> 1-Click CSV File Upload
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
            CSV Importer Active
          </span>
        </div>

        <label className="border-2 border-dashed border-[#E5E5E5] hover:border-[#111111] p-8 text-center bg-[#F7F7F8] cursor-pointer block transition-colors space-y-2">
          <FileCheck className="w-8 h-8 text-[#111111] mx-auto" />
          <span className="text-xs font-bold text-[#111111] block">Click or Drag & Drop Product CSV File</span>
          <span className="text-[11px] text-[#666666] block font-medium">Upload MyBillBook or custom CSV catalog file</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleCsvFileUpload}
            disabled={isUploadingCsv}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
