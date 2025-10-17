'use client';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

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
            <button className="menu-toggle">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
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
              onClick={() => scrollToSection('contacto')} 
              className="nav-link"
            >
              Contacto
            </button>
          </nav>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

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
                onClick={() => scrollToSection('contacto')}
                className="nav-link"
              >
                Contacto
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;