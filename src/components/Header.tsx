import { NavLink } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { LanguageToggle } from './LanguageToggle';
import { useLocale } from '@/i18n/LocaleProvider';

export function Header() {
  const { t } = useLocale();

  const navItems = [
    { to: '/capacidades', label: t.nav.capabilities },
    { to: '/casos', label: t.nav.cases },
    { to: '/metodo', label: t.nav.method },
    { to: '/diario', label: t.nav.diary },
    { to: '/sobre', label: t.nav.about },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'oklch(98% 0.012 80 / 0.85)',
        backdropFilter: `blur(var(--glass-blur))`,
        WebkitBackdropFilter: `blur(var(--glass-blur))`,
        borderBottom: '1px solid oklch(0% 0 0 / 0.05)',
      }}
    >
      <div className="container-base flex items-center justify-between gap-6 py-5">
        <Wordmark size="sm" />

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-[var(--color-ink)] font-medium'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <NavLink
            to="/contacto"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] text-sm font-medium hover:opacity-90 transition"
          >
            {t.nav.contact}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
