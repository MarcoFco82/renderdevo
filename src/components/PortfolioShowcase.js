'use client';
import { useState } from 'react';

const PortfolioShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // SOLO EL PRIMER PROYECTO - PRESENTACIÓN PROFESIONAL
  const portfolioItems = [
    {
      id: 1,
      title: 'Presentación Profesional - Diseñador Motion',
      category: 'presentations',
      description: 'Presentación corporativa de alto impacto para diseñador motion graphics, combinando elegancia visual con narrativa fluida para destacar habilidades creativas y experiencia profesional.',
      image: null,
      video: 'https://vimeo.com/1115649422',
      tags: ['Motion Graphics', 'Presentación Corporativa', 'Branding Personal', 'Video Profesional'],
      price: '$18,000 MXN',
      complexity: 'Media-Alta'
    }
  ];

  // FUNCIÓN PARA COTIZAR PROYECTO SIMILAR
  const handleSimilarProjectQuote = (project) => {
    const serviceMapping = {
      'web': ['sitioWeb', 'landingPage'],
      'videos': ['animacionesRedes', 'introsReels', 'presentacionAnimada'],
      'presentations': ['presentacionAnimada', 'presentacionInteractiva'],
      'social': ['animacionesRedes', 'introsReels'],
      'infographics': ['animacionesRedes']
    };

    const relatedServices = serviceMapping[project.category] || [];
    
    sessionStorage.setItem('preselectedServices', JSON.stringify(relatedServices));
    sessionStorage.setItem('projectReference', project.title);
    
    setSelectedProject(null);
    window.location.reload();
  };

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <>
      <section id="portfolio" className="portfolio-showcase">
        <div className="container">
          <div className="value-header-white">
            <h2>Proyectos con Resultados Comprobados</h2>
            <p>Ejemplos reales de cómo ayudamos a negocios a mejorar su presencia digital</p>
          </div>

          <div className="portfolio-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Sitios Web
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveFilter('videos')}
            >
              Videos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'presentations' ? 'active' : ''}`}
              onClick={() => setActiveFilter('presentations')}
            >
              Presentaciones
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'social' ? 'active' : ''}`}
              onClick={() => setActiveFilter('social')}
            >
              Redes Sociales
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'infographics' ? 'active' : ''}`}
              onClick={() => setActiveFilter('infographics')}
            >
              Infográficos
            </button>
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((project) => (
              <div 
                key={project.id} 
                className="portfolio-item"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-media">
                  {project.video ? (
                    <div className="video-placeholder">
                      <div className="play-icon">▶</div>
                      <span>Video: {project.title}</span>
                    </div>
                  ) : (
                    <div className="image-placeholder">
                      <span>Imagen: {project.title}</span>
                    </div>
                  )}
                </div>
              
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal">
          <div 
            className="modal-backdrop"
            onClick={() => setSelectedProject(null)}
          />
          
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            
            <div className="modal-media">
              {selectedProject.video ? (
                <div className="video-wrapper">
                  <iframe
                    src={`https://player.vimeo.com/video/${selectedProject.video.split('/').pop().split('?')[0]}?title=0&byline=0&portrait=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="image-placeholder large">
                  <span>Image Preview: {selectedProject.title}</span>
                </div>
              )}
            </div>
            
            <div className="modal-info">
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
              
              <div className="project-meta">
                <span className="price-tag">{selectedProject.price}</span>
                <span className="complexity-badge">{selectedProject.complexity}</span>
              </div>
              
              <div className="modal-tags">
                {selectedProject.tags.map((tag, index) => (
                  <span key={index} className="modal-tag">{tag}</span>
                ))}
              </div>
              <button 
                onClick={() => handleSimilarProjectQuote(selectedProject)}
                className="btn btn-primary"
              >
                🎬 Cotizar Proyecto Similar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .portfolio-showcase {
          position: relative;
          z-index: 1;
        }

        .project-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000; /* MUCHO MÁS ALTO PARA ESTAR POR ENCIMA DEL MENÚ */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 18, 0.95); /* MÁS OSCURO PARA MEJOR CONTRASTE */
          z-index: 1;
        }

        .modal-content {
          background: rgba(26, 26, 46, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 245, 255, 0.4);
          border-radius: 12px;
          max-width: 500px; /* MUCHO MÁS PEQUEÑO EN MÓVIL */
          width: 100%;
          max-height: 85vh; /* REDUCIDO PARA DEJAR ESPACIO */
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 245, 255, 0.4);
          animation: modalSlideUp 0.3s ease forwards;
          z-index: 2;
        }

        @keyframes modalSlideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 0, 255, 0.3);
          border: 1px solid var(--color-neon-magenta);
          border-radius: 50%;
          width: 35px;
          height: 35px;
          color: var(--color-glacial);
          font-size: 1.25rem;
          cursor: pointer;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .modal-close:hover {
          background: rgba(255, 0, 255, 0.5);
          transform: scale(1.1);
        }

        .modal-media {
          height: 200px; /* REDUCIDO PARA MÓVIL */
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px 12px 0 0;
          position: relative;
          overflow: hidden;
        }

        .video-wrapper {
          width: 100%;
          height: 100%;
        }

        .video-wrapper iframe {
          width: 100%;
          height: 100%;
        }

        .modal-info {
          padding: 1.5rem;
        }

        .modal-info h3 {
          font-size: 1.25rem; /* REDUCIDO */
          font-family: var(--font-title);
          color: var(--color-glacial);
          margin-bottom: 0.75rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .modal-info p {
          color: var(--color-mist);
          line-height: 1.4;
          margin-bottom: 1rem;
          font-size: 0.875rem; /* MUCHO MÁS PEQUEÑO */
        }

        .project-meta {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .price-tag {
          background: rgba(0, 245, 255, 0.15);
          color: var(--color-electric-cyan);
          padding: 0.4rem 0.8rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(0, 245, 255, 0.4);
        }

        .complexity-badge {
          background: rgba(255, 0, 255, 0.15);
          color: var(--color-neon-magenta);
          padding: 0.4rem 0.8rem;
          border-radius: 16px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(255, 0, 255, 0.4);
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .modal-tag {
          background: rgba(138, 43, 226, 0.15);
          color: var(--color-holographic);
          padding: 0.35rem 0.7rem;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
          border: 1px solid rgba(138, 43, 226, 0.3);
        }

        .modal-info .btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-size: 0.9rem;
          border-radius: 8px;
        }

        /* VERSIÓN DESKTOP - MANTIENE TAMAÑOS ORIGINALES */
        @media (min-width: 769px) {
          .modal-content {
            max-width: 900px;
            max-height: 90vh;
          }

          .modal-media {
            height: 400px;
          }

          .modal-info h3 {
            font-size: var(--text-3xl);
          }

          .modal-info p {
            font-size: var(--text-lg);
            line-height: 1.6;
          }

          .modal-close {
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }
        }

        /* VERSIÓN MÓVIL PEQUEÑA - AÚN MÁS COMPACTO */
        @media (max-width: 480px) {
          .project-modal {
            padding: 5px;
          }

          .modal-content {
            max-width: 95%;
            max-height: 80vh;
            border-radius: 10px;
          }

          .modal-media {
            height: 150px; /* AÚN MÁS PEQUEÑO */
          }

          .modal-info {
            padding: 1rem;
          }

          .modal-info h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }

          .modal-info p {
            font-size: 0.8rem;
            margin-bottom: 0.75rem;
          }

          .project-meta {
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }

          .price-tag,
          .complexity-badge {
            padding: 0.3rem 0.6rem;
            font-size: 0.75rem;
          }

          .modal-tags {
            gap: 0.3rem;
            margin-bottom: 1rem;
          }

          .modal-tag {
            padding: 0.25rem 0.5rem;
            font-size: 0.7rem;
          }

          .modal-info .btn {
            padding: 0.75rem 1rem;
            font-size: 0.85rem;
          }

          .modal-close {
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioShowcase;