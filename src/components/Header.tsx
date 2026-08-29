import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * Header — nav de escritorio + menú desplegable en móvil.
 *
 * El nav creció a 6 destinos (dos productos propios entre ellos), así que en
 * móvil ya no basta con ocultarlo: hay un panel con todo, incluidos los toggles
 * de tema e idioma, que abajo de `md` no cabían en la barra.
 */
export function Header() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();

  const navItems = [
    { to: '/capacidades', label: t.nav.capabilities },
    { to: '/casos', label: t.nav.cases },
    { to: '/ashur', label: t.nav.ashur },
    { to: '/d-anim', label: t.nav.danim },
    { to: '/diario', label: t.nav.diary },
    { to: '/sobre', label: t.nav.about },
  ];

  /* Se cierra al navegar: sin esto el panel queda abierto sobre la página nueva. */
  useEffect(() => setOpen(false), [pathname]);

  /* ESC para cerrar, y se bloquea el scroll del fondo mientras está abierto. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target as Node;
      if (!panelRef.current?.contains(el) && !buttonRef.current?.contains(el)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? { color: 'var(--color-dark-fg)' }
      : { color: 'var(--color-dark-fg-soft)' };

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
      <div className="container-base flex items-center justify-between gap-4 py-5">
        <NavLink to="/" className="inline-block shrink-0">
          <span
            className="font-display tracking-[0.04em] leading-none text-2xl"
            style={{ color: 'var(--color-dark-fg)' }}
            aria-label="renderdevo"
          >
            RENDERDEVO
          </span>
        </NavLink>

        {/* Nav de escritorio. Con 6 destinos el gap baja en lg para que respire. */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'font-medium transition whitespace-nowrap' : 'transition whitespace-nowrap hover:opacity-100'
              }
              style={linkStyle}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Toggles: en móvil viven dentro del panel, no en la barra */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle variant="dark" />
            <LanguageToggle variant="dark" />
          </div>

          <NavLink
            to="/contacto"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium hover:opacity-90 transition whitespace-nowrap"
            style={{
              background: 'var(--color-dark-fg)',
              color: 'var(--color-dark-deep)',
            }}
          >
            {t.nav.contact}
          </NavLink>

          {/* Hamburguesa / cerrar */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            className="lg:hidden inline-flex items-center justify-center rounded-[var(--radius-pill)] transition"
            style={{
              width: 40,
              height: 40,
              background: 'oklch(100% 0 0 / 0.08)',
              border: '1px solid var(--color-dark-border)',
              color: 'var(--color-dark-fg)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Panel móvil ── */}
      {open && (
        <div
          id="menu-movil"
          ref={panelRef}
          className="lg:hidden"
          style={{
            borderTop: '1px solid var(--color-dark-border)',
            background: 'var(--color-dark-deep)',
            maxHeight: 'calc(100vh - 84px)',
            overflowY: 'auto',
          }}
        >
          <nav className="container-base flex flex-col py-2" aria-label={t.common.menu}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="py-3 text-base transition"
                style={({ isActive }) => ({
                  ...linkStyle({ isActive }),
                  borderBottom: '1px solid var(--color-dark-border)',
                  fontWeight: isActive ? 500 : 400,
                })}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="flex flex-wrap items-center gap-3 py-5">
              <ThemeToggle variant="dark" />
              <LanguageToggle variant="dark" />
            </div>

            <NavLink
              to="/contacto"
              className="inline-flex items-center justify-center px-5 py-3 mb-5 rounded-[var(--radius-pill)] text-sm font-medium transition"
              style={{
                background: 'var(--color-dark-fg)',
                color: 'var(--color-dark-deep)',
              }}
            >
              {t.nav.contact}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
