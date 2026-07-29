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
      ashur: 'Ashur Engine',
      diary: 'Diario',
      about: 'Sobre',
      contact: 'Contacto',
    },

    hero: {
      tagline: 'Interactive Motion Studio',
      headline: 'Experiencias web y motion sistémico con tecnología propia.',
      sub: 'Estudio LATAM. Criterio senior. Workflow AI dirigido.',
      ctaPrimary: 'Ver casos',
      ctaSecondary: 'Agendar discovery',
    },

    capabilities: {
      title: 'Tres capacidades, un estudio.',
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

    products: {
      title: 'Productos estrella',
      subtitle: 'Tecnología propia construida en casa. No licenciamos motores de terceros: los construimos.',
      ashur: {
        name: 'Ashur Engine',
        tagline: 'Motor de mundos y juegos 3D que corre 100% en el navegador.',
        body: 'Suite de autoría visual completa sin escribir código: terreno, personajes, combate, cinemáticas y lógica de juego. Se entrega por link o QR, sin instalación ni app store.',
        cta: 'Conocer Ashur Engine',
        status: 'Dos productos en vivo',
      },
      danimgator: {
        name: 'D-Anim-Gator',
        tagline: 'Motor de motion multi-formato.',
        body: 'Producción de piezas de motion en múltiples formatos y proporciones en una sola pasada, con dialecto visual consistente.',
        cta: 'Próximamente',
        status: 'En desarrollo',
      },
    },

    cases: {
      title: 'Casos seleccionados',
      viewAll: 'Ver todos los casos',
    },

    work: {
      title: 'Trabajo seleccionado',
      subtitle: 'Motion, experimental, interactivo.',
      tabs: {
        motionDesign: 'Motion Design',
        aiFilm: 'AI Film',
        experimental: 'Experimental & Stylized',
        interactive: 'Interactive',
      },
      empty: 'Próximamente',
      viewProject: 'Ver pieza',
      close: 'Cerrar',
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
        title: 'Estudio LATAM',
        body: 'Bilingüe, en tu zona horaria, con estándar global. Sin pasar por intermediarios.',
      },
    },

    ashur: {
      tagline: 'Producto de RENDERDEVO',
      headline: 'Ashur Engine',
      sub: 'Motor de mundos y juegos 3D que corre 100% en el navegador, con suite de autoría visual completa. Se entrega por link o QR: sin instalación, sin app store, sin hardware especial.',
      ctaPrimary: 'Ver ashurengine.com',
      ctaSecondary: 'Hablar de un proyecto',

      pitch: {
        title: 'Las instituciones no compran software, compran experiencias.',
        body: 'Ashur Engine no se vende como licencia. Es la ventaja que nos permite producir experiencias culturales y educativas más rápido y más barato que cualquiera, y entregarlas sin la fricción de una descarga. Construido desde cero, sin licencias de terceros ni regalías.',
      },

      scenes: {
        title: 'Mundos en producción',
        subtitle: 'Escenas capturadas de proyectos reales corriendo en el navegador.',
      },

      system: {
        title: 'La suite de autoría',
        subtitle: 'Todo el ciclo de creación vive dentro de la herramienta. Sin código.',
      },

      liveProducts: {
        title: 'Productos en vivo',
        subtitle: 'No son mockups ni slides. Son URLs públicas, jugables en el navegador.',
        visit: 'Visitar',
        items: [
          {
            name: 'El Jardín Perdido',
            url: 'https://eljardinperdido.com',
            body: 'Mundo abierto de exploración: biomas procedurales, ciclo día-noche, clima dinámico, arquitectura caminable. Demuestra el techo técnico del motor.',
          },
          {
            name: 'Defensa de Puebla',
            url: 'https://defensadepuebla.com',
            body: 'Colección de minijuegos por QR sobre la Batalla de Puebla. Pieza central: la batalla campal.',
          },
        ],
      },

      capabilities: {
        title: 'Capacidades del motor',
        subtitle: 'Solo lo que está construido y funcionando.',
        groups: [
          {
            name: 'Mundo y escenario',
            items: [
              'Terreno procedural esculpible, 6 biomas',
              'Ciclo día/noche, clima con 9 presets, niebla volumétrica',
              'Miles de objetos instanciados en un solo draw call',
              'Zonas: spawn, muros invisibles, triggers',
            ],
          },
          {
            name: 'Personajes y combate',
            items: [
              'Jugador, NPCs y aliados con animaciones y vida propia',
              'Comportamiento por reglas, hostilidad emergente',
              'Combate melee y a distancia con balística',
              'Batalla campal validada de punta a punta',
            ],
          },
          {
            name: 'Lógica y cinematografía',
            items: [
              'Editor visual de grafos que orquesta el runtime sin código',
              'Contadores, marcadores y leaderboard persistente',
              'Tomas con keyframes, travelling, órbita y cutscenes',
              'Primera persona y cámara de seguimiento',
            ],
          },
          {
            name: 'Plataforma',
            items: [
              'Pantallas por capas, desktop y móvil',
              'Modelador 3D low-poly integrado en el navegador',
              'Edificios caminables por piezas y blueprints',
              'Backend serverless con auth multi-usuario y 2FA',
            ],
          },
        ],
      },

      differentiators: {
        title: 'Por qué importa',
        items: [
          {
            title: 'Cero instalación',
            body: 'Elimina la fricción número uno. Un QR y el visitante ya está dentro.',
          },
          {
            title: 'Cero hardware especial',
            body: 'El celular que ya trae, o una pantalla del recinto. Sin visores, filas ni mantenimiento.',
          },
          {
            title: 'Editor sin código',
            body: 'La institución actualiza contenido sin contratar desarrollo. Baja el costo de vida del proyecto.',
          },
          {
            title: 'Escala a cero',
            body: 'Aguanta el pico de un puente y cuesta casi nada un martes. Sin servidores que mantener.',
          },
          {
            title: 'Propiedad intelectual propia',
            body: 'Sin licencias ni regalías de terceros. El precio no carga el margen de otro.',
          },
          {
            title: 'Producción acelerada',
            body: 'Los subsistemas ya están construidos y probados: cada proyecto parte del 70%, no de cero.',
          },
        ],
      },

      closing: {
        title: 'No hacemos lo mismo más barato.',
        body: 'Quitamos la barrera que hacía imposible el proyecto: la instalación, el hardware y la dependencia.',
        cta: 'Hablar de un proyecto',
      },
    },

    diary: {
      title: 'Diario',
      sub: 'Cómo se construye este motor dirigiendo una AI: los métodos, las decisiones y dónde se rompe.',
      subscribe: 'Suscribirse',
      readAll: 'Ver todas las entradas',
    },

    notDoing: {
      title: 'Lo que no hacemos',
      sub: 'Honestidad antes que upsell. Si tu proyecto cae fuera, te recomendamos a alguien que sí lo haga.',
    },

    cta: {
      title: '¿Tienes un proyecto en mente?',
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
      ashur: 'Ashur Engine',
      diary: 'Journal',
      about: 'About',
      contact: 'Contact',
    },

    hero: {
      tagline: 'Interactive Motion Studio',
      headline: 'Web experiences and systemic motion built on proprietary tech.',
      sub: 'LATAM studio. Senior craft. Directed AI workflow.',
      ctaPrimary: 'See work',
      ctaSecondary: 'Book discovery',
    },

    capabilities: {
      title: 'Three capabilities, one studio.',
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

    products: {
      title: 'Flagship products',
      subtitle: 'Proprietary technology built in-house. We don\'t license third-party engines — we build them.',
      ashur: {
        name: 'Ashur Engine',
        tagline: '3D world and game engine running 100% in the browser.',
        body: 'Complete visual authoring suite with no code: terrain, characters, combat, cinematics and game logic. Delivered by link or QR — no install, no app store.',
        cta: 'Explore Ashur Engine',
        status: 'Two products live',
      },
      danimgator: {
        name: 'D-Anim-Gator',
        tagline: 'Multi-format motion engine.',
        body: 'Motion pieces produced across multiple formats and aspect ratios in a single pass, with a consistent visual dialect.',
        cta: 'Coming soon',
        status: 'In development',
      },
    },

    cases: {
      title: 'Selected work',
      viewAll: 'See all work',
    },

    work: {
      title: 'Selected work',
      subtitle: 'Motion, experimental, interactive.',
      tabs: {
        motionDesign: 'Motion Design',
        aiFilm: 'AI Film',
        experimental: 'Experimental & Stylized',
        interactive: 'Interactive',
      },
      empty: 'Coming soon',
      viewProject: 'View piece',
      close: 'Close',
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
        title: 'LATAM studio',
        body: 'Bilingual, in your timezone, with global standards. No middlemen.',
      },
    },

    ashur: {
      tagline: 'A RENDERDEVO product',
      headline: 'Ashur Engine',
      sub: '3D world and game engine running 100% in the browser, with a complete visual authoring suite. Delivered by link or QR: no install, no app store, no special hardware.',
      ctaPrimary: 'Visit ashurengine.com',
      ctaSecondary: 'Discuss a project',

      pitch: {
        title: 'Institutions don\'t buy software — they buy experiences.',
        body: 'Ashur Engine isn\'t sold as a license. It\'s the advantage that lets us produce cultural and educational experiences faster and cheaper than anyone, and deliver them without the friction of a download. Built from scratch, with no third-party licenses or royalties.',
      },

      scenes: {
        title: 'Worlds in production',
        subtitle: 'Scenes captured from real projects running in the browser.',
      },

      system: {
        title: 'The authoring suite',
        subtitle: 'The entire creation cycle lives inside the tool. No code.',
      },

      liveProducts: {
        title: 'Live products',
        subtitle: 'Not mockups or slides. Public URLs, playable in the browser.',
        visit: 'Visit',
        items: [
          {
            name: 'El Jardín Perdido',
            url: 'https://eljardinperdido.com',
            body: 'Open-world exploration: procedural biomes, day-night cycle, dynamic weather, walkable architecture. Demonstrates the engine\'s technical ceiling.',
          },
          {
            name: 'Defensa de Puebla',
            url: 'https://defensadepuebla.com',
            body: 'A QR-delivered collection of minigames about the Battle of Puebla. Centerpiece: the pitched battle.',
          },
        ],
      },

      capabilities: {
        title: 'Engine capabilities',
        subtitle: 'Only what is built and working.',
        groups: [
          {
            name: 'World and environment',
            items: [
              'Sculptable procedural terrain, 6 biomes',
              'Day/night cycle, weather with 9 presets, volumetric fog',
              'Thousands of instanced objects in a single draw call',
              'Zones: spawn points, invisible walls, triggers',
            ],
          },
          {
            name: 'Characters and combat',
            items: [
              'Player, NPCs and allies with animations and autonomous behavior',
              'Rule-based behavior, emergent hostility',
              'Melee and ranged combat with ballistics',
              'Pitched battle validated end-to-end',
            ],
          },
          {
            name: 'Logic and cinematography',
            items: [
              'Visual graph editor orchestrating the runtime without code',
              'Counters, scores and persistent leaderboard',
              'Keyframed shots, travelling, orbit and cutscenes',
              'First person and follow camera',
            ],
          },
          {
            name: 'Platform',
            items: [
              'Layered screens, desktop and mobile',
              'Low-poly 3D modeler built into the browser',
              'Walkable buildings from pieces and blueprints',
              'Serverless backend with multi-user auth and 2FA',
            ],
          },
        ],
      },

      differentiators: {
        title: 'Why it matters',
        items: [
          {
            title: 'Zero install',
            body: 'Removes friction number one. One QR and the visitor is already inside.',
          },
          {
            title: 'Zero special hardware',
            body: 'The phone they already carry, or a screen on site. No headsets, queues or maintenance.',
          },
          {
            title: 'No-code editor',
            body: 'The institution updates content without hiring development. Lowers the project\'s lifetime cost.',
          },
          {
            title: 'Scales to zero',
            body: 'Handles a holiday peak and costs almost nothing on a Tuesday. No servers to maintain.',
          },
          {
            title: 'Own intellectual property',
            body: 'No third-party licenses or royalties. The price doesn\'t carry someone else\'s margin.',
          },
          {
            title: 'Accelerated production',
            body: 'The subsystems are already built and tested: each project starts at 70%, not zero.',
          },
        ],
      },

      closing: {
        title: 'We don\'t do the same thing cheaper.',
        body: 'We remove the barrier that made the project impossible: the install, the hardware and the dependency.',
        cta: 'Discuss a project',
      },
    },

    diary: {
      title: 'Journal',
      sub: 'How this engine gets built by directing an AI: the methods, the decisions, and where it breaks.',
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
