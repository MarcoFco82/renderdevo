import { NavLink } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useLocale } from '@/i18n/LocaleProvider';

export function Header() {
  const { t } = useLocale();

  const navItems = [
    { to: '/capacidades', label: t.nav.capabilities },
    { to: '/casos', label: t.nav.cases },
    { to: '/ashur', label: t.nav.ashur },
    { to: '/d-anim', label: t.nav.danim },
    { to: '/diario', label: t.nav.diary },
    { to: '/sobre', label: t.nav.about },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background:
          'linear-gradient(135deg, var(--color-dark-soft) 0%, var(--color-dark) 35%, var(--color-dark-deep) 100%)',
        borderBottom: '1px solid var(--color-dark-border)',
        color: 'var(--color-dark-fg)',
      }}
    >
      <div className="container-base flex items-center justify-between gap-6 py-5">
        {/* Wordmark invertido a claro sobre dark */}
        <NavLink to="/" className="inline-block">
          <span
            className="font-display tracking-[0.04em] leading-none text-2xl"
            style={{ color: 'var(--color-dark-fg)' }}
            aria-label="renderdevo"
          >
            RENDERDEVO
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'font-medium transition'
                  : 'transition hover:opacity-100'
              }
              style={({ isActive }) =>
                isActive
                  ? { color: 'var(--color-dark-fg)' }
                  : { color: 'var(--color-dark-fg-soft)' }
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="dark" />
          <LanguageToggle variant="dark" />
          <NavLink
            to="/contacto"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition"
            style={{
              background: 'var(--color-dark-fg)',
              color: 'var(--color-dark-deep)',
            }}
          >
            {t.nav.contact}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
