/**
 * ParametricField — fondo animado paramétrico, tres variantes.
 * Origen: eljardiperdido-proj/docs/branding/parametrico-v5.html
 *
 *   variant="mesh"    esfera de nodos y aristas   (era MeshGlow)
 *   variant="grid3d"  retícula en fuga            ← cx/cy = PUNTO DE FUGA
 *   variant="moire"   familias de anillos desfasadas
 *
 * SUSTITUYE a MeshGlow.tsx. Misma firma de props + `variant`, que por
 * defecto es 'mesh' — o sea que cambiando el import el comportamiento
 * anterior queda idéntico.
 *
 * Sin dependencias. React 19 + TS. Canvas 2D.
 *
 * ─────────────────────────────────────────────────────────────
 * CALIBRADO LIGHT-FIRST (2026-08-17)
 *
 * El modo que tiene que quedar impecable es LIGHT. El dark funciona
 * bien, pero donde hubo que elegir, ganó el claro.
 *
 * El glow no se invierte:
 *   dark  → 'lighter'  · los cruces SUMAN luz  · el glow es halo
 *   light → 'multiply' · los cruces RESTAN luz · el glow es sangrado
 *
 * Y en light el pase de desenfoque embarra rápido, porque reparte
 * tinta en vez de luz. Por eso `glow` se atenúa y el radio se topa
 * internamente en claro: pones UN número y los dos modos salen bien.
 * Ver resolveGlow().
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react';

export type FieldVariant = 'mesh' | 'grid3d' | 'moire';
export type FieldMode = 'light' | 'dark';

export type Palette = {
  /** Trazo lejano. DEBE acercarse al fondo real del sitio. */
  far: string;
  /** Trazo cercano. */
  near: string;
  /** Nodo / intersección. */
  node: string;
  /** Acento. */
  accent: string;
};

export type ParametricFieldProps = {
  variant?: FieldVariant;
  mode?: FieldMode;
  /** Resolución. mesh: nodos · grid3d: filas y columnas · moire: anillos. 60–320 */
  density?: number;
  /** mesh: aristas por nodo (1–5) · grid3d: 1 plano, ≥2 túnel · moire: familias (2–3) */
  links?: number;
  /** Tamaño relativo al lado menor. 0.4–1.8 */
  scale?: number;
  /** mesh: rotación · grid3d: avance de las filas · moire: deriva del desfase. 0–0.25 */
  speed?: number;
  /** 0–1. En grid3d es el PUNTO DE FUGA. En mesh/moire, el centro. */
  cx?: number;
  cy?: number;
  /** Intensidad del glow (dark) / sangrado (light). 0–1 */
  glow?: number;
  /** Radio del desenfoque, px. En light se topa internamente. 4–28 */
  glowRadius?: number;
  /** Opacidad global. Detrás de grids de cards: 0.14–0.26 */
  opacity?: number;
  lineWidth?: number;
  /** mesh: 1 de cada N nodos · grid3d: 1 de cada N intersecciones · moire: n/a */
  nodeEvery?: number;
  /** 1 de cada N usa el acento. 0 = ninguno */
  accentEvery?: number;
  palette?: Partial<Palette>;
  className?: string;
  style?: React.CSSProperties;
};

/* ── paletas reales de renderdevo.com ──
 * light: crema #fdf8f0 · far cálido #ded6c9 · tinta #09121c · LED profundo #0082e2
 * dark : superficie #18232d · LED #00befa
 * `far` debe fundirse con el fondo. Un gris azulado sobre crema cálido se
 * corta — de ahí el #ded6c9 y no un neutro frío.
 */
const PALETTES: Record<FieldMode, Palette> = {
  light: { far: '#ded6c9', near: '#09121c', node: '#09121c', accent: '#0082e2' },
  dark:  { far: '#18232d', near: '#00befa', node: '#e8f6ff', accent: '#00befa' },
};

const COMPOSITE: Record<FieldMode, GlobalCompositeOperation> = {
  light: 'multiply',
  dark: 'lighter',
};

