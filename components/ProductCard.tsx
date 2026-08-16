'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Size } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { ShoppingBag, Ruler, Check, ShieldCheck, Star } from 'lucide-react';

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
    <article className="group bg-[#121215] rounded-[2px] overflow-hidden border border-[#26262c] hover:border-[#8b0018] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl">
      {/* 4:5 Aspect Ratio Product Image Container */}
      <div className="relative aspect-[4/5] bg-black overflow-hidden">
        <Link href={`/product/${encodeURIComponent(product.slug)}`}>
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
              isOutOfStock ? 'grayscale opacity-60' : ''
            }`}
          />
          {hoverImage !== mainImage && !isOutOfStock && (
            <Image
              src={hoverImage}
              alt={`${product.title} Hover`}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover object-top transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute inset-0"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <span className="bg-[#8b0018] text-white text-[9px] font-bold px-2.5 py-1 rounded-[2px] uppercase tracking-widest shadow flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-300" /> CLASS 25
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#8b0018] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow border border-red-500">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <span className="bg-[#8b0018] text-white font-heading text-xs px-4 py-2 rounded-[2px] uppercase tracking-widest shadow-xl">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Rating & Delivery Badge */}
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white font-black">{product.rating || 4.8}</span>
              <span className="text-slate-500 font-semibold">({product.review_count || 148})</span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">
              FREE Express
            </span>
          </div>

          <Link href={`/product/${encodeURIComponent(product.slug)}`}>
            <h3 className="font-semibold text-sm text-white line-clamp-2 hover:text-[#b3001f] transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11px] text-[#8b8b94] mt-1 font-medium">
            {product.fabric_details || '240 GSM Woven Cotton • De Vibe Mill'}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-lg font-bold text-white font-heading">
              ₹{price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-500 line-through">
              ₹{originalMrp.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Size Selection Chips */}
        <div className="space-y-2 pt-3 border-t border-[#26262c]">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#8b8b94]">
            <span>FIT SIZE:</span>
            <button
              type="button"
              onClick={() => setIsSizeModalOpen(true)}
              className="text-[#b3001f] font-bold hover:underline flex items-center gap-0.5"
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
                className={`min-w-[32px] h-7 text-[11px] font-bold rounded-[2px] border transition-all ${
                  selectedSize === size
                    ? 'border-[#8b0018] bg-[#8b0018] text-white shadow-sm'
                    : 'border-[#26262c] bg-[#1b1b20] text-slate-300 hover:border-slate-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full min-h-[42px] mt-2 rounded-[2px] font-heading text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : added
                ? 'bg-emerald-700 text-white'
                : 'bg-[#8b0018] hover:bg-[#b3001f] text-white glow-crimson'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added Bag ({selectedSize})
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Bag ({selectedSize})
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
    </article>
  );
}
