'use client';
import { useState } from 'react';

const PortfolioShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // DATOS ACTUALIZADOS - SERVICIOS PARA PyMEs
  const portfolioItems = [
    {
      id: 1,
      title: 'Sitio Web - Restaurante Gourmet',
      category: 'web',
      description: 'Landing page elegante con reservaciones online y menú digital.',
      image: '/portfolio/web-restaurant-placeholder.jpg',
      video: null,
      tags: ['Web Design', 'Reservaciones', 'Responsive']
    },
    {
      id: 2,
      title: 'Presentación Ejecutiva - Startup Tech',
      category: 'presentations',
      description: 'Deck de inversión profesional para ronda de financiamiento.',
      image: null,
      video: '/portfolio/presentation-tech-placeholder.jpg',
      tags: ['Presentaciones', 'Pitch Deck', 'Corporativo']
    },
    {
      id: 3,
      title: 'E-commerce - Moda Local',
      category: 'web',
      description: 'Tienda online con catálogo amplio y proceso de checkout optimizado.',
      image: '/portfolio/web-fashion-placeholder.jpg',
      video: null,
      tags: ['E-commerce', 'Tienda Online', 'Marketing']
    },
    {
      id: 4,
      title: 'Video Corporativo - Consultoría',
      category: 'videos',
      description: 'Video institucional para página web y redes sociales.',
      image: null,
      video: '/portfolio/video-corporate-placeholder.jpg',
      tags: ['Video', 'Corporativo', 'Branding']
    },
    {
      id: 5,
      title: 'Contenido Redes - Cafetería Artesanal',
      category: 'social',
      description: 'Serie de posts y stories para Instagram y Facebook.',
      image: '/portfolio/social-cafe-placeholder.jpg',
      video: null,
      tags: ['Redes Sociales', 'Instagram', 'Contenido']
    },
    {
      id: 6,
      title: 'Infográfico - Consultora Financiera',
      category: 'infographics',
      description: 'Infográficos explicativos para blog y redes sociales.',
      image: '/portfolio/infographic-finance-placeholder.jpg',
      video: null,
      tags: ['Infográficos', 'Educativo', 'Visual']
    },
    {
      id: 7,
      title: 'Video Tutorial - Software SaaS',
      category: 'videos',
      description: 'Video demostrativo para onboarding de usuarios.',
      image: null,
      video: '/portfolio/video-tutorial-placeholder.jpg',
      tags: ['Tutorial', 'Educativo', 'Producto']
    },
    {
      id: 8,
      title: 'Presentación - Resultados Trimestrales',
      category: 'presentations',
      description: 'Deck ejecutivo para junta directiva y stakeholders.',
      image: '/portfolio/presentation-results-placeholder.jpg',
      video: null,
      tags: ['Ejecutivo', 'Reportes', 'Corporativo']
    }
  ];

  // FUNCIÓN PARA COTIZAR PROYECTO SIMILAR
  const handleSimilarProjectQuote = (project) => {
    // Mapear categoría del proyecto a servicios del cotizador
    const serviceMapping = {
      'web': ['sitioWeb', 'landingPage'],
      'videos': ['animacionesRedes', 'introsReels', 'presentacionAnimada'],
      'presentations': ['presentacionAnimada', 'presentacionInteractiva'],
      'social': ['animacionesRedes', 'introsReels'],
      'infographics': ['animacionesRedes']
    };

    // Obtener servicios relacionados
    const relatedServices = serviceMapping[project.category] || [];
    
    // Guardar en sessionStorage para el cotizador
    sessionStorage.setItem('preselectedServices', JSON.stringify(relatedServices));
    sessionStorage.setItem('projectReference', project.title);
    
    // Cerrar modal
    setSelectedProject(null);
    
    // Forzar recarga de la página para que Hero.js cargue los servicios
    window.location.reload();
  };

  // FILTRAR PROYECTOS
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <>
      <section id="portfolio" className="portfolio-showcase">
        <div className="container">
          {/* HEADER ACTUALIZADO */}
          <div className="value-header-white">
            <h2>Proyectos con Resultados Comprobados</h2>
            <p>Ejemplos reales de cómo ayudamos a negocios a mejorar su presencia digital</p>
          </div>

          {/* FILTROS ACTUALIZADOS */}
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

          {/* GRID DE PROYECTOS */}
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

      {/* MODAL DE DETALLE - VERSIÓN QUE SÍ FUNCIONA */}
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
                <div className="video-placeholder large">
                  <div className="play-icon">▶</div>
                  <span>Video Preview: {selectedProject.title}</span>
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
          z-index: 100; /* POR ENCIMA DEL CONTENIDO */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 18, 0.1); /* CASI INVISIBLE */
          z-index: 1;
        }

        .modal-content {
          background: rgba(26, 26, 46, 0.85); /* TRANSLÚCIDO */
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 16px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 245, 255, 0.3);
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
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: var(--color-glacial);
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 0, 255, 0.3);
          border-color: var(--color-neon-magenta);
          transform: scale(1.1);
        }

        .modal-media {
          height: 300px;
          background: linear-gradient(135deg, var(--color-electric-cyan) 0%, var(--color-neon-magenta) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px 16px 0 0;
          position: relative;
          overflow: hidden;
        }

        .modal-info {
          padding: 2rem;
        }

        .modal-info h3 {
          font-size: var(--text-3xl);
          font-family: var(--font-title);
          color: var(--color-glacial);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .modal-info p {
          color: var(--color-mist);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: var(--text-lg);
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .modal-tag {
          background: rgba(0, 245, 255, 0.15);
          color: var(--color-electric-cyan);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: var(--text-sm);
          font-weight: 500;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }

        .modal-info .btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: var(--text-lg);
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .project-modal {
            padding: 10px;
          }
          
          .modal-content {
            max-height: 95vh;
          }
          
          .modal-media {
            height: 200px;
          }
          
          .modal-info {
            padding: 1.5rem;
          }
          
          .modal-info h3 {
            font-size: var(--text-2xl);
          }
          
          .modal-close {
            top: 10px;
            right: 10px;
            width: 35px;
            height: 35px;
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .modal-media {
            height: 150px;
          }
          
          .modal-info {
            padding: 1rem;
          }
          
          .modal-tags {
            gap: 0.25rem;
          }
          
          .modal-tag {
            padding: 0.375rem 0.75rem;
            font-size: var(--text-xs);
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioShowcase;