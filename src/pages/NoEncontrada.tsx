import { Link } from 'react-router-dom';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { useLocale } from '@/i18n/LocaleProvider';
import { usePageMeta } from '@/lib/seo';

/**
 * 404 — cualquier ruta que no exista.
 *
 * Antes de esto el catch-all no existía: una URL muerta montaba el Layout con el
 * <main> vacío, así que la página salía en blanco con header y footer. Pasó de
 * verdad al quitar /diario (se mudó a marcomotion) y quedar un tab abierto ahí.
 * En producción es igual de visible: `public/_redirects` manda todo a index.html,
 * o sea que el SPA responde a CUALQUIER path y es React Router quien decide.
 */
export function NoEncontrada() {
  const { t } = useLocale();
  usePageMeta(t.seo.notFound.title, t.seo.notFound.description);

  return (
    <section className="relative overflow-hidden min-h-[60vh]">
      <MeshBackdrop variant="corner" />
      <div className="relative container-base py-[var(--spacing-section-lg)]">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
          {t.notFound.eyebrow}
        </span>
        <h1
          className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(3rem,7vw,6rem)] mb-6"
          style={{ color: 'var(--color-ink)' }}
        >
          {t.notFound.title}
        </h1>
        <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl mb-10">{t.notFound.body}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] text-sm font-medium transition hover:opacity-90"
          style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }}
        >
          {t.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
