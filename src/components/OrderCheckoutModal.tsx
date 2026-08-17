import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Info,
  MapPin,
  Phone,
  User,
  FileText,
  Lock,
} from 'lucide-react';
import {
  CartItem,
  DeliveryZone,
  PaymentMethod,
  OrderPayload,
  OrderSubmissionResult,
} from '../types';
import { BANGLADESH_DISTRICTS } from '../data/districts';
import { businessConfig } from '../config/businessConfig';
import { formatPrice, getDeliveryCharge, isValidBdPhone } from '../utils/formatters';
import { generateOrderId, submitOrderToGoogleSheet } from '../services/orderService';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  directBuyItem?: CartItem | null;
  onOrderSuccess: (result: OrderSubmissionResult) => void;
  onClearCart: () => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  directBuyItem,
  onOrderSuccess,
  onClearCart,
}) => {
  // Determine the active items for this checkout session
  const activeCheckoutItems: CartItem[] = useMemo(() => {
    if (directBuyItem) {
      return [directBuyItem];
    }
    return cartItems;
  }, [directBuyItem, cartItems]);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('Inside Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [deliveryNote, setDeliveryNote] = useState('');

  // UI & Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [districtSearch, setDistrictSearch] = useState('');

  // Reset errors on field changes
  useEffect(() => {
    setErrorMessage(null);
  }, [customerName, mobile, deliveryZone, district, address, paymentMethod]);

  // Automatically adjust default district when zone changes
  useEffect(() => {
    if (deliveryZone === 'Inside Dhaka') {
      setDistrict('Dhaka');
    } else if (deliveryZone === 'Dhaka Suburbs') {
      if (district !== 'Gazipur' && district !== 'Narayanganj' && district !== 'Savar') {
        setDistrict('Gazipur');
      }
    } else if (deliveryZone === 'Outside Dhaka' && district === 'Dhaka') {
      setDistrict('Chattogram (Chittagong)');
    }
  }, [deliveryZone]);

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = activeCheckoutItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const deliveryCharge = getDeliveryCharge(deliveryZone);
  const grandTotal = subtotal + deliveryCharge;
  const totalQuantity = activeCheckoutItems.reduce((acc, it) => acc + it.quantity, 0);

  // Summarize products and sizes
  const productSummary = activeCheckoutItems
    .map((it) => `${it.name} (x${it.quantity})`)
    .join(', ');
  const sizeSummary = activeCheckoutItems
    .map((it) => `${it.size} (x${it.quantity})`)
    .join(', ');

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!customerName.trim()) {
      errors.customerName = 'Please enter your full name.';
    }

    if (!mobile.trim()) {
      errors.mobile = 'Please provide your active mobile number.';
    } else if (!isValidBdPhone(mobile)) {
      errors.mobile = 'Please enter a valid 11-digit Bangladesh phone number (e.g., 01712345678).';
    }

    if (!address.trim()) {
      errors.address = 'Please enter your full delivery address (House, Road, Area).';
    } else if (address.trim().length < 8) {
      errors.address = 'Please provide a detailed address for seamless courier delivery.';
    }

    if (!district.trim()) {
      errors.district = 'Please select your delivery district.';
    }

    if (activeCheckoutItems.length === 0) {
      errors.items = 'Your order has no items selected. Please choose a product.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage('Please correct the highlighted errors before submitting your order.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const generatedId = generateOrderId();

    const orderPayload: OrderPayload = {
      orderId: generatedId,
      customerName: customerName.trim(),
      mobile: mobile.trim(),
      product: productSummary,
      size: sizeSummary,
      quantity: totalQuantity,
      deliveryZone,
      district,
      address: address.trim(),
      paymentMethod,
      paymentStatus: 'Pending',
      deliveryNote: deliveryNote.trim(),
      subtotal,
      deliveryCharge,
      grandTotal,
      orderStatus: 'New',
      adminNote: '',
    };

    try {
      const result = await submitOrderToGoogleSheet(orderPayload, activeCheckoutItems);

      if (result.success) {
        // Success handling
        if (!directBuyItem) {
          onClearCart();
        }
        onOrderSuccess(result);
        onClose();
      } else {
        // Real Failure handling without fake success
        setErrorMessage(
          result.message || 'We could not connect to the order server. Please try submitting again.'
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during submission.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#13161d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-[#171b23] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                Express Checkout
              </h2>
              <p className="text-[11px] text-slate-400">
                Complete your details for swift delivery across Bangladesh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 lg:p-8">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-200">Order Submission Problem</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Customer and Shipping Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  <span>1. Customer Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1a1e27] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                        fieldErrors.customerName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.customerName && (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.customerName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Mobile Number <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#1a1e27] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono-num ${
                          fieldErrors.mobile ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {fieldErrors.mobile ? (
                      <p className="text-[11px] text-red-400 mt-1">{fieldErrors.mobile}</p>
                    ) : (
                      <p className="text-[10px] text-slate-400 mt-1">
                        We will send SMS confirmation and call before delivery.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Zone & Address */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>2. Delivery Location</span>
                </div>

                {/* Delivery Zone Cards */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">
                    Select Delivery Zone <span className="text-amber-400">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(
                      [
                        { id: 'Inside Dhaka', fee: businessConfig.delivery.insideDhakaCharge, time: '24-48 hrs' },
                        { id: 'Dhaka Suburbs', fee: businessConfig.delivery.dhakaSuburbsCharge, time: '2-3 days' },
                        { id: 'Outside Dhaka', fee: businessConfig.delivery.outsideDhakaCharge, time: '3-5 days' },
                      ] as const
                    ).map((zone) => (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setDeliveryZone(zone.id)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          deliveryZone === zone.id
                            ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                            : 'bg-[#181c25] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <div className="text-xs font-bold truncate">{zone.id}</div>
                        <div className="text-sm font-extrabold text-amber-400 font-mono-num mt-1">
                          {formatPrice(zone.fee)}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{zone.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* District Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    District <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1e27] border border-white/10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d.name} value={d.name} className="bg-[#171a22] text-white">
                        {d.name} {d.division !== d.name ? `(${d.division} Div)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Full Delivery Address <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House/Flat No, Road No, Area, Landmark (e.g. House 14, Road 5, Dhanmondi)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl bg-[#1a1e27] border text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                      fieldErrors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                    }`}
                  />
                  {fieldErrors.address && (
                    <p className="text-[11px] text-red-400 mt-1">{fieldErrors.address}</p>
                  )}
                </div>

                {/* Delivery Note */}
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Delivery Instructions / Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, deliver after 3 PM"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1e27] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>3. Payment Method</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      { id: 'Cash on Delivery', desc: 'Pay with cash upon receipt' },
                      { id: 'bKash', desc: 'Pay via bKash on delivery / transfer' },
                      { id: 'Nagad', desc: 'Pay via Nagad on delivery / transfer' },
                    ] as const
                  ).map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                          : 'bg-[#181c25] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{pm.id}</span>
                        {paymentMethod === pm.id && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 leading-snug">
                        {pm.desc}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment instructions info */}
                {(paymentMethod === 'bKash' || paymentMethod === 'Nagad') && (
                  <div className="p-3.5 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-slate-300">
                    <p className="font-semibold text-amber-400">
                      {paymentMethod} Payment Instructions:
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Your order will be logged as &quot;Pending Payment&quot;. Our team will send you our official {paymentMethod} number or you may pay the delivery rider upon arrival.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-5 bg-[#161a22] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10 font-heading">
                  Order Summary
                </h3>

                {/* Item list */}
                <div className="divide-y divide-white/5 max-h-56 overflow-y-auto my-3 pr-1">
                  {activeCheckoutItems.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-14 rounded-md object-cover bg-black/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Size: <span className="text-amber-300 font-medium">{item.size}</span> × {item.quantity}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-white font-mono-num">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Items Subtotal ({totalQuantity} items):</span>
                    <span className="font-bold text-white font-mono-num">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      Delivery Charge ({deliveryZone}):
                    </span>
                    <span className="font-bold text-amber-400 font-mono-num">
                      {formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Payment Method:</span>
                    <span className="text-slate-200">{paymentMethod}</span>
                  </div>

                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Initial Status:</span>
                    <span className="text-amber-400 font-medium">New (Pending)</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Total Payable Amount</div>
                    <div className="text-[10px] text-slate-500">VAT & Taxes included</div>
                  </div>
                  <div className="text-2xl font-extrabold text-amber-400 font-mono-num">
                    {formatPrice(grandTotal)}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || activeCheckoutItems.length === 0}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Confirming Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 fill-black text-amber-400" />
                      <span>Confirm & Place Order ({formatPrice(grandTotal)})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your order details will be securely sent to our dispatch sheet</span>
                </div>
              </div>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
