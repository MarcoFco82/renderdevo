import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import {
  worksByCategory,
  categoryOrder,
  type WorkCategory,
  type WorkItem,
} from '@/data/work';

/**
 * WorkGrid — grid de loops categorizado por tabs.
 *
 * Características:
 * - Tabs estilo pill, declarativas (categorías vacías muestran "Próximamente")
 * - Grid responsive (4 cols desktop, 2 mobile)
 * - Loops autoplay/muted/loop/playsInline
 * - IntersectionObserver: pausa loops fuera del viewport (ahorra batería)
 * - Click en celda → modal lightbox con el loop en grande
 * - ESC y click en backdrop cierran el modal
 */
export function WorkGrid() {
  const { t } = useLocale();
  const [active, setActive] = useState<WorkCategory>('motion-design');
  const [lightboxItem, setLightboxItem] = useState<WorkItem | null>(null);

  const items = worksByCategory(active);

  const tabLabel: Record<WorkCategory, string> = {
    'motion-design': t.work.tabs.motionDesign,
    experimental: t.work.tabs.experimental,
    interactive: t.work.tabs.interactive,
  };

  return (
    <section className="container-base py-[var(--spacing-section)]">
      {/* === Header del bloque === */}
      <div className="flex flex-col gap-3 mb-10">
        <h2 className="font-display text-4xl md:text-5xl">{t.work.title}</h2>
        <p className="text-[var(--color-muted)]">{t.work.subtitle}</p>
      </div>

      {/* === Tabs === */}
      <div
        role="tablist"
        aria-label={t.work.title}
        className="inline-flex flex-wrap gap-2 mb-10 p-1 rounded-[var(--radius-pill)]"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-blur))',
          WebkitBackdropFilter: 'blur(var(--glass-blur))',
          border: '1px solid var(--glass-border)',
        }}
      >
        {categoryOrder.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-sm rounded-[var(--radius-pill)] transition ${
                isActive
                  ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
              }`}
            >
              {tabLabel[cat]}
            </button>
          );
        })}
      </div>

      {/* === Grid o empty state === */}
      {items.length === 0 ? (
        <EmptyState label={t.work.empty} />
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <WorkCell
              key={item.id}
              item={item}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </div>
      )}

      {/* === Lightbox modal === */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          closeLabel={t.work.close}
        />
      )}
    </section>
  );
}

/* === Cell con autoplay loop y pausa fuera de viewport === */

interface WorkCellProps {
  item: WorkItem;
  onClick: () => void;
}

function WorkCell({ item, onClick }: WorkCellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* autoplay puede fallar en algunos browsers, silenciamos */
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const aspectClass: Record<WorkItem['aspect'], string> = {
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-[16/9]',
    '1:1': 'aspect-square',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] tactile-card transition hover:translate-y-[-2px] ${aspectClass[item.aspect]}`}
      style={{ background: 'var(--color-bg-deep)' }}
      aria-label={item.id}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Sutil overlay en hover (no decorativo, indica clickabilidad) */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            'linear-gradient(180deg, transparent 60%, oklch(0% 0 0 / 0.25) 100%)',
        }}
      />
    </button>
  );
}

/* === Lightbox modal === */

interface LightboxProps {
  item: WorkItem;
  onClose: () => void;
  closeLabel: string;
}

function Lightbox({ item, onClose, closeLabel }: LightboxProps) {
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
      aria-label={item.id}
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
        className="relative max-h-[88vh] max-w-[88vw] flex items-center justify-center"
      >
        <video
          src={item.src}
          muted
          loop
          playsInline
          autoPlay
          className="max-h-[88vh] max-w-[88vw] rounded-[var(--radius-card)]"
          style={{ boxShadow: 'var(--shadow-glow)' }}
        />
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

/* === Empty state === */

function EmptyState({ label }: { label: string }): ReactNode {
  return (
    <div
      className="flex items-center justify-center py-20 rounded-[var(--radius-card)]"
      style={{
        background: 'var(--color-bg-deep)',
        border: '1px dashed oklch(0% 0 0 / 0.1)',
      }}
    >
      <span className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  );
}
