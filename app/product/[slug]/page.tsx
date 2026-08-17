'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/products';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { ShoppingBag, Ruler, Check, ArrowLeft, ShieldCheck, MapPin, Truck, Tag, Star, ChevronRight } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.slug as string;
  const slug = slugParam ? decodeURIComponent(slugParam) : '';

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>('38');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [pincode, setPincode] = useState<string>('380015');
  const [isPincodeValid, setIsPincodeValid] = useState<boolean>(true);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState<boolean>(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      const found = getProductBySlug(slug);
      if (found) {
        setProduct(found);
        if (found.images && found.images.length > 0) {
          setSelectedImage(found.images[0]);
        }
        if (found.sizes && found.sizes.length > 0) {
          setSelectedSize(found.sizes[0]);
        }
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-[70vh] bg-[#0a0a0b] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-heading text-2xl text-white uppercase mb-2">Garment Item Not Found</h2>
        <p className="text-xs text-[#8b8b94] mb-6">The requested product could not be located in our catalog.</p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px]"
        >
          Return to Catalog Drop
        </Link>
      </div>
    );
  }

  const price = product.price || 1299;
  const originalMrp = product.original_mrp || Math.round(price * 1.8);
  const discountPercent = Math.max(0, Math.round(((originalMrp - price) / originalMrp) * 100));
  const isOutOfStock = product.stock_quantity === 0;

  const isNumericCategory = product.category === 'SHIRT' || product.category === 'BOTTOMWEAR';
  const defaultSizes: Size[] = isNumericCategory
    ? (product.category === 'BOTTOMWEAR' ? ['28', '30', '32', '34', '36', '38'] : ['38', '40', '42', '44', '46'])
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const safeSizes: Size[] = (product.sizes && product.sizes.length > 0) ? product.sizes : defaultSizes;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, 1);
    router.push('/checkout');
  };

  const verifyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d{6}$/.test(pincode)) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
  };

  return (
    <div className="bg-[#0a0a0b] text-[#ececed] min-h-screen pb-24 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#121215] border-b border-[#26262c] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#8b8b94] font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-semibold truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] bg-black rounded-[2px] overflow-hidden border border-[#26262c] shadow-2xl">
              <Image
                src={selectedImage || product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'}
                alt={product.title}
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute top-4 left-4 bg-[#8b0018] text-white text-[10px] font-bold px-3 py-1 rounded-[2px] uppercase tracking-widest shadow border border-red-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" /> CLASS 25 REGISTERED
              </div>

              {discountPercent > 0 && (
                <span className="absolute top-4 right-4 bg-[#8b0018] text-white text-xs font-bold px-3 py-1.5 rounded-[2px] shadow border border-red-500">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Grid */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-24 rounded-[2px] overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? 'border-[#8b0018] scale-105 shadow-md' : 'border-[#26262c] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Meta & Purchase Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2 border-b border-[#26262c] pb-6">
              <div className="flex items-center gap-2">
                <span className="bg-[#8b0018]/20 text-[#b3001f] text-[10px] font-bold px-2.5 py-0.5 rounded border border-[#8b0018]/40 uppercase tracking-widest">
                  Operated by De Vibe
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-white">{product.rating || 4.8}</span>
                  <span className="text-slate-500 font-semibold">({product.review_count || 148} Verified Reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl text-white uppercase leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-[#8b8b94] font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-xl space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-heading font-extrabold text-white">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="text-base font-semibold text-slate-500 line-through">
                  ₹{originalMrp.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-[#b3001f] bg-[#8b0018]/20 px-2.5 py-1 rounded border border-[#8b0018]/40">
                  Save ₹{(originalMrp - price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                </span>
              </div>

              {/* Offers Box */}
              <div className="space-y-2 pt-2 border-t border-[#26262c]">
                <span className="text-xs font-heading text-white uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-4 h-4 text-[#b3001f]" /> Payment & Delivery Offers:
                </span>
                <div className="space-y-1.5 text-xs text-slate-300 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#8b0018] rounded-full" />
                    <strong>Partial COD Available:</strong> Pay just ₹200 advance deposit & pay balance at doorstep.
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <strong>Instant Discount:</strong> Extra 5% Instant Cashback on Razorpay UPI / All Bank Cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Pincode Availability Checker */}
            <div className="bg-[#121215] p-5 rounded-[2px] border border-[#26262c] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#b3001f]" /> Delivery Availability:
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Express Dispatch Active
                </span>
              </div>

              <form onSubmit={verifyPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 min-h-[44px] px-3.5 text-xs font-bold bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-5 bg-[#1b1b20] hover:bg-[#8b0018] text-white font-heading text-xs uppercase tracking-wider border border-[#26262c] rounded-[2px] transition-all"
                >
                  Check
                </button>
              </form>

              {isPincodeValid ? (
                <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Delivery available to Pincode {pincode} (Delivered within 2–4 Business Days).
                </p>
              ) : (
                <p className="text-[11px] text-rose-400 font-semibold">
                  Please enter a valid 6-digit Indian PIN code.
                </p>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3 bg-[#121215] p-5 rounded-[2px] border border-[#26262c]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading text-white uppercase tracking-wider">
                  Select Fit Size:
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  className="text-xs font-bold text-[#b3001f] hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4" /> View Size Assistant
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {safeSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={isOutOfStock}
                    className={`min-w-[48px] min-h-[44px] text-xs font-bold rounded-[2px] border transition-all ${
                      selectedSize === size
                        ? 'border-[#8b0018] bg-[#8b0018] text-white shadow glow-crimson'
                        : 'border-[#26262c] bg-[#1b1b20] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`min-h-[56px] px-6 py-4 font-heading text-xs uppercase tracking-wider rounded-[2px] border border-[#26262c] flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#121215] hover:bg-[#1b1b20] text-white'
                }`}
              >
                {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-[#b3001f]" />}
                {addedToCart ? `Added Bag (${selectedSize})` : `Add to Bag (${selectedSize})`}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="min-h-[56px] px-6 py-4 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-wider rounded-[2px] shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 glow-crimson"
              >
                Buy Now (Partial COD)
              </button>
            </div>

            {/* Specifications Table */}
            <div className="bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-sm space-y-4">
              <h4 className="font-heading text-xs text-white uppercase border-b border-[#26262c] pb-3">
                Product Specifications & Fabric Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#8b8b94] block">Fabric Material</span>
                  <span className="font-semibold text-white">{product.fabric_details || '100% Breathable Woven Cotton'}</span>
                </div>
                <div>
                  <span className="text-[#8b8b94] block">Origin Hub</span>
                  <span className="font-semibold text-white">Ahmedabad Textile Mills</span>
                </div>
                <div>
                  <span className="text-[#8b8b94] block">Pattern & Weave</span>
                  <span className="font-semibold text-white">{product.pattern || 'Structured Woven'}</span>
                </div>
                <div>
                  <span className="text-[#8b8b94] block">Demographic Sizing</span>
                  <span className="font-semibold text-white">Unified Indian Fit Matrix</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SizeGuideModal
        isOpen={isSizeModalOpen}
        onClose={() => setIsSizeModalOpen(false)}
        initialCategory={product.category}
      />
    </div>
  );
}
