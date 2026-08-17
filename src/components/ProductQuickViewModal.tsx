import React, { useState } from 'react';
import { X, Check, ShoppingCart, Zap, Shield, Sparkles, Ruler } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickBuy: (product: Product, size: string, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickBuy,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'size-chart' | 'care'>('details');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  const handleQuickBuy = () => {
    onQuickBuy(product, selectedSize, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#14171f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery */}
          <div className="p-6 bg-[#181b24] flex flex-col justify-between">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black/20 border border-white/5 relative">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-400 text-black text-[11px] font-bold uppercase tracking-wider shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 mt-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === index ? 'border-amber-400' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info and Purchase */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {product.category} Fashion
              </div>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">
                {product.name}
              </h3>

              {/* Pricing */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-extrabold text-amber-400 font-mono-num">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono-num">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Sub-tabs for detailed info */}
              <div className="flex items-center gap-4 border-b border-white/10 mt-5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'details' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fabric & Fit
                </button>
                <button
                  onClick={() => setActiveTab('size-chart')}
                  className={`pb-2 transition-colors cursor-pointer flex items-center gap-1 ${
                    activeTab === 'size-chart' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Ruler className="w-3 h-3" />
                  <span>Measurements</span>
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'care' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Care
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-3 min-h-[100px] text-xs text-slate-300">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed text-slate-300">{detail}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Fabric Composition:</span>
                      <span className="font-semibold text-white">{product.fabric}</span>
                    </div>
                    {product.gsm && (
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Weight & Density:</span>
                        <span className="font-semibold text-white">{product.gsm}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Cut & Silhouette:</span>
                      <span className="font-semibold text-white">{product.fit}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'size-chart' && (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400">Dimensions in inches (Chest x Length):</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono-num">
                      <div className="p-1.5 rounded bg-[#1a1d26] border border-white/10">
                        <div className="font-bold text-amber-400">S</div>
                        <div className="text-[10px] text-slate-400">38&quot; x 27&quot;</div>
                      </div>
                      <div className="p-1.5 rounded bg-[#1a1d26] border border-white/10">
                        <div className="font-bold text-amber-400">M</div>
                        <div className="text-[10px] text-slate-400">40&quot; x 28&quot;</div>
                      </div>
                      <div className="p-1.5 rounded bg-[#1a1d26] border border-white/10">
                        <div className="font-bold text-amber-400">L</div>
                        <div className="text-[10px] text-slate-400">42&quot; x 29&quot;</div>
                      </div>
                      <div className="p-1.5 rounded bg-[#1a1d26] border border-white/10">
                        <div className="font-bold text-amber-400">XL</div>
                        <div className="text-[10px] text-slate-400">44&quot; x 30&quot;</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'care' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.care.map((c, idx) => (
                      <li key={idx} className="leading-relaxed text-slate-300">{c}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Size Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] h-[36px] px-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                          : 'bg-[#1a1d26] text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center rounded-lg bg-[#1a1d26] border border-white/10 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white font-mono-num">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl bg-[#1f232d] hover:bg-[#282d3b] text-white border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleQuickBuy}
                  className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] shadow-lg shadow-amber-400/20"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Order Now</span>
                </button>
              </div>
              <div className="text-center text-[11px] text-slate-400">
                🔒 Cash on Delivery, bKash & Nagad accepted
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
