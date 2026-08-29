import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import {
  worksByCategory,
  populatedCategories,
  type WorkCategory,
  type WorkItem,
} from '@/data/work';

/**
 * WorkGrid — trabajo seleccionado, en una composición única.
 *
 * La rejilla es siempre la misma (4 columnas en escritorio) y el CONTENIDO la
 * llena: cada pieza ocupa una columna y el texto descriptivo toma las que
 * sobran. Con 4 piezas no hay texto; con 1, el texto ocupa tres cuartos.
 * Así las pestañas se sienten la misma composición aunque tengan material
 * muy distinto.
 *
 * Las pestañas rotan solas cada 4 s. La rotación se detiene en cuanto el
 * visitante elige una pestaña, y se pausa mientras el puntero está encima o
 * si el sistema pide menos movimiento.
 */

const ROTACION_MS = 4000;

export function WorkGrid() {
  const { t, locale } = useLocale();
  const [active, setActive] = useState<WorkCategory>(populatedCategories[0]);
  const [lightboxItem, setLightboxItem] = useState<WorkItem | null>(null);
  const [autoOn, setAutoOn] = useState(true);
  const [hover, setHover] = useState(false);

  const items = worksByCategory(active);

  const tabLabel: Record<WorkCategory, string> = {
    'motion-design': t.work.tabs.motionDesign,
    'ai-film': t.work.tabs.aiFilm,
    interactive: t.work.tabs.interactive,
    'digital-product': t.work.tabs.digitalProduct,
  };
  const blurbKey: Record<WorkCategory, keyof typeof t.work.blurbs> = {
    'motion-design': 'motionDesign',
    'ai-film': 'aiFilm',
    interactive: 'interactive',
    'digital-product': 'digitalProduct',
  };
  const blurb = t.work.blurbs[blurbKey[active]];
  const link = 'linkHref' in blurb ? blurb : null;

  /* Rotación automática. Se frena con hover, con el lightbox abierto, si el
     visitante ya eligió pestaña, o si el sistema pide menos movimiento. */
  useEffect(() => {
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoOn || hover || lightboxItem || menosMovimiento) return;
    const id = window.setInterval(() => {
      setActive((cur) => {
        const i = populatedCategories.indexOf(cur);
        return populatedCategories[(i + 1) % populatedCategories.length];
      });
    }, ROTACION_MS);
    return () => window.clearInterval(id);
  }, [autoOn, hover, lightboxItem]);

  const elegir = (cat: WorkCategory) => {
    setActive(cat);
    setAutoOn(false); // el control manual gana: no volver a rotar solo
  };

  /* Cuántas columnas ocupan las piezas y cuántas quedan para el texto. */
  const cols = Math.min(items.length, 4);
  const textoCols = 4 - cols;
  const hayTexto = textoCols > 0 && Boolean(blurb.body);

  return (
    <section
      className="relative overflow-hidden py-[var(--spacing-section)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MeshBackdrop variant="work" />

      <div className="relative container-base">
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="font-display text-4xl md:text-5xl">{t.work.title}</h2>
          <p className="text-[var(--color-muted)]">{t.work.subtitle}</p>
        </div>

        {/* === Pestañas === */}
        <div
          role="tablist"
          aria-label={t.work.title}
          className="inline-flex flex-wrap gap-2 mb-8 p-1 rounded-[var(--radius-pill)]"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            border: '1px solid var(--glass-border)',
          }}
        >
          {populatedCategories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => elegir(cat)}
                className={`relative overflow-hidden px-4 py-2 text-sm rounded-[var(--radius-pill)] transition ${
                  isActive
                    ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
                    : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
                }`}
              >
                {tabLabel[cat]}
                {/* Barra de avance: hace legible que va a cambiar sola */}
                {isActive && autoOn && !hover && !lightboxItem && (
                  <span
                    aria-hidden
                    className="absolute left-0 bottom-0 h-[2px] w-full origin-left"
                    style={{
                      background: 'var(--color-glow)',
                      animation: `wg-progreso ${ROTACION_MS}ms linear`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* === Composición: piezas + texto === */}
        <div
          key={active} /* remonta al cambiar: evita ver el frame de la anterior */
          className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <WorkCell
              key={item.id}
              item={item}
              caption={item.caption?.[locale]}
              onClick={() => setLightboxItem(item)}
            />
          ))}

          {hayTexto && (
            <div
              className={`flex flex-col justify-center py-2 col-span-2 ${
                textoCols >= 3
                  ? 'lg:col-span-3'
                  : textoCols === 2
                    ? 'lg:col-span-2'
                    : 'lg:col-span-1'
              }`}
            >
              <div className={textoCols >= 3 ? 'max-w-2xl' : 'max-w-md'}>
                {blurb.title && (
                  <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
                    {blurb.title}
                  </h3>
                )}
                <p className="text-[var(--color-ink-soft)] leading-relaxed">
                  {blurb.body}
                </p>
                {link && (
                  <a
                    href={link.linkHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mt-5 px-5 py-2.5 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] text-sm font-medium hover:opacity-90 transition"
                  >
                    {link.linkLabel}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          caption={lightboxItem.caption?.[locale]}
          onClose={() => setLightboxItem(null)}
          closeLabel={t.work.close}
        />
      )}

      <style>{`@keyframes wg-progreso { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}

/* === Reloj virtual de las piezas === */

/**
 * Al rotar la pestaña se desmontan sus videos, así que al volver el elemento es
 * NUEVO y arrancaría en 0: siempre se verían los mismos primeros segundos de
 * cada loop. Aquí se guarda cuándo empezó a correr cada pieza y al montarla se
 * la adelanta al punto donde estaría si nunca se hubiera pausado.
 *
 * El video no gasta recursos mientras no se ve — sigue pausado — pero se
 * comporta como si hubiera seguido corriendo, así que cada vuelta cae en un
 * punto distinto del material en vez de repetir siempre la misma entrada.
 *
 * Vive fuera del componente a propósito: tiene que sobrevivir al desmontaje.
 */
const relojes = new Map<string, number>();

function posicionVirtual(id: string, duracion: number): number {
  if (!Number.isFinite(duracion) || duracion <= 0) return 0;
  let epoca = relojes.get(id);
  if (epoca === undefined) {
    epoca = Date.now();
    relojes.set(id, epoca);
  }
  return ((Date.now() - epoca) / 1000) % duracion;
}

/* === Celda: video en loop o imagen === */

function WorkCell({
  item,
  caption,
  onClick,
}: {
  item: WorkItem;
  caption?: string;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let enPantalla = false;

    /* Salta al punto donde el loop estaría si nunca se hubiera pausado. El
       margen evita reposicionar cuando ya viene corriendo bien: un seek
       innecesario se ve como un tirón. */
    const sincronizar = () => {
      const pos = posicionVirtual(item.id, video.duration);
      if (Math.abs(video.currentTime - pos) > 0.15) video.currentTime = pos;
    };

    const arrancar = () => {
      sincronizar();
      video.play().catch(() => {
        /* algunos navegadores bloquean autoplay; se ignora */
      });
    };

    /* Si el elemento se montó con los metadatos ya en caché el evento no vuelve
       a dispararse, así que hay que mirar el readyState además de escucharlo. */
    if (video.readyState >= 1) arrancar();
    video.addEventListener('loadedmetadata', arrancar);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          enPantalla = entry.isIntersecting;
          if (enPantalla) arrancar();
          else video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);

    /* El navegador congela el video cuando su pestaña pasa a segundo plano: al
       volver quedó atrasado y hay que re-sincronizarlo. Solo si además está a
       la vista, para no reproducir algo que quedó fuera de cuadro. */
    const alVolverAlNavegador = () => {
      if (!document.hidden && enPantalla) arrancar();
    };
    document.addEventListener('visibilitychange', alVolverAlNavegador);

    return () => {
      observer.disconnect();
      video.removeEventListener('loadedmetadata', arrancar);
      document.removeEventListener('visibilitychange', alVolverAlNavegador);
    };
  }, [item.id]);

  const aspectClass: Record<WorkItem['aspect'], string> = {
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
    '2:3': 'aspect-[2/3]',
  };

  return (
    <figure className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={caption ?? item.id}
        className={`group relative overflow-hidden rounded-[var(--radius-card)] tactile-card transition hover:translate-y-[-2px] ${aspectClass[item.aspect]}`}
        style={{ background: 'var(--color-bg-deep)' }}
      >
        {item.kind === 'video' ? (
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={item.src}
            alt={caption ?? ''}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
          style={{
            background:
              'linear-gradient(180deg, transparent 60%, oklch(0% 0 0 / 0.25) 100%)',
          }}
        />
      </button>
      {caption && (
        <figcaption className="text-[11px] leading-tight text-[var(--color-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* === Lightbox === */

function Lightbox({
  item,
  caption,
  onClose,
  closeLabel,
}: {
  item: WorkItem;
  caption?: string;
  onClose: () => void;
  closeLabel: string;
}): ReactNode {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? item.id}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: 'oklch(15% 0.025 250 / 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] max-w-[92vw] flex flex-col items-center gap-4"
      >
        {item.kind === 'video' ? (
          <video
            src={item.src}
            muted
            loop
            playsInline
            autoPlay
            className="max-h-[80vh] max-w-[92vw] rounded-[var(--radius-card)]"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          />
        ) : (
          <img
            src={item.src}
            alt={caption ?? ''}
            className="max-h-[80vh] max-w-[92vw] rounded-[var(--radius-card)]"
            style={{ boxShadow: 'var(--shadow-glow)' }}
          />
        )}
        {caption && (
          <p className="text-sm text-[var(--color-bg)] opacity-80 text-center">{caption}</p>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute -top-12 right-0 px-4 py-2 rounded-[var(--radius-pill)] text-sm text-[var(--color-bg)] hover:opacity-80 transition"
          style={{ background: 'oklch(100% 0 0 / 0.12)' }}
        >
          {closeLabel} ✕
        </button>
      </div>
    </div>
  );
}
