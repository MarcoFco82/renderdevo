import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';
import { WorkGrid } from '@/components/WorkGrid';
import { r2 } from '@/lib/r2';
import { MeshBackdrop } from '@/components/MeshBackdrop';

export function Home() {
  const { t } = useLocale();

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        {/* Fondo paramétrico — una forma distinta por zona (ver MeshBackdrop) */}
        <MeshBackdrop variant="hero" />

        <div className="relative container-base pt-20 pb-32 md:pt-32 md:pb-44">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {t.hero.tagline}
          </span>

          <h1
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(3rem,9vw,8rem)] max-w-[16ch] mb-8"
            style={{ color: 'var(--color-ink)' }}
          >
            {t.hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-2xl mb-10">
            {t.hero.sub}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/casos"
              className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] font-medium hover:opacity-90 transition"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] glass-card font-medium hover:opacity-90 transition"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Hero glow ambiente */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, var(--color-glow-soft) 0%, transparent 70%)',
          }}
        />
      </section>

      {/* === CAPACIDADES === */}
      <section className="container-base py-[var(--spacing-section)]">
        <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-3xl">
          {t.capabilities.title}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { ...t.capabilities.interactive, to: '/capacidades/interactivo' },
            { ...t.capabilities.motion, to: '/capacidades/motion' },
            { ...t.capabilities.product, to: '/capacidades/producto' },
          ].map((cap) => (
            <Link
              key={cap.title}
              to={cap.to}
              className="block p-8 tactile-card hover:translate-y-[-2px] transition"
            >
              <h3 className="font-heading text-2xl font-semibold mb-3">{cap.title}</h3>
              <p className="text-[var(--color-ink-soft)]">{cap.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* === PRODUCTOS ESTRELLA === */}
      <section className="relative overflow-hidden py-[var(--spacing-section)]">
        <MeshBackdrop variant="products" />
        <div className="relative container-base">
        <div className="flex flex-col gap-3 mb-10 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl">{t.products.title}</h2>
          <p className="text-[var(--color-muted)]">{t.products.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Ashur Engine — banner con imagen de fondo, link a /ashur */}
          <Link
            to="/ashur"
            className="group relative flex flex-col justify-end overflow-hidden rounded-[var(--radius-card)] min-h-[440px] p-8"
          >
            <img
              src={r2('ashur/juego-eljardiperdido-2-sunset.webp')}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* Overlay para legibilidad del texto sobre la imagen */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, oklch(20% 0.03 250 / 0.10) 0%, oklch(16% 0.03 250 / 0.45) 45%, oklch(10% 0.02 250 / 0.90) 100%)',
              }}
            />
            <div className="relative">
              <span
                className="inline-block text-xs uppercase tracking-[0.2em] mb-4 px-3 py-1 rounded-[var(--radius-pill)]"
                style={{
                  background: 'oklch(100% 0 0 / 0.14)',
                  color: 'var(--color-dark-fg)',
                }}
              >
                {t.products.ashur.status}
              </span>
              <h3
                className="font-heading text-3xl font-semibold mb-2"
                style={{ color: 'var(--color-dark-fg)' }}
              >
                {t.products.ashur.name}
              </h3>
              <p
                className="font-heading mb-3"
                style={{ color: 'var(--color-dark-fg)' }}
              >
                {t.products.ashur.tagline}
              </p>
              <p
                className="mb-6 max-w-md"
                style={{ color: 'var(--color-dark-fg-soft)' }}
              >
                {t.products.ashur.body}
              </p>
              <span
                className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium transition group-hover:translate-y-[-2px]"
                style={{
                  background: 'var(--color-dark-fg)',
                  color: 'var(--color-dark-deep)',
                }}
              >
                {t.products.ashur.cta}
              </span>
            </div>
          </Link>

          {/* D-Anim-Gator — en desarrollo, sin link */}
          <div className="flex flex-col p-8 glass-card">
            <span className="inline-block self-start text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
              {t.products.danimgator.status}
            </span>
            <h3 className="font-heading text-2xl font-semibold mb-2">
              {t.products.danimgator.name}
            </h3>
            <p className="font-heading text-[var(--color-ink)] mb-3">
              {t.products.danimgator.tagline}
            </p>
            <p className="text-[var(--color-ink-soft)] mb-6 flex-1">
              {t.products.danimgator.body}
            </p>
            <span className="inline-flex items-center self-start px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium text-[var(--color-muted)] border border-[var(--color-border)]">
              {t.products.danimgator.cta}
            </span>
          </div>
        </div>
        </div>
      </section>

      {/* === WORK GRID (loops por categoría) === */}
      <WorkGrid />

      {/* === POR QUÉ === */}
      <section className="relative overflow-hidden py-[var(--spacing-section)]">
        <MeshBackdrop variant="why" />
        <div className="relative container-base">
        <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-3xl">
          {t.whyUs.title}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[t.whyUs.ownTech, t.whyUs.seniorCriteria, t.whyUs.boutiqueLatam].map((item) => (
            <div key={item.title} className="p-8 glass-card">
              <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-[var(--color-ink-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* === CTA === Dark surface diagonal. El azul resalta contra el gris recio. Footer light cierra el sandwich. */}
      <section
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background:
            'linear-gradient(135deg, var(--color-dark-soft) 0%, var(--color-dark) 35%, var(--color-dark-deep) 100%)',
          color: 'var(--color-dark-fg)',
        }}
      >
        <MeshBackdrop variant="orbit" intensity={1.6} force="dark" />
        <div className="container-base relative text-center">
          <h2
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(2.5rem,6vw,5.5rem)] mb-6 max-w-[20ch] mx-auto"
            style={{ color: 'var(--color-dark-fg)' }}
          >
            {t.cta.title}
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-14"
            style={{ color: 'var(--color-dark-fg-soft)' }}
          >
            {t.cta.sub}
          </p>

          {/* Pill button claro como héroe táctil sobre dark. LED glow de 3 capas: hot core + mid lush + outer atmospheric. */}
          <div className="relative inline-block">
            {/* Capa 3 — Outer atmospheric halo (más blur, más wide, opacity baja) */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: '180%',
                height: '50px',
                marginTop: '-4px',
                background:
                  'radial-gradient(ellipse at center, var(--color-glow) 0%, transparent 70%)',
                opacity: 0.4,
                filter: 'blur(28px)',
              }}
            />

            {/* Capa 2 — Mid lush blue saturado (el cuerpo del glow) */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: '120%',
                height: '32px',
                marginTop: '-4px',
                background:
                  'radial-gradient(ellipse at center, oklch(72% 0.22 230) 0%, var(--color-glow) 45%, transparent 75%)',
                opacity: 0.75,
                filter: 'blur(10px)',
              }}
            />

            {/* Capa 1 — Hot LED core (base del quemado, cyan claro) */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: '60%',
                height: '12px',
                marginTop: '-4px',
                background:
                  'radial-gradient(ellipse at center, oklch(96% 0.04 230) 0%, oklch(85% 0.18 220) 35%, transparent 75%)',
                opacity: 0.95,
                filter: 'blur(3px)',
              }}
            />

            {/* Capa 0 — Filament (blend Add tipo AE: extendido 33% y elevado para sentirse "detrás" del button) */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: '80%',
                height: '24px',
                marginTop: '-10px',
                background:
                  'radial-gradient(ellipse at center, oklch(100% 0 0) 0%, oklch(100% 0 0) 15%, oklch(95% 0.06 220) 40%, oklch(85% 0.16 220) 65%, transparent 85%)',
                opacity: 1,
                filter: 'blur(10px)',
                mixBlendMode: 'plus-lighter',
              }}
            />

            {/* Capa -1 — Hot spot ultra concentrado (núcleo del quemado, parcialmente oculto detrás del button) */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: '50%',
                height: '18px',
                marginTop: '-10px',
                background:
                  'radial-gradient(ellipse at center, oklch(100% 0 0) 0%, oklch(100% 0 0) 25%, oklch(98% 0.02 220) 50%, transparent 80%)',
                opacity: 1,
                filter: 'blur(12px)',
                mixBlendMode: 'plus-lighter',
              }}
            />

            <Link
              to="/contacto"
              className="relative inline-flex items-center px-12 py-5 rounded-[var(--radius-pill)] text-lg font-medium hover:translate-y-[-2px] transition"
              style={{
                background: 'var(--color-dark-fg)',
                color: 'var(--color-dark-deep)',
                boxShadow:
                  '0 18px 36px -10px oklch(58% 0.20 240 / 0.55), 0 32px 60px -16px oklch(58% 0.20 240 / 0.35), 0 1px 0 oklch(100% 0 0 / 0.4) inset',
              }}
            >
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
