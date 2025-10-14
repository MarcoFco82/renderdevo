import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export default function Contacto() {
  return (
    <div className="contact-page-container">
      {/* BOTÓN REGRESAR */}
      <div className="container">
        <div className="back-button-container">
          <Link href="/" className="back-button">
            ← Volver al Inicio
          </Link>
        </div>
      </div>

      {/* BLOQUE SUPERIOR - HERO SIMPLE */}
      <div className="contact-hero-simple">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-main-title">Contacto</h1>
            <p className="contact-hero-subtitle">
              Estamos listos para hacer realidad tu proyecto
            </p>
          </div>
        </div>
      </div>

      {/* BANNER HORIZONTAL DE CONTACTO */}
      <div className="contact-banner-horizontal">
        <div className="container">
          <div className="contact-banner-content">
            <div className="contact-info-item">
              <span className="contact-label">Email</span>
              <span className="contact-value">hola@renderdevo.com</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-label">Teléfono</span>
              <span className="contact-value">+52 55 3073 8888</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-label">WhatsApp</span>
              <span className="contact-value">+52 55 3073 8888</span>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER SLIM DE LLAMADA RÁPIDA */}
      <div className="quick-call-banner">
        <div className="container">
          <div className="quick-call-content">
            <div className="quick-call-text">
              <span className="quick-call-title">¿Prefieres una llamada rápida?</span>
              <span className="quick-call-subtitle">15 minutos sin compromiso</span>
            </div>
            <button className="btn btn-primary btn-slim">
              📅 Agendar Llamada
            </button>
          </div>
        </div>
      </div>

      {/* FORMULARIO COMPACTO */}
      <div className="contact-form-compact">
        <div className="container">
          <div className="form-compact-container">
            <div className="form-header-compact">
              <h2>Solicita tu Cotización</h2>
              <p>Completa el formulario y te contactaremos pronto</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}