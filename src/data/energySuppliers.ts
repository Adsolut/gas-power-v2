// src/data/energySuppliers.ts
export interface EnergySupplier {
  id: string;
  name: string;
  logo: string;
  website: string;
  rating: number;
  reviewCount: number;
  description: string;
  electricityOffers: ElectricityOffer[];
  gasOffers: GasOffer[];
  combinedOffers: CombinedOffer[];
  coverage: string[];
  customerService: CustomerService;
  greenEnergy: boolean;
  features: string[];
}

export interface BaseOffer {
  id: string;
  name: string;
  type: 'fixed' | 'indexed' | 'dual-rate';
  duration: number; // months
  activationCost: number;
  earlyTerminationFee: number;
  features: string[];
  available: boolean;
}

export interface ElectricityOffer extends BaseOffer {
  pricePerKwh: {
    f1: number; // Peak hours
    f2: number; // Off-peak
    f3: number; // Weekend
    mono: number; // Single rate
  };
  fixedCost: number; // €/month
  greenPercentage: number;
}

export interface GasOffer extends BaseOffer {
  pricePerSmc: number;
  fixedCost: number;
}

export interface CombinedOffer extends BaseOffer {
  electricityComponent: Partial<ElectricityOffer>;
  gasComponent: Partial<GasOffer>;
  bundleDiscount: number; // percentage
}

export interface CustomerService {
  phone: string;
  email: string;
  chatAvailable: boolean;
  languages: string[];
  hours: string;
  dedicatedConsultant: boolean;
}

// Real Italian Energy Suppliers Database
export const energySuppliers: EnergySupplier[] = [
  {
    id: 'enel-energia',
    name: 'Enel Energia',
    logo: '/logos/enel.svg',
    website: 'https://www.enel.it',
    rating: 4.2,
    reviewCount: 15420,
    description: 'Leader italiano nel mercato energetico con oltre 11 milioni di clienti',
    greenEnergy: true,
    coverage: ['Nazionale'],
    features: [
      'App MyEnel',
      'Programma fedeltà WOW!',
      'Bolletta digitale',
      'Pagamento automatico'
    ],
    customerService: {
      phone: '800 900 860',
      email: 'servizio.clienti@enel.it',
      chatAvailable: true,
      languages: ['Italiano', 'Inglese'],
      hours: 'Lun-Sab 8:00-20:00',
      dedicatedConsultant: false
    },
    electricityOffers: [
      {
        id: 'enel-flex',
        name: 'Flex Luce',
        type: 'indexed',
        duration: 12,
        activationCost: 0,
        earlyTerminationFee: 0,
        pricePerKwh: {
          f1: 0.135,
          f2: 0.125,
          f3: 0.115,
          mono: 0.128
        },
        fixedCost: 8.5,
        greenPercentage: 100,
        features: ['Prezzo indicizzato PUN', '100% energia verde', 'Senza vincoli'],
        available: true
      }
    ],
    gasOffers: [
      {
        id: 'enel-gas-flex',
        name: 'Flex Gas',
        type: 'indexed',
        duration: 12,
        activationCost: 0,
        earlyTerminationFee: 0,
        pricePerSmc: 0.48,
        fixedCost: 8.5,
        features: ['Prezzo indicizzato PSV', 'Senza vincoli'],
        available: true
      }
    ],
    combinedOffers: []
  },
  // Add more suppliers as needed
];

// Utility functions for searching and filtering suppliers
export const findSupplierById = (id: string): EnergySupplier | undefined => {
  return energySuppliers.find(supplier => supplier.id === id);
};

export const filterSuppliersByGreenEnergy = (): EnergySupplier[] => {
  return energySuppliers.filter(supplier => supplier.greenEnergy);
};

export const filterSuppliersByCoverage = (region: string): EnergySupplier[] => {
  return energySuppliers.filter(supplier => 
    supplier.coverage.includes('Nazionale') || supplier.coverage.includes(region)
  );
};

export const calculateBestOffer = (
  monthlyConsumption: { electricity: number; gas: number },
  offerType: 'electricity' | 'gas' | 'combined'
): Array<{
  supplier: EnergySupplier;
  offer: BaseOffer;
  estimatedMonthlyCost: number;
  estimatedAnnualCost: number;
}> => {
  const results = [];
  
  for (const supplier of energySuppliers) {
    if (offerType === 'electricity') {
      for (const offer of supplier.electricityOffers) {
        if (offer.available) {
          const monthlyCost = calculateElectricityCost(
            monthlyConsumption.electricity,
            offer
          );
          results.push({
            supplier,
            offer,
            estimatedMonthlyCost: monthlyCost,
            estimatedAnnualCost: monthlyCost * 12
          });
        }
      }
    }
    // Similar logic for gas and combined offers
  }
  
  return results.sort((a, b) => a.estimatedMonthlyCost - b.estimatedMonthlyCost);
};

const calculateElectricityCost = (
  monthlyKwh: number,
  offer: ElectricityOffer
): number => {
  const energyCost = monthlyKwh * offer.pricePerKwh.mono;
  return energyCost + offer.fixedCost;
};

export default energySuppliers;