/** El desenfoque en multiply reparte tinta: hay que bajarlo o embarra. */
function resolveGlow(mode: FieldMode, glow: number, radius: number) {
  return mode === 'light'
    ? { a: glow * 0.5, r: Math.min(radius, 12) }
    : { a: glow, r: radius };
}

const hx = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mix = (a: string, b: string, t: number) => {
  const A = hx(a), B = hx(b);
  const c = Math.max(0, Math.min(1, t));
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * c)},${Math.round(
    A[1] + (B[1] - A[1]) * c
  )},${Math.round(A[2] + (B[2] - A[2]) * c)})`;
};
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type Opts = Required<
  Omit<ParametricFieldProps, 'palette' | 'className' | 'style' | 'mode' | 'variant'>
>;

/* ══════════════ VARIANTES ══════════════
   Cada una dibuja al canvas offscreen. La composición (glow + modo)
   es común y vive en el loop. */

function drawMesh(
  c: CanvasRenderingContext2D, W: number, H: number, o: Opts, pal: Palette,
  t: number, cache: any
) {
  const n = clamp(Math.round(o.density), 24, 400);
  const k = clamp(Math.round(o.links), 1, 6);
  if (cache.key !== `m${n}-${k}`) {
    const base: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * 2.399963229728653;
      base.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }
    const pairs: [number, number][] = [];
    const step = Math.max(1, Math.round(n / 17));
    for (let i = 0; i < n; i++)
      for (let j = 1; j <= k; j++) pairs.push([i, (i + j * step) % n]);
    cache.key = `m${n}-${k}`; cache.base = base; cache.pairs = pairs;
  }
  const { base, pairs } = cache;
  const R = Math.min(W, H) * 0.34 * o.scale;
  const ox = W * o.cx, oy = H * o.cy;
  const ca = Math.cos(t), sa = Math.sin(t), cT = Math.cos(0.34), sT = Math.sin(0.34);

  const sx: number[] = [], sy: number[] = [], sz: number[] = [];
  for (let i = 0; i < base.length; i++) {
    const b = base[i];
    const x1 = b.x * ca - b.z * sa, z1 = b.x * sa + b.z * ca;
    const y1 = b.y * cT - z1 * sT, z2 = b.y * sT + z1 * cT;
    sx.push(ox + x1 * R); sy.push(oy + y1 * R); sz.push(z2);
  }

  c.lineWidth = o.lineWidth;
  c.lineCap = 'round';
  for (let i = 0; i < pairs.length; i++) {
    const [a, b] = pairs[i];
    const dx = sx[a] - sx[b], dy = sy[a] - sy[b];
    if (dx * dx + dy * dy > R * R * 0.81) continue;
    const dep = (sz[a] + sz[b]) * 0.25 + 0.5;
    c.strokeStyle = mix(pal.far, pal.near, dep);
    c.globalAlpha = 0.1 + dep * 0.62;
    c.beginPath(); c.moveTo(sx[a], sy[a]); c.lineTo(sx[b], sy[b]); c.stroke();
  }
  const ne = Math.max(1, Math.round(o.nodeEvery));
  for (let i = 0; i < base.length; i += ne) {
    const dep = sz[i] * 0.5 + 0.5;
    c.globalAlpha = 0.16 + dep * 0.8;
    c.fillStyle = o.accentEvery > 0 && i % o.accentEvery === 0 ? pal.accent : pal.node;
    c.beginPath(); c.arc(sx[i], sy[i], 0.5 + dep * 1.5, 0, Math.PI * 2); c.fill();
  }
}

/** Retícula en fuga. cx/cy ES el punto de fuga. links>=2 la vuelve túnel. */
function drawGrid3d(
  c: CanvasRenderingContext2D, W: number, H: number, o: Opts, pal: Palette, t: number
) {
  const rows = clamp(Math.round(o.density * 0.15), 8, 52);
  const cols = clamp(Math.round(o.density * 0.12), 5, 44);
  const vx = W * o.cx, vy = H * o.cy;
  const spread = o.scale;
  const sides = o.links >= 2 ? [1, -1] : [1];

  c.lineCap = 'butt';
  c.lineWidth = o.lineWidth;

  for (const s of sides) {
    // Alcance hasta el borde por ese lado, más un margen para sangrar.
    const reach = (s > 0 ? H - vy : vy) * 1.35 * spread;
    const halfMax = W * 0.95 * spread;

    // Filas: avanzan hacia el espectador. La no linealidad las apiña
    // junto al horizonte, que es lo que da la sensación de fuga.
    for (let i = 0; i < rows; i++) {
      const raw = (i / rows + t * 0.14) % 1;
      const d = raw * raw;                 // 0 = horizonte, 1 = cerca
      if (d < 0.0015) continue;
      const y = vy + s * reach * d;
      const half = halfMax * d;
      const fade = Math.sin(Math.min(1, raw) * Math.PI);   // se disuelve en ambos extremos
      c.strokeStyle = mix(pal.far, pal.near, Math.min(1, d * 1.25));
      c.globalAlpha = 0.08 + fade * 0.5;
      c.beginPath(); c.moveTo(vx - half, y); c.lineTo(vx + half, y); c.stroke();
    }

    // Columnas: salen del punto de fuga.
    for (let j = 0; j < cols; j++) {
      const u = (j / (cols - 1)) * 2 - 1;
      const x2 = vx + u * halfMax, y2 = vy + s * reach;
      const g = c.createLinearGradient(vx, vy, x2, y2);
      g.addColorStop(0, pal.far);
      g.addColorStop(1, pal.near);
      c.strokeStyle = g;
      c.globalAlpha = 0.1 + (1 - Math.abs(u)) * 0.34;
      c.beginPath(); c.moveTo(vx, vy); c.lineTo(x2, y2); c.stroke();
    }

    // Intersecciones.
    const ne = Math.max(1, Math.round(o.nodeEvery));
    if (ne <= 6) {
      let n = 0;
      for (let i = 0; i < rows; i += 1) {
        const raw = (i / rows + t * 0.14) % 1;
        const d = raw * raw;
        if (d < 0.05) continue;
        const y = vy + s * reach * d, half = halfMax * d;
        for (let j = 0; j < cols; j += 1) {
          if (n++ % ne) continue;
          const u = (j / (cols - 1)) * 2 - 1;
          c.globalAlpha = 0.1 + d * 0.55;
          c.fillStyle = o.accentEvery > 0 && n % o.accentEvery === 0 ? pal.accent : pal.node;
          c.beginPath(); c.arc(vx + u * half, y, 0.4 + d * 1.5, 0, Math.PI * 2); c.fill();
        }
      }
    }
  }
}

/** Familias de anillos desfasadas. El muaré sale de la superposición. */
function drawMoire(
  c: CanvasRenderingContext2D, W: number, H: number, o: Opts, pal: Palette, t: number
) {
  const rings = clamp(Math.round(o.density * 0.28), 10, 120);
  const fams = clamp(Math.round(o.links), 2, 4);
  const R = Math.min(W, H) * 0.62 * o.scale;
  const bx = W * o.cx, by = H * o.cy;

  c.lineCap = 'butt';
  c.lineWidth = o.lineWidth;

  for (let f = 0; f < fams; f++) {
    const ph = t * (0.6 + f * 0.35) + f * 2.1;
    const amp = f === 0 ? 0.035 : 0.085 + f * 0.02;
    const ox = bx + Math.cos(ph) * W * amp;
    const oy = by + Math.sin(ph * 0.8) * H * amp;
    const aspect = f === 0 ? 1 : 0.78 + f * 0.11;

    for (let i = 0; i < rings; i++) {
      const u = i / (rings - 1);
      const r = R * (0.04 + 0.96 * Math.pow(u, 1.08));
      const env = Math.sin(u * Math.PI);          // centro y borde se disuelven
      c.strokeStyle = mix(pal.far, pal.near, 0.25 + env * 0.6);
      c.globalAlpha = (0.06 + env * 0.42) / fams * 1.6;
      if (o.accentEvery > 0 && i % o.accentEvery === 0) {
        c.strokeStyle = pal.accent;
        c.globalAlpha = (0.1 + env * 0.4) / fams * 1.6;
      }
      c.beginPath();
      c.ellipse(ox, oy, r, r * aspect, 0, 0, Math.PI * 2);
      c.stroke();
    }
  }
}

/* ══════════════ COMPONENTE ══════════════ */

export default function ParametricField({
  variant = 'mesh',
  mode = 'light',
  density = 150,
  links = 3,
  scale = 1,
  speed = 0.08,
  cx = 0.5,
  cy = 0.5,
  glow = 0.7,
  glowRadius = 14,
  opacity = 1,
  lineWidth = 0.8,
  nodeEvery = 3,
  accentEvery = 11,
  palette,
  className,
  style,
}: ParametricFieldProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const p = useRef<any>({});
  p.current = {
    variant, mode, density, links, scale, speed, cx, cy,
    glow, glowRadius, opacity, lineWidth, nodeEvery, accentEvery, palette,
  };

  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { alpha: true });
    if (!octx) return;

    const glowSupported = 'filter' in ctx;
    const cache: any = {};

    let W = 0, H = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = off.width = Math.round(W * dpr);
      canvas.height = off.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let t = 0, raf = 0, last = performance.now();
    let visible = true, running = true;
    let fade = 1;
    let renderedMode: FieldMode = p.current.mode;
    let renderedVariant: FieldVariant = p.current.variant;
    let pendingMode: FieldMode | null = null;
    let pendingVariant: FieldVariant | null = null;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const draw = () => {
      const o = p.current as Opts & { palette?: Partial<Palette> };
      const pal: Palette = { ...PALETTES[renderedMode], ...(o.palette || {}) };

      octx.clearRect(0, 0, W, H);
      octx.globalCompositeOperation = 'source-over';
      if (renderedVariant === 'grid3d') drawGrid3d(octx, W, H, o, pal, t);
      else if (renderedVariant === 'moire') drawMoire(octx, W, H, o, pal, t);
      else drawMesh(octx, W, H, o, pal, t, cache);
      octx.globalAlpha = 1;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = COMPOSITE[renderedMode];
      const alpha = o.opacity * fade;
      const gl = resolveGlow(renderedMode, o.glow, o.glowRadius);
      if (gl.a > 0.01 && glowSupported) {
        ctx.globalAlpha = alpha * gl.a;
        ctx.filter = `blur(${gl.r}px)`;
        ctx.drawImage(off, 0, 0, W, H);
        ctx.filter = 'none';
      }
      ctx.globalAlpha = alpha;
      ctx.drawImage(off, 0, 0, W, H);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const o = p.current;

      // El composite y la geometría no se interpolan: se baja, se cambia, se sube.
      const swapping = (pendingMode && pendingMode !== renderedMode) ||
                       (pendingVariant && pendingVariant !== renderedVariant);
      if (swapping) {
        fade -= dt * 4;
        if (fade <= 0) {
          fade = 0;
          if (pendingMode) { renderedMode = pendingMode; pendingMode = null; }
          if (pendingVariant) { renderedVariant = pendingVariant; pendingVariant = null; cache.key = ''; }
        }
      } else if (fade < 1) fade = Math.min(1, fade + dt * 4);

      if (!reduced.matches) t += o.speed * dt;
      draw();
      if (running && visible) raf = requestAnimationFrame(tick);
    };

    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible && running ? start() : stop();
    }, { threshold: 0 });
    io.observe(host);

    const onVis = () => {
      running = !document.hidden;
      running && visible ? start() : stop();
    };
    document.addEventListener('visibilitychange', onVis);

    (host as any).__setField = (m: FieldMode, v: FieldVariant) => {
      if (m !== renderedMode) pendingMode = m;
      if (v !== renderedVariant) pendingVariant = v;
    };

    draw(); start();
    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      delete (host as any).__setField;
    };
  }, []);

  useEffect(() => {
    (hostRef.current as any)?.__setField?.(mode, variant);
  }, [mode, variant]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
