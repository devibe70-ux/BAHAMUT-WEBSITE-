'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { ShieldCheck, Truck, Sparkles, Ruler, ShoppingBag, Check, ArrowLeft, Tag, Flame, Shield, PackageCheck } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : '';

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<Size>('M');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      const found = getProductBySlug(slug);
      if (found) {
        setProduct(found);
        setSelectedImage(found.images?.[0] || '');
        if (found.sizes && found.sizes.length > 0) {
          setSelectedSize(found.sizes[0]);
        }
      } else {
        setNotFound(true);
      }
    }
  }, [slug]);

  if (notFound || (!product && slug)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans space-y-4">
        <PackageCheck className="w-12 h-12 text-blue-600 mx-auto" />
        <h2 className="text-2xl font-black text-slate-900">Requested Apparel Item Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
          The requested product may have been updated or sold out in our Ahmedabad mill inventory.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 min-h-[48px] px-6 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-md"
        >
          Browse Full Apparel Catalog
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-black text-slate-900">Loading BahaMut Apparel Details...</h2>
      </div>
    );
  }

  const safeSizes: Size[] = (product.sizes && product.sizes.length > 0) ? product.sizes : ['S', 'M', 'L', 'XL'];
  const safeImages: string[] = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'];

  const price = product.price || 1299;
  const originalMrp = product.original_mrp || Math.round(price * 1.8);
  const discountPercent = Math.max(0, Math.round(((originalMrp - price) / originalMrp) * 100));

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, 1);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-36 lg:pb-20 font-sans">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-600 hover:text-slate-900 mb-6 min-h-[44px] px-2 uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4 text-blue-600" /> Back to Catalog
      </button>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src={selectedImage || safeImages[0]}
              alt={product.title || 'BahaMut Shirt'}
              fill
              priority
              className="object-cover object-top"
            />
            {/* Levi's Red Badge Style Tag */}
            <div className="absolute top-4 left-4 bg-levis-red text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg border border-red-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-yellow-300" /> LEVI'S & UCB MILL STANDARD
            </div>

            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-levis-red text-white text-xs font-black px-3 py-1 rounded-xl shadow-lg border border-red-400">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {safeImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {safeImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-slate-900 ring-2 ring-slate-900 scale-105'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: PDP Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.target_demographic === 'YOUTH' ? (
                <span className="bg-blue-50 text-blue-700 text-xs font-black px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Youth Prints Track (13–25)
                </span>
              ) : (
                <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Classic Woven Solids (26–65)
                </span>
              )}
              <span className="text-xs font-bold text-slate-500">• In Stock</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>
            <p className="text-xs font-extrabold text-blue-700 mt-1">
              Brand: BahaMut by De Vibe (Ahmedabad Mills)
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-base font-semibold text-slate-400 line-through">
                ₹{originalMrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Inclusive of all taxes
              </span>
            </div>

            {/* Partial COD Callout */}
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-slate-800">Partial COD Deposit Option:</span>
              </div>
              <span className="font-black text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                ₹200 Advance Deposit
              </span>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-700 uppercase tracking-widest">
                Select Size (Levi's Fit Standard)
              </label>
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(true)}
                className="text-xs font-black text-blue-700 hover:underline flex items-center gap-1"
              >
                <Ruler className="w-4 h-4" /> Size Assistant Modal
              </button>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {safeSizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[52px] min-h-[52px] text-sm font-black rounded-2xl border transition-all ${
                    selectedSize === size
                      ? 'border-slate-900 bg-slate-900 text-white shadow-lg scale-105'
                      : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden sm:grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className={`min-h-[52px] px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                added ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added ({selectedSize})
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="min-h-[52px] px-6 py-3.5 bg-levis-red hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Partial COD Buy
            </button>
          </div>

          {/* Fabric Specifications */}
          <div className="border-t border-slate-200 pt-6 space-y-4 text-xs text-slate-700 leading-relaxed font-medium">
            <div>
              <h4 className="font-black text-sm text-slate-900 mb-1">Fabric & Construction</h4>
              <p>{product.description}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl space-y-2 border border-slate-200 shadow-sm">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Material Composition:</span>
                <span className="font-black text-slate-900">{product.fabric_details || '100% Breathable Woven Cotton'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Pattern & Weave:</span>
                <span className="font-black text-slate-900">{product.pattern || 'Structured Woven'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Silhouette Fit:</span>
                <span className="font-black text-slate-900">{product.fit || 'Pre-Shrunk Standard'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Fulfillment Entity:</span>
                <span className="font-black text-slate-900">De Vibe (Ahmedabad, Gujarat)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl flex items-center gap-3">
        <div className="flex-1">
          <span className="block text-[10px] text-slate-500 font-black uppercase">Size: {selectedSize}</span>
          <span className="block text-lg font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="min-h-[48px] px-4 py-2 bg-slate-900 text-white text-xs font-black rounded-xl border border-slate-700 flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" /> Add
        </button>
        <button
          onClick={handleBuyNow}
          className="min-h-[48px] px-4 py-2 bg-levis-red text-white text-xs font-black rounded-xl shadow-lg"
        >
          Partial COD
        </button>
      </div>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
