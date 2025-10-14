'use client';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Cerrar menú móvil después de click
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* LOGO */}
          <div className="logo">
            <Link href="/" className="logo-link">
              <span className="logo-text">RenderDevo</span>
            </Link>
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
              onClick={() => scrollToSection('contact')} 
              className="nav-link"
            >
              Contacto
            </button>
            <button 
              onClick={() => window.location.href = '/contacto'}
              className="btn btn-primary nav-cta"
            >
              Cotizar Proyecto
            </button>
          </nav>

          {/* MENÚ MOBILE */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* MENÚ MÓVIL */}
          {isMenuOpen && (
            <nav className="nav-mobile">
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
                onClick={() => scrollToSection('contact')} 
                className="nav-link"
              >
                Contacto
              </button>
              <button 
                onClick={() => window.location.href = '/contacto'}
                className="btn btn-primary"
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