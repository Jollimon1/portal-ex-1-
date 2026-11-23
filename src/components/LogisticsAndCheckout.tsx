import React from 'react';
import {
  DeviceModel,
  ChicagoStoreLocation,
} from '../types/tradeIn';
import { CHICAGO_LOCATIONS } from '../data/chicagoLocations';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Store,
  Box,
  MapPin,
  Calendar,
  DollarSign,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LogisticsAndCheckoutProps {
  model: DeviceModel;
  condition: string;
  storage: string;
  carrier: string;
  selectedBuyer: string;
  selectedOfferPrice: number;
  payoutMethod: 'cash' | 'applepay' | 'zelle' | 'paypal' | 'bank';
  payoutAccountDetail: string;
  fulfillmentType: 'dropoff' | 'ship';
  selectedStoreId: string;
  dropOffDate: string;
  dropOffTime: string;
  onUpdatePayoutMethod: (m: 'cash' | 'applepay' | 'zelle' | 'paypal' | 'bank') => void;
  onUpdatePayoutDetail: (detail: string) => void;
  onUpdateFulfillment: (f: 'dropoff' | 'ship') => void;
  onUpdateSelectedStore: (storeId: string) => void;
  onUpdateDropOffDate: (date: string) => void;
  onUpdateDropOffTime: (time: string) => void;
  onPrevStep: () => void;
  onCompleteOrder: () => void;
  onScrollToMap: () => void;
}

