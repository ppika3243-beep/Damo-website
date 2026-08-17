import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tshirts' | 'shirts' | 'polos' | 'hoodies' | 'cargos' | 'kurtis'>('tshirts');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#14171f] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-[#181c25] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-heading">
              Urban Thread Size & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'tshirts', label: 'T-Shirts (Oversized)' },
              { id: 'shirts', label: 'Classic Shirts' },
              { id: 'polos', label: 'Polos' },
              { id: 'hoodies', label: 'Hoodies' },
              { id: 'cargos', label: 'Cargos' },
              { id: 'kurtis', label: 'Kurtis' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-black'
                    : 'bg-[#1e222d] text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#171b23]">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="text-[11px] uppercase bg-[#1f2430] text-amber-400 font-bold">
                <tr>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Chest / Bust (Inches)</th>
                  <th className="px-4 py-3">Length (Inches)</th>
                  <th className="px-4 py-3">Shoulder / Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono-num">
                {activeTab === 'tshirts' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">S (Small)</td>
                      <td className="px-4 py-2.5">38&quot;</td>
                      <td className="px-4 py-2.5">27&quot;</td>
                      <td className="px-4 py-2.5">18&quot; (Drop Shoulder)</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">M (Medium)</td>
                      <td className="px-4 py-2.5">40&quot;</td>
                      <td className="px-4 py-2.5">28&quot;</td>
                      <td className="px-4 py-2.5">19&quot; (Drop Shoulder)</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">L (Large)</td>
                      <td className="px-4 py-2.5">42&quot;</td>
                      <td className="px-4 py-2.5">29&quot;</td>
                      <td className="px-4 py-2.5">20&quot; (Drop Shoulder)</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XL (Extra Large)</td>
                      <td className="px-4 py-2.5">44&quot;</td>
                      <td className="px-4 py-2.5">30&quot;</td>
                      <td className="px-4 py-2.5">21&quot; (Drop Shoulder)</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XXL</td>
                      <td className="px-4 py-2.5">46&quot;</td>
                      <td className="px-4 py-2.5">31&quot;</td>
                      <td className="px-4 py-2.5">22&quot; (Drop Shoulder)</td>
                    </tr>
                  </>
                )}

                {activeTab === 'shirts' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">S (38)</td>
                      <td className="px-4 py-2.5">38&quot;</td>
                      <td className="px-4 py-2.5">28&quot;</td>
                      <td className="px-4 py-2.5">24.5&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">M (40)</td>
                      <td className="px-4 py-2.5">40&quot;</td>
                      <td className="px-4 py-2.5">29&quot;</td>
                      <td className="px-4 py-2.5">25&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">L (42)</td>
                      <td className="px-4 py-2.5">42&quot;</td>
                      <td className="px-4 py-2.5">30&quot;</td>
                      <td className="px-4 py-2.5">25.5&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XL (44)</td>
                      <td className="px-4 py-2.5">44&quot;</td>
                      <td className="px-4 py-2.5">31&quot;</td>
                      <td className="px-4 py-2.5">26&quot;</td>
                    </tr>
                  </>
                )}

                {activeTab === 'polos' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">S</td>
                      <td className="px-4 py-2.5">38&quot;</td>
                      <td className="px-4 py-2.5">27&quot;</td>
                      <td className="px-4 py-2.5">8&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">M</td>
                      <td className="px-4 py-2.5">40&quot;</td>
                      <td className="px-4 py-2.5">28&quot;</td>
                      <td className="px-4 py-2.5">8.5&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">L</td>
                      <td className="px-4 py-2.5">42&quot;</td>
                      <td className="px-4 py-2.5">29&quot;</td>
                      <td className="px-4 py-2.5">9&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XL</td>
                      <td className="px-4 py-2.5">44&quot;</td>
                      <td className="px-4 py-2.5">30&quot;</td>
                      <td className="px-4 py-2.5">9.5&quot;</td>
                    </tr>
                  </>
                )}

                {activeTab === 'hoodies' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">M</td>
                      <td className="px-4 py-2.5">42&quot;</td>
                      <td className="px-4 py-2.5">28&quot;</td>
                      <td className="px-4 py-2.5">25&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">L</td>
                      <td className="px-4 py-2.5">44&quot;</td>
                      <td className="px-4 py-2.5">29&quot;</td>
                      <td className="px-4 py-2.5">25.5&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XL</td>
                      <td className="px-4 py-2.5">46&quot;</td>
                      <td className="px-4 py-2.5">30&quot;</td>
                      <td className="px-4 py-2.5">26&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XXL</td>
                      <td className="px-4 py-2.5">48&quot;</td>
                      <td className="px-4 py-2.5">31&quot;</td>
                      <td className="px-4 py-2.5">26.5&quot;</td>
                    </tr>
                  </>
                )}

                {activeTab === 'cargos' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">30 (S)</td>
                      <td className="px-4 py-2.5">Waist: 30&quot;–31&quot;</td>
                      <td className="px-4 py-2.5">Length: 39&quot;</td>
                      <td className="px-4 py-2.5">Thigh: 23&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">32 (M)</td>
                      <td className="px-4 py-2.5">Waist: 32&quot;–33&quot;</td>
                      <td className="px-4 py-2.5">Length: 40&quot;</td>
                      <td className="px-4 py-2.5">Thigh: 24&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">34 (L)</td>
                      <td className="px-4 py-2.5">Waist: 34&quot;–35&quot;</td>
                      <td className="px-4 py-2.5">Length: 41&quot;</td>
                      <td className="px-4 py-2.5">Thigh: 25&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">36 (XL)</td>
                      <td className="px-4 py-2.5">Waist: 36&quot;–37&quot;</td>
                      <td className="px-4 py-2.5">Length: 42&quot;</td>
                      <td className="px-4 py-2.5">Thigh: 26&quot;</td>
                    </tr>
                  </>
                )}

                {activeTab === 'kurtis' && (
                  <>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">S (36)</td>
                      <td className="px-4 py-2.5">Bust: 36&quot;</td>
                      <td className="px-4 py-2.5">Length: 40&quot;</td>
                      <td className="px-4 py-2.5">Sleeve: 17&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">M (38)</td>
                      <td className="px-4 py-2.5">Bust: 38&quot;</td>
                      <td className="px-4 py-2.5">Length: 41&quot;</td>
                      <td className="px-4 py-2.5">Sleeve: 17.5&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">L (40)</td>
                      <td className="px-4 py-2.5">Bust: 40&quot;</td>
                      <td className="px-4 py-2.5">Length: 42&quot;</td>
                      <td className="px-4 py-2.5">Sleeve: 18&quot;</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-bold text-white">XL (42)</td>
                      <td className="px-4 py-2.5">Bust: 42&quot;</td>
                      <td className="px-4 py-2.5">Length: 43&quot;</td>
                      <td className="px-4 py-2.5">Sleeve: 18.5&quot;</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-slate-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Easy 7-Day Exchange Policy:</span>{' '}
              If the size doesn&apos;t fit you perfectly, we offer hassle-free size replacement anywhere in Bangladesh.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
