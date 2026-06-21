/**
 * Catálogo de piezas del WorkGrid.
 *
 * Cada pieza es un loop de video en R2.
 * Categorías existentes: motion-design, experimental, interactive.
 * Categorías vacías muestran "Próximamente" en el grid.
 *
 * Para agregar piezas:
 *   1. Subí el mp4 a R2 en la carpeta de su categoría
 *   2. Agregá una entrada acá con su id y category
 */

import { r2 } from '@/lib/r2';

export type WorkCategory = 'motion-design' | 'ai-film' | 'experimental' | 'interactive';

export interface WorkItem {
  id: string;
  category: WorkCategory;
  src: string;
  /** Aspect del source. Determina cómo se renderiza la celda. */
  aspect: '9:16' | '16:9' | '1:1' | '2:3';
}

export const works: WorkItem[] = [
  { id: 'md01', category: 'motion-design', src: r2('motion-design/md01.mp4'), aspect: '9:16' },
  { id: 'md02', category: 'motion-design', src: r2('motion-design/md02.mp4'), aspect: '9:16' },
  { id: 'md03', category: 'motion-design', src: r2('motion-design/md05.mp4'), aspect: '9:16' },
  { id: 'md04', category: 'motion-design', src: r2('motion-design/md04.mp4'), aspect: '9:16' },

  // AI Film — book trailers (generados con IA y editados). 720×1280, 9:16.
  { id: 'alsduam-leonarda', category: 'ai-film', src: r2('ai-video/alsduam-leonarda.mp4'), aspect: '9:16' },
  { id: 'alsduam-petra', category: 'ai-film', src: r2('ai-video/alsduam-petra.mp4'), aspect: '9:16' },
];

export const categoryOrder: WorkCategory[] = ['motion-design', 'ai-film', 'experimental', 'interactive'];

export function worksByCategory(category: WorkCategory): WorkItem[] {
  return works.filter((w) => w.category === category);
}