export const LogisticsAndCheckout: React.FC<LogisticsAndCheckoutProps> = ({
  model,
  condition,
  storage,
  carrier,
  selectedBuyer,
  selectedOfferPrice,
  payoutMethod,
  payoutAccountDetail,
  fulfillmentType,
  selectedStoreId,
  dropOffDate,
  dropOffTime,
  onUpdatePayoutMethod,
  onUpdatePayoutDetail,
  onUpdateFulfillment,
  onUpdateSelectedStore,
  onUpdateDropOffDate,
  onUpdateDropOffTime,
  onPrevStep,
  onCompleteOrder,
  onScrollToMap,
}) => {
  const handleFinalSubmit = () => {
    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onCompleteOrder();
  };

  const getPlaceholder = () => {
    switch (payoutMethod) {
      case 'cash':
        return 'Full Name for Chicago In-Store Cash Pickup (Bring Photo ID)';
      case 'applepay':
        return 'Apple Pay Mobile Phone Number (e.g. 312-555-0199)';
      case 'zelle':
        return 'Zelle Registered Email or Mobile Number';
      case 'paypal':
        return 'PayPal Email Address';
      case 'bank':
        return 'Bank Account & 9-Digit Routing Number (ACH)';
      default:
        return 'Payout Account Identifier';
    }
  };

  const selectedStore =
    CHICAGO_LOCATIONS.find((s) => s.id === selectedStoreId) || CHICAGO_LOCATIONS[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Trade-In Confirmation &amp; Chicago Drop-Off
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Select your preferred payout method and schedule your local drop-off or free mail-in kit.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">
            Offer Rate Locked for 14 Days
          </span>
        </div>
      </div>

      {/* Grid: Left Device Summary & Right Checkout Logistics Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Device Lock Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-3">
          <div className="w-36 h-36 rounded-full liquid-art-bg p-3 flex items-center justify-center shadow-md">
            <img
              src={model.image}
              alt={model.name}
              referrerPolicy="no-referrer"
              className="max-h-28 object-contain drop-shadow"
            />
          </div>

          <div>
            <h3 className="text-base font-black text-slate-900">{model.name}</h3>
            <p className="text-xs font-semibold text-slate-500">
              {storage} · {carrier} · {condition}
            </p>
          </div>

          <div className="w-full bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Selected Buyer:</span>
              <span className="font-extrabold text-slate-900">{selectedBuyer}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Rate Lock Guarantee:</span>
              <span className="font-extrabold text-emerald-600">14 Days</span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-1.5">
              <span className="text-slate-700 font-bold">Total Cash Payout:</span>
              <span className="text-base font-black text-slate-900 tabular-nums font-mono">
                ${selectedOfferPrice}.00
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Logistics Form */}
        <div className="lg:col-span-8 neu-card p-4 sm:p-6 rounded-2xl space-y-5">
          {/* Section A: Payout Method */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>A. Select Payout Method</span>
              </h4>
              <span className="text-[10px] font-bold text-white bg-emerald-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Same-Day Payout
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
              {[
                { id: 'cash', label: 'Cash in Hand (Chicago Hub)', time: 'Under 15 Mins' },
                { id: 'applepay', label: 'Apple Pay Instant', time: 'Instant Transfer' },
                { id: 'zelle', label: 'Zelle Direct', time: 'Under 1 Hour' },
                { id: 'paypal', label: 'PayPal Transfer', time: 'Same-Day' },
                { id: 'bank', label: 'Direct Bank ACH', time: '1-2 Days' },
              ].map((p) => {
                const isSelected = payoutMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onUpdatePayoutMethod(p.id as any)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="text-xs font-black truncate">{p.label}</div>
                    <div
                      className={`text-[10px] font-medium ${
                        isSelected ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {p.time}
                    </div>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={payoutAccountDetail}
              onChange={(e) => onUpdatePayoutDetail(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full neu-input py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-800"
            />
          </div>

          {/* Section B: Logistics Fulfillment Choice */}
          <div className="pt-2 border-t border-slate-200/80">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>B. Fulfillment &amp; Device Handover</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Option 1: In-Store Drop-Off */}
              <div
                onClick={() => onUpdateFulfillment('dropoff')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  fulfillmentType === 'dropoff'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillmentType === 'dropoff'}
                    onChange={() => onUpdateFulfillment('dropoff')}
                    className="accent-emerald-600"
                  />
                  <span className="text-xs font-black text-slate-900">
                    Option 1: In-Person Drop-Off (Chicago)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2">
                  Drop off at our Downtown Loop, Lincoln Park, or West Loop hubs for immediate cash in hand.
                </p>
                <div className="bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                  <span className="text-emerald-700 flex items-center gap-1 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 15-Minute Intake
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onScrollToMap();
                    }}
                    className="text-[10px] text-slate-500 hover:text-emerald-700 underline font-bold"
                  >
                    View Map
                  </button>
                </div>
              </div>

              {/* Option 2: Prepaid Shipping Box */}
              <div
                onClick={() => onUpdateFulfillment('ship')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  fulfillmentType === 'ship'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={fulfillmentType === 'ship'}
                    onChange={() => onUpdateFulfillment('ship')}
                    className="accent-emerald-600"
                  />
                  <span className="text-xs font-black text-slate-900">
                    Option 2: Free Prepaid Shipping Kit
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2">
                  We send a padded box and prepaid USPS/FedEx shipping label directly to your Illinois home.
                </p>
                <div className="bg-white p-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 text-[11px]">
                  <Box className="w-3.5 h-3.5 text-slate-500" />
                  <span>Arrives in 2-3 business days</span>
                </div>
              </div>
            </div>

            {/* If In-Store Drop-off: Schedule time & choose location */}
            {fulfillmentType === 'dropoff' && (
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Select Chicago Hub
                    </label>
                    <select
                      value={selectedStoreId}
                      onChange={(e) => onUpdateSelectedStore(e.target.value)}
                      className="w-full neu-input py-2 px-3 rounded-xl text-xs font-bold text-slate-800 outline-none bg-white"
                    >
                      {CHICAGO_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name} ({loc.neighborhood})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Preferred Drop-Off Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={dropOffDate}
                        onChange={(e) => onUpdateDropOffDate(e.target.value)}
                        className="w-full neu-input py-2 px-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none bg-white"
                      >
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Next Week">Next Week</option>
                      </select>
                      <select
                        value={dropOffTime}
                        onChange={(e) => onUpdateDropOffTime(e.target.value)}
                        className="w-full neu-input py-2 px-2.5 rounded-xl text-xs font-bold text-slate-800 outline-none bg-white"
                      >
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="5:30 PM">5:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Selected: <strong>{selectedStore.address}</strong> · Hours: {selectedStore.hours}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Trade-In Value Lock Footer */}
          <div className="pt-3 border-t border-slate-200/80 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-slate-500">Guaranteed Locked Value:</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                ${selectedOfferPrice}.00
              </span>
            </div>

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>LOCK TRADE-IN &amp; GET CASH VOUCHER</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 font-medium">
              No obligation to sell until device inspection is verified. 14-day price freeze applies.
            </p>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="flex justify-start items-center pt-2">
        <button
          onClick={onPrevStep}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Quotes</span>
        </button>
      </div>
    </div>
  );
};
