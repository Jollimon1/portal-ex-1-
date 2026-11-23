import React from 'react';
import { X, Cloud, Lock, RefreshCw, Smartphone, CheckSquare, ShieldCheck } from 'lucide-react';

interface PrepGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrepGuideModal: React.FC<PrepGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="neu-card bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-1 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fast-Track Your In-Store Payout</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Device Preparation &amp; Wipe Checklist
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Follow these 4 simple steps before heading to our Chicago Loop or Lincoln Park store to guarantee payout in under 15 minutes.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">1. Back Up Your Data</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Connect to Wi-Fi. On iPhone go to <strong>Settings &gt; [Your Name] &gt; iCloud &gt; iCloud Backup &gt; Back Up Now</strong>. On Android go to <strong>Settings &gt; Google &gt; Backup</strong>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">2. Turn Off 'Find My' &amp; Sign Out of Accounts</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                CRITICAL: Apple devices with active iCloud activation lock cannot be appraised or purchased. Go to <strong>Settings &gt; [Your Name] &gt; Find My &gt; Turn Off</strong>, then tap <strong>Sign Out</strong> at bottom of Apple ID.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">3. Factory Reset Your Phone</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                On iPhone: <strong>Settings &gt; General &gt; Transfer or Reset iPhone &gt; Erase All Content and Settings</strong>. On Samsung/Pixel: <strong>Settings &gt; General Management &gt; Reset &gt; Factory Data Reset</strong>.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">4. Remove Physical SIM Card</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Eject your physical SIM card with a paperclip or pin. If using eSIM, factory reset will automatically prompt to delete the active eSIM profile.
              </p>
            </div>
          </div>
        </div>

        {/* In-Store Essentials Reminder */}
        <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 space-y-1">
          <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
            <CheckSquare className="w-4 h-4 text-emerald-700" />
            <span>What to bring to your Chicago appointment:</span>
          </div>
          <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5 pl-1">
            <li>Your device (charged to at least 20% if possible)</li>
            <li>Government-issued physical photo ID (Driver's License or Passport)</li>
            <li>Charging accessories are welcomed but NOT mandatory</li>
          </ul>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-sm transition-all"
          >
            Got It, I'm Ready
          </button>
        </div>
      </div>
    </div>
  );
};
