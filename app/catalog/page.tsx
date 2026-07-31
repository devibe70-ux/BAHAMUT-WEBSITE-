'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles, Shield, Ruler } from 'lucide-react';
import { getProducts } from '@/lib/products';
import { Product, Size } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import SizeGuideModal from '@/components/SizeGuideModal';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialSleeve = searchParams.get('sleeve');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [selectedSleeve, setSelectedSleeve] = useState<string>(initialSleeve || 'ALL');
  const [selectedPattern, setSelectedPattern] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING'>('NEWEST');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const toggleSize = (size: Size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedSleeve('ALL');
    setSelectedPattern('ALL');
    setSearchQuery('');
    setMaxPrice(3000);
    setSortBy('NEWEST');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        if (selectedSizes.length > 0) {
          const hasMatchingSize = selectedSizes.some(s => product.sizes?.includes(s));
          if (!hasMatchingSize) return false;
        }
        if (selectedSleeve !== 'ALL' && product.sleeve !== selectedSleeve) {
          return false;
        }
        if (selectedPattern !== 'ALL' && product.pattern !== selectedPattern) {
          return false;
        }
        if (product.price > maxPrice) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesTitle = product.title.toLowerCase().includes(q);
          const matchesDesc = product.description.toLowerCase().includes(q);
          const matchesFabric = product.fabric_details.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesFabric) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_LOW') return a.price - b.price;
        if (sortBy === 'PRICE_HIGH') return b.price - a.price;
        if (sortBy === 'RATING') return (b.rating || 0) - (a.rating || 0);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [products, selectedSizes, selectedSleeve, selectedPattern, maxPrice, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            UNIFIED COLLECTION (AGES 13–65)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            BahaMut Woven Cotton Catalog
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-semibold">
            Direct-from-manufacturer 100% Breathable Woven Cotton shirts from Ahmedabad textile hub.
          </p>
        </div>

        <button
          onClick={() => setIsSizeModalOpen(true)}
          className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2 bg-blue-50 text-blue-700 font-extrabold text-xs rounded-2xl border border-blue-200 hover:bg-blue-100 transition-all w-fit"
        >
          <Ruler className="w-4 h-4" /> Size Assistant Guide
        </button>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" /> Catalog Filters
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Search Bar */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-2">
              Search Keywords
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Oxford, Chambray, Prints..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-2">
              Filter by Size (Ages 13–65)
            </label>
            <div className="flex flex-wrap gap-2">
              {(['S', 'M', 'L', 'XL', 'XXL'] as Size[]).map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`min-w-[44px] min-h-[44px] text-xs font-black rounded-xl border flex items-center justify-center transition-all ${
                    selectedSizes.includes(size)
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Sleeve Length Filter */}
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-2">
              Sleeve Type
            </label>
            <select
              value={selectedSleeve}
              onChange={e => setSelectedSleeve(e.target.value)}
              className="w-full text-xs font-bold py-2.5 px-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
            >
              <option value="ALL">All Sleeves</option>
              <option value="Full Sleeve">Full Sleeve</option>
              <option value="Half Sleeve">Half Sleeve</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Max Price:</span>
              <span className="text-blue-600 font-black">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="999"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </aside>

        {/* Catalog Results Grid */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Bar Sort & Count */}
          <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm gap-4">
            <span className="text-xs font-extrabold text-slate-700">
              Showing <span className="text-blue-600 font-black">{filteredProducts.length}</span> items (Ages 13–65)
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs font-black py-2 px-3 bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
              >
                <option value="NEWEST">Newest Arrivals</option>
                <option value="RATING">Highest Rated ★</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-black text-slate-900">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                Try loosening your filters or resetting the search query.
              </p>
              <button
                onClick={resetFilters}
                className="min-h-[48px] px-6 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-slate-800 uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      <SizeGuideModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs font-bold text-slate-500">Loading BahaMut Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
