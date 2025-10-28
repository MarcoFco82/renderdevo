// components/Hero/QuoteSection.tsx - AGREGAR useEffect para scroll
'use client';
import { useState, useEffect } from 'react'; // ← Agregar useEffect
import { useServices } from './hooks/useServices';
import { useQuoteCalculator } from './hooks/useQuoteCalculator';
import { useEmailJS } from './hooks/useEmailJS';
import ServicesList from './ServicesList';
import QuoteSummary from './QuoteSummary';

interface QuoteSectionProps {
  onClose: () => void;
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ onClose }) => {
  const {
    services,
    selectedServices,
    serviceMinutes,
    projectContext,
    setProjectContext,
    toggleService,
    updateMinutes,
    setSelectedServices
  } = useServices();

  const calculations = useQuoteCalculator(selectedServices, serviceMinutes);
  
  const {
    isSubmitting,
    submitError,
    setSubmitError,
    sendQuote
  } = useEmailJS();

  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  });

  // ✅ EFECTO PARA SCROLL AUTOMÁTICO AL COTIZADOR
  useEffect(() => {
    const timer = setTimeout(() => {
      const quoteSection = document.getElementById('quote-section');
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContactDataChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!contactData.name || !contactData.email || !contactData.phone || !contactData.businessType) {
      setSubmitError('Por favor completa todos los campos requeridos');
      return;
    }

    const result = await sendQuote(
      contactData,
      selectedServices,
      serviceMinutes,
      calculations,
      projectContext
    );

    if (result.success) {
      // Éxito - reset form
      setShowContactForm(false);
      setSelectedServices({});
      setContactData({ name: '', email: '', phone: '', businessType: '' });
      setProjectContext('');
      onClose();
      
      // Mostrar mensaje de éxito
      alert('¡Cotización enviada exitosamente! Te contactaremos dentro de 24 horas.');
    }
  };

  const handleClearSelection = () => {
    setSelectedServices({});
    setProjectContext('');
  };

  return (
    <section id="quote-section" className="quote-section-minimal">
      <div className="container">
        <div className="quote-header-minimal">
          <h2>Selecciona los servicios que necesitas</h2>
          <p><strong>5% de descuento por cada servicio adicional (a partir del segundo)</strong></p>
        </div>

        <ServicesList
          services={services}
          selectedServices={selectedServices}
          serviceMinutes={serviceMinutes}
          onToggleService={toggleService}
          onUpdateMinutes={updateMinutes}
          projectContext={projectContext}
        />

        <QuoteSummary
          selectedServices={selectedServices}
          serviceMinutes={serviceMinutes}
          calculations={calculations}
          showContactForm={showContactForm}
          contactData={contactData}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onContactDataChange={handleContactDataChange}
          onShowContactForm={setShowContactForm}
          onSubmitQuote={handleSubmitQuote}
          onClearSelection={handleClearSelection}
        />
      </div>
    </section>
  );
};

export default QuoteSection;