import React, { useState } from 'react';
import { ShoppingCart, Zap, Eye, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickBuy: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickBuy,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  const handleQuickBuy = () => {
    onQuickBuy(product, selectedSize, quantity);
  };

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="group bg-[#14171e] rounded-2xl border border-white/10 overflow-hidden flex flex-col transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/40">
      
      {/* Image Container with Badges and Quick View */}
      <div className="relative aspect-[4/5] bg-[#1a1d25] overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-black shadow-md">
              {product.badge}
            </span>
          )}
          {product.category && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 backdrop-blur-md text-slate-300 border border-white/10">
              {product.category}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/80 border border-white/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Multi-angle dots if product has multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? 'bg-amber-400 w-4' : 'bg-white/40 hover:bg-white/70'
                }`}
                title={`View angle ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title and Price */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-white font-heading hover:text-amber-400 transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 mt-1.5">
            <span className="text-xl font-extrabold text-amber-400 font-mono-num">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through font-mono-num">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-[11px] text-slate-400 ml-auto">
              {product.gsm || product.fabric}
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Select Size:</span>
            <button
              onClick={() => onQuickView(product)}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
            >
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[34px] h-[32px] px-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                    : 'bg-[#1a1e27] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-300 font-medium">Quantity:</span>
          <div className="flex items-center rounded-lg bg-[#1a1e27] border border-white/10 p-0.5">
            <button
              onClick={decrementQty}
              disabled={quantity <= 1}
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-white font-mono-num">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              disabled={quantity >= 10}
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Actions: Add to Cart & Order Now */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-500 text-black border-emerald-500'
                : 'bg-[#1b1f29] text-white border-white/15 hover:bg-[#242936] hover:border-white/30 active:scale-[0.98]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">Add to Cart</span>
              </>
            )}
          </button>

          {/* Order Now (Immediate direct checkout) */}
          <button
            onClick={handleQuickBuy}
            className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-md shadow-amber-400/15 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span className="whitespace-nowrap">Order Now</span>
          </button>
        </div>

      </div>

    </div>
  );
};
