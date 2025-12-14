// src/components/Hero.js
'use client';
import { useState } from 'react';
import QuoteGenerator from './QuoteGenerator';

const Hero = () => {
  const [showQuote, setShowQuote] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Estrategias Digitales que Conectan
              <br />
              y Posicionan tu Negocio.
            </h1>
            
            <p className="hero-subtitle">
              Diseño estratégico, animación funcional y desarrollo web orientado a resultados para PyMEs que buscan aumentar engagement y optimizar los procesos de conversión.
            </p>
            
            <div className="hero-actions">
              <button 
                onClick={() => setShowQuote(true)} 
                className="btn btn-primary"
              >
                Solicitar Propuesta
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="btn btn-secondary"
              >
                Ver Proyectos
              </button>
            </div>
            
            <div className="scroll-indicator">
              <button 
                onClick={() => scrollToSection('value-proposition')}
                className="scroll-button"
              >
                <span>Conoce nuestro enfoque</span>
                <div className="arrow-down"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de cotización modular */}
      <QuoteGenerator 
        isOpen={showQuote} 
        onClose={() => setShowQuote(false)} 
      />
    </>
  );
};

export default Hero;