'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { ShieldCheck, Truck, Sparkles, Ruler, ShoppingBag, Check, ArrowLeft, Tag, Flame, Shield, PackageCheck, Star, MapPin, RefreshCw, Award, CheckCircle2, Zap } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug as string;
  const slug = rawSlug ? decodeURIComponent(rawSlug) : '';

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<Size>('40');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pincode, setPincode] = useState('380015');
  const [deliveryChecked, setDeliveryChecked] = useState(true);

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

  const isNumericCategory = product.category === 'SHIRT' || product.category === 'BOTTOMWEAR';
  const defaultSizes: Size[] = isNumericCategory
    ? (product.category === 'BOTTOMWEAR' ? ['28', '30', '32', '34', '36', '38'] : ['38', '40', '42', '44', '46'])
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const safeSizes: Size[] = (product.sizes && product.sizes.length > 0) ? product.sizes : defaultSizes;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-36 lg:pb-20 font-sans">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-slate-900">Catalog</Link>
        <span>/</span>
        <span className="text-slate-900 font-black truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4 sticky top-28">
          <div className="relative aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <Image
              src={selectedImage || safeImages[0]}
              alt={product.title || 'BahaMut Apparel'}
              fill
              priority
              className="object-cover object-top"
            />
            {/* De Vibe Assured Tag */}
            <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> DE VIBE ASSURED
            </div>

            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-devibe-red text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-red-400">
                {discountPercent}% OFF
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
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
                ★ 4.9 Star Customer Ratings (184 Reviews)
              </span>
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
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-base font-semibold text-slate-400 line-through">
                ₹{originalMrp.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                Save ₹{(originalMrp - price).toLocaleString('en-IN')} ({discountPercent}% OFF)
              </span>
            </div>

            {/* Available Offers & Perks */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-4 h-4 text-emerald-600" /> Available Offers & Perks:
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <strong>Partial COD Available:</strong> Pay just ₹200 advance deposit & pay cash at doorstep.
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <strong>Instant Discount:</strong> Extra 5% Instant Cashback on Razorpay UPI / All Bank Cards.
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-devibe-red" /> Delivery & Service Availability:
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Express Dispatch
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3.5 text-xs font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
              />
              <button
                onClick={() => setDeliveryChecked(true)}
                className="px-4 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800"
              >
                Check
              </button>
            </div>

            {deliveryChecked && (
              <div className="text-xs font-extrabold text-emerald-800 bg-emerald-50 p-3 rounded-2xl border border-emerald-200 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span><strong>FREE Express Delivery by Tomorrow</strong> to {pincode}</span>
                </p>
                <p className="text-[11px] text-slate-600 font-semibold pl-5">
                  Fulfilled directly from De Vibe Hub (Revdi Bazar, Kalupur, Ahmedabad).
                </p>
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-700 uppercase tracking-widest">
                {isNumericCategory ? (product.category === 'BOTTOMWEAR' ? 'Numeric Waist Size (28–38):' : 'Numeric Shirt Size (38–46):') : 'Alphabetical Tee Size (S–XXL):'}
              </label>
              <button
                type="button"
                onClick={() => setIsSizeModalOpen(true)}
                className="text-xs font-black text-blue-700 hover:underline flex items-center gap-1"
              >
                <Ruler className="w-4 h-4" /> Size Assistant Guide
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
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={handleAddToCart}
              className={`min-h-[56px] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                added ? 'bg-emerald-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added Size ({selectedSize})
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart ({selectedSize})
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="min-h-[56px] px-6 py-4 bg-devibe-red hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Buy Now (Partial COD)
            </button>
          </div>

          {/* Product Specifications Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3">Product Specifications & Fabric Details</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 font-semibold block text-[11px]">Material Composition</span>
                <span className="font-black text-slate-900">{product.fabric_details || '100% Woven Cotton'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 font-semibold block text-[11px]">Pattern / Weave</span>
                <span className="font-black text-slate-900">{product.pattern || 'Structured Woven'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 font-semibold block text-[11px]">Fit Type</span>
                <span className="font-black text-slate-900">{product.fit || 'Regular Comfort'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 font-semibold block text-[11px]">Mill Origin</span>
                <span className="font-black text-slate-900">Ahmedabad Textile Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        initialCategory={product.category}
      />
    </div>
  );
}
