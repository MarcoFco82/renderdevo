// components/Hero/Hero.tsx
'use client';
import { useState, useEffect } from 'react';
import HeroContent from './HeroContent';
import QuoteSection from './QuoteSection';

const Hero = () => {
  const [showQuote, setShowQuote] = useState(false);

  // Abrir cotizador automáticamente si viene del portfolio
  useEffect(() => {
    const projectReference = sessionStorage.getItem('projectReference');
    console.log('Project Reference:', projectReference); // Para debug
    if (projectReference) {
      setShowQuote(true);
      // NO limpiar aquí todavía - lo hacemos en useServices
    }
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <HeroContent onShowQuote={() => setShowQuote(true)} />
        </div>
      </section>

      {showQuote && (
        <QuoteSection onClose={() => setShowQuote(false)} />
      )}
    </>
  );
};

export default Hero;