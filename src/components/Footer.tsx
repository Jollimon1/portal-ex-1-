import React from 'react';
import { ArrowUpDown, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onScrollToWidget: () => void;
  onOpenPrepGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToWidget, onOpenPrepGuide }) => {
  return (
    <footer className="w-full bg-slate-950 text-white py-12 px-6 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold">
            <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">R3UP Nation Chicago</span>
              <span className="text-[10px] text-slate-400 font-medium">· Local Buyback Portal</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              100 N LaSalle St, Suite 400, Chicago, IL 60602 · (312) 555-R3UP
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
          <button
            onClick={onScrollToWidget}
            className="hover:text-emerald-400 transition-colors"
          >
            Sell Phone
          </button>
          <a href="#chicago-hubs" className="hover:text-emerald-400 transition-colors">
            Chicago Hubs
          </a>
          <button
            onClick={onOpenPrepGuide}
            className="hover:text-emerald-400 transition-colors"
          >
            Prep Checklist
          </button>
          <a href="#support-chat" className="hover:text-emerald-400 transition-colors">
            Customer Support
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
        <span>&copy; {new Date().getFullYear()} R3UP Trade-In Portal. All device trademarks are property of their respective owners.</span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>100% Guaranteed Payouts &amp; Certified Data Destruction</span>
        </span>
      </div>
    </footer>
  );
};
