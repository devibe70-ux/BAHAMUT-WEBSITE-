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
    <div className="group card-clean overflow-hidden transition-all duration-200 flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-[#F7F7F8] overflow-hidden">
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

        {/* Minimal Badges */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#111111] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-neutral-300" /> DE VIBE ASSURED
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white text-[#111111] border border-[#E5E5E5] text-[10px] font-bold px-2 py-0.5">
              -{discountPercent}%
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#111111]/70 flex items-center justify-center p-4">
            <span className="bg-white text-[#111111] font-bold text-xs px-3 py-1 uppercase tracking-wider">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Minimal Product Info */}
      <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1 font-medium text-[#666666]">
            <div className="flex items-center gap-1 text-[#111111]">
              <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" />
              <span className="font-bold">{product.rating || 4.8}</span>
              <span className="text-[#666666]">({product.review_count || 148})</span>
            </div>
            <span className="text-[10px] font-semibold text-[#111111] uppercase">
              100% Woven Cotton
            </span>
          </div>

          <Link href={`/product/${encodeURIComponent(product.slug)}`}>
            <h3 className="font-bold text-sm text-[#111111] line-clamp-2 hover:underline">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11px] text-[#666666] mt-1 line-clamp-1">
            {product.fabric_details || '100% Woven Cotton • Ambawadi Ahmedabad'}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-extrabold text-[#111111]">
              ₹{price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#999999] line-through font-medium">
              ₹{originalMrp.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Minimal Size Selection */}
        <div className="space-y-2 pt-2 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#666666]">
            <span>SELECT FIT SIZE:</span>
            <button
              type="button"
              onClick={() => setIsSizeModalOpen(true)}
              className="text-[#111111] underline hover:text-black flex items-center gap-0.5"
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
                className={`min-w-[32px] h-7 text-[11px] font-bold border transition-all ${
                  selectedSize === size
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111] hover:border-[#111111]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Minimal Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full min-h-[40px] mt-2 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
              isOutOfStock
                ? 'bg-[#E5E5E5] text-[#999999] cursor-not-allowed'
                : added
                ? 'bg-neutral-800 text-white'
                : 'bg-[#111111] hover:bg-black text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added ({selectedSize})
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
    </div>
  );
}
