import React, { useState } from 'react';
import { X, Search, Package, MapPin, Truck, CheckCircle2, Clock, MessageCircle } from 'lucide-react';
import { findStoredOrder, getStoredOrders } from '../services/orderService';
import { StoredOrder } from '../types';
import { formatPrice, createWhatsAppOrderLink } from '../utils/formatters';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<StoredOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const storedOrders = getStoredOrders();

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setHasSearched(true);
    const found = findStoredOrder(searchTerm);
    setSearchedOrder(found || null);
  };

  const handleSelectRecent = (order: StoredOrder) => {
    setSearchTerm(order.orderId);
    setSearchedOrder(order);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#141720] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-[#181c25] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              Track Your Order
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Enter your Order ID (e.g. UTBD-123456):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="UTBD-..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1c202a] border border-white/10 text-sm text-white placeholder:text-slate-500 uppercase font-mono-num focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div className="p-5 rounded-xl bg-[#1a1e28] border border-white/10 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Order ID</span>
                      <div className="text-base font-bold text-amber-400 font-mono-num">
                        {searchedOrder.orderId}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                      Status: {searchedOrder.orderStatus || 'Processing'}
                    </span>
                  </div>

                  <div className="text-xs space-y-2 text-slate-300">
                    <div>
                      <span className="text-slate-400">Customer:</span> {searchedOrder.customerName} ({searchedOrder.mobile})
                    </div>
                    <div>
                      <span className="text-slate-400">Destination:</span> {searchedOrder.address}, {searchedOrder.district}
                    </div>
                    <div>
                      <span className="text-slate-400">Items:</span> {searchedOrder.itemsSummary}
                    </div>
                    <div>
                      <span className="text-slate-400">Payment:</span> {searchedOrder.paymentMethod} (Total: {formatPrice(searchedOrder.grandTotal)})
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={createWhatsAppOrderLink(
                        searchedOrder.orderId,
                        searchedOrder.grandTotal,
                        searchedOrder.customerName
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Support for this Order</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-slate-300 space-y-2 text-center">
                  <p className="font-semibold text-amber-300">
                    No active record found for &quot;{searchTerm}&quot; in this browser.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    If you placed this order from another device or need live status, please reach out to our WhatsApp hotline.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Recent Orders in this device */}
          {storedOrders.length > 0 && !hasSearched && (
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recent Orders On This Device:
              </div>
              <div className="space-y-2">
                {storedOrders.slice(0, 3).map((ord) => (
                  <button
                    key={ord.orderId}
                    onClick={() => handleSelectRecent(ord)}
                    className="w-full p-3 rounded-xl bg-[#181c25] border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-mono-num">
                        {ord.orderId}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {ord.itemsSummary}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-400 font-mono-num">
                        {formatPrice(ord.grandTotal)}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(ord.date).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
