import React from 'react';
import { Banknote, ShieldCheck, Clock, ArrowUpRight } from 'lucide-react';

export const PhoneHeroGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-[420px] h-[380px] sm:h-[420px] flex items-center justify-center select-none">
      {/* 1. Luminescent Neon Green Halo Ring (Inspired by reference aesthetic) */}
      <div className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border-[2px] border-emerald-400/80 shadow-[0_0_50px_rgba(52,211,153,0.45),inset_0_0_30px_rgba(52,211,153,0.25)] pointer-events-none -right-4 sm:-right-8 top-6 opacity-90 transition-all duration-700"></div>

      {/* Ambient background soft neon wash */}
      <div className="absolute w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none -right-6 top-8"></div>

      {/* Subtle Editorial Top Tag */}
      <div className="absolute top-2 right-4 sm:right-6 text-right pointer-events-none hidden sm:block">
        <span className="text-[9px] font-black tracking-widest text-emerald-400/90 uppercase block">
          LOOK FORWARD.
        </span>
        <span className="text-[9px] font-bold tracking-wider text-slate-300 uppercase block">
          UNLOCK YOUR PHONE'S VALUE.
        </span>
      </div>

      {/* 2. DUAL-PHONE 3D COMPOSITION */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* PHONE 1: Titanium Rear Profile with Triple Camera Matrix (Left/Back Phone) */}
        <div className="absolute left-6 sm:left-10 bottom-6 sm:bottom-10 w-[170px] sm:w-[195px] h-[330px] sm:h-[370px] -rotate-[14deg] transition-transform duration-500 hover:-rotate-[10deg] z-10 drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]">
          {/* Phone Outer Chassis (Brushed Titanium Edge) */}
          <div className="w-full h-full rounded-[44px] p-[3px] bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_20px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {/* Phone Body (Matte Satin Titanium Back) */}
            <div className="w-full h-full rounded-[41px] bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-3 relative overflow-hidden">
              {/* Subtle metallic reflection streak */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

              {/* Triple Camera Island Plateau */}
              <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-slate-600/90 to-slate-800/95 p-2 shadow-[2px_3px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] relative">
                {/* Camera Lens 1 (Top Left) */}
                <div className="absolute top-2.5 left-2.5 w-9 h-9 rounded-full bg-slate-950 p-[2px] shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-slate-500/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-black p-[2px] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950 border border-slate-700/80 relative overflow-hidden">
                      {/* Lens Reflection Highlight */}
                      <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400/40 blur-[0.5px]"></div>
                    </div>
                  </div>
                </div>

                {/* Camera Lens 2 (Bottom Left) */}
                <div className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-full bg-slate-950 p-[2px] shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-slate-500/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-black p-[2px] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950 border border-slate-700/80 relative overflow-hidden">
                      <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400/40 blur-[0.5px]"></div>
                    </div>
                  </div>
                </div>

                {/* Camera Lens 3 (Right Middle) */}
                <div className="absolute top-7 right-2.5 w-9 h-9 rounded-full bg-slate-950 p-[2px] shadow-[0_2px_5px_rgba(0,0,0,0.8)] border border-slate-500/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-black p-[2px] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-950 border border-slate-700/80 relative overflow-hidden">
                      <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400/40 blur-[0.5px]"></div>
                    </div>
                  </div>
                </div>

                {/* TrueTone Flash */}
                <div className="absolute top-3 right-4 w-3.5 h-3.5 rounded-full bg-amber-100/90 shadow-[0_0_6px_rgba(254,240,138,0.5)] border border-amber-300/40"></div>

                {/* LiDAR Sensor */}
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-950 border border-slate-700/60"></div>
              </div>

              {/* Minimal Brand Logo Silhouette in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-600/30 flex items-center justify-center opacity-60">
                <div className="w-4 h-5 rounded-full bg-slate-400/40"></div>
              </div>
            </div>
          </div>
        </div>

        {/* PHONE 2: OLED Front Display with Liquid Wave Wallpaper (Right/Front Phone) */}
        <div className="absolute right-4 sm:right-8 bottom-3 sm:bottom-6 w-[180px] sm:w-[205px] h-[345px] sm:h-[390px] rotate-[8deg] transition-transform duration-500 hover:rotate-[4deg] z-20 drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]">
          {/* Phone Outer Chassis (Curved Titanium Edge) */}
          <div className="w-full h-full rounded-[46px] p-[3px] bg-gradient-to-b from-slate-300 via-slate-500 to-slate-800 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.6),0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Phone Front Glass / Display */}
            <div className="w-full h-full rounded-[43px] bg-slate-950 p-[5px] relative overflow-hidden flex flex-col justify-between">
              {/* Dynamic Island Pill Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black z-30 flex items-center justify-end px-2 border border-slate-900/60 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
              </div>

              {/* Screen Display Content: Silky Organic Wave Artwork (Matching Reference Mood) */}
              <div className="w-full h-full rounded-[38px] overflow-hidden relative bg-slate-950 flex flex-col justify-between p-4">
                {/* Wallpaper: Abstract Liquid Wave Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#064e3b] to-[#022c22] opacity-95"></div>

                {/* Swirling Silk Wave SVG Graphic */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-70"
                  viewBox="0 0 200 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-20 180 C 40 120, 140 240, 220 140 C 260 90, 220 300, 180 340 C 120 400, 20 360, -20 280 Z"
                    fill="url(#wave-grad-1)"
                  />
                  <path
                    d="M30 40 C 90 90, 160 110, 210 50 C 250 10, 200 240, 140 280 C 80 320, 0 240, 30 40 Z"
                    fill="url(#wave-grad-2)"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="wave-grad-1" x1="0" y1="0" x2="200" y2="400" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="0.5" stopColor="#059669" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#047857" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="wave-grad-2" x1="200" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6ee7b7" stopOpacity="0.7" />
                      <stop offset="0.6" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#064e3b" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Diagonal Glass Sheen Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                {/* Subtle In-Screen UI: Lockscreen Time & Status */}
                <div className="relative z-20 pt-6 text-center space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest block">
                    Chicago Hub
                  </span>
                  <span className="text-xl font-black text-white tracking-tight drop-shadow">
                    9:41
                  </span>
                </div>

                {/* In-Screen Quote Lock Card */}
                <div className="relative z-20 bg-slate-950/75 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-500/40 text-center shadow-lg space-y-1">
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Instant Appraised Value
                  </span>
                  <div className="text-lg font-black text-white tabular-nums font-mono flex items-center justify-center gap-1">
                    <span className="text-emerald-400">$</span>980.00
                  </div>
                  <span className="text-[8px] font-semibold text-slate-400 block">
                    Certified 14-Day Lock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SLEEK FLOATING GLASSMORPHIC MICRO-BADGES */}

        {/* Badge 1: Top Floating Cash Payout Pill */}
        <div className="absolute -top-3 left-4 sm:left-6 z-30 bg-slate-900/90 backdrop-blur-md border border-emerald-500/50 py-1.5 px-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center gap-2 animate-bounce-subtle">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Banknote className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-black text-white tracking-tight">Instant Cash Out</span>
            <span className="text-[11px] font-black text-emerald-400 font-mono tabular-nums">$980</span>
          </div>
        </div>

        {/* Badge 2: Bottom Floating 15-Minute Intake Badge */}
        <div className="absolute -bottom-2 right-2 sm:right-6 z-30 bg-slate-900/90 backdrop-blur-md border border-slate-700/90 py-1.5 px-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Clock className="w-3 h-3 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-white block leading-tight">
              15-Min Payout
            </span>
            <span className="text-[9px] font-bold text-slate-400 block leading-tight">
              Downtown Loop Hub
            </span>
          </div>
        </div>

        {/* Badge 3: Left Rate Freeze Chip */}
        <div className="absolute top-1/2 -left-2 sm:-left-4 -translate-y-1/2 z-30 bg-slate-900/85 backdrop-blur-md border border-emerald-500/30 py-1 px-2.5 rounded-xl shadow-lg flex items-center gap-1.5 hidden sm:flex">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-black text-slate-200">14-Day Guarantee</span>
        </div>
      </div>
    </div>
  );
};
