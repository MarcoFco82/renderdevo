// lib/seasonal-config.js
export const CURRENT_SEASON = 'halloween'; // ← CAMBIAS SOLO ESTA LÍNEA

export const COLOR_PALETTES = {
  default: {
    // COLORES ACTUALES (TU PALETA ORIGINAL)
    deepSpace: '#0a0a12',
    neuralGray: '#1a1a2e', 
    electricCyan: '#00f5ff',
    neonMagenta: '#ff00ff',
    holographic: '#8a2be2',
    glacial: '#ffffff',
    mist: '#ffffff'
  },
  halloween: {
    // PALETA HALLOWEEN (PRUEBA)
    deepSpace: '#032839',
    neuralGray: '##38263C',
    electricCyan: '#F2AC33',
    neonMagenta: '#D3273F',
    holographic: '#D22840',
    glacial: '#ffffff',
    mist: '#f8f8f8'
  }
};

// Obtener colores de la temporada actual
export const getCurrentColors = () => {
  return COLOR_PALETTES[CURRENT_SEASON] || COLOR_PALETTES.default;
};