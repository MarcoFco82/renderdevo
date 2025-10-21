// components/StructuredData.js - DEBE TENER ESTA ESTRUCTURA
import Script from 'next/script';

const StructuredData = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'RenderDevo',
    description: 'Agencia especializada en video marketing y contenido audiovisual para pequeñas y medianas empresas en toda la República Mexicana.',
    url: 'https://renderdevo.com',
    telephone: '+52-55-1234-5678',
    email: 'hola@renderdevo.com',
    areaServed: {
      '@type': 'Country',
      name: 'México'
    },
    serviceType: [
      'Video Marketing',
      'Contenido para Redes Sociales', 
      'Diseño Web',
      'Animaciones Digitales',
      'Presentaciones Ejecutivas',
      'Estrategia Digital para PyMEs'
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceRange: '$$',
      offerCount: '6',
      description: 'Servicios de video marketing y contenido digital para PyMEs en todo México'
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData; // ← ESTA LÍNEA ES CRÍTICA