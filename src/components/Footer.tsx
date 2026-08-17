import React from 'react';
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
} from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenOrderLookup: () => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onOpenOrderLookup,
  onOpenCheckout,
}) => {
  return (
    <footer className="bg-[#0b0d12] border-t border-white/10 text-slate-400 text-xs">
      
      {/* Top trust badges row */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141720] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Nationwide Delivery</div>
              <div className="text-[11px] text-slate-400">Dhaka in 24-48h, 64 districts nationwide</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141720] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Cash on Delivery & bKash</div>
              <div className="text-[11px] text-slate-400">Pay safely after receiving your parcel</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141720] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">7-Day Size Exchange</div>
              <div className="text-[11px] text-slate-400">Hassle-free size replacement support</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#141720] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Combed Cotton</div>
              <div className="text-[11px] text-slate-400">Premium fabric durability guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (Span 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="text-2xl font-bold tracking-tight text-white font-heading">
              {businessConfig.brandName}
            </a>
            <p className="text-xs text-amber-400/90 font-medium">
              &quot;{businessConfig.tagline}&quot;
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Urban Thread BD is a contemporary Dhaka-based clothing label designing minimalist, high-quality menswear, womenswear, and streetwear engineered for tropical comfort and enduring style.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181c25] border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181c25] border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={businessConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#181c25] border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#shop" className="hover:text-amber-400 transition-colors">Shop All Products</a>
              </li>
              <li>
                <a href="#collections" className="hover:text-amber-400 transition-colors">Collections</a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">About Our Brand</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">Contact Showroom</a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Size & Measurement Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrderLookup}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Track Order Status
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCheckout}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Instant Checkout
                </button>
              </li>
              <li>
                <span className="text-slate-500">Delivery Inside Dhaka: ৳70</span>
              </li>
              <li>
                <span className="text-slate-500">Outside Dhaka: ৳130</span>
              </li>
            </ul>
          </div>

          {/* Dhaka Hub Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dhaka Showroom
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="text-slate-300 font-medium">{businessConfig.location.area}, Dhaka</p>
              <p>{businessConfig.location.fullAddress}</p>
              <p className="text-slate-300 font-mono-num pt-1">
                Helpline: {businessConfig.displayPhone}
              </p>
              <p className="text-amber-400 text-[11px]">
                {businessConfig.email}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © 2026 {businessConfig.brandName}. All rights reserved. Dhaka, Bangladesh.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium">Accepted Payments:</span>
          <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">Cash on Delivery</span>
          <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-bold">bKash</span>
          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">Nagad</span>
        </div>
      </div>

    </footer>
  );
};
