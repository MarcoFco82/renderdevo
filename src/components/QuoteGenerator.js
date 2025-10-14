// src/components/QuoteGenerator.js - ESQUELETO BÁSICO
'use client';
import { useState } from 'react';

const QuoteGenerator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState({
    website: false,
    socialMedia: false,
    branding: false,
    emailDesign: false
  });

  const calculateQuote = () => {
    // Mock calculation - luego conectaremos Google Sheets
    let total = 0;
    if (services.website) total += 18000;
    if (services.socialMedia) total += 8000;
    if (services.branding) total += 12000;
    if (services.emailDesign) total += 6000;
    return total;
  };

  return (
    <div className="quote-generator">
      {/* Modal trigger */}
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        Cotizar Ahora
      </button>

      {isOpen && (
        <div className="quote-modal">
          <div className="modal-content">
            <h3>¿Qué necesitas para tu negocio?</h3>
            
            <div className="service-options">
              {Object.entries(services).map(([key, value]) => (
                <label key={key} className="service-option">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setServices(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                  />
                  <span>
                    {key === 'website' && 'Sitio Web Institucional'}
                    {key === 'socialMedia' && 'Contenido para Redes Sociales'}
                    {key === 'branding' && 'Diseño de Marca'}
                    {key === 'emailDesign' && 'Diseño de Emails Marketing'}
                  </span>
                </label>
              ))}
            </div>

            <div className="quote-result">
              <h4>Cotización Estimada:</h4>
              <p className="quote-price">${calculateQuote().toLocaleString()} MXN</p>
              <small>*IVA incluido - Precio base</small>
            </div>

            <button 
              className="btn-primary"
              onClick={() => {/* Lógica de contacto */}}
            >
              Agendar Llamada
            </button>

            <button 
              className="btn-close"
              onClick={() => setIsOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .quote-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: var(--space-lg);
          border-radius: 1rem;
          max-width: 500px;
          width: 90%;
          text-align: center;
        }

        .service-options {
          text-align: left;
          margin: var(--space-md) 0;
        }

        .service-option {
          display: flex;
          align-items: center;
          padding: var(--space-sm);
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }

        .service-option input {
          margin-right: var(--space-sm);
        }

        .quote-price {
          font-size: var(--text-3xl);
          font-weight: bold;
          color: var(--color-accent);
          margin: var(--space-sm) 0;
        }

        .btn-close {
          margin-top: var(--space-sm);
          background: none;
          border: none;
          color: var(--color-text-light);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default QuoteGenerator;