// lib/seasonal-config.js
export const CURRENT_SEASON = 'halloween'; // ← CAMBIA A 'christmas' PARA PROBAR

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
    // PALETA HALLOWEEN
    deepSpace: '#032839',
    neuralGray: '#38263C',
    electricCyan: '#F2AC33',
    neonMagenta: '#D3273F',
    holographic: '#D22840',
    glacial: '#ffffff',
    mist: '#f8f8f8'
  },
  christmas: {
    // 🎄 PALETA NAVIDEÑA - ROJOS, VERDES, DORADOS
    deepSpace: '#0C1A1A',        // Verde oscuro navideño
    neuralGray: '#1E2A2A',       // Verde grisáceo
    electricCyan: '#FF6B6B',     // Rojo navideño vibrante
    neonMagenta: '#2ECC71',      // Verde esmeralda
    holographic: '#F1C40F',      // Dorado navideño
    glacial: '#FFFFFF',          // Blanco nieve
    mist: '#ECF0F1'              // Blanco humo
  }
};

// Obtener colores de la temporada actual
export const getCurrentColors = () => {
  return COLOR_PALETTES[CURRENT_SEASON] || COLOR_PALETTES.default;
};