import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';
import { ashurScenes, ashurSystem, type AshurShot } from '@/data/ashur';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { BrandMark } from '@/components/BrandMark';

/**
 * AshurEngine — página del producto insignia de RENDERDEVO.
 *
 * Posicionamiento (D-002): el motor es tecnología propietaria de la casa, con
 * marca propia (ashurengine.com). NO se vende como licencia/editor; se muestra
 * como la ventaja que habilita las producciones de renderdevo.
 *
 * Copy: t.ashur (i18n). Capturas: data/ashur.ts → R2 (webp).
 */
export function AshurEngine() {
  const { t, locale } = useLocale();
  const a = t.ashur;
  const [lightbox, setLightbox] = useState<AshurShot | null>(null);

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="dense" />
        {/* Glow ambiente. Va ANTES del contenido: es fondo, y al venir después
            se pintaba encima y lavaba el lockup y el titular. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, var(--color-glow-soft) 0%, transparent 70%)',
          }}
        />

        <div className="relative container-base pt-20 pb-24 md:pt-28 md:pb-32">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {a.tagline}
          </span>

          {/* Lockup de marca en vez del título tipográfico: es un producto
              con identidad propia, no una sección del sitio. */}
          <BrandMark
            piece="ashur-lockup"
            height="clamp(90px, 15vw, 168px)"
            alt={a.headline}
            className="mb-8 max-w-full"
          />

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-3xl mb-10">
            {a.sub}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://ashurengine.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] font-medium hover:opacity-90 transition"
            >
              {a.ctaPrimary}
            </a>
            <Link
              to="/contacto"
              className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] glass-card font-medium hover:opacity-90 transition"
            >
              {a.ctaSecondary}
            </Link>
          </div>
        </div>

      </section>

      {/* === PITCH === */}
      <section className="container-base py-[var(--spacing-section)]">
        <div className="max-w-4xl">
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6">
            {a.pitch.title}
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-3xl">
            {a.pitch.body}
          </p>
        </div>
      </section>

      {/* === ESCENAS EN PRODUCCIÓN === */}
      <section className="container-base py-[var(--spacing-section)]">
        <SectionHead title={a.scenes.title} subtitle={a.scenes.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ashurScenes.map((shot) => (
            <ShotCard
              key={shot.id}
              shot={shot}
              caption={shot.caption[locale]}
              onOpen={() => setLightbox(shot)}
            />
          ))}
        </div>
      </section>

      {/* === SUITE DE AUTORÍA === */}
      <section className="container-base py-[var(--spacing-section)]">
        <SectionHead title={a.system.title} subtitle={a.system.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {ashurSystem.map((shot) => (
            <ShotCard
              key={shot.id}
              shot={shot}
              caption={shot.caption[locale]}
              onOpen={() => setLightbox(shot)}
            />
          ))}
        </div>
      </section>

      {/* === PRODUCTOS EN VIVO === */}
      <section className="container-base py-[var(--spacing-section)]">
        <SectionHead title={a.liveProducts.title} subtitle={a.liveProducts.subtitle} />
        <div className="grid gap-6 md:grid-cols-2">
          {a.liveProducts.items.map((item) => (
            <div key={item.name} className="flex flex-col p-8 tactile-card">
              <h3 className="font-heading text-2xl font-semibold mb-3">{item.name}</h3>
              <p className="text-[var(--color-ink-soft)] mb-6 flex-1">{item.body}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center self-start px-5 py-2.5 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] text-sm font-medium hover:opacity-90 transition"
              >
                {a.liveProducts.visit}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* === CAPACIDADES DEL MOTOR === */}
      <section className="container-base py-[var(--spacing-section)]">
        <SectionHead
          title={a.capabilities.title}
          subtitle={a.capabilities.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {a.capabilities.groups.map((group) => (
            <div key={group.name} className="p-8 glass-card">
              <h3 className="font-heading text-xl font-semibold mb-4">{group.name}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[var(--color-ink-soft)]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'var(--color-glow-deep)' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* === DIFERENCIADORES === */}
      <section className="container-base py-[var(--spacing-section)]">
        <SectionHead title={a.differentiators.title} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {a.differentiators.items.map((item) => (
            <div key={item.title} className="p-8 tactile-card">
              <h3 className="font-heading text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-[var(--color-ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === CIERRE (dark sandwich) === */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            'linear-gradient(135deg, var(--color-dark-soft) 0%, var(--color-dark) 35%, var(--color-dark-deep) 100%)',
          color: 'var(--color-dark-fg)',
        }}
      >
        <MeshBackdrop variant="low" intensity={1.3} force="dark" />
        <div className="container-base relative text-center">
          <h2
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)] mb-6 max-w-[20ch] mx-auto"
            style={{ color: 'var(--color-dark-fg)' }}
          >
            {a.closing.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mb-12"
            style={{ color: 'var(--color-dark-fg-soft)' }}
          >
            {a.closing.body}
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center px-10 py-4 rounded-[var(--radius-pill)] text-lg font-medium hover:translate-y-[-2px] transition"
            style={{
              background: 'var(--color-dark-fg)',
              color: 'var(--color-dark-deep)',
              boxShadow: '0 18px 36px -12px oklch(58% 0.20 240 / 0.45)',
            }}
          >
            {a.closing.cta}
          </Link>
        </div>
      </section>

      {/* === Lightbox === */}
      {lightbox && (
        <ImageLightbox
          shot={lightbox}
          caption={lightbox.caption[locale]}
          onClose={() => setLightbox(null)}
          closeLabel={t.work.close}
        />
      )}
    </>
  );
}

/* === Encabezado de sección === */

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-3 mb-10">
      <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="text-[var(--color-muted)] max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* === Celda de captura con caption === */

interface ShotCardProps {
  shot: AshurShot;
  caption: string;
  onOpen: () => void;
}

function ShotCard({ shot, caption, onOpen }: ShotCardProps) {
  return (
    <figure className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onOpen}
        aria-label={caption}
        className="group relative block overflow-hidden rounded-[var(--radius-card)] tactile-card transition hover:translate-y-[-2px] aspect-[16/10]"
        style={{ background: 'var(--color-bg-deep)' }}
      >
        <img
          src={shot.src}
          alt={caption}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
          style={{
            background:
              'linear-gradient(180deg, transparent 60%, oklch(0% 0 0 / 0.25) 100%)',
          }}
        />
      </button>
      <figcaption className="text-sm text-[var(--color-muted)]">{caption}</figcaption>
    </figure>
  );
}

/* === Lightbox de imagen === */

interface ImageLightboxProps {
  shot: AshurShot;
  caption: string;
  onClose: () => void;
  closeLabel: string;
}

function ImageLightbox({ shot, caption, onClose, closeLabel }: ImageLightboxProps) {
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
      aria-label={caption}
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
        <img
          src={shot.src}
          alt={caption}
          className="max-h-[80vh] max-w-[92vw] rounded-[var(--radius-card)]"
          style={{ boxShadow: 'var(--shadow-glow)' }}
        />
        <p className="text-sm text-[var(--color-bg)] opacity-80 text-center">{caption}</p>
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
