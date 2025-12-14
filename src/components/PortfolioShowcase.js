'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import QuoteGenerator from './QuoteGenerator';

const PortfolioShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const portfolioItems = [
    {
      id: 1,
      title: 'Presentación Profesional - Diseñador Motion',
      category: 'presentations',
      description: 'Presentación corporativa de alto impacto para diseñador motion graphics, combinando elegancia visual con narrativa fluida para destacar habilidades creativas y experiencia profesional.',
      video: 'https://vimeo.com/1115649422',
      tags: ['Motion Graphics', 'Presentación Corporativa', 'Branding Personal', 'Video Profesional'],
      complexity: 'Media-Alta'
    },
    {
      id: 2,
      title: 'Book Trailer: Magdalena',
      category: 'videos',
      description: 'Trailer cinematográfico para novela literaria. Narrativa visual emotiva que captura la esencia de la historia y conecta con lectores potenciales.',
      video: 'https://vimeo.com/1146266699',
      tags: ['Book Trailer', 'Narrativa Visual', 'Motion Graphics', 'Editorial'],
      complexity: 'Media-Alta'
    },
    {
      id: 3,
      title: 'Book Trailer: El Secreto',
      category: 'videos',
      description: 'Trailer dinámico para promoción editorial. Diseño visual que genera intriga y anticipa la experiencia de lectura.',
      video: 'https://vimeo.com/1106568526',
      tags: ['Book Trailer', 'Promoción Editorial', 'Animación', 'Storytelling'],
      complexity: 'Media-Alta'
    },
    {
      id: 4,
      title: 'Book Trailer: Leonarda',
      category: 'videos',
      description: 'Trailer evocador para obra literaria. Atmósfera visual única que transmite el tono y la emoción del libro para cautivar a la audiencia.',
      video: 'https://vimeo.com/1146267564',
      tags: ['Book Trailer', 'Storytelling', 'Animación', 'Editorial'],
      complexity: 'Media-Alta'
    }
  ];

  // Abre el QuoteGenerator desde el modal de proyecto
  const handleSimilarProjectQuote = (project) => {
    setSelectedProject(null); // Cierra modal de proyecto
    setShowQuote(true); // Abre QuoteGenerator
  };

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const getVimeoId = (url) => {
    return url.split('/').pop().split('?')[0];
  };

  // Modal con Portal para que el blur funcione sobre las partículas
  const renderModal = () => {
    if (!selectedProject || !mounted) return null;

    return createPortal(
      <div className="portfolio-modal" role="dialog" aria-modal="true">
        <div 
          className="portfolio-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        />
        
        <div className="portfolio-modal-container">
          <button 
            className="portfolio-modal-close"
            onClick={() => setSelectedProject(null)}
            aria-label="Cerrar"
          >
            ×
          </button>
          
          <div className="portfolio-modal-media">
            {selectedProject.video && (
              <iframe
                src={`https://player.vimeo.com/video/${getVimeoId(selectedProject.video)}?title=0&byline=0&portrait=0&autoplay=1`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={selectedProject.title}
              />
            )}
          </div>
          
          <div className="portfolio-modal-body">
            <h3 className="portfolio-modal-title">{selectedProject.title}</h3>
            <p className="portfolio-modal-description">{selectedProject.description}</p>
            
            <div className="portfolio-modal-meta">
              <span className="portfolio-meta-complexity">{selectedProject.complexity}</span>
            </div>
            
            <div className="portfolio-modal-tags">
              {selectedProject.tags.map((tag, index) => (
                <span key={index} className="portfolio-modal-tag">{tag}</span>
              ))}
            </div>

            <button 
              onClick={() => handleSimilarProjectQuote(selectedProject)}
              className="portfolio-modal-cta"
            >
              🎬 Cotizar Proyecto Similar
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <section id="portfolio" className="portfolio-showcase">
        <div className="container">
          <div className="portfolio-header">
            <h2>Proyectos con Resultados Comprobados</h2>
            <p>Ejemplos reales de cómo ayudamos a negocios a mejorar su presencia digital</p>
          </div>

          <div className="portfolio-filters">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'web', label: 'Sitios Web' },
              { key: 'videos', label: 'Videos' },
              { key: 'presentations', label: 'Presentaciones' },
              { key: 'social', label: 'Redes Sociales' }
            ].map(filter => (
              <button 
                key={filter.key}
                className={`portfolio-filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((project) => (
              <article 
                key={project.id} 
                className="portfolio-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="portfolio-card-media">
                  {project.video ? (
                    <div className="portfolio-card-thumbnail">
                      <img 
                        src={`https://vumbnail.com/${getVimeoId(project.video)}.jpg`}
                        alt={project.title}
                        loading="lazy"
                      />
                      <div className="portfolio-card-play">
                        <span className="portfolio-play-icon">▶</span>
                      </div>
                    </div>
                  ) : (
                    <div className="portfolio-card-placeholder">
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
              
                <div className="portfolio-card-content">
                  <h3 className="portfolio-card-title">{project.title}</h3>
                  <p className="portfolio-card-description">{project.description}</p>
                  <div className="portfolio-card-tags">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="portfolio-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {renderModal()}
      
      {/* QuoteGenerator como modal independiente */}
      <QuoteGenerator 
        isOpen={showQuote} 
        onClose={() => setShowQuote(false)} 
      />

      <style jsx>{`
        /* ═══════════════════════════════════════════════════════════
           PORTFOLIO SHOWCASE
           ═══════════════════════════════════════════════════════════ */
        
        .portfolio-showcase {
          position: relative;
          z-index: 1;
          padding: 4rem 0;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .portfolio-header h2 {
          font-family: var(--font-title);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          color: var(--color-glacial);
          margin-bottom: 0.75rem;
        }

        .portfolio-header p {
          color: var(--color-mist);
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          opacity: 0.85;
        }

        /* Filters */
        .portfolio-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }

        .portfolio-filter-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--color-mist);
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .portfolio-filter-btn:hover {
          border-color: var(--color-electric-cyan);
          color: var(--color-electric-cyan);
        }

        .portfolio-filter-btn.active {
          background: var(--color-electric-cyan);
          border-color: var(--color-electric-cyan);
          color: var(--color-deep-space);
          font-weight: 600;
        }

        /* Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ═══════════════════════════════════════════════════════════
           CARDS CON BLUR EN CONTENT
           ═══════════════════════════════════════════════════════════ */

        .portfolio-card {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .portfolio-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-electric-cyan);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(0, 245, 255, 0.1);
        }

        .portfolio-card-media {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: var(--color-deep-space);
        }

        .portfolio-card-thumbnail {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .portfolio-card-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .portfolio-card:hover .portfolio-card-thumbnail img {
          transform: scale(1.08);
        }

        .portfolio-card-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .portfolio-card:hover .portfolio-card-play {
          opacity: 1;
        }

        .portfolio-play-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-electric-cyan);
          color: var(--color-deep-space);
          border-radius: 50%;
          font-size: 1.5rem;
          padding-left: 5px;
          transition: transform 0.2s ease;
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);
        }

        .portfolio-card:hover .portfolio-play-icon {
          transform: scale(1.1);
        }

        /* CARD CONTENT CON BACKDROP BLUR */
        .portfolio-card-content {
          padding: 1.25rem;
          background: rgba(26, 26, 46, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .portfolio-card-title {
          font-family: var(--font-title);
          font-size: 1.15rem;
          color: var(--color-glacial);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          letter-spacing: 0.02em;
        }

        .portfolio-card-description {
          font-size: 0.85rem;
          color: var(--color-mist);
          opacity: 0.85;
          line-height: 1.5;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .portfolio-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .portfolio-tag {
          background: rgba(0, 245, 255, 0.1);
          color: var(--color-electric-cyan);
          padding: 0.3rem 0.7rem;
          border-radius: 1rem;
          font-size: 0.7rem;
          font-weight: 500;
          border: 1px solid rgba(0, 245, 255, 0.2);
        }

        /* ═══════════════════════════════════════════════════════════
           RESPONSIVE
           ═══════════════════════════════════════════════════════════ */

        @media (min-width: 768px) {
          .portfolio-showcase {
            padding: 5rem 0;
          }

          .portfolio-grid {
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .portfolio-showcase {
            padding: 3rem 0;
          }

          .portfolio-header {
            margin-bottom: 2rem;
          }

          .portfolio-filters {
            gap: 0.4rem;
            margin-bottom: 1.5rem;
          }

          .portfolio-filter-btn {
            padding: 0.4rem 0.9rem;
            font-size: 0.8rem;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .portfolio-card-content {
            padding: 1rem;
          }

          .portfolio-card-title {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* ESTILOS GLOBALES PARA EL MODAL (Portal) */}
      <style jsx global>{`
        /* ═══════════════════════════════════════════════════════════
           MODAL CON PORTAL - Blur sobre partículas
           ═══════════════════════════════════════════════════════════ */

        .portfolio-modal {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: portfolioModalFadeIn 0.2s ease;
        }

        @keyframes portfolioModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* BACKDROP CON BLUR - Ve las partículas */
        .portfolio-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 18, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .portfolio-modal-container {
          position: relative;
          background: rgba(26, 26, 46, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          width: 100%;
          max-width: 500px;
          max-height: 88vh;
          overflow-y: auto;
          animation: portfolioModalSlideUp 0.3s ease;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 30px 80px rgba(0, 0, 0, 0.5),
            0 0 60px rgba(0, 245, 255, 0.1);
        }

        @keyframes portfolioModalSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .portfolio-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #ffffff;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .portfolio-modal-close:hover {
          background: #ff00ff;
          border-color: #ff00ff;
          transform: scale(1.1);
        }

        /* VIDEO */
        .portfolio-modal-media {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: #000;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
        }

        .portfolio-modal-media iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .portfolio-modal-body {
          padding: 1.5rem;
        }

        .portfolio-modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: 0.02em;
        }

        .portfolio-modal-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .portfolio-modal-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .portfolio-meta-complexity {
          background: rgba(255, 255, 255, 0.08);
          color: #ff00ff;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid rgba(255, 0, 255, 0.3);
        }

        .portfolio-modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .portfolio-modal-tag {
          background: rgba(255, 255, 255, 0.05);
          color: #8a2be2;
          padding: 0.35rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          border: 1px solid rgba(138, 43, 226, 0.3);
        }

        .portfolio-modal-cta {
          width: 100%;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 12px;
          background: #00f5ff;
          border: none;
          color: #0a0a12;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .portfolio-modal-cta:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        }

        /* Desktop */
        @media (min-width: 768px) {
          .portfolio-modal-container {
            max-width: 850px;
          }

          .portfolio-modal-body {
            padding: 2rem;
          }

          .portfolio-modal-title {
            font-size: 1.6rem;
          }

          .portfolio-modal-close {
            top: 18px;
            right: 18px;
            width: 46px;
            height: 46px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .portfolio-modal {
            padding: 0.5rem;
          }

          .portfolio-modal-container {
            max-height: 92vh;
            border-radius: 16px;
          }

          .portfolio-modal-media {
            border-radius: 16px 16px 0 0;
          }

          .portfolio-modal-body {
            padding: 1.25rem;
          }

          .portfolio-modal-title {
            font-size: 1.2rem;
          }

          .portfolio-modal-description {
            font-size: 0.9rem;
          }

          .portfolio-modal-close {
            top: 10px;
            right: 10px;
            width: 36px;
            height: 36px;
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioShowcase;