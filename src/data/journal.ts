/**
 * Journal de renderdevo — cómo trabajo y las decisiones detrás de la construcción.
 *
 * Fuente curada (EN): renderdevo/docs/JOURNAL_renderdevo.md (v2, prosa reestructurada).
 * ES-MX: traducción conservando la voz — primera persona, plana, honesta. Marco es
 * diseñador de motion que construye herramientas dirigiendo IA. Sin slogans ni manifiestos.
 * NO es un changelog (los feature drops con fecha viven en el Devlog de Ashur).
 *
 * Emphasis inline soportado si hiciera falta:  **negrita**  ·  *cursiva*
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
    slug: 'whos-building-this',
    title: { es: 'Quién está construyendo esto', en: "Who's building this" },
    body: {
      es: [
        'Soy diseñador de motion graphics. Llevo años en Cinema 4D y After Effects, no en un codebase. Lo que estoy haciendo ahora es construir un motor web y los proyectos encima de él, con la IA haciendo buena parte del código real mientras yo lo dirijo y aprendo sobre la marcha.',
        'Pongo este diario porque prefiero ser honesto con eso que fingir que soy ingeniero de software. Una parte la entiendo bien; otra la voy resolviendo a medio construir. Cuando algo estuvo difícil o me equivoqué, lo voy a decir.',
      ],
      en: [
        "I'm a motion graphics designer. I've spent years in Cinema 4D and After Effects, not in a codebase. What I'm doing now is building a web engine and the projects on top of it, with AI doing a lot of the actual coding while I direct it and learn as I go.",
        "I'm putting this journal up because I'd rather be honest about that than pretend I'm a software engineer. Some of this I understand well; some of it I'm figuring out mid-build. When something was hard or I got it wrong, I'll say so.",
      ],
    },
  },
  {
    slug: 'project-turned-into-engine',
    date: '2026-03-13',
    title: { es: 'El proyecto se volvió un motor', en: 'The project turned into an engine' },
    body: {
      es: [
        'Por un tiempo creí que estaba haciendo un solo mundo 3D. En algún momento caí en cuenta de que la mayor parte de lo que había construido estaba debajo del mundo: el terreno, el renderizado, el backend, las herramientas de edición. El lugar específico era una capa delgada encima de todo eso.',
        'Así que lo separé: las partes genéricas a un núcleo compartido, el mundo específico como una capa pequeña encima. Decidir tratarlo como un motor en vez de un solo producto fue una decisión más grande que cualquier función. Mantuve todo en un repo porque trabajo solo y ahora mismo así es más simple para mí.',
      ],
      en: [
        "For a while I thought I was making one 3D world. At some point it clicked that most of what I'd built was underneath the world — the terrain, the rendering, the backend, the editing tools. The specific place was a thin layer on top of all that.",
        'So I split it: the generic parts into a shared core, the specific world as a small layer on top. Deciding to treat it as an engine instead of a single product was a bigger call than any feature. I kept everything in one repo because I work alone and that\'s simpler for me right now.',
      ],
    },
  },
  {
    slug: 'two-projects-one-engine',
    title: { es: 'Dos proyectos, un motor', en: 'Two projects, one engine' },
    body: {
      es: [
        'Unos días después de la separación armé un segundo proyecto, sin relación con el primero, sobre el mismo motor. Me tomó como media hora. Ese fue el momento en que «es reutilizable» dejó de ser algo que esperaba y se volvió algo que ya había hecho.',
        'Ahora los dos proyectos conviven lado a lado. Los nuevos cambian el contenido, no el motor. Esa es toda la razón por la que pasé por la separación.',
      ],
      en: [
        'A few days after the split I set up a second, unrelated project on the same engine. It took about half an hour. That was the moment "it\'s reusable" stopped being something I hoped and became something I\'d actually done.',
        'Now the two projects live side by side. New ones change the content, not the engine. That\'s the whole reason to have gone through the split.',
      ],
    },
  },
  {
    slug: 'everything-inside-the-tool',
    title: { es: 'Construyo todo dentro de la herramienta', en: 'I build everything inside the tool' },
    body: {
      es: [
        'No quería un pipeline donde modelas en una app, animas en otra y lo unes todo en otro lado. Quería dibujar el terreno, modelar los assets, construir las estructuras caminables, cablear la lógica y diseñar los menús —todo en la misma herramienta— y luego entregarlo como un link.',
        'Parte de eso viene de mi background: como motion designer estoy acostumbrado a un solo entorno donde hago todo. Parte es práctico: menos piezas moviéndose significa menos cosas que tengo que traer en la cabeza.',
      ],
      en: [
        "I didn't want a pipeline where you model in one app, animate in another, and stitch it together somewhere else. I wanted to draw the terrain, model the assets, build the walkable structures, wire the logic, and design the menus — all in the same tool — and then ship it as a link.",
        "Part of that is my background: as a motion designer I'm used to one environment where I do the whole thing. Part of it is practical — fewer moving parts means fewer things I have to keep in my head.",
      ],
    },
  },
  {
    slug: 'bug-means-design-wrong',
    title: {
      es: 'A veces el bug me dice que el diseño está mal',
      en: 'Sometimes the bug is telling me the design is wrong',
    },
    body: {
      es: [
        'Lo más útil que he aprendido construyendo esto: algunos bugs no son bugs. Un menú que parpadeaba no era un problema de renderizado; el motor estaba tratando el menú como un video que se reproduce y termina, cuando un menú debería quedarse ahí hasta que alguien haga clic. La solución no fue un parche, fue cambiar cómo había pensado los menús.',
        'Cuando algo se sigue rompiendo de formas raras, aprendí a dejar de parchar y preguntarme si lo armé mal desde el principio.',
      ],
      en: [
        "The most useful thing I've learned building this: some bugs aren't bugs. A menu that flickered wasn't a rendering problem — the engine was treating a menu like a video that plays and ends, when a menu should just sit there until someone clicks. The fix wasn't a patch, it was changing how I'd thought about menus.",
        "When something keeps breaking in weird ways, I've learned to stop patching and ask if I set it up wrong in the first place.",
      ],
    },
  },
  {
    slug: 'test-by-shipping',
    title: { es: 'Pruebo publicando', en: 'I test by shipping' },
    body: {
      es: [
        'No hago mucha prueba en un sandbox. Deployeo, y luego lo reviso en mi celular y en el navegador donde la gente lo va a usar de verdad. Suena arriesgado. Para un proyecto chico, con setup serverless y sin una base de usuarios grande todavía, ha sido más rápido que la alternativa.',
        'Solo funciona por las cosas aburridas de abajo.',
      ],
      en: [
        "I don't do a lot of testing in a sandbox. I deploy, then I check it on my phone and in the browser where people will actually use it. It sounds risky. For a small project with a serverless setup and no big user base yet, it's been faster than the alternative.",
        'It only works because of the boring stuff below.',
      ],
    },
  },
  {
    slug: 'boring-stuff-move-fast',
    title: {
      es: 'Las cosas aburridas que me dejan ir rápido',
      en: 'The boring stuff that lets me move fast',
    },
    body: {
      es: [
        'Hay alrededor de 2,300 pruebas automatizadas en el motor, los cambios de base de datos se hacen de forma que no rompan lo que ya existe, y los proyectos viejos siguen funcionando cuando agrego cosas nuevas. Nada de eso es emocionante. Es lo que me deja publicar rápido sin destrozar los mundos que ya están en vivo.',
        'No llegué a esto de forma natural; es la disciplina que fui agarrando (y que le hago cumplir a la IA) para no pegarme un tiro en el pie.',
      ],
      en: [
        "There are around 2,300 automated tests on the engine, database changes are made so they don't break what already exists, and old projects keep working when I add new things. None of that is exciting. It's what lets me ship quickly without wrecking the worlds that are already live.",
        "I didn't come to this naturally — it's the discipline I've picked up (and had the AI enforce) so I don't shoot myself in the foot.",
      ],
    },
  },
  {
    slug: 'measure-instead-of-guess',
    title: { es: 'Trato de medir en vez de adivinar', en: 'I try to measure instead of guess' },
    body: {
      es: [
        'Cuando estoy atorado, la salida más rápida casi siempre ha sido ir a ver los datos reales —el archivo real, el registro real en la base de datos, la petición de red real— en vez de teorizar. Casi todas las veces que perdí horas, fue porque estaba adivinando en vez de checar.',
        'Todavía me cacho haciéndolo. Es un hábito que estoy construyendo.',
      ],
      en: [
        "When I'm stuck, the fastest way out has usually been to go look at the actual data — the real file, the real database row, the real network request — instead of theorizing. Most of the times I've wasted hours, it was because I was guessing instead of checking.",
        "Still catch myself doing it. It's a habit I'm building.",
      ],
    },
  },
  {
    slug: 'mobile-first',
    title: {
      es: 'Mobile primero, porque así llega la gente',
      en: "Mobile first, because that's how people show up",
    },
    body: {
      es: [
        'La gente abre esto escaneando un código QR en su celular, así que empiezo ahí. Los controles están hechos para touch, los celulares débiles reciben automáticamente una versión más ligera, y la UI está diseñada primero para pantalla chica. Si construyes para escritorio y luego intentas exprimirlo en un celular, se nota.',
      ],
      en: [
        'People open these by scanning a QR code on their phone, so I start there. Controls are made for touch, weak phones automatically get a lighter version, and the UI is designed for a small screen first. If you build for desktop and try to squeeze it onto a phone later, it shows.',
      ],
    },
  },
  {
    slug: 'build-tools-not-content',
    title: { es: 'Construyo herramientas, no solo contenido', en: 'I build tools, not just content' },
    body: {
      es: [
        'Me he dado cuenta de que mi mejor trabajo no es hacer un nivel: es hacer la cosa que hace niveles. Un modelador, un editor de mundos, un modo de construcción. Es más lento ese día, porque estoy construyendo la máquina en vez del resultado, pero cada herramienta se paga sola cada vez que la uso después.',
      ],
      en: [
        "I've noticed my best work isn't making a level — it's making the thing that makes levels. A modeler, a world editor, a build mode. It's slower on the day, because I'm building the machine instead of the output, but every tool pays off every time I use it after.",
      ],
    },
  },
  {
    slug: 'delivered-by-a-link',
    date: '2026-07-26',
    title: { es: 'Entregado por un link', en: 'Delivered by a link' },
    body: {
      es: [
        'Uno de los proyectos, Defensa de Puebla, entró a un museo. Los visitantes escanean un código QR y se abre en el navegador: sin app, sin descarga. Ver a gente que no vino por la tecnología simplemente sacar su celular y jugar fue la prueba más clara de que «corre en el navegador, nada que instalar» de verdad se sostiene fuera de mi propio setup.',
      ],
      en: [
        'One of the projects, Defensa de Puebla, went into a museum. Visitors scan a QR code and it opens in the browser — no app, no download. Watching people who didn\'t come for the tech just pick up their phone and play was the clearest proof that "runs in the browser, nothing to install" actually holds up outside my own setup.',
      ],
    },
  },
];
