import React from 'react';
import { ArrowUpDown, Phone, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenPrepGuide: () => void;
  onOpenSupport: () => void;
  onScrollToWidget: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrepGuide,
  onOpenSupport,
  onScrollToWidget,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#f0f3f8]/95 backdrop-blur-md border-b border-slate-200/90 py-3.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element + clean mark) */}
        <a
          href="#widget-container"
          onClick={(e) => {
            e.preventDefault();
            onScrollToWidget();
          }}
          className="flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <ArrowUpDown className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              R3UP <span className="text-emerald-600 font-black">Chicago</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Local Device Trade-In
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <a
            href="#widget-container"
            onClick={(e) => {
              e.preventDefault();
              onScrollToWidget();
            }}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Appraise Device
          </a>
          <a
            href="#chicago-hubs"
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Chicago Locations
          </a>
          <button
            onClick={onOpenPrepGuide}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            Device Prep Guide
          </button>
          <a
            href="#support-chat"
            onClick={(e) => {
              e.preventDefault();
              onOpenSupport();
            }}
            className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Live Support
          </a>
          <a
            href="tel:3125557387"
            className="text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap shrink-0 py-1 flex items-center gap-1.5"
          >
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>(312) 555-7387</span>
          </a>
        </nav>

        {/* Zone 3: 1 Primary CTA Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onScrollToWidget}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
          >
            Instant Cash Quote
          </button>
        </div>
      </div>
    </header>
  );
};
