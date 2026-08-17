import React from 'react';
import { Sparkles, Shield, HeartHandshake, Leaf, ArrowUpRight } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#12151c] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background highlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Imagery Storytelling */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#181c25] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=85"
                alt="Urban Thread BD Craftsmanship"
                className="w-full h-[440px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Dhaka Design Studio
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Crafted locally. Worn globally.
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Honoring the legacy of Bangladeshi textile mastery with minimalist cuts.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage & Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                Made for Your Everyday.
              </h2>
            </div>

            <p className="text-base text-slate-300 leading-relaxed">
              Founded in the heart of Dhaka, <strong className="text-white">Urban Thread BD</strong> was born from a simple observation: modern individuals in Bangladesh shouldn&apos;t have to choose between exorbitant international luxury prices and low-quality fast fashion that loses shape after two washes.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              We design versatile wardrobe essentials that seamlessly transition from morning lectures at university and fast-paced office work to weekend cafe hangs in Dhanmondi and evening family dinners. By sourcing 100% combed cotton directly from premier domestic spinning mills, we deliver unparalleled comfort engineered specifically for Bangladesh&apos;s tropical climate.
            </p>

            {/* Core Values / Distinctions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#161a22] border border-white/5 space-y-1">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Zero Compromise on Cotton
                </div>
                <p className="text-xs text-slate-400">
                  Pre-shrunk, bio-washed combed cotton yarns that feel buttery soft and maintain crisp structure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161a22] border border-white/5 space-y-1">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  Honest Local Pricing
                </div>
                <p className="text-xs text-slate-400">
                  Direct-from-maker distribution eliminates retail middleman markups. Real luxury for real life.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
