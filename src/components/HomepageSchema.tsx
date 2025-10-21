// components/HomepageSchema.tsx - DEBE TENER ESTA ESTRUCTURA
import Script from 'next/script';

const HomepageSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RenderDevo',
    description: 'Agencia de video marketing y contenido audiovisual para PyMEs en México',
    url: 'https://renderdevo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://renderdevo.com/contacto?servicio={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'es-MX'
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default HomepageSchema; // ← ESTA LÍNEA ES CRÍTICA