export type DeviceCategory = 'iphone' | 'samsung' | 'pixel' | 'ipad' | 'macbook' | 'watch';

export type DeviceCondition = 'Mint' | 'Good' | 'Fair' | 'Broken' | 'New';

export type CarrierOption = 'Unlocked' | 'AT&T' | 'Verizon' | 'T-Mobile' | 'Other';

export interface DeviceModel {
  id: string;
  category: DeviceCategory;
  brand: string;
  name: string;
  image: string;
  basePrice: number;
  availableStorage: string[];
  popular?: boolean;
}

export interface AppraisalState {
  category: DeviceCategory;
  model: DeviceModel;
  condition: DeviceCondition;
  storage: string;
  carrier: CarrierOption;
  imei: string;
  frontPhoto: string | null;
  backPhoto: string | null;
  aiDiagnosticResult: AIDiagnosticResult | null;
  selectedBuyer: string;
  selectedOfferPrice: number;
  payoutMethod: 'cash' | 'applepay' | 'zelle' | 'paypal' | 'bank';
  payoutAccountDetail: string;
  fulfillmentType: 'dropoff' | 'ship';
  selectedStoreId: string;
  dropOffDate: string;
  dropOffTime: string;
}

export interface AIDiagnosticResult {
  detectedGrade: string;
  screenIntegrity: string;
  casingCondition: string;
  cameraLensQuality: string;
  estimatedValuationAdjustment: number;
  finalAppraisedValue: number;
  confidenceScore: number;
  summaryNotes: string;
  checklistVerification: string[];
  aiPowered?: boolean;
}

export interface BuyerOffer {
  id: string;
  name: string;
  logoText: string;
  rating: number;
  payoutSpeed: string;
  isLocalCash: boolean;
  freeShipping: boolean;
  freeReturns: boolean;
  baseMultiplier: number;
  highlight?: string;
}

export interface ChicagoStoreLocation {
  id: string;
  name: string;
  tag: string;
  address: string;
  zip: string;
  neighborhood: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  instantCashReady: boolean;
  features: string[];
}

export interface TradeInOrder {
  orderId: string;
  createdAt: string;
  device: {
    name: string;
    category: string;
    condition: string;
    storage: string;
    carrier: string;
    imei?: string;
    image: string;
  };
  valuation: number;
  buyerName: string;
  payoutMethod: string;
  payoutAccount: string;
  fulfillmentType: 'dropoff' | 'ship';
  store?: ChicagoStoreLocation;
  appointmentTime?: string;
  lockExpirationDate: string;
}
