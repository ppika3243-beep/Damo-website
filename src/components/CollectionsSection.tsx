import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CollectionsSectionProps {
  products: Product[];
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickBuy: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

type FilterCategory = 'all' | "men's" | "women's" | 'new arrivals';
type SortOption = 'default' | 'price-low' | 'price-high' | 'name';

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  products,
  onAddToCart,
  onQuickBuy,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: "men's", label: "Men's Collection" },
    { id: "women's", label: "Women's Collection" },
    { id: 'new arrivals', label: 'New Arrivals' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter logic
    if (activeTab === "men's") {
      list = list.filter((p) => p.category === "Men's" || p.category === 'Unisex');
    } else if (activeTab === "women's") {
      list = list.filter((p) => p.category === "Women's" || p.category === 'Unisex');
    } else if (activeTab === 'new arrivals') {
      list = list.filter((p) => p.isNewArrival || p.badge === 'New' || p.badge === 'Trending');
    }

    // Sorting logic
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, activeTab, sortBy]);

  return (
    <section id="shop" className="py-16 sm:py-20 border-t border-white/5 relative">
      <div id="collections" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Everyday Wardrobe</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Our Core Collection
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Engineered with premium combed cotton, thoughtful tailoring, and modern cuts suited for the Bangladesh lifestyle.
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#171a22] border border-white/10 px-3 py-2 rounded-xl text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by"
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-[#171a22] text-white">Featured</option>
                <option value="price-low" className="bg-[#171a22] text-white">Price: Low to High</option>
                <option value="price-high" className="bg-[#171a22] text-white">Price: High to Low</option>
                <option value="name" className="bg-[#171a22] text-white">Product Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'bg-[#161921] text-slate-300 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickBuy={onQuickBuy}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Free delivery banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#171b23] via-[#1c202a] to-[#171b23] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-base font-bold text-white">
              Need a custom bundle or corporate order?
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              We offer personalized sizing and bulk discounts for events, startups, and universities in Bangladesh.
            </div>
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Inquire on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
