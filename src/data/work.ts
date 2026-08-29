/**
 * Catálogo del bloque "Trabajo seleccionado".
 *
 * La composición es la misma en todas las pestañas y el contenido la llena:
 * cada pieza ocupa una columna de cuatro, y el texto descriptivo toma las que
 * sobran. Con 4 piezas no hay texto; con 1, el texto manda.
 *
 * Una pieza puede ser video (loop mudo) o imagen — así una categoría puede
 * mostrarse antes de tener su video final.
 *
 * Para agregar piezas: sube el archivo a R2 y agrega la entrada aquí.
 */

import { r2 } from '@/lib/r2';

export type WorkCategory =
  | 'motion-design'
  | 'ai-film'
  | 'interactive'
  | 'digital-product';

export interface WorkItem {
  id: string;
  category: WorkCategory;
  src: string;
  kind: 'video' | 'image';
  /** Aspecto del source. Determina cómo se encuadra la celda. */
  aspect: '9:16' | '16:9' | '1:1' | '2:3';
  /** Pie opcional bajo la pieza. */
  caption?: { es: string; en: string };
}

export const works: WorkItem[] = [
  /* Motion Design — 4 loops. Llenan la composición: sin texto. */
  { id: 'md01', category: 'motion-design', kind: 'video', src: r2('motion-design/md01.mp4'), aspect: '9:16' },
  { id: 'md02', category: 'motion-design', kind: 'video', src: r2('motion-design/md02.mp4'), aspect: '9:16' },
  { id: 'md03', category: 'motion-design', kind: 'video', src: r2('motion-design/md05.mp4'), aspect: '9:16' },
  { id: 'md04', category: 'motion-design', kind: 'video', src: r2('motion-design/md04.mp4'), aspect: '9:16' },

  /* AI Film — 2 book trailers. Dejan sitio para el texto. */
  {
    id: 'alsduam-leonarda',
    category: 'ai-film',
    kind: 'video',
    src: r2('ai-video/alsduam-leonarda.mp4'),
    aspect: '9:16',
    caption: { es: 'A la sombra de un árbol muerto — Leonarda', en: 'A la sombra de un árbol muerto — Leonarda' },
  },
  {
    id: 'alsduam-petra',
    category: 'ai-film',
    kind: 'video',
    src: r2('ai-video/alsduam-petra.mp4'),
    aspect: '9:16',
    caption: { es: 'A la sombra de un árbol muerto — Petra', en: 'A la sombra de un árbol muerto — Petra' },
  },

  /* Interactive — Defensa de Puebla. Una sola pieza: el texto se extiende.
     Mientras no exista el video de gameplay, se muestra una captura real. */
  {
    id: 'defensa-puebla',
    category: 'interactive',
    kind: 'image',
    src: r2('ashur/juego-defensadepuebla-panorama.webp'),
    aspect: '16:9',
    caption: { es: 'Defensa de Puebla — corre en el navegador', en: 'Defensa de Puebla — runs in the browser' },
  },

  /* Producto digital — Aparta La Fecha. Dos tonos del mismo sistema visual:
     con dos piezas el texto (el más largo de las cuatro pestañas) tiene sitio. */
  {
    id: 'alf-obsidiana',
    category: 'digital-product',
    kind: 'image',
    src: 'https://pub-d0695bdd1d98425c9d85d042b9d563aa.r2.dev/templates/previews-eventos/obsidiana-boda.webp',
    aspect: '9:16',
    caption: { es: 'Obsidiana Dorada', en: 'Obsidiana Dorada' },
  },
  {
    id: 'alf-niebla',
    category: 'digital-product',
    kind: 'image',
    src: 'https://pub-d0695bdd1d98425c9d85d042b9d563aa.r2.dev/templates/previews-eventos/niebla-boda.webp',
    aspect: '9:16',
    caption: { es: 'Niebla de Jade', en: 'Niebla de Jade' },
  },
];

/** Orden de la rotación automática. */
export const categoryOrder: WorkCategory[] = [
  'motion-design',
  'ai-film',
  'interactive',
  'digital-product',
];

export function worksByCategory(category: WorkCategory): WorkItem[] {
  return works.filter((w) => w.category === category);
}

/** Solo las que tienen piezas: la rotación no debe caer en una vacía. */
export const populatedCategories = categoryOrder.filter(
  (c) => works.some((w) => w.category === c)
);
