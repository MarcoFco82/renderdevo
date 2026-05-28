import { useLocale } from '@/i18n/LocaleProvider';

interface LanguageToggleProps {
  /** light = sobre fondo claro (default), dark = sobre fondo oscuro (header) */
  variant?: 'light' | 'dark';
}

export function LanguageToggle({ variant = 'light' }: LanguageToggleProps) {
  const { locale, setLocale } = useLocale();

  const isDark = variant === 'dark';

  const wrapStyle = isDark
    ? {
        background: 'oklch(100% 0 0 / 0.08)',
        border: '1px solid var(--color-dark-border)',
      }
    : {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
      };

  const activeClass = isDark
    ? 'bg-[var(--color-dark-fg)] text-[var(--color-dark-deep)]'
    : 'bg-[var(--color-ink)] text-[var(--color-bg)]';

  const inactiveClass = isDark
    ? 'text-[var(--color-dark-fg-soft)] hover:text-[var(--color-dark-fg)]'
    : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]';

  return (
    <div
      className="inline-flex items-center gap-0 rounded-[var(--radius-pill)] p-1"
      style={wrapStyle}
    >
      <button
        type="button"
        onClick={() => setLocale('es')}
        aria-pressed={locale === 'es'}
        className={`px-3 py-1 text-sm rounded-[var(--radius-pill)] transition ${
          locale === 'es' ? activeClass : inactiveClass
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-3 py-1 text-sm rounded-[var(--radius-pill)] transition ${
          locale === 'en' ? activeClass : inactiveClass
        }`}
      >
        EN
      </button>
    </div>
  );
}
