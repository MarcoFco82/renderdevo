import { Link } from 'react-router-dom';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * Lo que no hacemos — honestidad antes que upsell. Lista de fuera-de-alcance
 * con el porqué, y el puente de vuelta a lo que sí hacemos.
 */
export function LoQueNoHacemos() {
  const { t } = useLocale();
  const p = t.notDoingPage;

  return (
    <>
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="corner" />
        <div className="relative container-base pt-[var(--spacing-section)] pb-12">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {p.eyebrow}
          </span>
          <h1
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(2.6rem,6vw,4.5rem)] mb-6"
            style={{ color: 'var(--color-ink)' }}
          >
            {t.notDoing.title}
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl">{p.intro}</p>
        </div>
      </section>

      <section className="container-base pb-[var(--spacing-section)]">
        <div className="flex flex-col max-w-3xl">
          {p.items.map((item) => (
            <article
              key={item.title}
              className="py-7 border-b border-[var(--color-border-soft)] first:pt-0"
            >
              <h2 className="font-heading text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-[var(--color-ink-soft)] leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[var(--color-muted)]">{p.closing}</p>

        <div className="mt-12 p-8 tactile-card max-w-3xl">
          <h2 className="font-heading text-lg font-semibold mb-2">{p.yesTitle}</h2>
          <p className="text-sm text-[var(--color-ink-soft)] mb-6">{t.capabilities.title}</p>
          <Link
            to="/capacidades"
            className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition"
            style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
          >
            {p.yesCta}
          </Link>
        </div>
      </section>
    </>
  );
}
