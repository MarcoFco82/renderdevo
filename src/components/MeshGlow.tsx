/**
 * MeshGlow — fondo animado paramétrico (estilo "Malla")
 * Origen: eljardiperdido-proj/docs/branding/parametrico-v5.html
 * Adaptado para renderdevo.com — dark + light mode.
 *
 * Sin dependencias. React 19 + TS. Canvas 2D.
 *
 * ─────────────────────────────────────────────────────────────
 * LO IMPORTANTE, Y ES LO QUE MÁS FÁCIL SE ROMPE
 *
 * El glow NO se invierte al cambiar de modo.
 *
 *   dark  → composite 'lighter'  (aditivo). Los cruces SUMAN luz.
 *           El glow es un pase desenfocado sumado encima.
 *   light → composite 'multiply'. Los cruces RESTAN luz.
 *           El "glow" es un pase desenfocado multiplicado = sangrado
 *           de tinta, no halo. Si usas 'lighter' sobre crema, la
 *           malla desaparece.
 *
 * Misma geometría, dos físicas: luz emitida vs tinta depositada.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react';

export type MeshMode = 'dark' | 'light';

export type MeshGlowProps = {
  mode?: MeshMode;
  /** Nodos de la esfera. 80–320. Coste ~lineal. */
  density?: number;
  /** Aristas por nodo. 1–5. El coste real vive aquí: links = density × this. */
  links?: number;
  /** Radio relativo al lado menor. 0.4–1.6. >1 la malla sangra fuera del marco. */
  scale?: number;
  /** Rotación en rad/s. 0 = estática. 0.02–0.25. */
  speed?: number;
  /** Centro focal, 0–1 sobre el canvas. Muévelo para dejar zona limpia al texto. */
  cx?: number;
  cy?: number;
  /** Intensidad del pase de glow / sangrado. 0–1. */
  glow?: number;
  /** Radio del desenfoque del glow, px. 4–28. */
  glowRadius?: number;
  /** Opacidad global. Para fondo detrás de texto: 0.25–0.5. */
  opacity?: number;
  /** Grosor de arista. 0.4–1.6. */
  lineWidth?: number;
  /** 1 de cada N nodos se dibuja. 1 = todos. 3–5 para fondo. */
  nodeEvery?: number;
  /** 1 de cada N nodos usa el color de acento. 0 = ninguno. */
  accentEvery?: number;
  /** Sobrescribe la paleta del modo. */
  palette?: Partial<MeshPalette>;
  className?: string;
  style?: React.CSSProperties;
};

export type MeshPalette = {
  /** Arista lejana (se funde con el fondo). */
  far: string;
  /** Arista cercana. */
  near: string;
  /** Nodo. */
  node: string;
  /** Acento. */
  accent: string;
};

const PALETTES: Record<MeshMode, MeshPalette> = {
  dark: {
    far: '#12243d',
    near: '#7fb8ff',
    node: '#ffffff',
    accent: '#2e6bff',
  },
  light: {
    // En claro, "lejano" debe acercarse al crema del sitio, no al blanco puro.
    far: '#c8cfdd',
    near: '#0e1428',
    node: '#0e1428',
    accent: '#2e6bff',
  },
};

const COMPOSITE: Record<MeshMode, GlobalCompositeOperation> = {
  dark: 'lighter',
  light: 'multiply',
};

