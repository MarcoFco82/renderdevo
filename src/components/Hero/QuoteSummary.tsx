// components/Hero/QuoteSummary.tsx
'use client';
import { Service } from './hooks/useServices';

interface QuoteSummaryProps {
  selectedServices: Record<string, Service>;
  serviceMinutes: Record<string, number>;
  calculations: {
    baseTotal: number;
    discount: number;
    finalTotal: number;
    discountPercentage: number;
    selectedCount: number;
  };
  showContactForm: boolean;
  contactData: {
    name: string;
    email: string;
    phone: string;
    businessType: string;
  };
  isSubmitting: boolean;
  submitError: string;
  onContactDataChange: (field: string, value: string) => void;
  onShowContactForm: (show: boolean) => void;
  onSubmitQuote: (e: React.FormEvent) => void;
  onClearSelection: () => void;
}

const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  selectedServices,
  serviceMinutes,
  calculations,
  showContactForm,
  contactData,
  isSubmitting,
  submitError,
  onContactDataChange,
  onShowContactForm,
  onSubmitQuote,
  onClearSelection
}) => {
  const { baseTotal, discount, finalTotal, discountPercentage, selectedCount } = calculations;

  if (selectedCount === 0) return null;

  return (
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
            onClick={() => onShowContactForm(true)}
            className="btn btn-primary full-width"
          >
            📧 Solicitar Servicio ({selectedCount} servicios)
          </button>
          
          <button 
            onClick={onClearSelection}
            className="btn btn-secondary full-width"
          >
            Limpiar Selección
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmitQuote} className="contact-form-minimal">
          {submitError && (
            <div className="error-message">
              ⚠️ {submitError}
            </div>
          )}

          <div className="form-group-minimal">
            <label>Nombre completo *</label>
            <input
              type="text"
              value={contactData.name}
              onChange={(e) => onContactDataChange('name', e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Tu nombre completo"
            />
          </div>
          
          <div className="form-group-minimal">
            <label>Giro de tu negocio *</label>
            <input
              type="text"
              value={contactData.businessType}
              onChange={(e) => onContactDataChange('businessType', e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="Ej: Restaurante, Consultoría, Tienda online..."
            />
          </div>
          
          <div className="form-group-minimal">
            <label>Correo electrónico *</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => onContactDataChange('email', e.target.value)}
              required
              disabled={isSubmitting}
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="form-group-minimal">
            <label>Número de contacto *</label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => onContactDataChange('phone', e.target.value)}
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
              onClick={() => onShowContactForm(false)}
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
  );
};

export default QuoteSummary;