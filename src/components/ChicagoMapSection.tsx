import React, { useEffect, useRef, useState } from 'react';
import { CHICAGO_LOCATIONS } from '../data/chicagoLocations';
import { ChicagoStoreLocation } from '../types/tradeIn';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  Banknote,
  Truck,
  ExternalLink,
  Star,
  Layers,
  Map as MapIcon,
} from 'lucide-react';
import L from 'leaflet';

interface ChicagoMapSectionProps {
  onSelectStoreForDropOff: (storeId: string) => void;
}

export const ChicagoMapSection: React.FC<ChicagoMapSectionProps> = ({
  onSelectStoreForDropOff,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeLocationId, setActiveLocationId] = useState<string>('chicago-loop');
  const [mapMode, setMapMode] = useState<'leaflet' | 'google'>('leaflet');

  const activeLocation =
    CHICAGO_LOCATIONS.find((l) => l.id === activeLocationId) || CHICAGO_LOCATIONS[0];

  useEffect(() => {
    if (!mapContainerRef.current || mapMode !== 'leaflet') return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: false,
      }).setView([41.895, -87.645], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Custom marker icon creation
      const createCustomIcon = (isPrimary: boolean) => {
        return L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="
            background-color: ${isPrimary ? '#059669' : '#0f172a'};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
            font-size: 14px;
            font-weight: bold;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      };

      // Add markers for all Chicago locations
      CHICAGO_LOCATIONS.forEach((loc) => {
        const isPrimary = loc.id === 'chicago-loop';
        const marker = L.marker([loc.lat, loc.lng], {
          icon: createCustomIcon(isPrimary),
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 200px;">
            <strong style="color: #0f172a; font-size: 13px; display: block;">${loc.name}</strong>
            <p style="color: #64748b; font-size: 11px; margin: 3px 0;">${loc.address}, Chicago IL</p>
            <span style="color: #059669; font-weight: bold; font-size: 10px;">${loc.tag}</span>
          </div>
        `);

        marker.on('click', () => {
          setActiveLocationId(loc.id);
        });

        markersRef.current[loc.id] = marker;
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, [mapMode]);

  const focusLocation = (loc: ChicagoStoreLocation) => {
    setActiveLocationId(loc.id);
    if (mapMode === 'leaflet' && mapInstanceRef.current) {
      mapInstanceRef.current.setView([loc.lat, loc.lng], 14, { animate: true });
      const marker = markersRef.current[loc.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <section id="chicago-hubs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-200">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Google Local Verified Trade-In Hubs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Chicago Partner Store &amp; Drop-Off Locations
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-500">
          Walk in with your phone, have our certified technicians inspect it in under 15 minutes, and walk out with immediate cash or electronic transfer.
        </p>

        {/* Google Maps Local SEO Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-slate-600">
          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-extrabold text-slate-800 ml-1">4.9 / 5.0</span>
            <span className="text-slate-400 text-[11px]">(1,240+ Google Reviews)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm text-[11px] font-bold text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Indexed on Google Maps &amp; Local 3-Pack</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Store Cards List (Semantic Microdata for Search Engines) */}
        <div className="lg:col-span-5 space-y-3.5">
          {CHICAGO_LOCATIONS.map((loc) => {
            const isSelected = activeLocationId === loc.id;
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.name} ${loc.address} Chicago IL`)}`;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.address}, Chicago, IL`)}`;

            return (
              <div
                key={loc.id}
                itemScope
                itemType="https://schema.org/ElectronicsStore"
                onClick={() => focusLocation(loc)}
                className={`neu-card p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <h3 itemProp="name" className="text-sm font-black text-slate-900">
                      {loc.name}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      loc.instantCashReady
                        ? 'text-emerald-700 bg-emerald-100'
                        : 'text-slate-600 bg-slate-100'
                    }`}
                  >
                    {loc.tag}
                  </span>
                </div>

                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="pl-6 text-xs text-slate-600 font-medium">
                  <span itemProp="streetAddress">{loc.address}</span>,{' '}
                  <span itemProp="addressLocality">Chicago</span>,{' '}
                  <span itemProp="addressRegion">IL</span>{' '}
                  <span itemProp="postalCode">{loc.zip}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pl-6 pt-2 mt-2 border-t border-slate-100 gap-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {loc.hours}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-emerald-700">
                    <Banknote className="w-3 h-3" />
                    {loc.instantCashReady ? 'Instant Cash Ready' : 'Same-Day Digital Pay'}
                  </span>
                </div>

                {/* Google Maps Actions & Drop-Off Booking */}
                <div className="pt-2.5 pl-6 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStoreForDropOff(loc.id);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition-all"
                  >
                    Schedule Drop-Off Here
                  </button>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="neu-btn text-slate-700 hover:text-slate-900 text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Navigation className="w-3 h-3 text-emerald-600" />
                    <span>Google Directions</span>
                  </a>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="neu-btn text-slate-600 hover:text-slate-900 text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                    <span>View on Google Maps</span>
                  </a>
                </div>
              </div>
            );
          })}

          {/* Mail-in kit reassurance strip */}
          <div className="neu-card p-4 rounded-2xl bg-slate-900 text-white space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-400">
              <Truck className="w-4 h-4" />
              <span>Not in Downtown Chicago?</span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              We provide free prepaid USPS/FedEx shipping boxes anywhere in Illinois with tracked delivery and insured transit.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Map with Google Maps Embed View Toggle */}
        <div className="lg:col-span-7 neu-card p-3 rounded-3xl bg-white shadow-xl space-y-2">
          {/* Map View Switcher */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
              <span className="text-emerald-700 font-bold">{activeLocation.name}</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMapMode('leaflet')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  mapMode === 'leaflet'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Hub Network</span>
              </button>
              <button
                type="button"
                onClick={() => setMapMode('google')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  mapMode === 'google'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MapIcon className="w-3 h-3" />
                <span>Google Maps View</span>
              </button>
            </div>
          </div>

          {/* Map Display Container */}
          <div className="w-full h-[450px] rounded-2xl border border-slate-200 overflow-hidden relative">
            {mapMode === 'leaflet' ? (
              <div
                ref={mapContainerRef}
                className="w-full h-full"
              />
            ) : (
              <iframe
                title={`Google Map - ${activeLocation.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${activeLocation.address}, Chicago, IL ${activeLocation.zip}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-2">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {activeLocation.address} · Phone:{' '}
                <a href="tel:3125557387" className="font-bold text-slate-800 underline">
                  {activeLocation.phone}
                </a>
              </span>
            </span>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${activeLocation.address}, Chicago, IL`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-extrabold hover:underline flex items-center gap-1"
            >
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
