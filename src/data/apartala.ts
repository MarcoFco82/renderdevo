/**
 * Aparta La Fecha VIP — assets del caso.
 *
 * Capturas: R2 público del propio proyecto (53 en total, una por tono de las
 * colecciones "Esencias"). Se referencian directas, no se copian.
 * Identidad: public/brand/apartalafecha-*.svg (del repo de ALF, ya vectorizada).
 */

const R2 =
  'https://pub-d0695bdd1d98425c9d85d042b9d563aa.r2.dev/templates/previews-eventos';

export interface AlfShot {
  id: string;
  src: string;
  caption: { es: string; en: string };
}

/** Tres tonos distintos: demuestran que salen del mismo sistema visual. */
export const alfInvitations: AlfShot[] = [
  {
    id: 'obsidiana-boda',
    src: `${R2}/obsidiana-boda.webp`,
    caption: { es: 'Obsidiana Dorada — boda', en: 'Obsidiana Dorada — wedding' },
  },
  {
    id: 'niebla-boda',
    src: `${R2}/niebla-boda.webp`,
    caption: { es: 'Niebla de Jade — boda', en: 'Niebla de Jade — wedding' },
  },
  {
    id: 'amatista-xvs',
    src: `${R2}/amatista-xvs.webp`,
    caption: { es: 'Noche de Amatista — XV años', en: 'Noche de Amatista — XV años' },
  },
];

/**
 * Panel de control: pendiente de captura. El editor requiere login, así que
 * hay que capturarlo en vivo — Marco lo genera. Cuando exista, se agrega aquí
 * y la ficha lo muestra sola.
 */
export const alfPanel: AlfShot | null = null;
