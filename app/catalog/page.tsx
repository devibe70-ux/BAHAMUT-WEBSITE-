'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';
import { getProducts } from '@/lib/products';
import { Product } from '@/lib/types';
import { SlidersHorizontal, ArrowUpDown, Filter, RefreshCw, Ruler, ShieldCheck } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams ? searchParams.get('cat') : null;

  const [products, setProducts] = useState<Product[]>([]);
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
    }
  }, [catParam]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedSizeFilter !== 'ALL' && p.sizes && !p.sizes.includes(selectedSizeFilter as any)) {
        return false;
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
    <div className="bg-[#0a0a0b] text-[#ececed] min-h-screen pb-24 font-sans">
      {/* Header Banner */}
      <section className="bg-[#121215] border-b border-[#26262c] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8b0018] text-white text-[10px] font-bold px-3 py-1 rounded-[2px] uppercase tracking-widest mb-2 shadow">
              <ShieldCheck className="w-3.5 h-3.5" /> TM NO. 5018168 • CLASS 25
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-white uppercase tracking-wider">
              Complete Catalog Drop
            </h1>
            <p className="text-xs text-[#8b8b94] font-medium mt-1">
              Direct-from-manufacturer 100% Breathable Woven Cotton apparel engineered at Ahmedabad mills.
            </p>
          </div>

          <button
            onClick={() => setIsSizeModalOpen(true)}
            className="min-h-[44px] px-6 py-2.5 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] shadow-lg flex items-center gap-2 transition-all w-fit glow-crimson"
          >
            <Ruler className="w-4 h-4" /> Size Assistant Matrix
          </button>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filter Controls */}
          <aside className="lg:col-span-3 bg-[#121215] p-6 rounded-[2px] border border-[#26262c] shadow-xl space-y-6 h-fit">
            <div className="flex items-center justify-between border-b border-[#26262c] pb-4">
              <h3 className="font-heading text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#b3001f]" /> Filter Catalog
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#8b8b94] hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                Category
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'ALL', label: 'All Items' },
                  { id: 'SHIRT', label: '👔 Shirts (Numeric 38–46)' },
                  { id: 'BOTTOMWEAR', label: '👖 Bottomwear (Numeric 28–38)' },
                  { id: 'TEE', label: '👕 Tees (Alphabetical S–XXL)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-[2px] transition-all font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-[#8b0018] text-white font-bold'
                        : 'text-slate-300 hover:bg-[#1b1b20]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2">
              <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                Filter By Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['ALL', '38', '40', '42', '44', '46', '28', '30', '32', '34', '36', 'S', 'M', 'L', 'XL', 'XXL'].map(
                  (sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSizeFilter(sz)}
                      className={`min-w-[32px] h-8 text-[11px] font-bold rounded-[2px] border transition-all ${
                        selectedSizeFilter === sz
                          ? 'border-[#8b0018] bg-[#8b0018] text-white shadow'
                          : 'border-[#26262c] bg-[#1b1b20] text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {sz}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Color Filter */}
            {availableColors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-heading text-[#8b8b94] uppercase tracking-wider block">
                  Colorway
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full text-xs font-bold py-2 px-3 bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
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
            <div className="flex flex-wrap items-center justify-between bg-[#121215] p-4 rounded-[2px] border border-[#26262c] shadow-md gap-4">
              <span className="text-xs text-[#8b8b94] font-bold uppercase tracking-wider">
                Showing <strong className="text-white font-heading">{filteredProducts.length}</strong> Products
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-[#b3001f]" />
                <span className="text-xs font-heading text-[#8b8b94] uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold py-2 px-3 bg-[#1b1b20] text-white border border-[#26262c] rounded-[2px] focus:ring-1 focus:ring-[#8b0018]"
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
              <div className="bg-[#121215] rounded-[2px] p-12 text-center border border-[#26262c] space-y-4">
                <Filter className="w-12 h-12 text-[#8b0018] mx-auto opacity-70" />
                <h3 className="font-heading text-lg text-white uppercase">No Matching Items Found</h3>
                <p className="text-xs text-[#8b8b94]">Try resetting your size or category filter.</p>
                <button
                  onClick={resetFilters}
                  className="min-h-[44px] px-6 py-2 bg-[#8b0018] hover:bg-[#b3001f] text-white font-heading text-xs uppercase tracking-widest rounded-[2px] transition-all"
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
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center text-white font-heading">Loading Catalog Drop...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
