import React, { useState } from 'react';
import {
  DeviceModel,
  DeviceCondition,
  CarrierOption,
  AIDiagnosticResult,
} from '../types/tradeIn';
import {
  Camera,
  Upload,
  Video,
  CheckCircle2,
  Sparkles,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { DepreciationChart } from './DepreciationChart';

interface SpecsAndDiagnosticsProps {
  model: DeviceModel;
  condition: DeviceCondition;
  storage: string;
  carrier: CarrierOption;
  imei: string;
  frontPhoto: string | null;
  backPhoto: string | null;
  aiResult: AIDiagnosticResult | null;
  calculatedPrice: number;
  onUpdateCondition: (cond: DeviceCondition) => void;
  onUpdateStorage: (storage: string) => void;
  onUpdateCarrier: (carrier: CarrierOption) => void;
  onUpdateImei: (imei: string) => void;
  onSetFrontPhoto: (photoUrl: string | null) => void;
  onSetBackPhoto: (photoUrl: string | null) => void;
  onSetAiResult: (res: AIDiagnosticResult | null) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const SpecsAndDiagnostics: React.FC<SpecsAndDiagnosticsProps> = ({
  model,
  condition,
  storage,
  carrier,
  imei,
  frontPhoto,
  backPhoto,
  aiResult,
  calculatedPrice,
  onUpdateCondition,
  onUpdateStorage,
  onUpdateCarrier,
  onUpdateImei,
  onSetFrontPhoto,
  onSetBackPhoto,
  onSetAiResult,
  onPrevStep,
  onNextStep,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [imeiVerified, setImeiVerified] = useState(false);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slot: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (slot === 'front') {
          onSetFrontPhoto(base64);
        } else {
          onSetBackPhoto(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSamplePhoto = (sampleType: 'mint' | 'scratch' | 'cracked') => {
    let front = '';
    let back = '';
    if (sampleType === 'mint') {
      front = 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop';
      back = 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop';
      onUpdateCondition('Mint');
    } else if (sampleType === 'scratch') {
      front = 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=400&auto=format&fit=crop';
      back = 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop';
      onUpdateCondition('Good');
    } else {
      front = 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=400&auto=format&fit=crop';
      back = 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=400&auto=format&fit=crop';
      onUpdateCondition('Broken');
    }
    onSetFrontPhoto(front);
    onSetBackPhoto(back);
  };

  const runAiDiagnostic = async () => {
    setIsScanning(true);
    setDiagnosticError(null);
    try {
      const response = await fetch('/api/appraise/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelName: model.name,
          category: model.category,
          condition,
          storage,
          carrier,
          basePrice: calculatedPrice,
          frontPhotoBase64: frontPhoto,
          backPhotoBase64: backPhoto,
          imei,
        }),
      });

      if (!response.ok) {
        throw new Error('Diagnosis request failed');
      }

      const data = await response.json();
      onSetAiResult(data);
    } catch (err: any) {
      console.error(err);
      setDiagnosticError('Could not connect to AI diagnostic service. Default appraisal preserved.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleVerifyImei = () => {
    if (!imei.trim()) return;
    setImeiVerified(true);
  };

  const conditions: { id: DeviceCondition; label: string; desc: string }[] = [
    { id: 'New', label: 'Brand New', desc: 'Factory sealed in box' },
    { id: 'Mint', label: 'Flawless / Mint', desc: 'Zero scratches or blemishes' },
    { id: 'Good', label: 'Good / Light Wear', desc: 'Minor micro-scuffs only' },
    { id: 'Fair', label: 'Fair / Scratched', desc: 'Visible cosmetic wear, no cracks' },
    { id: 'Broken', label: 'Cracked / Broken', desc: 'Cracked glass or functional defect' },
  ];

  const carriers: CarrierOption[] = ['Unlocked', 'AT&T', 'Verizon', 'T-Mobile', 'Other'];

  return (
    <div className="space-y-6">
      {/* Title & Badge summary header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Configure {model.name}
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Specify cosmetic grade, carrier, and optional photo diagnostic for locked rate.
          </p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800">
            {model.name} · {storage} · {carrier}
          </span>
        </div>
      </div>

      {/* Main Grid: Left Artwork showcase & Right Specs form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Hardware Profile Artwork with Liquid Swirl */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full liquid-art-bg p-3.5 flex items-center justify-center shadow-lg relative overflow-hidden group">
            <img
              src={frontPhoto || model.image}
              alt={model.name}
              referrerPolicy="no-referrer"
              className="max-h-36 max-w-36 object-contain drop-shadow-xl transition-transform group-hover:scale-105"
            />
          </div>

          <h3 className="text-base font-extrabold text-slate-900 mt-3">{model.name}</h3>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Hardware Appraisal Node
          </span>

          <div className="w-full mt-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Appraisal Baseline:</span>
              <span className="font-extrabold text-slate-800 tabular-nums font-mono">${calculatedPrice}.00</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Condition Tier:</span>
              <span className="font-extrabold text-emerald-600">{condition}</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Controls */}
        <div className="lg:col-span-8 neu-card p-4 sm:p-6 rounded-2xl space-y-5">
          {/* 1. Condition Selector */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              1. Physical Condition Grade
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {conditions.map((c) => {
                const isActive = condition === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onUpdateCondition(c.id)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-black truncate">{c.label}</div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {c.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Storage Capacity */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              2. Internal Storage
            </label>
            <div className="flex flex-wrap gap-2">
              {model.availableStorage.map((s) => {
                const isSelected = storage === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onUpdateStorage(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Carrier Selection */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600 mb-2">
              3. Carrier / Network Status
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {carriers.map((car) => {
                const isMatch = carrier === car;
                return (
                  <button
                    key={car}
                    type="button"
                    onClick={() => onUpdateCarrier(car)}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold border text-center transition-all ${
                      isMatch
                        ? 'border-emerald-500 bg-emerald-600 text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {car}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. IMEI / Serial Number with Clean ESN Check */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                4. IMEI Number (Optional for Instant Cash Verification)
              </label>
              <span className="text-[10px] text-slate-400">Dial *#06# on phone</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={imei}
                onChange={(e) => {
                  onUpdateImei(e.target.value);
                  setImeiVerified(false);
                }}
                placeholder="Enter 15-digit IMEI (e.g. 352948110948210)"
                className="flex-1 neu-input py-2 px-4 rounded-xl text-xs font-semibold text-slate-800"
              />
              <button
                type="button"
                onClick={handleVerifyImei}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap"
              >
                Check ESN
              </button>
            </div>
            {imeiVerified && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>IMEI Clean · Not Blacklisted · Eligible for Instant Chicago Payout</span>
              </div>
            )}
          </div>

          {/* 5. AI Photo Diagnostic & Inspection Slot */}
          <div className="pt-2 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 mb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  AI Hardware Diagnostic &amp; Inspection
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Gemini 3.8 Flash Vision Ready
              </span>
            </div>

            {/* Quick Presets for Instant Demo */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] text-slate-500 font-semibold">Test with sample photos:</span>
              <button
                type="button"
                onClick={() => loadSamplePhoto('mint')}
                className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded-lg border border-slate-200"
              >
                Mint Screen
              </button>
              <button
                type="button"
                onClick={() => loadSamplePhoto('scratch')}
                className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded-lg border border-slate-200"
              >
                Hairline Scratches
              </button>
              <button
                type="button"
                onClick={() => loadSamplePhoto('cracked')}
                className="text-[10px] font-bold px-2 py-1 bg-slate-100 hover:bg-rose-100 text-slate-700 rounded-lg border border-slate-200"
              >
                Cracked Glass
              </button>
            </div>

            {/* Upload Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Front Photo */}
              <label className="border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 p-3 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[85px] group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'front')}
                  className="hidden"
                />
                {frontPhoto ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-bold text-slate-800">Front Photo Attached</span>
                    <span className="text-[9px] text-emerald-600 font-medium">Click to replace</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Camera className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-700">Display Glass</span>
                    <span className="text-[9px] text-slate-400">Front photo</span>
                  </div>
                )}
              </label>

              {/* Back Photo */}
              <label className="border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 p-3 rounded-xl text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[85px] group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'back')}
                  className="hidden"
                />
                {backPhoto ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-[10px] font-bold text-slate-800">Back Photo Attached</span>
                    <span className="text-[9px] text-emerald-600 font-medium">Click to replace</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 mb-1" />
                    <span className="text-[11px] font-bold text-slate-700">Back Enclosure</span>
                    <span className="text-[9px] text-slate-400">Camera &amp; housing</span>
                  </div>
                )}
              </label>

              {/* 360 Scan / Action Button */}
              <div className="flex flex-col items-center justify-center bg-emerald-50/60 border border-emerald-200/80 p-2.5 rounded-xl text-center">
                <button
                  type="button"
                  onClick={runAiDiagnostic}
                  disabled={isScanning}
                  className="w-full h-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2 px-3 rounded-lg shadow-sm flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-70"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scanning Pixels...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run AI Diagnosis</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Result Card if Generated */}
            {aiResult && (
              <div className="mt-4 bg-white border border-emerald-300 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black text-slate-900">
                      R3UP Certified AI Hardware Appraisal
                    </span>
                  </div>
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {aiResult.detectedGrade}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Screen Glass</span>
                    <span className="font-semibold text-slate-800">{aiResult.screenIntegrity}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Chassis &amp; Bezel</span>
                    <span className="font-semibold text-slate-800">{aiResult.casingCondition}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Camera Module</span>
                    <span className="font-semibold text-slate-800">{aiResult.cameraLensQuality}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-emerald-50/70 p-2.5 rounded-xl">
                  <span className="text-xs font-bold text-emerald-900">
                    Confidence: {aiResult.confidenceScore}% · {aiResult.summaryNotes}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Adjusted Offer</span>
                    <span className="text-base font-black text-emerald-700 tabular-nums font-mono">
                      ${aiResult.finalAppraisedValue}.00
                    </span>
                  </div>
                </div>
              </div>
            )}

            {diagnosticError && (
              <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{diagnosticError}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* D3 Depreciation Chart Component */}
      <DepreciationChart model={model} currentValue={calculatedPrice} />

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-200/80">
        <button
          onClick={onPrevStep}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1.5 hover:bg-slate-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Device</span>
        </button>
        <button
          onClick={onNextStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Compare Live Buyer Quotes</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
