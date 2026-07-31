'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, Check, ShieldCheck, Truck, AlertCircle } from 'lucide-react';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const isOutOfStock = product.stock_quantity === 0;

  const isNumericCategory = product.category === 'SHIRT' || product.category === 'BOTTOMWEAR';
  const defaultSizes: Size[] = isNumericCategory
    ? (product.category === 'BOTTOMWEAR' ? ['28', '30', '32', '34', '36', '38'] : ['38', '40', '42', '44', '46'])
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const safeSizes: Size[] = (product.sizes && product.sizes.length > 0) ? product.sizes : defaultSizes;
  const safeImages: string[] = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'];

  const [selectedSize, setSelectedSize] = useState<Size>(safeSizes[0] || (isNumericCategory ? '40' : 'M'));
  const [added, setAdded] = useState(false);

  const price = product.price || 1299;
  const originalMrp = product.original_mrp || Math.round(price * 1.8);
  const discountPercent = Math.max(0, Math.round(((originalMrp - price) / originalMrp) * 100));
  const rating = product.rating || 4.8;
  const reviewCount = product.review_count || 148;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`group card-clean rounded-3xl overflow-hidden transition-all duration-300 flex flex-col font-sans relative border shadow-sm ${
      isOutOfStock ? 'border-red-200 bg-red-50/10 opacity-90' : 'border-slate-200 hover:shadow-xl'
    }`}>
      {/* Product Image & Badges */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-slate-100 overflow-hidden">
        <Image
          src={safeImages[0]}
          alt={product.title || 'BahaMut Apparel'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-top transition-transform duration-500 ${
            isOutOfStock ? 'grayscale-30 opacity-75' : 'group-hover:scale-105'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="bg-red-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" /> OUT OF STOCK (MYBILLBOOK SYNC)
            </span>
          ) : (
            <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {product.category === 'BOTTOMWEAR' ? 'NUMERIC BOTTOMWEAR (28–38)' : product.category === 'SHIRT' ? 'NUMERIC SHIRT (38–46)' : 'ALPHABETICAL TEE (S–XXL)'}
            </span>
          )}

          <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-slate-300 shadow-sm w-fit">
            100% Woven Cotton
          </span>
        </div>

        {/* Discount Tag */}
        {discountPercent > 0 && !isOutOfStock && (
          <div className="absolute top-3.5 right-3.5 bg-levis-red text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-md border border-red-400">
            -{discountPercent}% OFF
          </div>
        )}
      </Link>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Amazon-style Rating Stars */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-black text-slate-800">{rating}</span>
            <span className="text-[11px] text-slate-500 font-semibold">({reviewCount})</span>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="text-base font-extrabold text-slate-900 group-hover:text-levis-red transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-2xl font-black text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-slate-400 line-through">
              ₹{originalMrp.toLocaleString('en-IN')}
            </span>
            {isOutOfStock ? (
              <span className="text-[11px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                Stock: 0 Units
              </span>
            ) : (
              <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save ₹{(originalMrp - price).toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Amazon-style Delivery Callout */}
          {!isOutOfStock ? (
            <div className="mt-2.5 text-[11px] font-extrabold text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>FREE Express Delivery by Tomorrow</span>
            </div>
          ) : (
            <div className="mt-2.5 text-[11px] font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
              <span>Sold out in MyBillBook Inventory</span>
            </div>
          )}
        </div>

        {/* Dynamic Sizing Row */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">
            <span>
              {isNumericCategory ? (product.category === 'BOTTOMWEAR' ? 'Numeric Waist Size:' : 'Numeric Shirt Size:') : 'Alphabetical Size:'}
            </span>
            <span className="text-[10px] text-blue-700 font-black">
              {isNumericCategory ? 'Numeric Standard' : 'Alphabetical'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {safeSizes.map(size => (
              <button
                key={size}
                type="button"
                disabled={isOutOfStock}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[42px] min-h-[42px] text-xs font-black rounded-xl border flex items-center justify-center transition-all ${
                  isOutOfStock
                    ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                    : selectedSize === size
                    ? 'border-slate-900 bg-slate-900 text-white shadow-md scale-105'
                    : 'border-slate-300 bg-slate-50 text-slate-800 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className={`w-full min-h-[48px] px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
            isOutOfStock
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : added
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          {isOutOfStock ? (
            <>
              <AlertCircle className="w-4 h-4 text-slate-400" /> OUT OF STOCK
            </>
          ) : added ? (
            <>
              <Check className="w-4 h-4" /> Added Size ({selectedSize})
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Quick Add Size ({selectedSize})
            </>
          )}
        </button>
      </div>
    </div>
  );
}
