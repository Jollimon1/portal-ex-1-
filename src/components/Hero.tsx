import React from 'react';
import { Zap, ShieldCheck, MapPin, Clock, Banknote, ArrowDown } from 'lucide-react';
import { PhoneHeroGraphic } from './PhoneHeroGraphic';

interface HeroProps {
  onStartAppraisal: () => void;
  onExploreHubs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAppraisal, onExploreHubs }) => {
  return (
    <section className="relative w-full bg-slate-950 text-white min-h-[460px] lg:min-h-[500px] flex items-start justify-center pt-10 pb-36 px-4 overflow-hidden">
      {/* Chicago Skyline Background with Rich Atmospheric Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1600&auto=format&fit=crop"
          alt="Chicago Skyline"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/75 to-[#f0f3f8]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 px-2 sm:px-4">
        {/* Left Column: Core Value Proposition */}
        <div className="text-center md:text-left space-y-3.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Chicago Downtown Loop &amp; Lincoln Park Hubs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md text-balance leading-tight">
            Sell Your Phone in <span className="text-emerald-400">Chicago</span>
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed max-w-lg drop-shadow">
            Check live device buyback values, run instant AI hardware inspection, and walk out with
            same-day cash in hand at our Loop or Lincoln Park partner hubs.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/60 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Cash In Hand</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700/60 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>14-Day Price Freeze</span>
            </div>
            <button
              onClick={onExploreHubs}
              className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 backdrop-blur-sm text-slate-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>4 Local Drop-Offs</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
            <button
              onClick={onStartAppraisal}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Appraise Your Phone Below</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Upgraded Dual-Phone 3D Aesthetic Overlay Graphic */}
        <div className="hidden md:flex relative shrink-0 items-center justify-center">
          <PhoneHeroGraphic />
        </div>
      </div>
    </section>
  );
};
