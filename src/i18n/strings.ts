/**
 * ============================================================================
 * renderdevo — Strings i18n
 * ============================================================================
 *
 * Toda copy del sitio vive acá. ES + EN paralelos con misma forma TypeScript.
 * Si agregás una key en ES, agregala en EN o el typecheck falla.
 *
 * Para usar en componentes:
 *   const { t } = useLocale();
 *   <h1>{t.hero.headline}</h1>
 *
 * NO hardcodear copy en componentes. Todo acá.
 * ============================================================================
 */

const es = {
    nav: {
      capabilities: 'Capacidades',
      cases: 'Casos',
      method: 'Método',
      diary: 'Diario',
      about: 'Sobre',
      contact: 'Contacto',
    },

    hero: {
      tagline: 'Interactive Motion Studio',
      headline: 'Experiencias web y motion sistémico con tecnología propia.',
      sub: 'Boutique LATAM. Criterio senior. Workflow AI dirigido.',
      ctaPrimary: 'Ver casos',
      ctaSecondary: 'Agendar discovery',
    },

    capabilities: {
      title: 'Tres capacidades, una boutique.',
      interactive: {
        title: 'Experiencias Interactivas',
        body: 'Microsites inmersivos, productos digitales, plataformas educativas. Sin instalación, accesibles desde un link.',
      },
      motion: {
        title: 'Motion Sistémico',
        body: 'Producción multi-formato en una sola pasada. Motion branding generativo con dialecto visual propio.',
      },
      product: {
        title: 'Producto Digital',
        body: 'SaaS y productos digitales end-to-end. De idea a producción en semanas, no meses.',
      },
    },

    method: {
      title: 'Cómo trabajamos',
      steps: [
        { num: '01', name: 'Discovery', body: 'Mapeo del problema, alcance y stack. Entregable propio: plan técnico y roadmap.' },
        { num: '02', name: 'Concepto', body: 'Dirección visual, sistema y arquitectura. Validación temprana antes de producir.' },
        { num: '03', name: 'Producción', body: 'Build dirigido con sesiones documentadas. Cada decisión queda trazable.' },
        { num: '04', name: 'Lanzamiento', body: 'Deploy a producción real, QA con compras/usuarios reales, soporte inicial.' },
        { num: '05', name: 'Iteración', body: 'Retainer post-launch opcional. Mejoras continuas con métricas reales.' },
      ],
    },

    cases: {
      title: 'Casos seleccionados',
      viewAll: 'Ver todos los casos',
    },

    whyUs: {
      title: '¿Por qué renderdevo?',
      ownTech: {
        title: 'Tecnología propia',
        body: 'No usamos lo mismo que todos. Operamos sobre infraestructura propia construida en años de trabajo.',
      },
      seniorCriteria: {
        title: 'Criterio senior dirigiendo IA',
        body: '15 años de experiencia con clientes como Envato, HBO y Natura. La IA acelera; el criterio dirige.',
      },
      boutiqueLatam: {
        title: 'Boutique LATAM',
        body: 'Bilingüe, en tu zona horaria, con estándar global. Sin pasar por intermediarios.',
      },
    },

    diary: {
      title: 'Diario',
      sub: 'Notas de proceso, decisiones y construcción en público.',
      subscribe: 'Suscribirse',
      readAll: 'Ver todas las entradas',
    },

    notDoing: {
      title: 'Lo que no hacemos',
      sub: 'Honestidad antes que upsell. Si tu proyecto cae fuera, te recomendamos a alguien que sí lo haga.',
    },

    cta: {
      title: '¿Tenés un proyecto en mente?',
      sub: 'Empezamos con un Discovery pagado. Entrega real, sin compromiso de continuar.',
      button: 'Agendar discovery',
    },

    footer: {
      tagline: 'Interactive Motion Studio',
      copyright: '© 2026 renderdevo',
      sections: {
        studio: 'Estudio',
        legal: 'Legal',
      },
    },

    common: {
      loading: 'Cargando…',
      comingSoon: 'Próximamente',
    },
};

export type StringsShape = typeof es;
export type Locale = 'es' | 'en';

const en: StringsShape = {
    nav: {
      capabilities: 'Capabilities',
      cases: 'Work',
      method: 'Method',
      diary: 'Journal',
      about: 'About',
      contact: 'Contact',
    },

    hero: {
      tagline: 'Interactive Motion Studio',
      headline: 'Web experiences and systemic motion built on proprietary tech.',
      sub: 'LATAM boutique. Senior craft. Directed AI workflow.',
      ctaPrimary: 'See work',
      ctaSecondary: 'Book discovery',
    },

    capabilities: {
      title: 'Three capabilities, one boutique.',
      interactive: {
        title: 'Interactive Experiences',
        body: 'Immersive microsites, digital products, educational platforms. No install — open a link.',
      },
      motion: {
        title: 'Systemic Motion',
        body: 'Multi-format production in a single pass. Generative motion branding with our own visual dialect.',
      },
      product: {
        title: 'Digital Product',
        body: 'Full-stack SaaS and digital products. From idea to production in weeks, not months.',
      },
    },

    method: {
      title: 'How we work',
      steps: [
        { num: '01', name: 'Discovery', body: 'Problem map, scope and stack. Standalone deliverable: tech plan and roadmap.' },
        { num: '02', name: 'Concept', body: 'Visual direction, system and architecture. Validated before production.' },
        { num: '03', name: 'Production', body: 'Directed build with documented sessions. Every decision is traceable.' },
        { num: '04', name: 'Launch', body: 'Real production deploy, QA with real purchases/users, initial support.' },
        { num: '05', name: 'Iteration', body: 'Optional post-launch retainer. Continuous improvement driven by real metrics.' },
      ],
    },

    cases: {
      title: 'Selected work',
      viewAll: 'See all work',
    },

    whyUs: {
      title: 'Why renderdevo?',
      ownTech: {
        title: 'Proprietary tech',
        body: 'We don\'t use the same stack as everyone. We operate on infrastructure we built over years.',
      },
      seniorCriteria: {
        title: 'Senior craft directing AI',
        body: '15 years working with clients like Envato, HBO and Natura. AI accelerates; craft directs.',
      },
      boutiqueLatam: {
        title: 'LATAM boutique',
        body: 'Bilingual, in your timezone, with global standards. No middlemen.',
      },
    },

    diary: {
      title: 'Journal',
      sub: 'Process notes, decisions, and building in public.',
      subscribe: 'Subscribe',
      readAll: 'Read all entries',
    },

    notDoing: {
      title: 'What we don\'t do',
      sub: 'Honesty over upsell. If your project falls outside, we\'ll point you to someone who does it.',
    },

    cta: {
      title: 'Have a project in mind?',
      sub: 'We start with a paid Discovery. Real deliverable, no commitment to continue.',
      button: 'Book discovery',
    },

    footer: {
      tagline: 'Interactive Motion Studio',
      copyright: '© 2026 renderdevo',
      sections: {
        studio: 'Studio',
        legal: 'Legal',
      },
    },

    common: {
      loading: 'Loading…',
      comingSoon: 'Coming soon',
    },
};

export const strings: Record<Locale, StringsShape> = { es, en };
