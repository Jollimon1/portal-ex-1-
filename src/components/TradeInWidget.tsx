import React, { useState, useMemo } from 'react';
import {
  DeviceCategory,
  DeviceModel,
  DeviceCondition,
  CarrierOption,
  AIDiagnosticResult,
} from '../types/tradeIn';
import { DEVICE_MODELS, calculateDeviceValuation } from '../data/deviceCatalog';
import { DeviceSelector } from './DeviceSelector';
import { SpecsAndDiagnostics } from './SpecsAndDiagnostics';
import { QuoteComparison } from './QuoteComparison';
import { LogisticsAndCheckout } from './LogisticsAndCheckout';
import { Check, ChevronRight, TrendingDown } from 'lucide-react';
import { DepreciationChart } from './DepreciationChart';

interface TradeInWidgetProps {
  onCompleteOrder: (orderData: any) => void;
  onScrollToMap: () => void;
}

export const TradeInWidget: React.FC<TradeInWidgetProps> = ({
  onCompleteOrder,
  onScrollToMap,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showTrendChart, setShowTrendChart] = useState<boolean>(false);

  // Appraisal State
  const [category, setCategory] = useState<DeviceCategory>('iphone');
  const [selectedModel, setSelectedModel] = useState<DeviceModel>(
    DEVICE_MODELS.iphone[0] // Default iPhone 15 Pro Max
  );
  const [condition, setCondition] = useState<DeviceCondition>('Mint');
  const [storage, setStorage] = useState<string>('256GB');
  const [carrier, setCarrier] = useState<CarrierOption>('Unlocked');
  const [imei, setImei] = useState<string>('');
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [backPhoto, setBackPhoto] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIDiagnosticResult | null>(null);

  // Buyer & Logistics
  const [selectedBuyer, setSelectedBuyer] = useState<string>(
    'R3UP Chicago (In-Store Instant Cash)'
  );
  const [payoutMethod, setPayoutMethod] = useState<'cash' | 'applepay' | 'zelle' | 'paypal' | 'bank'>(
    'cash'
  );
  const [payoutAccountDetail, setPayoutAccountDetail] = useState<string>('');
  const [fulfillmentType, setFulfillmentType] = useState<'dropoff' | 'ship'>('dropoff');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('chicago-loop');
  const [dropOffDate, setDropOffDate] = useState<string>('Today');
  const [dropOffTime, setDropOffTime] = useState<string>('2:30 PM');

  // Sync default storage when model changes
  const handleSelectModel = (model: DeviceModel) => {
    setSelectedModel(model);
    if (model.availableStorage.length > 0 && !model.availableStorage.includes(storage)) {
      setStorage(model.availableStorage[0]);
    }
  };

  const handleSelectCategory = (cat: DeviceCategory) => {
    setCategory(cat);
    const models = DEVICE_MODELS[cat];
    if (models && models.length > 0) {
      setSelectedModel(models[0]);
      if (models[0].availableStorage.length > 0) {
        setStorage(models[0].availableStorage[0]);
      }
    }
  };

  // Live valuation
  const baseCalculatedPrice = useMemo(() => {
    return calculateDeviceValuation(
      selectedModel.basePrice,
      condition,
      storage,
      carrier
    );
  }, [selectedModel, condition, storage, carrier]);

  // If AI inspection returned an adjusted value, take that into consideration
  const finalCalculatedPrice = useMemo(() => {
    if (aiResult?.finalAppraisedValue) {
      return aiResult.finalAppraisedValue;
    }
    return baseCalculatedPrice;
  }, [baseCalculatedPrice, aiResult]);

  // Selected buyer offer price
  const [buyerOfferOverride, setBuyerOfferOverride] = useState<number | null>(null);
  const currentOfferPrice = buyerOfferOverride ?? Math.round(finalCalculatedPrice * 1.05);

  const handleSelectBuyerOffer = (buyerName: string, offerPrice: number) => {
    setSelectedBuyer(buyerName);
    setBuyerOfferOverride(offerPrice);
  };

  const handleFinishCheckout = () => {
    const orderData = {
      device: {
        name: selectedModel.name,
        category,
        condition,
        storage,
        carrier,
        imei: imei.trim() || undefined,
        image: frontPhoto || selectedModel.image,
      },
      valuation: currentOfferPrice,
      buyerName: selectedBuyer,
      payoutMethod,
      payoutAccount: payoutAccountDetail || 'Verified Customer',
      fulfillmentType,
      selectedStoreId,
      dropOffDate,
      dropOffTime,
      aiDiagnosticResult: aiResult,
    };
    onCompleteOrder(orderData);
  };

  const steps = [
    { num: 1, label: 'Select Device' },
    { num: 2, label: 'Specs & Diagnostics' },
    { num: 3, label: 'Quotes' },
    { num: 4, label: 'Payout & Logistics' },
  ];

  return (
    <main
      id="widget-container"
      className="max-w-5xl mx-auto px-4 sm:px-6 w-full -mt-24 sm:-mt-28 relative z-20 mb-14"
    >
      {/* Outer Neumorphic Card Container */}
      <div className="neu-card rounded-3xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        {/* Step Navigation Tabs & Live Valuation Display */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {steps.map((st, idx) => {
              const isCurrent = activeStep === st.num;
              const isPast = activeStep > st.num;
              return (
                <React.Fragment key={st.num}>
                  <button
                    type="button"
                    onClick={() => setActiveStep(st.num)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-md'
                        : isPast
                        ? 'neu-btn text-emerald-800 bg-emerald-50/80'
                        : 'neu-btn text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold ${
                        isCurrent
                          ? 'bg-white/20 text-white'
                          : isPast
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPast ? <Check className="w-2.5 h-2.5" /> : st.num}
                    </span>
                    <span>{st.label}</span>
                  </button>
                  {idx < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Valuation Live Summary Indicator & Depreciation Trend Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowTrendChart(!showTrendChart)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                showTrendChart
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
              }`}
            >
              <TrendingDown className={`w-3.5 h-3.5 ${showTrendChart ? 'text-white' : 'text-rose-500'}`} />
              <span>{showTrendChart ? 'Hide Trend' : '6-Mo. Trend'}</span>
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Est. Value:
              </span>
              <span className="text-base font-black text-emerald-600 tabular-nums font-mono">
                ${currentOfferPrice}.00
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Global D3 Depreciation Chart Drawer */}
        {showTrendChart && (
          <div className="mb-6 animate-fade-in">
            <DepreciationChart
              model={selectedModel}
              currentValue={finalCalculatedPrice}
            />
          </div>
        )}

        {/* Step Views */}
        {activeStep === 1 && (
          <DeviceSelector
            currentCategory={category}
            selectedModel={selectedModel}
            onSelectCategory={handleSelectCategory}
            onSelectModel={handleSelectModel}
            onNextStep={() => setActiveStep(2)}
          />
        )}

        {activeStep === 2 && (
          <SpecsAndDiagnostics
            model={selectedModel}
            condition={condition}
            storage={storage}
            carrier={carrier}
            imei={imei}
            frontPhoto={frontPhoto}
            backPhoto={backPhoto}
            aiResult={aiResult}
            calculatedPrice={baseCalculatedPrice}
            onUpdateCondition={setCondition}
            onUpdateStorage={setStorage}
            onUpdateCarrier={setCarrier}
            onUpdateImei={setImei}
            onSetFrontPhoto={setFrontPhoto}
            onSetBackPhoto={setBackPhoto}
            onSetAiResult={setAiResult}
            onPrevStep={() => setActiveStep(1)}
            onNextStep={() => setActiveStep(3)}
          />
        )}

        {activeStep === 3 && (
          <QuoteComparison
            model={selectedModel}
            condition={condition}
            storage={storage}
            carrier={carrier}
            calculatedPrice={finalCalculatedPrice}
            selectedBuyer={selectedBuyer}
            onSelectBuyer={handleSelectBuyerOffer}
            onPrevStep={() => setActiveStep(2)}
            onNextStep={() => setActiveStep(4)}
          />
        )}

        {activeStep === 4 && (
          <LogisticsAndCheckout
            model={selectedModel}
            condition={condition}
            storage={storage}
            carrier={carrier}
            selectedBuyer={selectedBuyer}
            selectedOfferPrice={currentOfferPrice}
            payoutMethod={payoutMethod}
            payoutAccountDetail={payoutAccountDetail}
            fulfillmentType={fulfillmentType}
            selectedStoreId={selectedStoreId}
            dropOffDate={dropOffDate}
            dropOffTime={dropOffTime}
            onUpdatePayoutMethod={setPayoutMethod}
            onUpdatePayoutDetail={setPayoutAccountDetail}
            onUpdateFulfillment={setFulfillmentType}
            onUpdateSelectedStore={setSelectedStoreId}
            onUpdateDropOffDate={setDropOffDate}
            onUpdateDropOffTime={setDropOffTime}
            onPrevStep={() => setActiveStep(3)}
            onCompleteOrder={handleFinishCheckout}
            onScrollToMap={onScrollToMap}
          />
        )}
      </div>
    </main>
  );
};
