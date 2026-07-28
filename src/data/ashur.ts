/**
 * Catálogo de screenshots de Ashur Engine.
 *
 * Assets en R2: bucket renderdevo-files, prefijo `ashur/`.
 * Origen local de los archivos (Marco los sube al bucket):
 *   renderdevo/docs/ashur-270726/screenshots/ashur-engine-sistema/  → ashur/sistema/
 *   renderdevo/docs/ashur-270726/screenshots/scenes/                → ashur/scenes/
 *
 * Formato: WebP optimizado (ver tools/optimize-web-images.command).
 *
 * Para agregar una captura:
 *   1. Sube el .webp a R2 bajo ashur/sistema/ o ashur/scenes/
 *   2. Agrega la entrada aquí con su caption ES + EN
 */

import { r2 } from '@/lib/r2';

export interface AshurShot {
  id: string;
  src: string;
  /** Caption bilingüe. Se resuelve por locale en el componente. */
  caption: { es: string; en: string };
}

/** Escenas de mundos reales corriendo en el motor. Van en el carrusel grande. */
export const ashurScenes: AshurShot[] = [
  {
    id: 'defensadepuebla-panorama',
    src: r2('ashur/scenes/defensadepuebla-panorama.webp'),
    caption: {
      es: 'Defensa de Puebla — panorama del campo de batalla',
      en: 'Defensa de Puebla — battlefield panorama',
    },
  },
  {
    id: 'defensadepuebla-campamento',
    src: r2('ashur/scenes/depensadepuebla-campamento.webp'),
    caption: {
      es: 'Defensa de Puebla — campamento',
      en: 'Defensa de Puebla — encampment',
    },
  },
  {
    id: 'defensadepuebla-campamento-2',
    src: r2('ashur/scenes/defensadepuebla-capamento-2.webp'),
    caption: {
      es: 'Defensa de Puebla — campamento, segunda vista',
      en: 'Defensa de Puebla — encampment, second view',
    },
  },
  {
    id: 'eljardinperdido-1',
    src: r2('ashur/scenes/eljardiperdido-1.webp'),
    caption: {
      es: 'El Jardín Perdido — bioma procedural',
      en: 'El Jardín Perdido — procedural biome',
    },
  },
  {
    id: 'eljardinperdido-sunset',
    src: r2('ashur/scenes/eljardiperdido-2-sunset.webp'),
    caption: {
      es: 'El Jardín Perdido — atardecer con clima dinámico',
      en: 'El Jardín Perdido — sunset with dynamic weather',
    },
  },
];

/** Capturas de la suite de autoría. Van en el grid del sistema. */
export const ashurSystem: AshurShot[] = [
  {
    id: 'modo-arquitecto-defensadepuebla',
    src: r2('ashur/sistema/modo-arquitecto-defensadepuebla.webp'),
    caption: {
      es: 'Modo Arquitecto — edición de terreno y zonas',
      en: 'Architect Mode — terrain and zone editing',
    },
  },
  {
    id: 'modo-arquitecto-jardinperdido',
    src: r2('ashur/sistema/modo-arquitecto-jardinperdidosunset.webp'),
    caption: {
      es: 'Modo Arquitecto — atmósfera y ciclo día/noche',
      en: 'Architect Mode — atmosphere and day/night cycle',
    },
  },
  {
    id: 'quest-manager',
    src: r2('ashur/sistema/quest-manager.webp'),
    caption: {
      es: 'Quest Manager — grafos de lógica de juego sin código',
      en: 'Quest Manager — no-code game logic graphs',
    },
  },
  {
    id: 'character-manager',
    src: r2('ashur/sistema/character-manager.webp'),
    caption: {
      es: 'Character Manager — personajes, animaciones y comportamiento',
      en: 'Character Manager — characters, animations and behavior',
    },
  },
  {
    id: 'assets-builder',
    src: r2('ashur/sistema/assets-builder.webp'),
    caption: {
      es: 'Asset Architect — modelador 3D low-poly en el navegador',
      en: 'Asset Architect — in-browser low-poly 3D modeler',
    },
  },
  {
    id: 'blueprints',
    src: r2('ashur/sistema/blueprints.webp'),
    caption: {
      es: 'Blueprints — edificios caminables por piezas',
      en: 'Blueprints — walkable buildings from pieces',
    },
  },
  {
    id: 'screens-editor',
    src: r2('ashur/sistema/screens-editor.webp'),
    caption: {
      es: 'Screen System — pantallas y HUD por capas',
      en: 'Screen System — layered screens and HUD',
    },
  },
];
