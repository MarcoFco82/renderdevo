import { Link } from 'react-router-dom';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * Sobre — la voz honesta del estudio: motion designer que construye
 * productos dirigiendo IA. Quién / tesis / método / el estudio.
 */
export function Sobre() {
  const { t } = useLocale();
  const p = t.aboutPage;

  return (
    <>
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="wide" />
        <div className="relative container-base pt-[var(--spacing-section)] pb-12">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {p.eyebrow}
          </span>
          <h1
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(2.6rem,6vw,4.5rem)]"
            style={{ color: 'var(--color-ink)' }}
          >
            {p.title}
          </h1>
        </div>
      </section>

      <section className="container-base pb-[var(--spacing-section)]">
        {/* Quién + tesis: dos columnas de texto, sin ornamento */}
        <div className="grid gap-10 lg:grid-cols-2 mb-14">
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{p.whoTitle}</h2>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">{p.whoBody}</p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{p.thesisTitle}</h2>
            <p className="text-[var(--color-ink-soft)] leading-relaxed">{p.thesisBody}</p>
          </div>
        </div>

        {/* Método */}
        <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">{p.methodTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3 mb-14">
          {p.method.map((m, i) => (
            <div key={m.title} className="p-8 glass-card">
              <span
                className="inline-block font-display text-3xl mb-4"
                style={{ color: 'var(--color-glow-deep)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-lg font-semibold mb-3">{m.title}</h3>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>

        {/* El estudio */}
        <div className="p-8 md:p-10 tactile-card">
          <h2 className="font-heading text-xl font-semibold mb-4">{p.stackTitle}</h2>
          <p className="text-[var(--color-ink-soft)] leading-relaxed max-w-3xl mb-8">
            {p.stackBody}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/ashur"
              className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] glass-card text-sm font-medium hover:opacity-90 transition"
            >
              Ashur Engine
            </Link>
            <Link
              to="/d-anim"
              className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] glass-card text-sm font-medium hover:opacity-90 transition"
            >
              D-Anim-Gator
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition"
              style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
