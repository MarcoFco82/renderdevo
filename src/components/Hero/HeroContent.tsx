// components/Hero/HeroContent.tsx
'use client';

interface HeroContentProps {
  onShowQuote: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onShowQuote }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
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
        <button onClick={onShowQuote} className="btn btn-primary">
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
};

export default HeroContent;