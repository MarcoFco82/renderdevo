import MeshGlow, { type MeshGlowProps } from '@/components/MeshGlow';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * MeshBackdrop — fondo paramétrico con presets por sección.
 *
 * Envuelve MeshGlow para dos cosas:
 *   1. Toma el tema activo (dark default) sin que cada llamada lo cablee.
 *   2. Da FORMAS distintas por preset, para que la navegación tenga variedad
 *      visual en vez de repetir la misma esfera en todas las páginas.
 *
 * Paletas atadas a los tokens del sitio (no a los genéricos del handoff):
 *   dark  → far se funde con la superficie navy; near/node crema; acento glow LED
 *   light → far se funde con el crema; near/node tinta navy; acento glow LED
 */

export type MeshVariant =
  | 'hero'      /* masa a la derecha, deja limpia la columna de texto */
  | 'dense'     /* densa y centrada, dramática — páginas de producto */
  | 'wide'      /* dispersa y muy sutil — páginas con mucho copy */
  | 'corner'    /* arriba a la izquierda, entra en diagonal */
  | 'low'       /* la más barata: pocas aristas, casi quieta */
  | 'orbit';    /* anillo abierto y grande, sangra fuera del marco */

const PRESETS: Record<MeshVariant, Omit<MeshGlowProps, 'mode' | 'palette'>> = {
  hero: {
    density: 140, links: 2, scale: 1.25, speed: 0.05,
    cx: 0.74, cy: 0.42, glow: 0.6, glowRadius: 10,
    lineWidth: 1, nodeEvery: 4, accentEvery: 9,
  },
  dense: {
    density: 240, links: 3, scale: 1.0, speed: 0.07,
    cx: 0.68, cy: 0.5, glow: 0.75, glowRadius: 13,
    lineWidth: 0.9, nodeEvery: 3, accentEvery: 7,
  },
  wide: {
    density: 110, links: 1, scale: 1.55, speed: 0.035,
    cx: 0.82, cy: 0.28, glow: 0.5, glowRadius: 9,
    lineWidth: 1.1, nodeEvery: 5, accentEvery: 11,
  },
  corner: {
    density: 130, links: 2, scale: 1.1, speed: 0.06,
    cx: 0.16, cy: 0.18, glow: 0.65, glowRadius: 11,
    lineWidth: 1, nodeEvery: 4, accentEvery: 8,
  },
  low: {
    density: 90, links: 1, scale: 1.3, speed: 0.03,
    cx: 0.5, cy: 0.5, glow: 0.45, glowRadius: 8,
    lineWidth: 1.2, nodeEvery: 5, accentEvery: 0,
  },
  orbit: {
    density: 180, links: 4, scale: 1.7, speed: 0.045,
    cx: 0.5, cy: 0.12, glow: 0.7, glowRadius: 14,
    lineWidth: 0.8, nodeEvery: 4, accentEvery: 6,
  },
};

const PALETTE = {
  dark:  { far: '#1d2a3a', near: '#a8d4ff', node: '#f4f7fb', accent: '#00befa' },
  light: { far: '#ded6c9', near: '#09121c', node: '#09121c', accent: '#0082e2' },
} as const;

/* En dark el composite suma luz: aguanta (y pide) algo más de presencia. */
const OPACITY = { dark: 0.42, light: 0.34 } as const;

interface MeshBackdropProps {
  variant?: MeshVariant;
  /** Multiplica la opacidad del preset. 1 = tal cual. */
  intensity?: number;
  className?: string;
}

export function MeshBackdrop({
  variant = 'hero',
  intensity = 1,
  className,
}: MeshBackdropProps) {
  const { theme } = useTheme();
  return (
    <MeshGlow
      {...PRESETS[variant]}
      mode={theme}
      palette={PALETTE[theme]}
      opacity={OPACITY[theme] * intensity}
      className={className}
    />
  );
}
