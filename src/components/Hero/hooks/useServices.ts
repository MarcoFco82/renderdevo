// components/Hero/hooks/useServices.ts
import { useState, useEffect } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  priceRange: string;
  pricingType: 'fixed' | 'perMinute';
}

export const useServices = () => {
  const services: Service[] = [
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

  const [selectedServices, setSelectedServices] = useState<Record<string, Service>>({});
  const [serviceMinutes, setServiceMinutes] = useState<Record<string, number>>({});
  const [projectContext, setProjectContext] = useState('');

  // ✅ SOLO mostrar contexto, NO pre-seleccionar servicios
  useEffect(() => {
    const projectReference = sessionStorage.getItem('projectReference');
    
    if (projectReference) {
      setProjectContext(`Proyecto de referencia: ${projectReference}`);
      // Limpiar después de usar
      sessionStorage.removeItem('projectReference');
    }
  }, []);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      const newSelection = { ...prev };
      if (newSelection[serviceId]) {
        delete newSelection[serviceId];
        setServiceMinutes(prevMinutes => {
          const newMinutes = { ...prevMinutes };
          delete newMinutes[serviceId];
          return newMinutes;
        });
      } else {
        newSelection[serviceId] = services.find(s => s.id === serviceId)!;
        const service = services.find(s => s.id === serviceId);
        if (service?.pricingType === 'perMinute') {
          setServiceMinutes(prev => ({
            ...prev,
            [serviceId]: 1
          }));
        }
      }
      return newSelection;
    });
  };

  const updateMinutes = (serviceId: string, minutes: number) => {
    setServiceMinutes(prev => ({
      ...prev,
      [serviceId]: Math.max(1, minutes)
    }));
  };

  return {
    services, // ← Esto incluye TODOS los servicios
    selectedServices,
    serviceMinutes,
    projectContext,
    setProjectContext,
    toggleService,
    updateMinutes,
    setSelectedServices
  };
};