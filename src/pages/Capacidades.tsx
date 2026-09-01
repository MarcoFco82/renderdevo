import { Link } from 'react-router-dom';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { useLocale } from '@/i18n/LocaleProvider';
import { usePageMeta } from '@/lib/seo';

/**
 * Capacidades — expande las tres capacidades del home a página completa.
 * Cada sección: lead + qué entregamos + el motor propio que la respalda.
 */
export function Capacidades() {
  const { t } = useLocale();
  usePageMeta(t.seo.capabilities.title, t.seo.capabilities.description);
  const p = t.capabilitiesPage;

  return (
    <>
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="dense" />
        <div className="relative container-base pt-[var(--spacing-section)] pb-12">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {p.eyebrow}
          </span>
          <h1
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(2.6rem,6vw,4.5rem)] mb-6"
            style={{ color: 'var(--color-ink)' }}
          >
            {p.title}
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl">{p.intro}</p>
        </div>
      </section>

      <section className="container-base pb-[var(--spacing-section)]">
        <div className="flex flex-col gap-8">
          {p.sections.map((sec) => (
            <article key={sec.title} className="p-8 md:p-10 tactile-card">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
                    {sec.title}
                  </h2>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed mb-6">{sec.lead}</p>
                  <p className="text-sm text-[var(--color-muted)]">{sec.engine}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4">
                    {p.deliverTitle}
                  </span>
                  <ul className="flex flex-col gap-3">
                    {sec.deliver.map((d) => (
                      <li key={d} className="flex gap-3 text-sm text-[var(--color-ink-soft)]">
                        <span
                          aria-hidden
                          className="mt-[7px] shrink-0 rounded-full"
                          style={{ width: 6, height: 6, background: 'var(--color-glow-deep)' }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 pt-5 text-sm text-[var(--color-muted)] border-t border-[var(--color-border-soft)]">
                    {sec.caseLabel}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/contacto"
            className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition"
            style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
          >
            {t.cta.button}
          </Link>
          <Link
            to="/casos"
            className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] glass-card text-sm font-medium hover:opacity-90 transition"
          >
            {t.cases.viewAll}
          </Link>
        </div>
      </section>
    </>
  );
}
