// src/components/QuoteGenerator.js
'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';

const QuoteGenerator = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    timeline: '',
    budget: ''
  });

  // Configuración EmailJS
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_8gh747m',
    TEMPLATE_ID: 'template_704ew3d',
    PUBLIC_KEY: 'MQePSJwFKzy2hW_XK'
  };

  useEffect(() => {
    setMounted(true);
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset cuando se cierra
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setSelectedServices([]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectDescription: '',
          timeline: '',
          budget: ''
        });
        setSubmitSuccess(false);
        setSubmitError('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Servicios Freelancer TodoTerreno
  const services = [
    {
      id: 'sitio-web',
      icon: '🌐',
      title: 'Sitio Web',
      description: 'Página corporativa, landing page o e-commerce'
    },
    {
      id: 'app-android',
      icon: '📱',
      title: 'App Android',
      description: 'Desarrollo de aplicaciones móviles nativas'
    },
    {
      id: 'video-promocional',
      icon: '🎬',
      title: 'Video Promocional',
      description: 'Presentaciones, trailers, contenido audiovisual'
    },
    {
      id: 'motion-graphics',
      icon: '✨',
      title: 'Motion Graphics',
      description: 'Animaciones, intros, efectos visuales'
    },
    {
      id: 'redes-sociales',
      icon: '📲',
      title: 'Contenido Redes',
      description: 'Reels, stories, posts animados'
    },
    {
      id: 'consultoria',
      icon: '💡',
      title: 'Consultoría Digital',
      description: 'Estrategia, optimización, asesoría técnica'
    }
  ];

  const timelines = [
    { id: 'urgente', label: 'Urgente (1-2 semanas)' },
    { id: 'normal', label: 'Normal (3-4 semanas)' },
    { id: 'flexible', label: 'Flexible (1-2 meses)' },
    { id: 'sin-prisa', label: 'Sin prisa definida' }
  ];

  const budgets = [
    { id: 'explorando', label: 'Estoy explorando opciones' },
    { id: 'definido', label: 'Tengo un presupuesto definido' },
    { id: 'abierto', label: 'Abierto según propuesta' }
  ];

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const canProceedStep1 = selectedServices.length > 0;
  const canProceedStep2 = formData.projectDescription.trim().length > 10;
  const canSubmit = formData.name && formData.email && formData.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const selectedServiceNames = selectedServices
      .map(id => services.find(s => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const timelineLabel = timelines.find(t => t.id === formData.timeline)?.label || 'No especificado';
    const budgetLabel = budgets.find(b => b.id === formData.budget)?.label || 'No especificado';

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company || 'No especificado',
          service: selectedServiceNames,
          message: `
SERVICIOS DE INTERÉS:
${selectedServiceNames}

DESCRIPCIÓN DEL PROYECTO:
${formData.projectDescription}

TIMELINE: ${timelineLabel}
PRESUPUESTO: ${budgetLabel}

DATOS DE CONTACTO:
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Empresa: ${formData.company || 'No especificado'}

*Solicitud desde renderdevo.com*
          `.trim(),
          to_email: 'hola@renderdevo.com',
          subject: `Nueva Solicitud - ${formData.name} - ${selectedServiceNames}`
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error enviando:', error);
      setSubmitError('Hubo un error al enviar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  if (!isOpen || !mounted) return null;

  const renderStep = () => {
    if (submitSuccess) {
      return (
        <div className="quote-success-state">
          <div className="quote-success-icon">✓</div>
          <h3>¡Solicitud Enviada!</h3>
          <p>Gracias por tu interés. Revisaré tu proyecto y te contactaré en las próximas 24-48 horas con una propuesta personalizada.</p>
          <button onClick={handleClose} className="quote-btn-primary">
            Cerrar
          </button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <>
            <div className="quote-step-header">
              <span className="quote-step-indicator">Paso 1 de 3</span>
              <h3>¿Qué servicios te interesan?</h3>
              <p>Selecciona uno o más servicios</p>
            </div>

            <div className="quote-services-grid">
              {services.map(service => (
                <button
                  key={service.id}
                  type="button"
                  className={`quote-service-card ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => toggleService(service.id)}
                >
                  <span className="quote-service-icon">{service.icon}</span>
                  <div className="quote-service-info">
                    <span className="quote-service-title">{service.title}</span>
                    <span className="quote-service-desc">{service.description}</span>
                  </div>
                  {selectedServices.includes(service.id) && (
                    <span className="quote-check-mark">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="quote-step-actions">
              <button
                type="button"
                className="quote-btn-secondary"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="quote-btn-primary"
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
              >
                Continuar
              </button>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="quote-step-header">
              <span className="quote-step-indicator">Paso 2 de 3</span>
              <h3>Cuéntame sobre tu proyecto</h3>
              <p>Entre más detalles, mejor propuesta puedo prepararte</p>
            </div>

            <div className="quote-form-section">
              <div className="quote-form-group">
                <label htmlFor="projectDescription">Descripción del proyecto *</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="¿Qué quieres lograr? ¿Cuál es el objetivo? ¿Tienes referencias visuales?"
                  rows={4}
                />
              </div>

              <div className="quote-form-group">
                <label>¿Para cuándo lo necesitas?</label>
                <div className="quote-options-grid">
                  {timelines.map(timeline => (
                    <label 
                      key={timeline.id} 
                      className={`quote-option-card ${formData.timeline === timeline.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={timeline.id}
                        checked={formData.timeline === timeline.id}
                        onChange={handleInputChange}
                      />
                      <span>{timeline.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quote-form-group">
                <label>Sobre el presupuesto</label>
                <div className="quote-options-grid single-column">
                  {budgets.map(budget => (
                    <label 
                      key={budget.id} 
                      className={`quote-option-card ${formData.budget === budget.id ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={budget.id}
                        checked={formData.budget === budget.id}
                        onChange={handleInputChange}
                      />
                      <span>{budget.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="quote-step-actions">
              <button
                type="button"
                className="quote-btn-secondary"
                onClick={() => setStep(1)}
              >
                ← Atrás
              </button>
              <button
                type="button"
                className="quote-btn-primary"
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
              >
                Continuar
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="quote-step-header">
              <span className="quote-step-indicator">Paso 3 de 3</span>
              <h3>¿Cómo te contacto?</h3>
              <p>Tus datos están seguros</p>
            </div>

            <form onSubmit={handleSubmit} className="quote-form-section">
              {submitError && (
                <div className="quote-error-message">{submitError}</div>
              )}

              <div className="quote-form-row">
                <div className="quote-form-group">
                  <label htmlFor="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="quote-form-group">
                  <label htmlFor="company">Empresa / Marca</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Opcional"
                  />
                </div>
              </div>

              <div className="quote-form-row">
                <div className="quote-form-group">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="quote-form-group">
                  <label htmlFor="phone">WhatsApp *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 55 1234 5678"
                    required
                  />
                </div>
              </div>

              <div className="quote-summary-box">
                <h4>Tu solicitud</h4>
                <div className="quote-summary-services">
                  {selectedServices.map(id => {
                    const service = services.find(s => s.id === id);
                    return service ? (
                      <span key={id} className="quote-summary-tag">
                        {service.icon} {service.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="quote-step-actions">
                <button
                  type="button"
                  className="quote-btn-secondary"
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                >
                  ← Atrás
                </button>
                <button
                  type="submit"
                  className="quote-btn-primary"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="quote-spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>
              </div>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  // Usar Portal para renderizar fuera del main y que el blur funcione
  return createPortal(
    <div className="quote-modal" role="dialog" aria-modal="true">
      <div className="quote-modal-backdrop" onClick={handleClose} />
      
      <div className="quote-modal-container">
        <button 
          className="quote-modal-close" 
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {!submitSuccess && (
          <div className="quote-progress-bar">
            <div 
              className="quote-progress-fill" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="quote-modal-content">
          {renderStep()}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuoteGenerator;