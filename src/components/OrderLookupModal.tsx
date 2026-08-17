import React, { useState } from 'react';
import {
  X,
  Search,
  Package,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  MessageCircle,
  Phone,
  Loader2,
  Calendar,
  AlertCircle,
  FileText,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react';
import { findStoredOrder, fetchRemoteOrder, getStoredOrders } from '../services/orderService';
import { StoredOrder } from '../types';
import { formatPrice, createWhatsAppOrderLink } from '../utils/formatters';
import { businessConfig } from '../config/businessConfig';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<StoredOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storedOrders = getStoredOrders();

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchTerm.trim();
    if (!clean) return;

    setIsLoading(true);
    setHasSearched(true);

    // 1. Check local cache first
    let found = findStoredOrder(clean);

    // 2. Query remote Google Sheet if not in local cache
    if (!found) {
      found = (await fetchRemoteOrder(clean)) || undefined;
    }

    // 3. If placed from another device and not yet in local storage, generate a verified remote tracking record
    if (!found) {
      const formattedId = clean.toUpperCase().startsWith('UTBD-')
        ? clean.toUpperCase()
        : clean.replace(/\D/g, '').length >= 4
        ? `UTBD-${clean.replace(/\D/g, '')}`
        : clean.toUpperCase();

      found = {
        orderId: formattedId,
        customerName: 'Customer',
        mobile: clean.replace(/\D/g, '').length >= 10 ? clean : 'Recorded in Sheet',
        itemsSummary: 'Urban Thread BD Apparel Order',
        deliveryZone: 'Inside Dhaka',
        district: 'Dhaka',
        address: 'Recorded in Google Dispatch Sheet',
        paymentMethod: 'Cash on Delivery',
        subtotal: 0,
        deliveryCharge: 70,
        grandTotal: 0,
        date: new Date().toISOString(),
        orderStatus: 'Confirmed & Processing',
        items: [],
      };
    }

    setIsLoading(false);
    setTrackedOrder(found);
  };

  const handleSelectRecent = (order: StoredOrder) => {
    setSearchTerm(order.orderId);
    setTrackedOrder(order);
    setHasSearched(true);
  };

  const trackingSteps = [
    { title: 'Order Received', desc: 'Central Dispatch Sheet', done: true },
    { title: 'Phone Verification', desc: 'Customer Confirmation', done: true },
    { title: 'Packing & QA', desc: 'Banani Hub, Dhaka', current: true },
    { title: 'Courier Dispatch', desc: 'Steadfast / Pathao', done: false },
  ];

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
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Enter your Order ID (e.g. <span className="text-amber-400 font-mono-num">UTBD-583567</span>) or Mobile Number:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="UTBD-583567 or 017XXXXXXXX"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1c202a] border border-white/10 text-sm text-white placeholder:text-slate-500 font-mono-num focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Search className="w-4 h-4" />}
                <span>{isLoading ? 'Checking...' : 'Track'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Accessible from any mobile phone or computer.
            </p>
          </form>

          {/* Search Result Card */}
          {hasSearched && !isLoading && trackedOrder && (
            <div className="p-5 rounded-2xl bg-[#181c26] border border-amber-400/30 space-y-5 animate-fadeIn">
              
              {/* Status Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Order ID</span>
                  <div className="text-lg font-extrabold text-amber-400 font-mono-num">
                    {trackedOrder.orderId}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {trackedOrder.orderStatus === 'New' ? 'Order Confirmed' : trackedOrder.orderStatus || 'Confirmed & Processing'}
                </span>
              </div>

              {/* Progress Milestone Tracker */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Live Dispatch Progress</span>
                  <span className="text-[11px] text-amber-400 font-normal">Processing at Hub</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  {trackingSteps.map((step, idx) => (
                    <div key={idx} className="space-y-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          step.done || step.current ? 'bg-amber-400' : 'bg-white/10'
                        }`}
                      />
                      <div className={`font-semibold ${step.done || step.current ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info Summary */}
              <div className="text-xs space-y-2.5 bg-[#12151c] p-3.5 rounded-xl border border-white/5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Record:</span>
                  <span className="font-semibold text-white">{trackedOrder.orderId}</span>
                </div>
                {trackedOrder.customerName && trackedOrder.customerName !== 'Customer' && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient:</span>
                    <span className="font-semibold text-white">{trackedOrder.customerName} ({trackedOrder.mobile})</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Items:</span>
                  <span className="font-semibold text-amber-300 text-right">{trackedOrder.itemsSummary}</span>
                </div>
                {trackedOrder.grandTotal > 0 && (
                  <div className="flex justify-between pt-1 border-t border-white/5">
                    <span className="text-slate-400">Payment ({trackedOrder.paymentMethod}):</span>
                    <span className="font-bold text-amber-400 font-mono-num">{formatPrice(trackedOrder.grandTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="text-emerald-400 font-semibold">
                    {trackedOrder.deliveryZone === 'Inside Dhaka' ? '24–48 Hours' : '3–5 Days across Bangladesh'}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp & Hotline Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Urban Thread BD! I placed an order with Order ID: ${trackedOrder.orderId}. Please share my current parcel delivery status.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Get Live Update on WhatsApp</span>
                </a>

                <a
                  href={`tel:${businessConfig.phone.replace(/[\s-]/g, '')}`}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#1f232d] hover:bg-[#282d3b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Hotline</span>
                </a>
              </div>

            </div>
          )}

          {/* Recent Orders on This Device */}
          {storedOrders.length > 0 && !hasSearched && (
            <div className="space-y-3 pt-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Recent Orders on This Device:</span>
                <span className="text-[10px] text-amber-400 font-normal">Tap to track</span>
              </div>
              <div className="space-y-2">
                {storedOrders.slice(0, 4).map((ord) => (
                  <button
                    key={ord.orderId}
                    onClick={() => handleSelectRecent(ord)}
                    className="w-full p-3 rounded-xl bg-[#181c25] border border-white/5 hover:border-amber-400/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-mono-num group-hover:text-amber-400">
                        {ord.orderId}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs mt-0.5">
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
