// components/Hero/ServicesList.tsx
'use client';
import { Service } from './hooks/useServices';

interface ServicesListProps {
  services: Service[];
  selectedServices: Record<string, Service>;
  serviceMinutes: Record<string, number>;
  onToggleService: (serviceId: string) => void;
  onUpdateMinutes: (serviceId: string, minutes: number) => void;
  projectContext?: string;
}

const ServicesList: React.FC<ServicesListProps> = ({
  services,
  selectedServices,
  serviceMinutes,
  onToggleService,
  onUpdateMinutes,
  projectContext
}) => {
  return (
    <>
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
            onClick={() => onToggleService(service.id)}
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
                      onClick={() => onUpdateMinutes(service.id, (serviceMinutes[service.id] || 1) - 1)}
                      className="minute-btn"
                    >
                      -
                    </button>
                    <span className="minutes-display">{serviceMinutes[service.id] || 1}</span>
                    <button 
                      type="button"
                      onClick={() => onUpdateMinutes(service.id, (serviceMinutes[service.id] || 1) + 1)}
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
    </>
  );
};

export default ServicesList;