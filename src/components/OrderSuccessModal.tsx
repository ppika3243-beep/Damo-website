import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ShoppingBag,
  Truck,
  MapPin,
  Calendar,
  X,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { OrderSubmissionResult } from '../types';
import { formatPrice, createWhatsAppOrderLink } from '../utils/formatters';
import { businessConfig } from '../config/businessConfig';

interface OrderSuccessModalProps {
  orderResult: OrderSubmissionResult | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderResult,
  onClose,
  onContinueShopping,
}) => {
  const [copied, setCopied] = useState(false);

  if (!orderResult || !orderResult.payload) return null;

  const { payload } = orderResult;
  const orderId = payload.orderId;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappLink = createWhatsAppOrderLink(
    orderId,
    payload.grandTotal,
    payload.customerName
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#13161e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Top celebratory accent */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header & Success Icon */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Order Received
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Your order has been received successfully.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-white">{payload.customerName}</span>! Our dispatch team is preparing your package.
              </p>
            </div>

            {/* Order ID Copy Box */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#191d27] border border-white/10 mt-2">
              <span className="text-xs text-slate-400">Order ID:</span>
              <span className="text-base font-bold text-amber-400 font-mono-num tracking-wide">
                {orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Order ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Detailed Receipt Card */}
          <div className="rounded-xl bg-[#181c25] border border-white/10 p-5 space-y-4 text-xs">
            
            {/* Delivery Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Delivery Destination
                </span>
                <p className="text-white font-medium">{payload.address}</p>
                <p className="text-slate-400">{payload.district} ({payload.deliveryZone})</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  Estimated Arrival
                </span>
                <p className="text-white font-medium">
                  {payload.deliveryZone === 'Inside Dhaka'
                    ? 'Within 24 to 48 Hours'
                    : 'Within 2 to 4 Business Days'}
                </p>
                <p className="text-slate-400">Recipient Phone: {payload.mobile}</p>
              </div>
            </div>

            {/* Ordered Items Summary */}
            <div className="space-y-2 pb-4 border-b border-white/10">
              <div className="flex justify-between text-slate-400 font-semibold">
                <span>Items Ordered:</span>
                <span>Qty</span>
              </div>
              <div className="text-white font-medium leading-relaxed bg-[#14171f] p-3 rounded-lg border border-white/5">
                <p>{payload.product}</p>
                <p className="text-[11px] text-slate-400 mt-1">Sizes: {payload.size}</p>
              </div>
            </div>

            {/* Financials */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="text-white font-mono-num">{formatPrice(payload.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charge:</span>
                <span className="text-amber-400 font-mono-num">{formatPrice(payload.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span className="text-white font-semibold">{payload.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Grand Total:</span>
                <span className="text-amber-400 font-mono-num text-base">
                  {formatPrice(payload.grandTotal)}
                </span>
              </div>
            </div>

          </div>

          {/* Next Steps Notification */}
          <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-amber-300">What happens next?</p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              1. Our representative will give you a brief verification call on <strong className="text-white">{payload.mobile}</strong>.
              <br />
              2. Your package will be handed over to our courier partner with tracking.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <button
                onClick={handlePrint}
                className="hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Receipt</span>
              </button>
              <span>•</span>
              <span className="text-slate-500">Need help? Hotline: {businessConfig.displayPhone}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
