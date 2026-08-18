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
      <div className="min-h-[70vh] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-extrabold text-2xl text-slate-900 mb-2">Garment Item Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested product could not be located in our catalog.</p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-devibe-red hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl"
        >
          Return to Catalog
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

  // Structured Data Product Schema for SEO & AI Answer Engines
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'DE VIBE BAHAMUT',
    },
    offers: {
      '@type': 'Offer',
      url: `https://bahamut.in/product/${encodeURIComponent(product.slug)}`,
      priceCurrency: 'INR',
      price: price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: isOutOfStock ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'DE VIBE',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.8,
      reviewCount: product.review_count || 148,
    },
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen pb-24 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-bold">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-slate-900 transition-colors">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-extrabold truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <Image
                src={selectedImage || product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'}
                alt={product.title}
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> DE VIBE ASSURED
              </div>

              {discountPercent > 0 && (
                <span className="absolute top-4 right-4 bg-devibe-red text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-red-400">
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
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? 'border-devibe-red scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
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
            <div className="space-y-2 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Operated by DE VIBE
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900 font-black">{product.rating || 4.8}</span>
                  <span className="text-slate-400 font-semibold">({product.review_count || 148} Verified Reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {product.description}
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

              {/* Offers Box */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-4 h-4 text-emerald-600" /> Available Offers & Perks:
                </span>
                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
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
            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-devibe-red" /> Delivery Availability:
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
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
                  className="flex-1 min-h-[44px] px-3.5 text-xs font-bold bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Check
                </button>
              </form>

              {isPincodeValid ? (
                <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Delivery available to Pincode {pincode} (Delivered within 2–4 Business Days).
                </p>
              ) : (
                <p className="text-[11px] text-red-600 font-bold">
                  Please enter a valid 6-digit Indian PIN code.
                </p>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Select Fit Size:
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
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
                    className={`min-w-[48px] min-h-[44px] text-xs font-black rounded-xl border transition-all ${
                      selectedSize === size
                        ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
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
                className={`min-h-[56px] px-6 py-4 font-black text-xs uppercase tracking-wider rounded-2xl border border-slate-300 flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedToCart
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-slate-50 text-slate-900'
                }`}
              >
                {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-devibe-red" />}
                {addedToCart ? `Added to Bag (${selectedSize})` : `Add to Bag (${selectedSize})`}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="min-h-[56px] px-6 py-4 bg-devibe-red hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Buy Now (Partial COD)
              </button>
            </div>

            {/* Specifications Table */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-3">
                Product Specifications & Fabric Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Fabric Material</span>
                  <span className="font-extrabold text-slate-900">{product.fabric_details || '100% Breathable Woven Cotton'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Origin Hub</span>
                  <span className="font-extrabold text-slate-900">Ambawadi Ahmedabad Mills</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Pattern & Weave</span>
                  <span className="font-extrabold text-slate-900">{product.pattern || 'Structured Woven'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Demographic Sizing</span>
                  <span className="font-extrabold text-slate-900">Unified Indian Fit Matrix</span>
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
