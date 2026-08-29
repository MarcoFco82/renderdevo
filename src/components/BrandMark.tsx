import { useTheme } from '@/theme/ThemeProvider';

/**
 * BrandMark — logos del kit vectorizado, con la variante correcta según el tema.
 *
 * Los SVG viven en public/brand/ (fuente: renderdevo/docs/brand/vectorized/).
 * Están en paths, sin dependencia de fuentes: no se deforman en Android.
 *
 * mode:
 *   'auto'  sigue el tema del sitio (default)
 *   'onDark' / 'onLight'  para secciones que siempre son oscuras o claras
 *     (el CTA de Home y el cierre de Ashur traen su propio fondo dark)
 */

export type BrandPiece =
  | 'renderdevo-wordmark'
  | 'renderdevo-lockup-vertical'
  | 'renderdevo-monogram'
  | 'ashur-lockup'
  | 'ashur-lockup-vertical'
  | 'ashur-emblem'
  | 'danimgator-lockup'
  | 'danimgator-lockup-vertical'
  | 'danimgator-emblem';

interface BrandMarkProps {
  piece: BrandPiece;
  /** Sobre qué fondo se dibuja. 'auto' usa el tema activo. */
  on?: 'auto' | 'onDark' | 'onLight';
  /** Monocromo en vez de los colores de marca. */
  mono?: boolean;
  /** Alto en px o cualquier unidad CSS. El ancho se ajusta solo. */
  height?: number | string;
  className?: string;
  /** Texto accesible. Si se omite, la imagen es decorativa. */
  alt?: string;
}

export function BrandMark({
  piece,
  on = 'auto',
  mono = false,
  height = 32,
  className,
  alt,
}: BrandMarkProps) {
  const { theme } = useTheme();
  const dark = on === 'auto' ? theme === 'dark' : on === 'onDark';

  const variant = mono
    ? dark ? 'white' : 'black'
    : dark ? 'original-dark' : 'original-light';

  return (
    <img
      src={`/brand/${piece}-${variant}.svg`}
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      className={className}
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
