import ParametricField, {
  type ParametricFieldProps,
} from '@/components/ParametricField';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * MeshBackdrop — fondo paramétrico con presets por sección.
 *
 * Envuelve ParametricField para dos cosas:
 *   1. Toma el tema activo (light default) sin que cada llamada lo cablee.
 *   2. Da FORMAS distintas por preset, para que la navegación tenga variedad
 *      visual en vez de repetir la misma figura en todas las páginas.
 *
 * Tres familias geométricas, para que la Home no se lea como variaciones de
 * lo mismo: esfera (mesh), retícula en fuga (grid3d) y anillos (moire).
 *
 * El componente ya atenúa el glow y topa el radio en light por dentro
 * (multiply reparte tinta y embarra más rápido que el aditivo), así que aquí
 * se pone UN número de glow y los dos modos salen bien.
 */

type FieldPreset = Omit<ParametricFieldProps, 'mode' | 'palette' | 'className' | 'style'>;

export type MeshVariant =
  /* — esfera — */
  | 'hero'      /* masa a la derecha, deja limpia la columna de texto */
  | 'dense'     /* esfera completa, dramática — páginas de producto */
  | 'wide'      /* dispersa y muy sutil — páginas con mucho copy */
  | 'corner'    /* arriba a la izquierda, entra en diagonal */
  | 'low'       /* la más barata: pocas aristas, casi quieta */
  | 'orbit'     /* anillo abierto y grande, sangra fuera del marco */
  /* — retícula y anillos: detrás de grids de cards — */
  | 'products'  /* retícula abriéndose desde arriba-izquierda */
  | 'work'      /* túnel centrado y lento, la más discreta */
  | 'why';      /* anillos desfasados, cambia de familia geométrica */

const PRESETS: Record<MeshVariant, FieldPreset & { opacity: number }> = {
  hero: {
    variant: 'mesh',
    density: 140, links: 2, scale: 1.25, speed: 0.05,
    cx: 0.74, cy: 0.42, glow: 0.6, glowRadius: 10,
    lineWidth: 1, nodeEvery: 4, accentEvery: 9, opacity: 0.34,
  },
  dense: {
    variant: 'mesh',
    density: 240, links: 3, scale: 1.0, speed: 0.07,
    cx: 0.68, cy: 0.5, glow: 0.75, glowRadius: 13,
    lineWidth: 0.9, nodeEvery: 3, accentEvery: 7, opacity: 0.36,
  },
  wide: {
    variant: 'mesh',
    density: 110, links: 1, scale: 1.55, speed: 0.035,
    cx: 0.82, cy: 0.28, glow: 0.5, glowRadius: 9,
    lineWidth: 1.1, nodeEvery: 5, accentEvery: 11, opacity: 0.46,
  },
  corner: {
    variant: 'mesh',
    density: 130, links: 2, scale: 1.1, speed: 0.06,
    cx: 0.16, cy: 0.18, glow: 0.65, glowRadius: 11,
    lineWidth: 1, nodeEvery: 4, accentEvery: 8, opacity: 0.32,
  },
  low: {
    variant: 'mesh',
    density: 90, links: 1, scale: 1.3, speed: 0.03,
    cx: 0.5, cy: 0.5, glow: 0.45, glowRadius: 8,
    lineWidth: 1.2, nodeEvery: 5, accentEvery: 0, opacity: 0.3,
  },
  orbit: {
    variant: 'mesh',
    density: 180, links: 4, scale: 1.7, speed: 0.045,
    cx: 0.5, cy: 0.12, glow: 0.7, glowRadius: 14,
    lineWidth: 0.8, nodeEvery: 4, accentEvery: 6, opacity: 0.34,
  },

  /* Estas tres van detrás de contenido, no de un headline. La retícula y los
     anillos competían con la lectura, así que usan la MISMA esfera dispersa del
     Diario (`wide`), variando posición para que no se lean idénticas.

     Ojo con `scale`: el radio es min(ancho, alto) x 0.34 x scale. En una sección
     baja el lado menor es el ALTO, así que la misma escala da una esfera mucho
     más chica que en el Diario (que es una página larga). Por eso estas llevan
     escalas altas: compensan la altura de su sección, no son "más grandes". */
  products: {
    variant: 'mesh',
    density: 110, links: 1, scale: 1.55, speed: 0.032,
    cx: 0.2, cy: 0.34, glow: 0.5, glowRadius: 9,
    lineWidth: 1.1, nodeEvery: 5, accentEvery: 12, opacity: 0.44,
  },
  work: {
    variant: 'mesh',
    density: 105, links: 1, scale: 3.0, speed: 0.03,
    cx: 0.84, cy: 0.5, glow: 0.5, glowRadius: 9,
    lineWidth: 1.1, nodeEvery: 5, accentEvery: 13, opacity: 0.44,
  },
  why: {
    variant: 'mesh',
    density: 115, links: 1, scale: 1.55, speed: 0.038,
    cx: 0.16, cy: 0.6, glow: 0.52, glowRadius: 10,
    lineWidth: 1.1, nodeEvery: 5, accentEvery: 11, opacity: 0.46,
  },
};

/* Paleta atada a los tokens del sitio (no a los genéricos del handoff).
   En light el acento es el LED profundo: el brillante sobre crema se lava. */
const PALETTE = {
  light: { far: '#ded6c9', near: '#09121c', node: '#09121c', accent: '#0082e2' },
  dark:  { far: '#18232d', near: '#00befa', node: '#e8f6ff', accent: '#00befa' },
} as const;

/* El aditivo sobre oscuro aguanta (y pide) algo más de presencia. */
const MODE_GAIN = { light: 1, dark: 1.24 } as const;

interface MeshBackdropProps {
  variant?: MeshVariant;
  /** Multiplica la opacidad del preset. 1 = tal cual. */
  intensity?: number;
  /**
   * Fuerza el modo, ignorando el tema activo. Necesario en secciones que son
   * SIEMPRE oscuras (CTA de Home, cierre de Ashur): ahí el fondo es un gradiente
   * dark propio, así que la malla siempre debe componer en aditivo. Sin esto, en
   * tema light usaría multiply sobre negro y se comería el dibujo.
   */
  force?: 'dark' | 'light';
  className?: string;
}

export function MeshBackdrop({
  variant = 'hero',
  intensity = 1,
  force,
  className,
}: MeshBackdropProps) {
  const { theme } = useTheme();
  const mode = force ?? theme;
  const { opacity, ...preset } = PRESETS[variant];

  return (
    <ParametricField
      {...preset}
      mode={mode}
      palette={PALETTE[mode]}
      opacity={opacity * MODE_GAIN[mode] * intensity}
      className={className}
    />
  );
}
