'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts, INITIAL_PRODUCTS } from '@/lib/products';
import { Product } from '@/lib/types';
import { SlidersHorizontal, ArrowUpDown, Filter, RefreshCw, Ruler, ShieldCheck } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams ? searchParams.get('cat') : null;

  // Pre-populate with INITIAL_PRODUCTS to guarantee SSR renders catalog immediately
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(catParam || 'ALL');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('ALL');
  const [selectedColor, setSelectedColor] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    if (catParam) {
      setSelectedCategory(catParam);
      setSelectedSizeFilter('ALL');
    }
  }, [catParam]);

  // Dynamically compute relevant size range based on active category
  const activeSizeList = useMemo(() => {
    if (selectedCategory === 'BOTTOMWEAR') {
      return ['ALL', '28', '30', '32', '34', '36', '38'];
    }
    if (selectedCategory === 'SHIRT') {
      return ['ALL', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    }
    if (selectedCategory === 'TEE') {
      return ['ALL', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    }
    // Default for ALL: show Denim waist sizes 28-38 if viewing bottomwear catalog
    return ['ALL', '28', '30', '32', '34', '36', '38'];
  }, [selectedCategory]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSizeFilter('ALL');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedSizeFilter !== 'ALL') {
        const productAvail = p.available_sizes || p.sizes || [];
        if (!productAvail.includes(selectedSizeFilter as any)) {
          return false;
        }
      }
      if (selectedColor !== 'ALL' && p.color !== selectedColor) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price_high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [products, selectedCategory, selectedSizeFilter, selectedColor, sortBy]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach((p) => {
      if (p.color) colors.add(p.color);
    });
    return Array.from(colors);
  }, [products]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedSizeFilter('ALL');
    setSelectedColor('ALL');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#F7F7F8] text-[#111111] min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E5E5E5] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#111111] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-2 shadow">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TM NO. 5018168 • CLASS 25
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-wider">
              BahaMut Master Catalog
            </h1>
            <p className="text-xs text-[#666666] font-medium mt-1">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel engineered at Ahmedabad textile mills.
            </p>
          </div>

          <button
            onClick={() => setIsSizeModalOpen(true)}
            className="min-h-[44px] px-6 py-2.5 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all w-fit shadow-md"
          >
            <Ruler className="w-4 h-4 text-emerald-400" /> Size Assistant Matrix
          </button>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filter Controls */}
          <aside className="lg:col-span-3 bg-white p-6 border border-[#E5E5E5] shadow-sm space-y-6 h-fit">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <h3 className="font-bold text-xs text-[#111111] uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#111111]" /> Filter Catalog
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#666666] hover:text-[#111111] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'ALL', label: 'All Apparel' },
                  { id: 'BOTTOMWEAR', label: '👖 Jeans — Waist 28–38' },
                  { id: 'SHIRT', label: '👔 Shirts — S to 3XL' },
                  { id: 'TEE', label: '👕 T-Shirts — S to 3XL' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-3 py-2 transition-all font-semibold text-xs ${
                      selectedCategory === cat.id
                        ? 'bg-[#111111] text-white font-bold'
                        : 'text-[#666666] hover:bg-[#F7F7F8] hover:text-[#111111]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Category Size Filter (Strict Category Range Only) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  Filter By Size
                </label>
                {selectedCategory === 'BOTTOMWEAR' && (
                  <span className="text-[10px] font-bold text-blue-600">Waist (28–38)</span>
                )}
                {selectedCategory === 'SHIRT' && (
                  <span className="text-[10px] font-bold text-blue-600">Shirt (S–3XL)</span>
                )}
                {selectedCategory === 'TEE' && (
                  <span className="text-[10px] font-bold text-blue-600">Tee (S–3XL)</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSizeList.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`min-w-[36px] h-9 text-xs font-bold border transition-all ${
                      selectedSizeFilter === sz
                        ? 'border-[#111111] bg-[#111111] text-white shadow'
                        : 'border-[#E5E5E5] bg-[#F7F7F8] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            {availableColors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                  Colorway
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full text-xs font-bold py-2 px-3 bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
                >
                  <option value="ALL">All Colors</option>
                  {availableColors.map((clr) => (
                    <option key={clr} value={clr}>
                      {clr}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </aside>

          {/* Catalog Product Grid */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between bg-white p-4 border border-[#E5E5E5] shadow-sm gap-4">
              <span className="text-xs text-[#666666] font-bold uppercase tracking-wider">
                Showing <strong className="text-[#111111]">{filteredProducts.length}</strong> Master Garments
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#111111]" />
                <span className="text-xs font-bold text-[#111111] uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold py-2 px-3 bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none"
                >
                  <option value="featured">Featured Drops</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center border border-[#E5E5E5] space-y-4">
                <Filter className="w-12 h-12 text-[#111111] mx-auto opacity-70" />
                <h3 className="font-bold text-lg text-[#111111] uppercase">No Matching Items Found</h3>
                <p className="text-xs text-[#666666]">Try resetting your size or category filter.</p>
                <button
                  onClick={resetFilters}
                  className="min-h-[44px] px-6 py-2 bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center text-[#111111] font-bold text-xs">Loading Catalog Drop...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
