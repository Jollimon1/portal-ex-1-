import { DeviceCategory, DeviceModel, BuyerOffer } from '../types/tradeIn';

export const DEVICE_CATEGORIES: { id: DeviceCategory; label: string; icon: string; sampleImage: string }[] = [
  {
    id: 'iphone',
    label: 'iPhone',
    icon: 'Smartphone',
    sampleImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'samsung',
    label: 'Samsung Galaxy',
    icon: 'Smartphone',
    sampleImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'pixel',
    label: 'Google Pixel',
    icon: 'Smartphone',
    sampleImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'ipad',
    label: 'iPad & Tablet',
    icon: 'Tablet',
    sampleImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'macbook',
    label: 'MacBook & Laptop',
    icon: 'Laptop',
    sampleImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'watch',
    label: 'Apple Watch',
    icon: 'Watch',
    sampleImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=300&auto=format&fit=crop',
  },
];

export const DEVICE_MODELS: Record<DeviceCategory, DeviceModel[]> = {
  iphone: [
    {
      id: 'ip-15promax',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop',
      basePrice: 980,
      availableStorage: ['256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'ip-15pro',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 15 Pro',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop',
      basePrice: 870,
      availableStorage: ['128GB', '256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'ip-15',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 15',
      image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=300&auto=format&fit=crop',
      basePrice: 650,
      availableStorage: ['128GB', '256GB', '512GB'],
      popular: false,
    },
    {
      id: 'ip-14promax',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 14 Pro Max',
      image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=300&auto=format&fit=crop',
      basePrice: 780,
      availableStorage: ['128GB', '256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'ip-14pro',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 14 Pro',
      image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=300&auto=format&fit=crop',
      basePrice: 690,
      availableStorage: ['128GB', '256GB', '512GB', '1TB'],
      popular: false,
    },
    {
      id: 'ip-13pro',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 13 Pro',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=300&auto=format&fit=crop',
      basePrice: 520,
      availableStorage: ['128GB', '256GB', '512GB', '1TB'],
      popular: false,
    },
    {
      id: 'ip-12',
      category: 'iphone',
      brand: 'Apple',
      name: 'iPhone 12',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop',
      basePrice: 420,
      availableStorage: ['64GB', '128GB', '256GB'],
      popular: true,
    },
  ],
  samsung: [
    {
      id: 'sam-s24ultra',
      category: 'samsung',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=300&auto=format&fit=crop',
      basePrice: 890,
      availableStorage: ['256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'sam-s24plus',
      category: 'samsung',
      brand: 'Samsung',
      name: 'Galaxy S24 Plus',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=300&auto=format&fit=crop',
      basePrice: 680,
      availableStorage: ['256GB', '512GB'],
      popular: false,
    },
    {
      id: 'sam-zfold5',
      category: 'samsung',
      brand: 'Samsung',
      name: 'Galaxy Z Fold 5',
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=300&auto=format&fit=crop',
      basePrice: 820,
      availableStorage: ['256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'sam-s23ultra',
      category: 'samsung',
      brand: 'Samsung',
      name: 'Galaxy S23 Ultra',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=300&auto=format&fit=crop',
      basePrice: 600,
      availableStorage: ['256GB', '512GB'],
      popular: false,
    },
  ],
  pixel: [
    {
      id: 'pix-8pro',
      category: 'pixel',
      brand: 'Google',
      name: 'Pixel 8 Pro',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop',
      basePrice: 560,
      availableStorage: ['128GB', '256GB', '512GB'],
      popular: true,
    },
    {
      id: 'pix-8',
      category: 'pixel',
      brand: 'Google',
      name: 'Pixel 8',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop',
      basePrice: 430,
      availableStorage: ['128GB', '256GB'],
      popular: false,
    },
    {
      id: 'pix-7pro',
      category: 'pixel',
      brand: 'Google',
      name: 'Pixel 7 Pro',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop',
      basePrice: 380,
      availableStorage: ['128GB', '256GB'],
      popular: false,
    },
  ],
  ipad: [
    {
      id: 'ipad-pro-m4',
      category: 'ipad',
      brand: 'Apple',
      name: 'iPad Pro 13" M4',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300&auto=format&fit=crop',
      basePrice: 850,
      availableStorage: ['256GB', '512GB', '1TB'],
      popular: true,
    },
    {
      id: 'ipad-pro-129',
      category: 'ipad',
      brand: 'Apple',
      name: 'iPad Pro 12.9" M2',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300&auto=format&fit=crop',
      basePrice: 620,
      availableStorage: ['128GB', '256GB', '512GB'],
      popular: false,
    },
    {
      id: 'ipad-air-m2',
      category: 'ipad',
      brand: 'Apple',
      name: 'iPad Air 11" M2',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=300&auto=format&fit=crop',
      basePrice: 480,
      availableStorage: ['128GB', '256GB', '512GB'],
      popular: true,
    },
  ],
  macbook: [
    {
      id: 'mac-pro-16-m3',
      category: 'macbook',
      brand: 'Apple',
      name: 'MacBook Pro 16" M3 Max',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop',
      basePrice: 1850,
      availableStorage: ['512GB', '1TB', '2TB'],
      popular: true,
    },
    {
      id: 'mac-pro-14-m3',
      category: 'macbook',
      brand: 'Apple',
      name: 'MacBook Pro 14" M3 Pro',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop',
      basePrice: 1350,
      availableStorage: ['512GB', '1TB'],
      popular: true,
    },
    {
      id: 'mac-air-15-m3',
      category: 'macbook',
      brand: 'Apple',
      name: 'MacBook Air 15" M3',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=300&auto=format&fit=crop',
      basePrice: 890,
      availableStorage: ['256GB', '512GB'],
      popular: false,
    },
  ],
  watch: [
    {
      id: 'watch-u2',
      category: 'watch',
      brand: 'Apple',
      name: 'Apple Watch Ultra 2',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=300&auto=format&fit=crop',
      basePrice: 440,
      availableStorage: ['GPS + Cellular'],
      popular: true,
    },
    {
      id: 'watch-s9',
      category: 'watch',
      brand: 'Apple',
      name: 'Apple Watch Series 9',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=300&auto=format&fit=crop',
      basePrice: 260,
      availableStorage: ['GPS', 'GPS + Cellular'],
      popular: false,
    },
  ],
};

export const BUYER_OFFERS: BuyerOffer[] = [
  {
    id: 'r3up-local',
    name: 'R3UP Chicago (In-Store Instant Cash)',
    logoText: 'R3UP',
    rating: 4.9,
    payoutSpeed: 'Instant (Under 15 Mins in Chicago)',
    isLocalCash: true,
    freeShipping: true,
    freeReturns: true,
    baseMultiplier: 1.05, // highest payout guaranteed for local Chicago trade
    highlight: 'Highest Chicago In-Person Payout Guaranteed',
  },
  {
    id: 'uptrade',
    name: 'UpTrade',
    logoText: 'UpTrade',
    rating: 4.6,
    payoutSpeed: '14 Days',
    isLocalCash: false,
    freeShipping: true,
    freeReturns: true,
    baseMultiplier: 1.0,
  },
  {
    id: 'buybackboss',
    name: 'BuybackBoss',
    logoText: 'BuybackBoss',
    rating: 4.5,
    payoutSpeed: '14 Days',
    isLocalCash: false,
    freeShipping: true,
    freeReturns: true,
    baseMultiplier: 1.01,
  },
  {
    id: 'swifttech',
    name: 'swifttechbuy',
    logoText: 'swifttech',
    rating: 4.4,
    payoutSpeed: '9 Days',
    isLocalCash: false,
    freeShipping: true,
    freeReturns: false,
    baseMultiplier: 0.98,
  },
  {
    id: 'whizcells',
    name: 'TheWhizCells',
    logoText: 'TheWhizCells',
    rating: 4.5,
    payoutSpeed: 'Next Day (Upon Receipt)',
    isLocalCash: false,
    freeShipping: true,
    freeReturns: false,
    baseMultiplier: 0.96,
  },
];

export function calculateDeviceValuation(
  basePrice: number,
  condition: string,
  storage: string,
  carrier: string
): number {
  let multiplier = 1.0;

  // Condition multiplier
  if (condition === 'New') multiplier *= 1.15;
  else if (condition === 'Mint') multiplier *= 1.0;
  else if (condition === 'Good') multiplier *= 0.92;
  else if (condition === 'Fair') multiplier *= 0.78;
  else if (condition === 'Broken') multiplier *= 0.48;

  let storageBonus = 0;
  if (storage === '256GB') storageBonus = 40;
  else if (storage === '512GB') storageBonus = 80;
  else if (storage === '1TB') storageBonus = 150;
  else if (storage === '2TB') storageBonus = 260;

  let carrierPenalty = 0;
  if (carrier === 'Other') carrierPenalty = -25;
  else if (carrier === 'T-Mobile' || carrier === 'AT&T' || carrier === 'Verizon') carrierPenalty = -15;

  const finalVal = Math.round((basePrice * multiplier) + storageBonus + carrierPenalty);
  return Math.max(50, finalVal);
}
