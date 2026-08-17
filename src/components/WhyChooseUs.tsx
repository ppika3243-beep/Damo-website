import React from 'react';
import { ShieldCheck, Tag, Truck, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Quality Products',
      subtitle: 'Combed Cotton & Tailored Finish',
      description:
        'Crafted from 100% compact combed cotton (160 to 360 GSM), twin-needle stitching, and color-fast reactive dyes that withstand continuous wear.',
      badge: 'Premium Grade',
    },
    {
      icon: Tag,
      title: 'Affordable Pricing',
      subtitle: 'Factory-Direct True Value',
      description:
        'Starting at just ৳850. By manufacturing locally in Dhaka and selling directly to you online, you get genuine high-end quality without mall markups.',
      badge: '৳850 – ৳1,650',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      subtitle: 'Dhaka Next-Day & 64 Districts',
      description:
        'Guaranteed 24–48 hours delivery inside Dhaka, and dependable express courier reach across every district and upazila in Bangladesh.',
      badge: '24-48h Speed',
    },
    {
      icon: ShoppingCart,
      title: 'Easy Ordering',
      subtitle: 'Zero Hassle Checkout',
      description:
        'No complicated accounts or app installs required. Order in 30 seconds with Cash on Delivery or instant bKash/Nagad options.',
      badge: 'COD Available',
    },
  ];

  return (
    <section className="py-20 bg-[#0f1115] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181b23] border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            The Urban Thread Promise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Why Choose Us
          </h2>
          <p className="text-sm text-slate-400">
            We focus on what truly matters to everyday fashion lovers in Bangladesh: impeccable fit, durable comfort, and prompt doorstep delivery.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141720] border border-white/10 hover:border-amber-400/30 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-4 font-heading group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified customer standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
