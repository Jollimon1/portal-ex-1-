import React, { useState } from 'react';
import { DeviceCategory, DeviceModel } from '../types/tradeIn';
import { DEVICE_CATEGORIES, DEVICE_MODELS } from '../data/deviceCatalog';
import { Search, Smartphone, Tablet, Laptop, Watch, ArrowRight } from 'lucide-react';

interface DeviceSelectorProps {
  currentCategory: DeviceCategory;
  selectedModel: DeviceModel;
  onSelectCategory: (cat: DeviceCategory) => void;
  onSelectModel: (model: DeviceModel) => void;
  onNextStep: () => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  currentCategory,
  selectedModel,
  onSelectCategory,
  onSelectModel,
  onNextStep,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Tablet':
        return <Tablet className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Watch':
        return <Watch className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const currentModels = DEVICE_MODELS[currentCategory] || [];
  const filteredModels = currentModels.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Category Grid */}
      <div>
        <h3 className="text-base font-extrabold text-center text-slate-800 mb-3 tracking-tight">
          Select Your Device Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
          {DEVICE_CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`neu-btn p-3 rounded-2xl text-center cursor-pointer flex flex-col items-center justify-between gap-2 border-2 transition-all duration-200 group ${
                  isActive
                    ? 'border-emerald-500 bg-white shadow-md'
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center p-1">
                  <img
                    src={cat.sampleImage}
                    alt={cat.label}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex items-center gap-1.5 w-full justify-center">
                  <span
                    className={`w-full py-1 px-1 rounded-lg font-bold text-xs truncate transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Model Selection & Search */}
      <div className="pt-4 border-t border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">
              Select Specific {DEVICE_CATEGORIES.find((c) => c.id === currentCategory)?.label} Model
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Click a model to inspect its real-time trade-in baseline
            </p>
          </div>

          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model (e.g. 15 Pro, S24, M3)..."
              className="w-full neu-input py-1.5 px-3 pl-8 rounded-full text-xs font-semibold text-slate-700"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-[10px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => {
              const isChosen = selectedModel.id === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => onSelectModel(model)}
                  className={`neu-card p-3.5 rounded-2xl border cursor-pointer text-center space-y-2 transition-all group ${
                    isChosen
                      ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="h-20 flex items-center justify-center">
                    <img
                      src={model.image}
                      alt={model.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain mx-auto group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold text-slate-800 truncate">
                      {model.name}
                    </h5>
                    <span className="text-[11px] font-bold text-emerald-600 tabular-nums font-mono">
                      Up to ${model.basePrice + 100}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectModel(model);
                      onNextStep();
                    }}
                    className={`w-full text-[10px] font-extrabold py-1.5 rounded-lg transition-colors ${
                      isChosen
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                    }`}
                  >
                    {isChosen ? 'Selected • Configure' : 'Select'}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-xs text-slate-500">
              No models found matching "{searchQuery}". Try selecting another category or clear your search.
            </div>
          )}
        </div>
      </div>

      {/* Footer step continuation */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-200/80">
        <span className="text-xs font-semibold text-slate-500">
          Selected: <strong className="text-slate-800">{selectedModel.name}</strong>
        </span>
        <button
          onClick={onNextStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
        >
          <span>Next: Hardware Specs &amp; Diagnostics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
