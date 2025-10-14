'use client';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* LOGO */}
          <div className="logo">
            <a href="/" className="logo-link">
              <span className="logo-text">RenderDevo</span>
            </a>
          </div>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="nav-desktop">
            <a href="#value-proposition" className="nav-link">Enfoque</a>
            <a href="#portfolio" className="nav-link">Proyectos</a>
            <a href="#contact" className="nav-link">Contacto</a>
            <button className="btn btn-primary nav-cta">
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
              <a href="#value-proposition" className="nav-link">Enfoque</a>
              <a href="#portfolio" className="nav-link">Proyectos</a>
              <a href="#contact" className="nav-link">Contacto</a>
              <button className="btn btn-primary">
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