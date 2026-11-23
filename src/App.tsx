/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TradeInWidget } from './components/TradeInWidget';
import { ChicagoMapSection } from './components/ChicagoMapSection';
import { TradeInSupportSection } from './components/TradeInSupportSection';
import { PrepGuideModal } from './components/PrepGuideModal';
import { OrderVoucherModal } from './components/OrderVoucherModal';
import { Footer } from './components/Footer';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [isPrepModalOpen, setIsPrepModalOpen] = useState(false);
  const [orderVoucherData, setOrderVoucherData] = useState<any>(null);
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const scrollToWidget = () => {
    const el = document.getElementById('widget-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMap = () => {
    const el = document.getElementById('chicago-hubs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSupport = () => {
    const el = document.getElementById('support-chat');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCompleteOrder = (orderData: any) => {
    setOrderVoucherData(orderData);
    showToast(
      'Trade-In Locked & Confirmed!',
      `Your ${orderData.device.name} quote of $${orderData.valuation}.00 is locked for 14 days.`
    );
  };

  const handleSelectStoreForDropOff = (storeId: string) => {
    scrollToWidget();
    showToast('Store Selected', 'Scheduled for drop-off. Complete your trade-in details above.');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f0f3f8] text-slate-800">
      {/* Top Header */}
      <Header
        onOpenPrepGuide={() => setIsPrepModalOpen(true)}
        onOpenSupport={scrollToSupport}
        onScrollToWidget={scrollToWidget}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartAppraisal={scrollToWidget}
          onExploreHubs={scrollToMap}
        />

        {/* 4-Step Interactive Trade-In Appraisal Widget */}
        <TradeInWidget
          onCompleteOrder={handleCompleteOrder}
          onScrollToMap={scrollToMap}
        />

        {/* Chicago Drop-Off Locations & Interactive Leaflet Map */}
        <ChicagoMapSection
          onSelectStoreForDropOff={handleSelectStoreForDropOff}
        />

        {/* Real-Time Live Support Chat & Direct Help */}
        <TradeInSupportSection
          onShowToast={showToast}
          onOpenPrepGuide={() => setIsPrepModalOpen(true)}
        />
      </div>

      {/* Footer */}
      <Footer
        onScrollToWidget={scrollToWidget}
        onOpenPrepGuide={() => setIsPrepModalOpen(true)}
      />

      {/* Prep Guide Modal */}
      <PrepGuideModal
        isOpen={isPrepModalOpen}
        onClose={() => setIsPrepModalOpen(false)}
      />

      {/* Confirmed Order Voucher Modal */}
      <OrderVoucherModal
        isOpen={Boolean(orderVoucherData)}
        orderData={orderVoucherData}
        onClose={() => setOrderVoucherData(null)}
      />

      {/* Live Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-slide-up">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-black text-white">{toast.title}</h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white text-xs p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
