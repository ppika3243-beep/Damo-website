import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCheckout: () => void;
  onOpenOrderLookup: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCheckout,
  onOpenOrderLookup,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Shop', href: '#shop' },
    { name: 'Collections', href: '#collections' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#181b22] border-b border-white/5 text-[11px] font-medium text-slate-300 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200">Express Delivery across Dhaka & all 64 Districts</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <button
              onClick={onOpenOrderLookup}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>Track Order</span>
            </button>
            <span className="text-white/20">|</span>
            <span className="text-slate-300">Hotline: {businessConfig.displayPhone}</span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f1115]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-[#0f1115] border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Title (single line, no sub-elements) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading hover:text-amber-400 transition-colors whitespace-nowrap"
          >
            Urban Thread BD
          </a>

          {/* Zone 2: Navigation Links (1-2 word labels, single line) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`whitespace-nowrap transition-colors py-1 ${
                  activeSection === link.name.toLowerCase()
                    ? 'text-amber-400 border-b border-amber-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Cart + Order Now) */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
              className="relative p-2.5 rounded-lg bg-[#1a1d24] hover:bg-[#232731] border border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-lg font-mono-num animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Checkout CTA */}
            <button
              onClick={onOpenCheckout}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-amber-400 text-black hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md shadow-amber-500/10 cursor-pointer"
            >
              Order Now
            </button>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-lg bg-[#1a1d24] text-slate-200 border border-white/10 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#14171d] border-b border-white/10 px-4 pt-3 pb-5 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-amber-400 hover:bg-[#1c2028] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderLookup();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#1c2028] text-slate-300 text-sm font-medium flex items-center justify-center gap-2 hover:text-white"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Track Existing Order</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3 rounded-lg bg-amber-400 text-black text-sm uppercase tracking-wider font-bold hover:bg-amber-300 shadow-lg text-center"
              >
                Checkout / Place Order
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
