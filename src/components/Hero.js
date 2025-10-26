'use client';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Hero = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [selectedServices, setSelectedServices] = useState({});
  const [serviceMinutes, setServiceMinutes] = useState({});
  const [baseTotal, setBaseTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [projectContext, setProjectContext] = useState('');

  // ✅ CONFIGURACIÓN EMAILJS UNIFICADA
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_8gh747m',
    TEMPLATE_ID: 'template_704ew3d',  
    PUBLIC_KEY: 'MQePSJwFKzy2hW_XK'
  };

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // ✅ EFECTO PARA CARGAR SERVICIOS PRE-SELECCIONADOS
  useEffect(() => {
    // Cargar servicios pre-seleccionados si existen
    const preselectedServices = sessionStorage.getItem('preselectedServices');
    const projectReference = sessionStorage.getItem('projectReference');
    
    if (preselectedServices && projectReference) {
      try {
        const serviceIds = JSON.parse(preselectedServices);
        
        // Seleccionar automáticamente los servicios
        const newSelection = {};
        serviceIds.forEach(serviceId => {
          const service = services.find(s => s.id === serviceId);
          if (service) {
            newSelection[serviceId] = service;
          }
        });
        
        setSelectedServices(newSelection);
        setProjectContext(`Basado en: ${projectReference}`);
        setShowQuote(true);
        
        // Limpiar sessionStorage
        sessionStorage.removeItem('preselectedServices');
        sessionStorage.removeItem('projectReference');
        
        // Scroll al cotizador
        setTimeout(() => {
          const quoteSection = document.getElementById('quote-section');
          if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
        
      } catch (error) {
        console.log('Error cargando servicios pre-seleccionados:', error);
      }
    }
  }, []);

  const services = [
    {
      id: 'sitioWeb',
      title: 'Sitio Web Para tu Negocio',
      description: 'Página corporativa con 4-8 secciones, responsive y optimizada',
      icon: '🌐',
      price: 8000,
      priceRange: '$8,000 - $12,000 MXN',
      pricingType: 'fixed'
    },
    {
      id: 'landingPage', 
      title: 'Landing Page',
      description: 'Página única optimizada para conversiones y campañas',
      icon: '📄',
      price: 4000,
      priceRange: '$4,000 - $6,000 MXN',
      pricingType: 'fixed'
    },
    {
      id: 'animacionesRedes',
      title: 'Contenido para redes sociales',
      description: '4 animaciones verticales (10-20s) para Reels/Shorts',
      icon: '🎬',
      price: 3000,
      priceRange: '$3,000 - $8,000 MXN/mes',
      pricingType: 'fixed'
    },
    {
      id: 'introsReels',
      title: 'Intros para Reels',
      description: 'Animaciones de 5-8s para videos de redes',
      icon: '⚡',
      price: 3000,
      priceRange: '$3,000 - $4,000 MXN',
      pricingType: 'fixed'
    },
    {
      id: 'newsletter',
      title: 'Newsletter Responsive',
      description: 'Plantilla HTML para email marketing',
      icon: '✉️',
      price: 2000,
      priceRange: '$2,000 - $3,000 MXN',
      pricingType: 'fixed'
    },
    {
      id: 'presentacionAnimada',
      title: 'Animación de presentación Comercial',
      description: 'Presentación comercial de tu negocio de 1-5 minutos',
      icon: '📽️',
      price: 4000,
      priceRange: '$4,000 MXN por minuto',
      pricingType: 'perMinute'
    },
    {
      id: 'presentacionInteractiva',
      title: 'Website Interactivo de tu proyecto',
      description: 'Desarrollo web interactivo con Next.js',
      icon: '🖱️',
      price: 13000,
      priceRange: '$13,000 - $20,000 MXN',
      pricingType: 'fixed'
    }
  ];

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      const newSelection = { ...prev };
      if (newSelection[serviceId]) {
        delete newSelection[serviceId];
        setServiceMinutes(prev => {
          const newMinutes = { ...prev };
          delete newMinutes[serviceId];
          return newMinutes;
        });
      } else {
        newSelection[serviceId] = services.find(s => s.id === serviceId);
        const service = services.find(s => s.id === serviceId);
        if (service.pricingType === 'perMinute') {
          setServiceMinutes(prev => ({
            ...prev,
            [serviceId]: 1
          }));
        }
      }
      return newSelection;
    });
  };

  const updateMinutes = (serviceId, minutes) => {
    setServiceMinutes(prev => ({
      ...prev,
      [serviceId]: Math.max(1, minutes)
    }));
  };

  // Calcular totales y descuentos
  useEffect(() => {
    let newBaseTotal = 0;

    Object.values(selectedServices).forEach(service => {
      if (service.pricingType === 'perMinute' && serviceMinutes[service.id]) {
        newBaseTotal += service.price * serviceMinutes[service.id];
      } else {
        newBaseTotal += service.price;
      }
    });
    
    const selectedCount = Object.keys(selectedServices).length;
    const discountPercentage = Math.max(0, (selectedCount - 1) * 5);
    const newDiscount = (newBaseTotal * discountPercentage) / 100;
    const newFinalTotal = newBaseTotal - newDiscount;

    setBaseTotal(newBaseTotal);
    setDiscount(newDiscount);
    setFinalTotal(newFinalTotal);
  }, [selectedServices, serviceMinutes]);

  const selectedCount = Object.keys(selectedServices).length;
  const discountPercentage = Math.max(0, (selectedCount - 1) * 5);

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Validación básica
    if (!contactName || !contactEmail || !contactPhone || !businessType) {
      setSubmitError('Por favor completa todos los campos requeridos');
      setIsSubmitting(false);
      return;
    }

    try {
      // Preparar lista de servicios seleccionados
      const selectedServicesList = Object.values(selectedServices).map(service => {
        let serviceDetails = `${service.title} - ${service.priceRange}`;
        if (service.pricingType === 'perMinute' && serviceMinutes[service.id]) {
          serviceDetails += ` (${serviceMinutes[service.id]} minuto${serviceMinutes[service.id] > 1 ? 's' : ''})`;
        }
        return serviceDetails;
      }).join('\n');

      console.log('Enviando cotización con EmailJS...');

      // Template parameters
      const templateParams = {
        from_name: contactName,
        from_email: contactEmail,
        company: businessType,
        phone: contactPhone,
        service: 'Cotización Múltiple de Servicios',
        message: `
INFORMACIÓN DEL CLIENTE:
Nombre: ${contactName}
Empresa: ${businessType}
Email: ${contactEmail}
Teléfono: ${contactPhone}
${projectContext ? `Proyecto de referencia: ${projectContext}` : ''}

SERVICIOS COTIZADOS:
${selectedServicesList}

RESUMEN FINANCIERO:
Subtotal: $${baseTotal.toLocaleString()} MXN
Descuento: ${discountPercentage}% (-$${discount.toLocaleString()} MXN)
TOTAL: $${finalTotal.toLocaleString()} MXN

*Cotización generada desde renderdevo.com*
        `,
        to_email: 'hola@renderdevo.com',
        subject: `Cotización RenderDevo - ${contactName} - $${finalTotal.toLocaleString()} MXN`
      };

      // ✅ ENVÍO CORRECTO
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('✅ Cotización enviada exitosamente:', result);

      // Éxito - reset form
      setShowContactForm(false);
      setSelectedServices({});
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setBusinessType('');
      setShowQuote(false);
      setProjectContext('');
      
      // Mostrar mensaje de éxito
      alert('¡Cotización enviada exitosamente! Te contactaremos dentro de 24 horas.');
      
    } catch (error) {
      console.error('❌ Error enviando cotización:', error);
      
      let errorMessage = 'Error al enviar la cotización. ';
      
      if (error.text) {
        errorMessage += `Detalles: ${error.text}`;
      } else if (error.status) {
        errorMessage += `Código de error: ${error.status}`;
      } else {
        errorMessage += 'Por favor verifica tu conexión e intenta nuevamente.';
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartQuote = () => {
    setShowQuote(true);
    setProjectContext('');
    setTimeout(() => {
      const element = document.getElementById('quote-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderHeroNormal = () => (
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

  const renderQuoteSection = () => (
    <section id="quote-section" className="quote-section-minimal">
      <div className="container">
        <div className="quote-header-minimal">
          <h2>Selecciona los servicios que necesitas</h2>
          <p><strong>5% de descuento por cada servicio adicional (a partir del segundo)</strong></p>
        </div>

        {/* CONTEXTO DEL PROYECTO SIMILAR */}
        {projectContext && (
          <div className="project-context-banner">
            <span>📋 {projectContext}</span>
          </div>
        )}

        <div className="services-list-minimal">
          {services.map(service => (
            <div 
              key={service.id}
              className={`service-item-minimal ${selectedServices[service.id] ? 'selected' : ''}`}
              onClick={() => toggleService(service.id)}
            >
              <div className="service-checkbox">
                <div className={`checkbox ${selectedServices[service.id] ? 'checked' : ''}`}>
                  {selectedServices[service.id] && '✓'}
                </div>
              </div>
              
              <div className="service-content-minimal">
                <div className="service-header-minimal">
                  <span className="service-icon-minimal">{service.icon}</span>
                  <h4 className="service-title-minimal">{service.title}</h4>
                  <span className="service-price-minimal">{service.priceRange}</span>
                </div>
                <p className="service-description-minimal">{service.description}</p>
                
                {selectedServices[service.id] && service.pricingType === 'perMinute' && (
                  <div className="minutes-selector" onClick={(e) => e.stopPropagation()}>
                    <label>Duración en minutos:</label>
                    <div className="minutes-controls">
                      <button 
                        type="button"
                        onClick={() => updateMinutes(service.id, (serviceMinutes[service.id] || 1) - 1)}
                        className="minute-btn"
                      >
                        -
                      </button>
                      <span className="minutes-display">{serviceMinutes[service.id] || 1}</span>
                      <button 
                        type="button"
                        onClick={() => updateMinutes(service.id, (serviceMinutes[service.id] || 1) + 1)}
                        className="minute-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCount > 0 && (
          <div className="quote-summary-minimal">
            <div className="summary-header-minimal">
              <h3>Tu Cotización</h3>
              {discountPercentage > 0 && (
                <div className="discount-badge-minimal">
                  {discountPercentage}% DESC
                </div>
              )}
            </div>
            
            <div className="selected-services-minimal">
              {Object.values(selectedServices).map(service => (
                <div key={service.id} className="selected-service-minimal">
                  <span className="service-name-minimal">{service.title}</span>
                  {service.pricingType === 'perMinute' && serviceMinutes[service.id] && (
                    <span className="service-minutes">({serviceMinutes[service.id]} min)</span>
                  )}
                  <span className="service-price-minimal">
                    ${service.pricingType === 'perMinute' && serviceMinutes[service.id] 
                      ? (service.price * serviceMinutes[service.id]).toLocaleString()
                      : service.price.toLocaleString()
                    } MXN
                  </span>
                </div>
              ))}
            </div>

            <div className="price-breakdown-minimal">
              <div className="breakdown-row-minimal">
                <span>Subtotal:</span>
                <span>${baseTotal.toLocaleString()} MXN</span>
              </div>
              {discountPercentage > 0 && (
                <div className="breakdown-row-minimal discount">
                  <span>Descuento ({discountPercentage}%):</span>
                  <span>-$${discount.toLocaleString()} MXN</span>
                </div>
              )}
              <div className="breakdown-row-minimal total">
                <span>Total:</span>
                <span>$${finalTotal.toLocaleString()} MXN</span>
              </div>
            </div>

            {!showContactForm ? (
              <div className="summary-actions-minimal">
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="btn btn-primary full-width"
                >
                  📧 Solicitar Servicio ({selectedCount} servicios)
                </button>
                
                <button 
                  onClick={() => {
                    setSelectedServices({});
                    setProjectContext('');
                  }}
                  className="btn btn-secondary full-width"
                >
                  Limpiar Selección
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="contact-form-minimal">
                {submitError && (
                  <div className="error-message">
                    ⚠️ {submitError}
                  </div>
                )}

                <div className="form-group-minimal">
                  <label>Nombre completo *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div className="form-group-minimal">
                  <label>Giro de tu negocio *</label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="Ej: Restaurante, Consultoría, Tienda online..."
                  />
                </div>
                
                <div className="form-group-minimal">
                  <label>Correo electrónico *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div className="form-group-minimal">
                  <label>Número de contacto *</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div className="form-actions-minimal">
                  <button 
                    type="submit" 
                    className="btn btn-primary full-width"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading-spinner"></span>
                        Enviando Cotización...
                      </>
                    ) : (
                      '📨 Enviar Cotización'
                    )}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="btn btn-secondary full-width"
                    disabled={isSubmitting}
                  >
                    ← Regresar
                  </button>
                </div>
              </form>
            )}

            <div className="summary-footer-minimal">
              <small className="price-note-minimal">
                *Precios base de referencia. El costo final puede variar según la complejidad.
              </small>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <>
      <section className="hero">
        <div className="container">
          {renderHeroNormal()}
        </div>
      </section>

      {showQuote && renderQuoteSection()}
    </>
  );
};

export default Hero;