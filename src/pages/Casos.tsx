import { MeshBackdrop } from '@/components/MeshBackdrop';
import { useLocale } from '@/i18n/LocaleProvider';
import { usePageMeta } from '@/lib/seo';

/**
 * Casos — todo lo listado corre en vivo o se entregó a cliente.
 * Los casos con link llevan CTA; los que no, se sostienen en texto y métricas.
 */
export function Casos() {
  const { t } = useLocale();
  usePageMeta(t.seo.cases.title, t.seo.cases.description);
  const p = t.casesPage;

  return (
    <>
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="orbit" />
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
        <div className="grid gap-6 md:grid-cols-2">
          {p.items.map((c) => (
            <article key={c.name} className="flex flex-col p-8 glass-card">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
                {c.category}
              </span>
              <h2 className="font-heading text-2xl font-semibold mb-3">{c.name}</h2>
              <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">{c.body}</p>

              {c.metrics.length > 0 && (
                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-heading text-xl font-semibold">{m.value}</div>
                      <div className="text-xs text-[var(--color-muted)]">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center self-start mt-6 px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition"
                  style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
                >
                  {p.visit}
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[var(--color-muted)]">{p.note}</p>
      </section>
    </>
  );
}
