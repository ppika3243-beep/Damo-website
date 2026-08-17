/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionsSection } from './components/CollectionsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { PRODUCTS } from './data/products';
import { CartItem, Product, OrderSubmissionResult } from './types';
import { businessConfig } from './config/businessConfig';
import { MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'urban_thread_bd_cart';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [directBuyItem, setDirectBuyItem] = useState<CartItem | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [orderSuccessResult, setOrderSuccessResult] = useState<OrderSubmissionResult | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.warn('Could not save cart state:', err);
    }
  }, [cartItems]);

  // Scroll listener for back-to-top and section active state
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'shop', 'collections', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === 'hero' ? 'home' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    const cartItemId = `${product.id}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === cartItemId);
      if (existing) {
        return prev.map((it) =>
          it.id === cartItemId ? { ...it, quantity: it.quantity + quantity } : it
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity,
          image: product.images[0],
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${size}) to bag`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === cartItemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
    } catch {}
  };

  // Quick Buy (Order Now on a specific product)
  const handleQuickBuy = (product: Product, size: string, quantity: number) => {
    const item: CartItem = {
      id: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity,
      image: product.images[0],
    };
    setDirectBuyItem(item);
    setIsCheckoutOpen(true);
  };

  // Standard checkout trigger
  const handleOpenGeneralCheckout = () => {
    if (cartItems.length === 0) {
      // If cart is empty, preselect the best seller product so the form is ready
      const defaultProduct = PRODUCTS[0];
      setDirectBuyItem({
        id: `${defaultProduct.id}-L`,
        productId: defaultProduct.id,
        name: defaultProduct.name,
        price: defaultProduct.price,
        size: 'L',
        quantity: 1,
        image: defaultProduct.images[0],
      });
    } else {
      setDirectBuyItem(null);
    }
    setIsCheckoutOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToShop = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#f1f3f7] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold shadow-2xl shadow-amber-400/30 flex items-center gap-2 animate-slideUp">
          <ShoppingBag className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCheckout={handleOpenGeneralCheckout}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero onShopClick={scrollToShop} onContactClick={scrollToContact} />

        {/* Collections & Shop Section */}
        <CollectionsSection
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickBuy={handleQuickBuy}
          onQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onOpenCheckout={handleOpenGeneralCheckout}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* WhatsApp Quick Chat */}
        <a
          href={businessConfig.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all group"
          title="Direct WhatsApp Support"
          aria-label="Direct WhatsApp Support"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </a>

        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#181c25] border border-white/15 text-slate-300 hover:text-white flex items-center justify-center shadow-lg transition-all hover:bg-[#202532] cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setDirectBuyItem(null);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={scrollToShop}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onQuickBuy={handleQuickBuy}
      />

      {/* Order Checkout Modal */}
      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setDirectBuyItem(null);
        }}
        cartItems={cartItems}
        directBuyItem={directBuyItem}
        onOrderSuccess={(result) => setOrderSuccessResult(result)}
        onClearCart={handleClearCart}
      />

      {/* Order Success Receipt Modal */}
      <OrderSuccessModal
        orderResult={orderSuccessResult}
        onClose={() => setOrderSuccessResult(null)}
        onContinueShopping={() => {
          setOrderSuccessResult(null);
          scrollToShop();
        }}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Order Lookup / Tracking Modal */}
      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
      />

    </div>
  );
}
