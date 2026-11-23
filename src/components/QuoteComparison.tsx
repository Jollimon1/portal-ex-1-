import React from 'react';
import { DeviceModel } from '../types/tradeIn';
import { BUYER_OFFERS } from '../data/deviceCatalog';
import {
  CheckCircle2,
  Clock,
  Star,
  Banknote,
  Truck,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface QuoteComparisonProps {
  model: DeviceModel;
  condition: string;
  storage: string;
  carrier: string;
  calculatedPrice: number;
  selectedBuyer: string;
  onSelectBuyer: (buyerName: string, offerPrice: number) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const QuoteComparison: React.FC<QuoteComparisonProps> = ({
  model,
  condition,
  storage,
  carrier,
  calculatedPrice,
  selectedBuyer,
  onSelectBuyer,
  onPrevStep,
  onNextStep,
}) => {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>14-Day Price Freeze Guarantee</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Live Market Quotes for {model.name}
        </h2>
        <p className="text-xs font-medium text-slate-500">
          Comparing secondary market buyback rates for {storage} · {carrier} · {condition} condition.
        </p>
      </div>

      {/* Offers List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {BUYER_OFFERS.map((buyer) => {
          const offerPrice = Math.round(calculatedPrice * buyer.baseMultiplier);
          const isSelected = selectedBuyer === buyer.name;

          return (
            <div
              key={buyer.id}
              onClick={() => onSelectBuyer(buyer.name, offerPrice)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20'
                  : buyer.isLocalCash
                  ? 'border-emerald-300 bg-white hover:border-emerald-400'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {buyer.highlight && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl shadow-sm">
                  {buyer.highlight}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left: Buyer Logo & Specs */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-14 rounded-xl border flex flex-col items-center justify-center shrink-0 ${
                      buyer.isLocalCash
                        ? 'bg-emerald-600 text-white border-emerald-600 font-black'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="text-xs font-black truncate max-w-[58px]">
                      {buyer.logoText}
                    </span>
                    <div className="flex items-center gap-0.5 text-[9px] font-bold text-amber-300">
                      <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                      <span>{buyer.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-slate-900">{buyer.name}</h4>
                      {buyer.isLocalCash && (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Chicago Local
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      {buyer.freeShipping && (
                        <span className="flex items-center gap-1 font-semibold text-[11px]">
                          <Truck className="w-3 h-3 text-emerald-600" /> Free Shipping
                        </span>
                      )}
                      {buyer.freeReturns && (
                        <span className="flex items-center gap-1 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Free Returns
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-semibold text-[11px] text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" /> Payout: {buyer.payoutSpeed}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Cash Valuation & Select Button */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Guaranteed Rate
                    </span>
                    <span className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                      ${offerPrice}.00
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectBuyer(buyer.name, offerPrice);
                      onNextStep();
                    }}
                    className={`font-black text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Get Paid'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 3 Controls */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-200/80 max-w-3xl mx-auto">
        <button
          onClick={onPrevStep}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Specs</span>
        </button>
        <button
          onClick={onNextStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Continue with {selectedBuyer}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
