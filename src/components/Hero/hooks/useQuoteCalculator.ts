// components/Hero/hooks/useQuoteCalculator.ts
import { useEffect, useState } from 'react';
import { Service } from './useServices';

interface QuoteCalculations {
  baseTotal: number;
  discount: number;
  finalTotal: number;
  discountPercentage: number;
  selectedCount: number;
}

export const useQuoteCalculator = (
  selectedServices: Record<string, Service>,
  serviceMinutes: Record<string, number>
) => {
  const [calculations, setCalculations] = useState<QuoteCalculations>({
    baseTotal: 0,
    discount: 0,
    finalTotal: 0,
    discountPercentage: 0,
    selectedCount: 0
  });

  useEffect(() => {
    let newBaseTotal = 0;

    Object.values(selectedServices).forEach(service => {
      if (service.pricingType === 'perMinute' && serviceMinutes[service.id]) {
        newBaseTotal += service.price * serviceMinutes[service.id];
      } else {
        newBaseTotal += service.price;
      }
    });
    
    const selectedCount = Object.keys(selectedServices).length;
    const discountPercentage = Math.max(0, (selectedCount - 1) * 5);
    const newDiscount = (newBaseTotal * discountPercentage) / 100;
    const newFinalTotal = newBaseTotal - newDiscount;

    setCalculations({
      baseTotal: newBaseTotal,
      discount: newDiscount,
      finalTotal: newFinalTotal,
      discountPercentage,
      selectedCount
    });
  }, [selectedServices, serviceMinutes]);

  return calculations;
};