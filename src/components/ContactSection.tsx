import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
} from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactInfo || !message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setContactInfo('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#12151d] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            We&apos;re Here to Help
          </h2>
          <p className="text-sm text-slate-400">
            Have questions about sizing, delivery status, or custom orders? Reach out via WhatsApp, phone, or drop us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Dhaka Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Info Card */}
            <div className="p-6 rounded-2xl bg-[#171b24] border border-white/10 space-y-5">
              <h3 className="text-base font-bold text-white font-heading">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <a
                  href={`tel:${businessConfig.phone.replace(/[\s-]/g, '')}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-[#1e222d] border border-white/5 hover:border-amber-400/30 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-400 group-hover:text-amber-400">Customer Helpline</div>
                    <div className="text-sm font-bold text-white font-mono-num mt-0.5">{businessConfig.displayPhone}</div>
                    <div className="text-[11px] text-slate-500">Everyday: 10:00 AM – 10:00 PM BST</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${businessConfig.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-[#1e222d] border border-white/5 hover:border-amber-400/30 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-400 group-hover:text-amber-400">Official Email</div>
                    <div className="text-sm font-bold text-white mt-0.5">{businessConfig.email}</div>
                    <div className="text-[11px] text-slate-500">Response within 2-4 hours</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#1e222d] border border-white/5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-400">Studio & Dispatch Hub</div>
                    <div className="text-sm font-bold text-white mt-0.5">{businessConfig.location.area}, {businessConfig.location.city}</div>
                    <div className="text-[11px] text-slate-400">{businessConfig.location.fullAddress}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 mb-2.5">
                  Connect on Social Platforms:
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={businessConfig.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={businessConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/30 text-blue-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={businessConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#E4405F]/15 hover:bg-[#E4405F]/25 border border-[#E4405F]/30 text-pink-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Dhaka Google Maps Visual Card */}
            <div className="rounded-2xl bg-[#171b24] border border-white/10 overflow-hidden relative group">
              <div className="p-4 bg-[#1b1f29] border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Dhaka Dispatch Center</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Open Today
                </span>
              </div>
              
              {/* Stylized dark map container */}
              <div className="h-44 bg-[#111319] relative flex items-center justify-center p-4 text-center overflow-hidden">
                {/* Map grid lines background */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#amber400 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                
                {/* Visual marker */}
                <div className="relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center mx-auto shadow-lg shadow-amber-400/40 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">
                    Banani Block D, Road 11, Dhaka
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Dispatches across Dhaka City within 24h
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#171b24] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-heading">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in the form below and our team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="my-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    Thank you! Your message has been sent.
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    We have received your inquiry. One of our fashion consultants will reach out to you within a few hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shakib Hasan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12151c] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Mobile Number or Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="017XXXXXXXX / email"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#12151c] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12151c] border border-white/10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
                    >
                      <option value="Product Inquiry" className="bg-[#12151c] text-white">Product & Fabric Inquiry</option>
                      <option value="Size Consultation" className="bg-[#12151c] text-white">Size & Fit Consultation</option>
                      <option value="Delivery Tracking" className="bg-[#12151c] text-white">Delivery / Order Tracking</option>
                      <option value="Bulk & Corporate" className="bg-[#12151c] text-white">Bulk / Corporate Order</option>
                      <option value="Return / Exchange" className="bg-[#12151c] text-white">Return or Size Exchange</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Message <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12151c] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4 fill-black" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Dhaka Support Hours: 10 AM – 10 PM</span>
              <span className="text-emerald-400">● Live Agents on WhatsApp</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
