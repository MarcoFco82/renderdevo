import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { BrandMark } from './BrandMark';
import { useLocale } from '@/i18n/LocaleProvider';

export function Footer() {
  const { t } = useLocale();

  return (
    <footer
      className="w-full mt-[var(--spacing-section)] py-12"
      style={{
        borderTop: '1px solid var(--color-border-soft)',
      }}
    >
      <div className="container-base">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Wordmark size="md" />
            <p className="text-sm text-[var(--color-muted)] max-w-xs">{t.footer.tagline}</p>
            {/* Atribución canónica: motor acreditado + estudio acreditado.
                Literal, sin traducir (regla de marca). */}
            <div className="flex items-center gap-3 mt-2">
              <BrandMark piece="ashur-emblem" height={26} mono />
              <span className="text-xs leading-tight text-[var(--color-muted)]">
                Made with Ashur Engine
                <br />
                A RENDERDEVO Game
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-muted)] uppercase tracking-wider text-xs">
                {t.footer.sections.studio}
              </span>
              <Link to="/capacidades" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.capabilities}
              </Link>
              <Link to="/casos" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.cases}
              </Link>
              <Link to="/ashur" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.ashur}
              </Link>
              <Link to="/d-anim" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.danim}
              </Link>
              <Link to="/lo-que-no-hacemos" className="hover:text-[var(--color-glow-deep)] transition">
                {t.notDoing.title}
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-muted)] uppercase tracking-wider text-xs">
                {t.nav.diary}
              </span>
              <Link to="/diario" className="hover:text-[var(--color-glow-deep)] transition">
                {t.diary.title}
              </Link>
              <Link to="/sobre" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.about}
              </Link>
              <Link to="/contacto" className="hover:text-[var(--color-glow-deep)] transition">
                {t.nav.contact}
              </Link>
            </div>

            <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
              <span className="text-[var(--color-muted)] uppercase tracking-wider text-xs">
                Contacto
              </span>
              <a href="mailto:contacto@renderdevo.com" className="hover:text-[var(--color-glow-deep)] transition">
                contacto@renderdevo.com
              </a>
              <a
                href="https://www.linkedin.com/in/marcoramos82/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-glow-deep)] transition"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border-soft)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--color-muted)]">
          <span>{t.footer.copyright}</span>
          <span>Guadalajara, México</span>
        </div>
      </div>
    </footer>
  );
}
