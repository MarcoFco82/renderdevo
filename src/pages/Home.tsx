import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';

export function Home() {
  const { t } = useLocale();

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div className="container-base pt-20 pb-32 md:pt-32 md:pb-44">
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

      {/* === MÉTODO === */}
      <section className="container-base py-[var(--spacing-section)]">
        <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-3xl">
          {t.method.title}
        </h2>

        <div className="space-y-px">
          {t.method.steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-12 py-6 border-t border-[oklch(0%_0_0_/_0.08)]"
            >
              <span className="font-mono text-sm text-[var(--color-muted)] md:w-20">
                {step.num}
              </span>
              <div className="flex-1 grid md:grid-cols-[200px_1fr] gap-3 md:gap-12">
                <span className="font-heading text-lg font-semibold">{step.name}</span>
                <p className="text-[var(--color-ink-soft)] max-w-2xl">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === CASOS === */}
      <section className="container-base py-[var(--spacing-section)]">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-4xl md:text-5xl">{t.cases.title}</h2>
          <Link to="/casos" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition hidden sm:inline">
            {t.cases.viewAll} →
          </Link>
        </div>

        {/* Placeholder de casos — se llenan cuando subas imágenes a R2 */}
        <div className="grid gap-6 md:grid-cols-2">
          {['El Jardín Perdido', 'Defensa de Puebla', 'Aparta La Fecha VIP', 'Book Trailers Editoriales'].map(
            (caseTitle) => (
              <div
                key={caseTitle}
                className="aspect-[4/3] tactile-card flex items-end p-8 bg-[var(--color-bg-deep)]"
              >
                <span className="font-heading text-2xl font-semibold">{caseTitle}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* === POR QUÉ === */}
      <section className="container-base py-[var(--spacing-section)]">
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
      </section>

      {/* === CTA === */}
      <section className="container-base py-[var(--spacing-section)]">
        <div
          className="p-12 md:p-20 rounded-[var(--radius-card)] text-center"
          style={{
            background:
              'radial-gradient(circle at center, var(--color-glow-soft) 0%, var(--color-bg) 70%)',
            boxShadow: 'var(--shadow-glow)',
          }}
        >
          <h2 className="font-display text-4xl md:text-6xl mb-4 max-w-3xl mx-auto">
            {t.cta.title}
          </h2>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-xl mx-auto mb-8">
            {t.cta.sub}
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center px-8 py-4 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] font-medium hover:opacity-90 transition"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
