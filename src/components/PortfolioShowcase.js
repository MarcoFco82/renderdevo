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

  // FILTRAR PROYECTOS
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
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

        {/* MODAL DE DETALLE */}
        {selectedProject && (
          <div className="project-modal">
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
  onClick={() => window.location.href = '/contacto'}
  className="btn btn-primary"
>
  Cotizar Proyecto Similar
</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioShowcase;