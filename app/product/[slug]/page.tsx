'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import {
  ShoppingBag,
  Ruler,
  Truck,
  RotateCcw,
  Check,
  ShieldCheck,
  Tag,
  Star,
  MapPin,
  ChevronRight,
  Flame,
  Clock,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [pincode, setPincode] = useState('380015');
  const [isPincodeValid, setIsPincodeValid] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images?.[0] || '');

        // Determine available sizes out of the 5-size matrix
        const avail = foundProduct.available_sizes || foundProduct.sizes || [];
        if (avail.length > 0) {
          setSelectedSize(avail[0]);
        }
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-bold text-slate-900">Garment Listing Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested product may have been updated or removed from the catalog.
        </p>
        <Link
          href="/catalog"
          className="inline-block mt-6 px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-slate-800"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const price = product.price || 1299;
  const originalMrp = product.original_mrp || 2499;
  const discountPercent = Math.round(((originalMrp - price) / originalMrp) * 100);
  const isOutOfStock = (product.stock_quantity || 0) <= 0;

  // Standard 5-Size Matrix Determination based on product category
  let standard5Matrix: Size[] = [];
  const cat = (product.category || '').toUpperCase();
  if (cat.includes('SHIRT')) {
    standard5Matrix = ['38', '40', '42', '44', '46'];
  } else if (cat.includes('BOTTOM') || cat.includes('PANT') || cat.includes('DENIM')) {
    standard5Matrix = ['28', '30', '32', '34', '36'];
  } else {
    standard5Matrix = ['S', 'M', 'L', 'XL', 'XXL'];
  }

  const availableSizes = product.available_sizes || product.sizes || [];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, 1);
    router.push('/checkout');
  };

  const verifyPincode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPincodeValid(/^\d{6}$/.test(pincode));
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
                <span className="absolute top-4 right-4 bg-red-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border border-red-400">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-center text-xs font-bold text-slate-700 shadow-sm">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-slate-900" />
                <span className="text-[11px]">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-slate-200">
                <RotateCcw className="w-5 h-5 text-slate-900" />
                <span className="text-[11px]">7-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-slate-900" />
                <span className="text-[11px]">Ambawadi Mills</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-slate-200">
                  {product.category || 'Apparel'}
                </span>
                {product.gtin && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                    GTIN: {product.gtin}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
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
                    <strong>Instant Discount:</strong> Extra 5% Instant Cashback on Razorpay / Cashfree UPI / All Bank Cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Pincode Availability Checker */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-900" /> Delivery Availability:
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

            {/* Standard 5-Size Matrix Selector with SOLD OUT Badging */}
            <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Select Fit Size (Standard 5-Size Matrix):
                </span>
                <button
                  onClick={() => setIsSizeModalOpen(true)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4" /> View Size Assistant
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {standard5Matrix.map((size) => {
                  const isAvailable = availableSizes.includes(size) && !isOutOfStock;
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      disabled={!isAvailable}
                      className={`relative min-h-[50px] p-2 text-xs font-extrabold rounded-xl border flex flex-col items-center justify-center transition-all ${
                        !isAvailable
                          ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through opacity-60'
                          : selectedSize === size
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400'
                      }`}
                    >
                      <span>{size}</span>
                      {!isAvailable && (
                        <span className="text-[8px] font-black uppercase text-red-600 no-underline tracking-tighter mt-0.5">
                          SOLD OUT
                        </span>
                      )}
                    </button>
                  );
                })}
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
                {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4 text-slate-900" />}
                {addedToCart ? `Added to Bag (${selectedSize})` : `Add to Bag (${selectedSize})`}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="min-h-[56px] px-6 py-4 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Buy Now (Partial COD)
              </button>
            </div>
          </div>
        </div>
      </main>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}
