'use client';
import { useState } from 'react';

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    website: false,
    socialMedia: false,
    corporateVideo: false, 
    emailDesign: false
  });

  const serviceSteps = [
    {
      id: 'website',
      title: '¿Necesitas un sitio web profesional?',
      description: 'Tu negocio disponible 24/7 - Donde tus clientes te buscan. Presencia permanente y credibilidad inmediata.',
      icon: '🌐',
      price: 18000
    },
    {
      id: 'socialMedia', 
      title: '¿Contenido para redes sociales?',
      description: 'Contenido que detiene el scroll y genera engagement. Perfecto para promociones y storytelling de marca.',
      icon: '📱',
      price: 12000
    },
    {
      id: 'corporateVideo',
      title: '¿Video corporativo profesional?',
      description: 'Presenta tu negocio con impacto. Ideal para página principal, ferias y presentaciones a inversionistas.',
      icon: '🎥', 
      price: 25000
    },
    {
      id: 'emailDesign',
      title: '¿Diseño de emails marketing?',
      description: 'Convierte leads en clientes. Emails que no terminan en spam sino en ventas concretas.',
      icon: '✉️',
      price: 8000
    }
  ];

  const calculateTotal = () => {
    return serviceSteps.reduce((total, service) => {
      return selections[service.id] ? total + service.price : total;
    }, 0);
  };

  const handleStartQuote = () => setCurrentStep(1);
  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  const handleRestart = () => {
    setCurrentStep(0);
    setSelections({
      website: false,
      socialMedia: false,
      corporateVideo: false,
      emailDesign: false
    });
  };

  // FUNCIÓN PARA SCROLL A SECCIÓN
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHeroNormal = () => (
    <div className="hero-content">
      <h1 className="hero-title">
  Estrategias Audiovisuales que 
  <span className="title-accent"> Convierten Seguidores en Clientes</span>
</h1>
      
      <p className="hero-subtitle">
      Diseño estratégico, animación funcional y desarrollo web orientado a resultados para PyMEs que buscan aumentar engagement y optimizar los procesos de conversión.
      </p>
      
      <div className="hero-actions">
        <button onClick={handleStartQuote} className="btn btn-primary">
          Obtener Cotización Personalizada
        </button>
        <button 
          onClick={() => scrollToSection('portfolio')} 
          className="btn btn-secondary"
        >
          Ver Proyectos Realizados
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

);
  const renderQuoteSlide = () => {
    if (currentStep === 0) return renderHeroNormal();
    if (currentStep === 5) return renderQuoteResult();
    
    const currentService = serviceSteps[currentStep - 1];
    
    return (
      <div className="quote-slide">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        <div className="slide-content">
          <div className="service-icon">
            {currentService.icon}
          </div>
          
          <h2 className="slide-title">{currentService.title}</h2>
          <p className="slide-description">{currentService.description}</p>

          <div className="selection-buttons">
            <button
              onClick={() => {
                setSelections(prev => ({ ...prev, [currentService.id]: true }));
                handleNext();
              }}
              className="btn-yes"
            >
              Sí, me interesa
            </button>
            
            <button
              onClick={() => {
                setSelections(prev => ({ ...prev, [currentService.id]: false }));
                handleNext();
              }}
              className="btn-no"
            >
              Por ahora no
            </button>
          </div>

          <div className="slide-navigation">
            {currentStep > 1 && (
              <button onClick={handleBack} className="btn-back">
                ← Anterior
              </button>
            )}
            <button onClick={handleRestart} className="btn-restart">
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuoteResult = () => {
    const selectedServices = serviceSteps.filter(service => selections[service.id]);
    
    return (
      <div className="quote-result">
        <h2>¡Perfecto! Tu cotización está lista</h2>
        
        <div className="selected-services">
          {selectedServices.map(service => (
            <div key={service.id} className="service-item">
              <span className="service-name">{service.title}</span>
              <span className="service-price">${service.price.toLocaleString()} MXN</span>
            </div>
          ))}
        </div>

        <div className="total-section">
          <div className="total-price">
            Total: ${calculateTotal().toLocaleString()} MXN
          </div>
          <small>*IVA incluido - Precio base de referencia</small>
        </div>

        <div className="result-actions">
  <button 
    onClick={() => window.location.href = '/contacto'}
    className="btn btn-primary"
  >
    📅 Agendar Llamada de Asesoría
  </button>
  <button onClick={handleRestart} className="btn btn-secondary">
    Hacer otra cotización
  </button>
</div>
      </div>
    );
  };

  return (
    <section className="hero">
      <div className="container">
        {currentStep === 0 ? renderHeroNormal() : renderQuoteSlide()}
      </div>
    </section>
  );
};

export default Hero;