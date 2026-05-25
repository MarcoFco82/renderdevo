import { useLocale } from '@/i18n/LocaleProvider';

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex items-center gap-0 rounded-[var(--radius-pill)] p-1"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: `blur(var(--glass-blur))`,
        WebkitBackdropFilter: `blur(var(--glass-blur))`,
        border: '1px solid var(--glass-border)',
      }}
    >
      <button
        type="button"
        onClick={() => setLocale('es')}
        aria-pressed={locale === 'es'}
        className={`px-3 py-1 text-sm rounded-[var(--radius-pill)] transition ${
          locale === 'es'
            ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
            : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-3 py-1 text-sm rounded-[var(--radius-pill)] transition ${
          locale === 'en'
            ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
            : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
