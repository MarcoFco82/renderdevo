// components/FontOptimization.tsx - OPCIONAL
'use client';
import { useEffect } from 'react';

const FontOptimization = () => {
  useEffect(() => {
    // Cargar fuentes de manera óptima después de la hidratación
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  return null; // Componente no renderiza nada
};

export default FontOptimization;