/**
 * Journal de renderdevo — modelo de datos + fallback estático.
 *
 * Fuente de verdad en producción: R2 (bucket privado renderdevo-data →
 * journal/entries.json), servido por la Pages Function GET /api/journal.
 * Este archivo importa el mismo JSON como fallback (build-time) para:
 *   - render inmediato sin esperar el fetch,
 *   - dev local sin Functions,
 *   - resiliencia si la API falla.
 *
 * El editor admin (/admin) escribe a R2; tras editar, este fallback puede
 * quedar viejo — es solo red de seguridad, no la fuente.
 *
 * Bloques: texto bilingüe + media opcional intercalada (imagen/video).
 */

import seed from './journal.entries.json';

/** Bloque de texto bilingüe. Soporta **negrita** y *cursiva* inline. */
export interface TextBlock {
  type: 'text';
  es: string;
  en: string;
}

/** Bloque de media opcional para "vestir" la entrada. */
export interface MediaBlock {
  type: 'image' | 'video';
  /** URL pública (R2 / media.renderdevo.com). */
  src: string;
  /** Alt de accesibilidad (imágenes). */
  alt?: string;
  /** Caption bilingüe opcional bajo la media. */
  caption?: { es: string; en: string };
}

export type Block = TextBlock | MediaBlock;

export interface JournalEntry {
  slug: string;
  /** ISO YYYY-MM-DD. Opcional. */
  date?: string;
  /** Solo las publicadas se muestran en el sitio (default true). */
  published?: boolean;
  title: { es: string; en: string };
  blocks: Block[];
}

/** Fallback estático (se reemplaza en runtime por lo que sirva /api/journal). */
export const journal = (seed as { entries: JournalEntry[] }).entries;
