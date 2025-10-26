// components/SeasonalTheme.js
'use client';
import { useEffect } from 'react';
import { getCurrentColors } from '@/lib/seasonal-config';

const SeasonalTheme = () => {
  useEffect(() => {
    const colors = getCurrentColors();
    
    // Aplicar variables CSS al documento
    const root = document.documentElement;
    root.style.setProperty('--color-deep-space', colors.deepSpace);
    root.style.setProperty('--color-neural-gray', colors.neuralGray);
    root.style.setProperty('--color-electric-cyan', colors.electricCyan);
    root.style.setProperty('--color-neon-magenta', colors.neonMagenta);
    root.style.setProperty('--color-holographic', colors.holographic);
    root.style.setProperty('--color-glacial', colors.glacial);
    root.style.setProperty('--color-mist', colors.mist);
  }, []);

  return null; // Este componente no renderiza nada visible
};

export default SeasonalTheme;