/* ── color utils ── */
const hx = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mix = (a: string, b: string, t: number) => {
  const A = hx(a), B = hx(b);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(
    A[1] + (B[1] - A[1]) * t
  )},${Math.round(A[2] + (B[2] - A[2]) * t)})`;
};

type P3 = { x: number; y: number; z: number };

export default function MeshGlow({
  mode = 'dark',
  density = 170,
  links = 3,
  scale = 1.0,
  speed = 0.09,
  cx = 0.5,
  cy = 0.5,
  glow = 0.75,
  glowRadius = 14,
  opacity = 1,
  lineWidth = 0.8,
  nodeEvery = 3,
  accentEvery = 11,
  palette,
  className,
  style,
}: MeshGlowProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Props vivas sin re-montar el loop.
  const p = useRef({
    mode, density, links, scale, speed, cx, cy,
    glow, glowRadius, opacity, lineWidth, nodeEvery, accentEvery, palette,
  });
  p.current = {
    mode, density, links, scale, speed, cx, cy,
    glow, glowRadius, opacity, lineWidth, nodeEvery, accentEvery, palette,
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Canvas fuera de pantalla para el pase de glow.
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { alpha: true });
    if (!octx) return;

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    /* ── geometría: esfera de Fibonacci + pares de aristas precalculados ── */
    let base: P3[] = [];
    let pairs: [number, number][] = [];
    let builtFor = -1;

    const build = (n: number, k: number) => {
      base = [];
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const th = i * 2.399963229728653; // ángulo áureo
        base.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
      }
      pairs = [];
      const step = Math.max(1, Math.round(n / 17));
      for (let i = 0; i < n; i++)
        for (let j = 1; j <= k; j++) pairs.push([i, (i + j * step) % n]);
      builtFor = n * 100 + k;
    };

    /* ── estado de animación ── */
    let angle = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    let running = true;

    // Fade al cambiar de modo: el composite no se puede interpolar,
    // así que se baja a 0, se cambia, y se sube. 250 ms por lado.
    let fade = 1;
    let renderedMode: MeshMode = p.current.mode;
    let pendingMode: MeshMode | null = null;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ctx.filter no existe en Safari viejo: si falta, se cae al pase nítido.
    const glowSupported = 'filter' in ctx;

    const project = (b: P3, a: number) => {
      const ca = Math.cos(a), sa = Math.sin(a);
      const x1 = b.x * ca - b.z * sa;
      const z1 = b.x * sa + b.z * ca;
      const T = 0.34; // inclinación fija
      const cT = Math.cos(T), sT = Math.sin(T);
      const y1 = b.y * cT - z1 * sT;
      const z2 = b.y * sT + z1 * cT;
      return { x: x1, y: y1, z: z2 };
    };

    const draw = () => {
      const o = p.current;
      const pal: MeshPalette = { ...PALETTES[renderedMode], ...(o.palette || {}) };
      const n = Math.max(24, Math.round(o.density));
      const k = Math.max(1, Math.round(o.links));
      if (builtFor !== n * 100 + k) build(n, k);

      const R = Math.min(W, H) * 0.34 * o.scale;
      const ox = W * o.cx, oy = H * o.cy;

      // ── malla al canvas offscreen ──
      octx.clearRect(0, 0, W, H);
      octx.globalCompositeOperation = 'source-over';
      octx.lineCap = 'round';

      const proj = base.map((b) => project(b, angle));
      const sx = proj.map((q) => ox + q.x * R);
      const sy = proj.map((q) => oy + q.y * R);

      octx.lineWidth = o.lineWidth;
      for (let i = 0; i < pairs.length; i++) {
        const [a, b] = pairs[i];
        const dx = sx[a] - sx[b], dy = sy[a] - sy[b];
        if (dx * dx + dy * dy > R * R * 0.81) continue; // corta el wrap-around
        const dep = (proj[a].z + proj[b].z) * 0.25 + 0.5; // 0..1
        octx.strokeStyle = mix(pal.far, pal.near, dep);
        octx.globalAlpha = 0.1 + dep * 0.62;
        octx.beginPath();
        octx.moveTo(sx[a], sy[a]);
        octx.lineTo(sx[b], sy[b]);
        octx.stroke();
      }

      const ne = Math.max(1, Math.round(o.nodeEvery));
      for (let i = 0; i < base.length; i += ne) {
        const dep = proj[i].z * 0.5 + 0.5;
        octx.globalAlpha = 0.16 + dep * 0.8;
        octx.fillStyle =
          o.accentEvery > 0 && i % o.accentEvery === 0 ? pal.accent : pal.node;
        octx.beginPath();
        octx.arc(sx[i], sy[i], 0.5 + dep * 1.5, 0, Math.PI * 2);
        octx.fill();
      }
      octx.globalAlpha = 1;

      // ── composición al canvas visible ──
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = COMPOSITE[renderedMode];

      const alpha = o.opacity * fade;
      if (o.glow > 0 && glowSupported) {
        ctx.globalAlpha = alpha * o.glow;
        ctx.filter = `blur(${o.glowRadius}px)`;
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

      // cambio de modo: baja, cambia, sube
      if (pendingMode && pendingMode !== renderedMode) {
        fade -= dt * 4;
        if (fade <= 0) {
          fade = 0;
          renderedMode = pendingMode;
          pendingMode = null;
        }
      } else if (fade < 1) {
        fade = Math.min(1, fade + dt * 4);
      }

      if (!reduced.matches) angle += o.speed * dt;
      draw();
      if (running && visible) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Pausa fuera de viewport y con la pestaña oculta.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        visible && running ? start() : stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVis = () => {
      running = !document.hidden;
      running && visible ? start() : stop();
    };
    document.addEventListener('visibilitychange', onVis);

    // Expone el cambio de modo al efecto sin re-montar.
    (host as any).__setMeshMode = (m: MeshMode) => {
      if (m !== renderedMode) pendingMode = m;
    };

    draw();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      delete (host as any).__setMeshMode;
    };
  }, []); // el loop se monta una vez; las props vivas entran por p.current

  // Propaga el cambio de modo al loop ya montado.
  useEffect(() => {
    const host = hostRef.current as any;
    host?.__setMeshMode?.(mode);
  }, [mode]);

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
