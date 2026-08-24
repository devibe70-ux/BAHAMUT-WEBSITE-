'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts, saveProduct } from '@/lib/products';
import { Product, Size, ProductCategory } from '@/lib/types';
import { Sparkles, ArrowLeft, CheckCircle2, Shield, Download, Store, FileSpreadsheet, Upload, FileCheck, PlusCircle, RefreshCw, Image as ImageIcon, Edit, Check } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  // Selected Master Product for Editing/Image Update
  const [editingMasterId, setEditingMasterId] = useState<string | null>(null);
  const [editingImageLink, setEditingImageLink] = useState('');
  const [editingAvailableSizes, setEditingAvailableSizes] = useState<Size[]>([]);

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

  useEffect(() => {
    setProducts(getProducts());
  }, []);

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

  const startEditMaster = (p: Product) => {
    setEditingMasterId(p.id);
    setEditingImageLink(p.images?.[0] || '');
    setEditingAvailableSizes(p.available_sizes || p.sizes || []);
  };

  const toggleEditingSize = (size: Size) => {
    if (editingAvailableSizes.includes(size)) {
      setEditingAvailableSizes(editingAvailableSizes.filter(s => s !== size));
    } else {
      setEditingAvailableSizes([...editingAvailableSizes, size]);
    }
  };

  const saveMasterProductUpdate = (product: Product) => {
    const updated: Product = {
      ...product,
      images: [editingImageLink, ...(product.images.slice(1))],
      available_sizes: editingAvailableSizes
    };

    const updatedList = saveProduct(updated);
    setProducts(updatedList);
    setEditingMasterId(null);
    alert(`✅ Updated Master Product "${product.title}" with new JPG image and size variations!`);
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

    const updatedList = saveProduct(newProduct);
    setProducts(updatedList);
    setTitle('');
    setImageUrl('');
    alert(`🎉 Master Product "${title}" created successfully with paired 5-size variation matrix!`);
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
        setProducts(getProducts());
        alert(`🎉 Success! Uploaded and imported ${data.imported_count} products from ${file.name}!`);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8 bg-[#F7F7F8] text-[#111111] min-h-screen">
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
            <Sparkles className="w-4 h-4" /> MASTER PRODUCT & PAIRED SIZE VARIATIONS MANAGER
          </div>
          <h1 className="text-3xl font-extrabold text-[#111111] uppercase tracking-wider">Master Product Catalog</h1>
          <p className="text-xs text-[#666666] font-medium">
            Paired size variations (5-size matrix) under each Master Product with custom JPG image upload.
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

      {/* Table of Live Master Products with Paired Size Variations & JPG Image Editor */}
      <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
          <div>
            <h3 className="font-bold text-base text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#111111]" /> Active Master Products ({products.length})
            </h3>
            <p className="text-xs text-[#666666] mt-0.5 font-medium">
              Each Master Product groups its paired 5-size variation matrix under 1 clean listing.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 border border-emerald-200 uppercase">
            Clean Storefront Matrix
          </span>
        </div>

        <div className="space-y-4">
          {products.map(p => {
            const isEditing = editingMasterId === p.id;
            const cat = (p.category || 'SHIRT').toUpperCase() as ProductCategory;
            const fullMatrix = matrix5Sizes[cat] || ['38', '40', '42', '44', '46'];
            const avail = p.available_sizes || p.sizes || [];

            return (
              <div key={p.id} className="p-4 border border-[#E5E5E5] bg-[#F7F7F8] space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-white border border-[#E5E5E5] relative overflow-hidden flex-shrink-0">
                      <img src={p.images?.[0] || ''} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#111111] bg-white px-2 py-0.5 border border-[#E5E5E5] uppercase">
                        {p.category || 'Apparel'} • ID: {p.id}
                      </span>
                      <h4 className="text-sm font-bold text-[#111111]">{p.title}</h4>
                      <p className="text-xs font-bold text-[#111111]">
                        ₹{p.price} <span className="text-[#666666] line-through font-normal">MRP ₹{p.original_mrp}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => isEditing ? saveMasterProductUpdate(p) : startEditMaster(p)}
                      className="min-h-[40px] px-4 bg-[#111111] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit className="w-4 h-4" />}
                      {isEditing ? 'Save Master Product' : 'Attach Image & Sizes'}
                    </button>
                  </div>
                </div>

                {/* Paired 5-Size Variation Matrix Badge Row */}
                <div className="pt-2 border-t border-[#E5E5E5] flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-[#666666] uppercase tracking-wider mr-2">
                    Paired 5-Size Matrix:
                  </span>
                  {fullMatrix.map(sz => {
                    const isAvail = avail.includes(sz);
                    return (
                      <span
                        key={sz}
                        className={`px-2.5 py-1 text-xs font-bold border ${
                          isAvail
                            ? 'bg-white text-[#111111] border-[#111111]'
                            : 'bg-red-50 text-red-600 border-red-200 line-through'
                        }`}
                      >
                        {sz} {!isAvail && '(SOLD OUT)'}
                      </span>
                    );
                  })}
                </div>

                {/* Expanded Inline Editor for Master Product JPG Image & Sizes */}
                {isEditing && (
                  <div className="p-4 bg-white border border-[#111111] space-y-4 mt-3">
                    <h5 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                      Attach Custom JPG Image & Toggle In-Stock Size Variations
                    </h5>

                    <div>
                      <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                        Product JPG Image Link (Self-Hosted relative path or direct JPG URL)
                      </label>
                      <input
                        type="text"
                        value={editingImageLink}
                        onChange={e => setEditingImageLink(e.target.value)}
                        placeholder="e.g. /images/products/my-product.jpg"
                        className="w-full min-h-[44px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest">
                        Toggle Available In-Stock Sizes (Unselected = SOLD OUT)
                      </label>
                      <div className="flex gap-2">
                        {fullMatrix.map(sz => {
                          const isChecked = editingAvailableSizes.includes(sz);
                          return (
                            <button
                              type="button"
                              key={sz}
                              onClick={() => toggleEditingSize(sz)}
                              className={`min-h-[40px] px-3 text-xs font-bold border transition-all ${
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

                    <button
                      onClick={() => saveMasterProductUpdate(p)}
                      className="w-full min-h-[44px] bg-[#111111] text-white font-bold text-xs uppercase tracking-widest"
                    >
                      Save Changes to Master Product
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Master Product Form */}
      <form onSubmit={handleCreateProduct} className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6">
        <div className="border-b border-[#E5E5E5] pb-4 flex items-center justify-between">
          <h3 className="font-bold text-base text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#111111]" /> Add New Master Product
          </h3>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 uppercase">
            Auto-Pairs 5-Size Matrix
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
                placeholder="e.g. De Vibe Premium Woven Cotton Shirt"
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                Category (Determines 5-Size Matrix) *
              </label>
              <select
                value={category}
                onChange={e => handleCategoryChange(e.target.value as ProductCategory)}
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
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
                  className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
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
                  className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
                JPG Image Link *
              </label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="/images/products/my-product.jpg"
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
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
                className="w-full p-3 text-xs bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
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
                className="w-full min-h-[48px] px-3.5 text-xs font-bold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5]"
              />
            </div>

            {/* Standard 5-Size Selection Box */}
            <div className="space-y-2 bg-[#F7F7F8] p-4 border border-[#E5E5E5]">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#111111] uppercase tracking-widest">
                  Paired In-Stock Sizes (5-Size Matrix)
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
          <PlusCircle className="w-4 h-4" /> Publish Master Product to Catalog
        </button>
      </form>
    </div>
  );
}
