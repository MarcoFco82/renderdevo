/**
 * Journal de renderdevo — notas de proceso, decisiones y construcción en público.
 *
 * Fuente curada (EN): renderdevo/docs/JOURNAL_renderdevo.md
 * ES-MX: traducción conservando la voz (primera persona, reflexiva, honesta).
 * NO es un changelog (los feature drops con fecha viven en el Devlog de Ashur).
 *
 * Emphasis inline soportado en ambos idiomas:  **negrita**  ·  *cursiva*
 * Orden: narrativo (deliberado), no cronológico. Se respeta el orden de la fuente.
 */

export interface JournalEntry {
  slug: string;
  /** ISO YYYY-MM-DD. Opcional: la mayoría de las entradas son evergreen. */
  date?: string;
  title: { es: string; en: string };
  /** Párrafos por idioma. Pueden incluir **negrita** y *cursiva* inline. */
  body: { es: string[]; en: string[] };
}

export const journal: JournalEntry[] = [
  {
    slug: 'became-a-platform',
    date: '2026-03-13',
    title: {
      es: 'El día que el proyecto se volvió plataforma',
      en: 'The day the project became a platform',
    },
    body: {
      es: [
        'Por un tiempo creí que estaba construyendo un mundo. Un día me di cuenta de que el mundo era casi todo motor: el terreno, el renderizado, el backend, las herramientas de edición eran todos genéricos; solo una capa delgada era el lugar específico.',
        'Así que dejé de tratarlo como un producto y empecé a tratarlo como una plataforma. Saqué las partes genéricas a un núcleo compartido y dejé lo específico como una capa delgada encima. Mantuve todo en un solo repositorio: como equipo de una persona, los refactors atómicos y una sola fuente de verdad le ganan a la ceremonia de muchos repos.',
        'La decisión que lo cambió todo no fue una función. Fue un límite.',
      ],
      en: [
        'For a while I thought I was building a world. One day I realized the world was mostly engine — the terrain, the rendering, the backend, the editing tools were all generic; only a thin slice was the specific place.',
        'So I stopped treating it as a product and started treating it as a platform. I pulled the generic parts into a shared core and left the specific parts as a thin shell on top. Kept everything in one repository — as a team of one, atomic refactors and a single source of truth beat the ceremony of many repos.',
        "The decision that changed everything wasn't a feature. It was a boundary.",
      ],
    },
  },
  {
    slug: 'one-engine-many-worlds',
    title: { es: 'Un motor, muchos mundos', en: 'One engine, many worlds' },
    body: {
      es: [
        'La apuesta es fácil de decir y difícil de ganarse: **construye la capacidad una vez, llévala a muchos mundos.**',
        'Unos días después de la separación, levanté un segundo producto completamente distinto sobre el mismo motor en cosa de media hora de configuración: un jardín contemplativo y un set de minijuegos históricos, compartiendo un núcleo, cada uno con su propia infraestructura aislada. Ese fue el momento en que la plataforma dejó de ser teoría. Los mundos nuevos cambian el contenido, no el código.',
      ],
      en: [
        'The bet is simple to say and hard to earn: **build the capability once, ship it into many worlds.**',
        'A few days after the split, I stood up a second, completely different product on the same engine in about half an hour of setup — a contemplative garden and a set of historical mini-games, sharing a core, each with its own isolated infrastructure. That was the moment the platform stopped being a theory. New worlds change the content, not the code.',
      ],
    },
  },
  {
    slug: 'author-inside-the-tool',
    title: {
      es: 'Crear todo dentro de la herramienta',
      en: 'Author everything inside the tool',
    },
    body: {
      es: [
        'Hay muchas formas de poner 3D en la web. Lo que a mí me importa es distinto: **todo el ciclo de creación vive dentro de la herramienta.**',
        'Dibujar el terreno. Esculpir los assets. Construir los edificios caminables. Cablear la lógica y las reglas con un grafo visual de nodos. Diseñar los menús y las pantallas. Luego se entrega como link o código QR: sin descargas, sin app store, sin instalación. La suite de autoría no es una función del motor. *Es* el producto.',
      ],
      en: [
        'There are plenty of ways to put 3D on the web. The thing I care about is different: **the entire authoring loop lives inside the tool.**',
        "Draw the terrain. Sculpt the assets. Construct the walkable buildings. Wire the logic and the rules with a visual node graph. Design the menus and screens. Then it ships as a link or a QR code — no downloads, no app store, no install. The authoring suite isn't a feature of the engine. It *is* the product.",
      ],
    },
  },
  {
    slug: 'reframe-the-bug',
    title: {
      es: 'Reencuadrar el bug como arquitectura',
      en: 'Reframe the bug into the architecture',
    },
    body: {
      es: [
        'Mi hábito más útil no es arreglar bugs: es notar cuándo un bug es en realidad un diseño avisándome que el modelo está mal.',
        'Un menú que parpadeaba no era un bug de renderizado; era el motor tratando cada pantalla como un video, cuando un menú debería quedarse quieto hasta que el jugador actúe. Un sistema de combate que se sentía demasiado específico no necesitaba una función más; necesitaba volverse un sistema general de bandos y reglas configurables, del que las escaramuzas, las escoltas y las peleas de jefe simplemente emergen.',
        'La solución, la mayoría de las veces, es una mejor idea, no más código.',
      ],
      en: [
        "My most useful habit isn't fixing bugs — it's noticing when a bug is really a design telling me the model is wrong.",
        "A menu that flickered wasn't a rendering bug; it was the engine treating every screen like a video when a menu should hold still until the player acts. A combat system that felt too specific wasn't missing a feature; it needed to become a general system of configurable sides and rules, from which skirmishes and escorts and boss fights simply emerge.",
        'The fix, more often than not, is a better idea — not more code.',
      ],
    },
  },
  {
    slug: 'ship-then-verify',
    title: {
      es: 'Publicar, luego verificar en el dispositivo real',
      en: 'Ship, then verify on the real device',
    },
    body: {
      es: [
        'No pruebo en teoría. Los deploys son la prueba de humo: las funciones salen a producción rápido y se validan donde los jugadores realmente están —en el celular, en el navegador—, no en un simulador ni en una especificación.',
        'Suena imprudente. No lo es, por las siguientes dos entradas.',
      ],
      en: [
        "I don't test in theory. Deploys are the smoke test: features go live fast and get validated where players actually are — on the phone, in the browser — not in a simulator or a spec.",
        "It sounds reckless. It isn't, because of the next two posts.",
      ],
    },
  },
  {
    slug: 'safety-net-under-speed',
    title: {
      es: 'Una red de seguridad bajo la velocidad',
      en: 'A safety net under the speed',
    },
    body: {
      es: [
        'La velocidad solo funciona con un piso debajo. Por eso el motor carga 2,296+ pruebas automatizadas, los cambios de datos son aditivos y no rompen nada por defecto, y la retrocompatibilidad es un requisito de primera clase, no un lujo.',
        'Puedo moverme rápido precisamente porque romper los mundos que ya existen no está sobre la mesa. La disciplina aburrida es la que compra la velocidad emocionante.',
      ],
      en: [
        'Speed only works with a floor under it. So the engine carries 2,296+ automated tests, data changes are additive and non-breaking by default, and backward compatibility is a first-class requirement, not a nice-to-have.',
        "I can move fast precisely because breaking the worlds that already exist isn't on the table. The boring discipline is what buys the exciting velocity.",
      ],
    },
  },
  {
    slug: 'measure-dont-guess',
    title: { es: 'Medir, no adivinar', en: "Measure, don't guess" },
    body: {
      es: [
        'Cuando algo es ambiguo, la respuesta viene de la instrumentación —leer los datos reales—, no de una corazonada. Comparar los archivos reales. Consultar el estado real. Observar la llamada de red real.',
        'Toma más tiempo montarlo y es mucho más rápido para acertar. Casi siempre que estuve realmente atorado, fue porque estaba teorizando en vez de medir.',
      ],
      en: [
        "When something's ambiguous, the answer comes from instrumentation — reading the actual data — not from a hunch. Compare the real files. Query the real state. Watch the real network call.",
        "It's slower to set up and far faster to be right. Most of the time I've been badly stuck, it was because I was theorizing instead of measuring.",
      ],
    },
  },
  {
    slug: 'mobile-first',
    title: {
      es: 'Mobile-first, porque así llega la gente',
      en: "Mobile-first, because that's how people arrive",
    },
    body: {
      es: [
        'Cada decisión de controles, rendimiento y UI parte del celular, no del escritorio. Un dispositivo de gama baja baja a un perfil más ligero de forma automática para que simplemente funcione; los controles son touch-first y se configuran por mundo; todo está diseñado para abrirse escaneando un código.',
        'A mobile no se porta al final. Empiezas ahí, o en realidad nunca llegas.',
      ],
      en: [
        'Every choice about controls, performance and UI starts from the phone, not the desktop. A low-end device drops to a lighter profile automatically so it just works; controls are touch-first and configured per world; the whole thing is designed to be opened by scanning a code.',
        "You don't port to mobile at the end. You start there, or you don't really get there.",
      ],
    },
  },
  {
    slug: 'build-tools-to-build-content',
    title: {
      es: 'Construir herramientas para construir contenido',
      en: 'Build tools to build content',
    },
    body: {
      es: [
        'Me sigo dando cuenta de que mis mejores días no se van en hacer un nivel: se van en hacer la herramienta que hace niveles. Un modelador, un editor de mundos, un grafo de nodos, un modo de construcción.',
        'Cada herramienta multiplica todo lo que viene después. Es más lento el primer día y se acumula para siempre. Esa es la estrategia bajo todo esto: **construye la cosa que construye las cosas.**',
      ],
      en: [
        "I keep noticing that my best days aren't spent making a level — they're spent making the tool that makes levels. A modeler, a world editor, a node graph, a construction mode.",
        "Each tool multiplies everything downstream. It's slower on day one and compounding forever after. That's the strategy under all of it: **build the thing that builds the things.**",
      ],
    },
  },
  {
    slug: 'delivered-by-a-link',
    date: '2026-07-26',
    title: { es: 'Entregado por un link', en: 'Delivered by a link' },
    body: {
      es: [
        'La prueba más honesta de «sin instalaciones, corre en el navegador» es ponerlo frente a desconocidos que no vinieron a probar tu tecnología.',
        'Defensa de Puebla —construida sobre el motor— llegó a un museo, jugable escaneando un código QR. Sin app, sin descarga, sin fricción entre una persona y la experiencia. Ver eso funcionar es la tesis entera en un momento: un mundo interactivo completo, entregado por un link.',
      ],
      en: [
        'The truest test of "no installs, runs in the browser" is putting it in front of strangers who didn\'t come to try your tech.',
        'Defensa de Puebla — built on the engine — went to a museum, playable by scanning a QR code. No app, no download, no friction between a person and the experience. Watching that work is the whole thesis in one moment: an entire interactive world, delivered by a link.',
      ],
    },
  },
];
