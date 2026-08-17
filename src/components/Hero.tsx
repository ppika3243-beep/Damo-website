import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

interface HeroProps {
  onShopClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onContactClick }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c2028] border border-white/10 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="uppercase tracking-widest text-[11px] text-amber-300 font-semibold">New 2026 Collection</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300">Dhaka, Bangladesh</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Style That Fits <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  Your Everyday.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Discover modern, comfortable fashion made for everyday life. Premium fabrics, tailored silhouettes, and effortless style delivered to your doorstep across Bangladesh.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 text-black font-semibold text-sm uppercase tracking-wider hover:bg-amber-300 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/20 cursor-pointer group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#1a1d24] text-white font-medium text-sm hover:bg-[#252933] border border-white/10 active:scale-[0.98] transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>

            {/* Value Props Row */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono-num">৳850+</div>
                <div className="text-xs text-slate-400 mt-0.5">Everyday Pricing</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono-num">24h</div>
                <div className="text-xs text-slate-400 mt-0.5">Dhaka Express Delivery</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">COD</div>
                <div className="text-xs text-slate-400 mt-0.5">Cash on Delivery</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Showcase Card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#161920] border border-white/10 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                  alt="Urban Thread BD Fashion Lookbook"
                  className="w-full h-[460px] sm:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/30" />

                {/* Floating Tag over image */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                    Dhaka Studio Edition
                  </span>
                </div>

                {/* Bottom Overlay Card info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#14171d]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Premium Everyday Wear</div>
                    <div className="text-sm font-bold text-white mt-0.5">Heavyweight Cotton & Tailored Cuts</div>
                  </div>
                  <button
                    onClick={onShopClick}
                    className="p-2.5 rounded-lg bg-amber-400 text-black hover:bg-amber-300 transition-colors"
                    title="View Collection"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative secondary badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 p-3 rounded-xl bg-[#1a1e27] border border-white/15 shadow-xl">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Quality Guaranteed</div>
                  <div className="text-[11px] text-slate-400">Easy 7-day size exchange</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
