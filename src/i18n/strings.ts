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
      danim: 'D-Anim-Gator',
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
        tagline: 'Motor de animación multi-formato.',
        body: 'Piezas de motion en 60+ formatos y relaciones de aspecto en una sola pasada — un mismo dialecto visual, sin rehacer nada. Ahora con modo de visuales en vivo audio-reactivo para eventos e instalaciones.',
        cta: 'Explorar D-Anim-Gator',
        status: 'En operación',
      },
    },

    cases: {
      title: 'Casos seleccionados',
      viewAll: 'Ver todos los casos',
    },

    work: {
      title: 'Trabajo seleccionado',
      subtitle: 'Motion, cine con IA, interactivo y producto.',
      tabs: {
        motionDesign: 'Motion Design',
        aiFilm: 'AI Film',
        interactive: 'Interactive',
        digitalProduct: 'Producto Digital',
      },
      /* El texto llena lo que no ocupan las piezas: a menos piezas, más texto. */
      blurbs: {
        motionDesign: { title: '', body: '' },
        aiFilm: {
          title: 'Book trailers con IA dirigida',
          body: 'Piezas de promoción literaria producidas con generación por IA y montadas con criterio de motion. La IA acelera el material; el ritmo, el corte y la dirección de arte los pongo yo.',
        },
        interactive: {
          title: 'Defensa de Puebla',
          body: 'Colección de minijuegos sobre la Batalla de Puebla, construida sobre Ashur Engine. Corre 100% en el navegador y se entrega por link o QR: sin instalación, sin app store, sin hardware especial. La pieza central es la batalla campal, con cientos de unidades en pantalla.',
        },
        digitalProduct: {
          title: 'Aparta La Fecha VIP',
          body: 'SaaS de invitaciones digitales en producción, con clientes reales. Cada invitación es un microsite vivo: confirmación de asistencia, mapas, mesa de regalos y avisos de último minuto detrás de un link. Debajo, un motor de plantillas propio que genera más de 200 diseños desde un solo sistema visual.',
          linkLabel: 'Ver en vivo',
          linkHref: 'https://apartalafecha.vip',
        },
      },
      empty: 'Próximamente',
      viewProject: 'Ver pieza',
      close: 'Cerrar',
      autoplayPaused: 'Rotación pausada',
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

    alf: {
      eyebrow: 'Caso · Producto Digital',
      name: 'Aparta La Fecha VIP',
      tagline: 'Invitaciones digitales premium para México.',
      body: 'Cada invitación es un microsite vivo: confirmación de asistencia, mapas, mesa de regalos, asignación de mesas y avisos de último minuto, todo detrás de un link. Debajo: un motor de plantillas propio que genera más de 200 diseños desde un solo sistema visual.',
      invitationsTitle: 'Tres tonos, un mismo sistema',
      panelTitle: 'Panel de control',
      panelPending: 'Captura pendiente',
      visit: 'Ver en vivo',
      metrics: [
        { value: '200+', label: 'plantillas de un solo sistema' },
        { value: '21', label: 'tipos de módulo' },
        { value: '108', label: 'endpoints en el edge' },
        { value: 'Desde $449', label: 'MXN · 3 planes + gratis' },
      ],
      stack: 'React · TypeScript · Cloudflare (Pages, Functions, D1, R2, KV) · Stripe · Mercado Pago',
    },

    danim: {
      tagline: 'Producto de RENDERDEVO',
      sub: 'Piezas de motion en 60+ formatos y relaciones de aspecto en una sola pasada — un mismo dialecto visual, sin rehacer nada. Ahora con modo de visuales en vivo audio-reactivo para eventos e instalaciones.',
      ctaPrimary: 'Hablar de un proyecto',
      capabilities: {
        title: 'Qué hace',
        subtitle: 'Solo lo que está construido y funcionando.',
        items: [
          {
            title: 'Una pasada, todos los formatos',
            body: '60+ formatos social, broadcast y signage desde una sola composición. Escalado proporcional integrado — de 9:16 a signage 4K, idéntico.',
          },
          {
            title: 'Un dialecto visual, no un template',
            body: 'Motion generativo sobre motor propio. El cliente recibe una pieza única, no un archivo editable de After Effects.',
          },
          {
            title: 'Audio-reactivo y en vivo',
            body: 'Sonido, beat y MIDI controlan cualquier parámetro. De un spot rendereado a un set de VJ en vivo — el mismo motor.',
          },
          {
            title: 'WYSIWYG, propietario',
            body: 'Un solo motor de render: lo que previsualizas es exactamente lo que se entrega. Sin lock-in de terceros, sin sorpresas al exportar.',
          },
        ],
      },
    },

    diary: {
      title: 'Diario',
      sub: 'Las notas que la IA con la que construyo toma de cada sesión: qué pedí, qué corregí y dónde se equivocó. En sus palabras, no en las mías.',
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

    contact: {
      title: 'Hablemos',
      sub: 'Cuéntame qué tienes en mente. Respondo personalmente.',
      emailLabel: 'Correo',
      linkedinLabel: 'LinkedIn',
      locationLabel: 'Base',
      location: 'Guadalajara, México',
      note: 'Para proyectos: escribe qué quieres construir, para cuándo y con quién. Entre más concreto, más útil es la primera respuesta.',
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
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      menu: 'Menú',
    },
};

export type StringsShape = typeof es;
export type Locale = 'es' | 'en';

const en: StringsShape = {
    nav: {
      capabilities: 'Capabilities',
      cases: 'Work',
      ashur: 'Ashur Engine',
      danim: 'D-Anim-Gator',
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
        body: 'Motion pieces across 60+ formats and aspect ratios in a single pass — one visual dialect, zero re-work. Now with an audio-reactive live-visuals mode for events and installations.',
        cta: 'Explore D-Anim-Gator',
        status: 'Operational',
      },
    },

    cases: {
      title: 'Selected work',
      viewAll: 'See all work',
    },

    work: {
      title: 'Selected work',
      subtitle: 'Motion, AI film, interactive and product.',
      tabs: {
        motionDesign: 'Motion Design',
        aiFilm: 'AI Film',
        interactive: 'Interactive',
        digitalProduct: 'Digital Product',
      },
      blurbs: {
        motionDesign: { title: '', body: '' },
        aiFilm: {
          title: 'Book trailers with directed AI',
          body: 'Literary promo pieces produced with AI generation and cut with a motion designer\'s judgment. AI speeds up the footage; pacing, editing and art direction are mine.',
        },
        interactive: {
          title: 'Defensa de Puebla',
          body: 'A collection of minigames about the Battle of Puebla, built on Ashur Engine. Runs 100% in the browser and ships by link or QR: no install, no app store, no special hardware. The centerpiece is the pitched battle, with hundreds of units on screen.',
        },
        digitalProduct: {
          title: 'Aparta La Fecha VIP',
          body: 'A digital-invitations SaaS in production with real customers. Every invitation is a living microsite: RSVP, maps, gift registry and last-minute updates behind a single link. Underneath, a proprietary template engine that generates 200+ designs from one visual system.',
          linkLabel: 'See it live',
          linkHref: 'https://apartalafecha.vip',
        },
      },
      empty: 'Coming soon',
      viewProject: 'View piece',
      close: 'Close',
      autoplayPaused: 'Rotation paused',
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

    alf: {
      eyebrow: 'Case · Digital Product',
      name: 'Aparta La Fecha VIP',
      tagline: 'Premium digital invitations for Mexico.',
      body: 'Every invitation is a living microsite: RSVP, maps, gift registry, table seating and last-minute updates, all behind a single link. Underneath: a proprietary template engine that generates 200+ designs from one visual system.',
      invitationsTitle: 'Three tones, one system',
      panelTitle: 'Control panel',
      panelPending: 'Capture pending',
      visit: 'See it live',
      metrics: [
        { value: '200+', label: 'templates from one system' },
        { value: '21', label: 'module types' },
        { value: '108', label: 'edge endpoints' },
        { value: 'From $449', label: 'MXN · 3 plans + free tier' },
      ],
      stack: 'React · TypeScript · Cloudflare (Pages, Functions, D1, R2, KV) · Stripe · Mercado Pago',
    },

    danim: {
      tagline: 'A RENDERDEVO product',
      sub: 'Motion pieces across 60+ formats and aspect ratios in a single pass — one visual dialect, zero re-work. Now with an audio-reactive live-visuals mode for events and installations.',
      ctaPrimary: 'Discuss a project',
      capabilities: {
        title: 'What it does',
        subtitle: 'Only what is built and working.',
        items: [
          {
            title: 'One pass, every format',
            body: '60+ social, broadcast and signage formats rendered from a single composition. Proportional scaling built in — 9:16 to 4K signage, identical.',
          },
          {
            title: 'A visual dialect, not a template',
            body: 'Generative motion built on our own engine. The client gets a unique piece, not an editable After Effects file.',
          },
          {
            title: 'Audio-reactive & live',
            body: 'Sound, beat and MIDI drive any parameter. From a rendered spot to a live VJ set — same engine.',
          },
          {
            title: 'WYSIWYG, proprietary',
            body: 'One render engine: what you preview is exactly what ships. No third-party lock-in, no surprises at export.',
          },
        ],
      },
    },

    diary: {
      title: 'Journal',
      sub: 'The notes the AI I build with takes from each session: what I asked for, what I corrected, and where it got things wrong. In its words, not mine.',
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

    contact: {
      title: 'Let\'s talk',
      sub: 'Tell me what you have in mind. I answer personally.',
      emailLabel: 'Email',
      linkedinLabel: 'LinkedIn',
      locationLabel: 'Based in',
      location: 'Guadalajara, Mexico',
      note: 'For projects: tell me what you want to build, by when, and with whom. The more concrete, the more useful my first reply.',
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
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      menu: 'Menu',
    },
};

export const strings: Record<Locale, StringsShape> = { es, en };
