'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { ShoppingBag, Ruler, Check, Truck, ShieldCheck, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const isNumericCategory = product.category === 'SHIRT' || product.category === 'BOTTOMWEAR';
  const defaultSizes: Size[] = isNumericCategory
    ? (product.category === 'BOTTOMWEAR' ? ['28', '30', '32', '34', '36', '38'] : ['38', '40', '42', '44', '46'])
    : ['S', 'M', 'L', 'XL', 'XXL'];

  const safeSizes: Size[] = (product.sizes && product.sizes.length > 0) ? product.sizes : defaultSizes;
  const [selectedSize, setSelectedSize] = useState<Size>(safeSizes[0]);

  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80';
  const hoverImage = product.images?.[1] || mainImage;
  const isOutOfStock = product.stock_quantity === 0;

  const price = product.price || 1299;
  const originalMrp = product.original_mrp || Math.round(price * 1.8);
  const discountPercent = Math.max(0, Math.round(((originalMrp - price) / originalMrp) * 100));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
        <Link href={`/product/${encodeURIComponent(product.slug)}`}>
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            className={`object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
              isOutOfStock ? 'grayscale opacity-75' : ''
            }`}
          />
          {hoverImage !== mainImage && !isOutOfStock && (
            <Image
              src={hoverImage}
              alt={`${product.title} Hover`}
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute inset-0"
            />
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-slate-900 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow border border-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> DE VIBE ASSURED
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-levis-red text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow border border-red-400">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <span className="bg-rose-600 text-white font-black text-xs px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Delivery Badge */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="text-slate-900 font-black">{product.rating || 4.8}</span>
              <span className="text-slate-400 font-semibold">({product.review_count || 148})</span>
            </div>
            <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              FREE Express
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${encodeURIComponent(product.slug)}`}>
            <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2 hover:text-levis-red transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11px] font-bold text-slate-500 mt-0.5">
            {product.fabric_details || '100% Woven Cotton'}
          </p>

          {/* Pricing Box */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg font-black text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-slate-400 line-through">
              ₹{originalMrp.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Save ₹{(originalMrp - price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Size Selection Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
            <span>SELECT FIT SIZE:</span>
            <button
              type="button"
              onClick={() => setIsSizeModalOpen(true)}
              className="text-blue-700 font-black hover:underline flex items-center gap-0.5"
            >
              <Ruler className="w-3 h-3" /> Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {safeSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                disabled={isOutOfStock}
                className={`min-w-[32px] h-8 text-[11px] font-black rounded-lg border transition-all ${
                  selectedSize === size
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full min-h-[44px] mt-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added ({selectedSize})
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add Size ({selectedSize})
              </>
            )}
          </button>
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
