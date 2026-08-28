import { useTheme } from '@/theme/ThemeProvider';

interface ThemeToggleProps {
  /** dark = sobre superficie oscura (header). light = sobre fondo claro. */
  variant?: 'light' | 'dark';
}

/**
 * ThemeToggle — alterna dark/light, mismo lenguaje visual que LanguageToggle.
 * Iconos en SVG inline (sin dependencias, sin emojis).
 */
export function ThemeToggle({ variant = 'light' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const onDark = variant === 'dark';

  const wrapStyle = onDark
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

  const activeClass = onDark
    ? 'bg-[var(--color-dark-fg)] text-[var(--color-dark-deep)]'
    : 'bg-[var(--color-ink)] text-[var(--color-bg)]';

  const inactiveClass = onDark
    ? 'text-[var(--color-dark-fg-soft)] hover:text-[var(--color-dark-fg)]'
    : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]';

  const btn = 'px-2.5 py-1 rounded-[var(--radius-pill)] transition inline-flex items-center';

  return (
    <div
      className="inline-flex items-center rounded-[var(--radius-pill)] p-1"
      style={wrapStyle}
      role="group"
      aria-label="Tema"
    >
      <button
        type="button"
        onClick={() => theme !== 'dark' && toggleTheme()}
        aria-pressed={theme === 'dark'}
        aria-label="Tema oscuro"
        title="Tema oscuro"
        className={`${btn} ${theme === 'dark' ? activeClass : inactiveClass}`}
      >
        {/* luna */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => theme !== 'light' && toggleTheme()}
        aria-pressed={theme === 'light'}
        aria-label="Tema claro"
        title="Tema claro"
        className={`${btn} ${theme === 'light' ? activeClass : inactiveClass}`}
      >
        {/* sol */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
