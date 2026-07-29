import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import { journal, type JournalEntry, type MediaBlock } from '@/data/journal';
import type { Locale } from '@/i18n/strings';

/**
 * Diario — el Journal de renderdevo. Layout editorial de una columna.
 *
 * Datos: GET /api/journal (R2). Se inicializa con el fallback estático para
 * render inmediato y se actualiza cuando responde la API. Chrome: i18n (t.diary).
 * Cada entrada son bloques: texto bilingüe + media opcional intercalada.
 */
export function Diario() {
  const { t, locale } = useLocale();
  const [entries, setEntries] = useState<JournalEntry[]>(journal);

  useEffect(() => {
    let alive = true;
    fetch('/api/journal')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((d: { entries?: JournalEntry[] }) => {
        if (alive && Array.isArray(d.entries) && d.entries.length > 0) {
          setEntries(d.entries);
        }
      })
      .catch(() => {
        /* se queda el fallback estático ya cargado en el estado */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="container-base py-[var(--spacing-section-lg)]">
      <header className="mb-16 max-w-3xl">
        <h1
          className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(3rem,7vw,5.5rem)] mb-5"
          style={{ color: 'var(--color-ink)' }}
        >
          {t.diary.title}
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-ink-soft)]">{t.diary.sub}</p>
      </header>

      <div className="max-w-3xl">
        {entries.map((entry) => (
          <article
            key={entry.slug}
            className="py-10 border-t border-[oklch(0%_0_0_/_0.08)]"
          >
            {entry.date && (
              <time
                dateTime={entry.date}
                className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-4"
              >
                {formatDate(entry.date, locale)}
              </time>
            )}
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
              {entry.title[locale]}
            </h2>
            <div className="space-y-4">
              {entry.blocks.map((block, i) =>
                block.type === 'text' ? (
                  <p
                    key={i}
                    className="text-lg leading-relaxed text-[var(--color-ink-soft)]"
                  >
                    {renderInline(block[locale])}
                  </p>
                ) : (
                  <JournalMedia key={i} block={block} locale={locale} />
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* Media que "viste" el log: imagen o video, con caption bilingüe opcional. */
function JournalMedia({ block, locale }: { block: MediaBlock; locale: Locale }) {
  const caption = block.caption?.[locale];
  return (
    <figure>
      {block.type === 'image' ? (
        <img
          src={block.src}
          alt={block.alt ?? caption ?? ''}
          loading="lazy"
          className="w-full rounded-[var(--radius-card)]"
          style={{ background: 'var(--color-bg-deep)' }}
        />
      ) : (
        <video
          src={block.src}
          controls
          playsInline
          preload="metadata"
          className="w-full rounded-[var(--radius-card)]"
          style={{ background: 'var(--color-bg-deep)' }}
        />
      )}
      {caption && (
        <figcaption className="mt-2 text-sm text-[var(--color-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}

/* Fecha corta localizada. Partes locales para evitar corrimiento de zona. */
function formatDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
}

/* Formatter inline minimalista: **negrita** y *cursiva*. Sin libs externas. */
function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} style={{ color: 'var(--color-ink)', fontWeight: 600 }}>
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return <em key={i}>{token.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{token}</Fragment>;
  });
}
