import React from 'react';
import { X, Printer, CheckCircle2, QrCode, MapPin, Calendar, Clock, DollarSign, ShieldCheck } from 'lucide-react';
import { CHICAGO_LOCATIONS } from '../data/chicagoLocations';

interface OrderVoucherModalProps {
  isOpen: boolean;
  orderData: any;
  onClose: () => void;
}

export const OrderVoucherModal: React.FC<OrderVoucherModalProps> = ({
  isOpen,
  orderData,
  onClose,
}) => {
  if (!isOpen || !orderData) return null;

  const store =
    CHICAGO_LOCATIONS.find((s) => s.id === orderData.selectedStoreId) || CHICAGO_LOCATIONS[0];
  const orderId = `R3UP-CHI-${Math.floor(100000 + Math.random() * 900000)}`;
  const lockExpiration = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="neu-card bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 print:border-none print:shadow-none">
        {/* Close Button (Hidden when printing) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-xl transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Voucher Header */}
        <div className="text-center space-y-1 pb-4 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official Chicago Trade-In Voucher</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Rate Lock Confirmed
          </h2>
          <p className="text-xs text-slate-500 font-semibold font-mono">
            VOUCHER ID: <span className="text-slate-900 font-bold">{orderId}</span>
          </p>
        </div>

        {/* Voucher Ticket Details */}
        <div className="mt-5 space-y-4">
          {/* Cash Amount Hero Strip */}
          <div className="bg-emerald-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">
                Guaranteed Cash Payout
              </span>
              <span className="text-3xl font-black tabular-nums font-mono">
                ${orderData.valuation}.00
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-200 uppercase block">
                Payout Method
              </span>
              <span className="text-xs font-black text-white capitalize">
                {orderData.payoutMethod === 'cash' ? 'In-Store Cash' : orderData.payoutMethod}
              </span>
            </div>
          </div>

          {/* Device Profile Breakdown */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Device Profile
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Model:</span>
                <span className="font-extrabold text-slate-900">{orderData.device.name}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Storage:</span>
                <span className="font-extrabold text-slate-900">{orderData.device.storage}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Condition:</span>
                <span className="font-extrabold text-slate-900">{orderData.device.condition}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Carrier:</span>
                <span className="font-extrabold text-slate-900">{orderData.device.carrier}</span>
              </div>
            </div>
          </div>

          {/* Fulfillment & Chicago Drop-Off Hub */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {orderData.fulfillmentType === 'dropoff'
                  ? 'Scheduled Chicago Drop-Off'
                  : 'Mail-In Shipping Kit'}
              </span>
            </h4>

            {orderData.fulfillmentType === 'dropoff' ? (
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-900">{store.name}</p>
                <p className="text-slate-600 font-medium">{store.address}, Chicago IL {store.zip}</p>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="w-3 h-3 text-emerald-600" /> {orderData.dropOffDate}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3 h-3 text-emerald-600" /> {orderData.dropOffTime}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-600 font-medium">
                A prepaid shipping kit will be dispatched to your Illinois address within 24 hours.
              </div>
            )}
          </div>

          {/* Simulated QR & Barcode Section */}
          <div className="p-3.5 bg-white border border-dashed border-slate-300 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center p-2 border border-slate-200">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Intake Scanner Code
                </span>
                <span className="text-xs font-black text-slate-900">Scan at Counter</span>
                <p className="text-[10px] text-slate-500">Presents quote lock to intake tech</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                Guaranteed Until
              </span>
              <span className="text-xs font-black text-emerald-700 font-mono">
                {lockExpiration}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="neu-btn px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Voucher</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
