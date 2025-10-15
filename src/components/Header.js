'use client';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Efecto para montaje y detectar scroll
  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Evitar hydration - no renderizar menú móvil hasta montaje
  if (!isMounted) {
    return (
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <button className="logo-link">
                RenderDevo
              </button>
            </div>
            <div className="nav-desktop">
              {/* Placeholder para evitar hydration mismatch */}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* LOGO */}
          <div className="logo">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }} 
              className="logo-link"
            >
              RenderDevo
            </button>
          </div>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="nav-desktop">
            <button 
              onClick={() => scrollToSection('value-proposition')} 
              className="nav-link"
            >
              Enfoque
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="nav-link"
            >
              Proyectos
            </button>
            <button 
              onClick={() => window.location.href = '/contacto'}
              className="nav-link"
            >
              Contacto
            </button>
            <button 
              onClick={() => window.location.href = '/contacto'}
              className="nav-link nav-cta"
            >
              Cotizar Proyecto
            </button>
          </nav>

          {/* BOTÓN MENÚ MÓVIL */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* MENÚ MÓVIL */}
          {isMounted && (
            <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
              <button 
                onClick={() => scrollToSection('value-proposition')} 
                className="nav-link"
              >
                Enfoque
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="nav-link"
              >
                Proyectos
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/contacto';
                  setIsMenuOpen(false);
                }}
                className="nav-link"
              >
                Contacto
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/contacto';
                  setIsMenuOpen(false);
                }}
                className="nav-link nav-cta"
              >
                Cotizar Proyecto
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;