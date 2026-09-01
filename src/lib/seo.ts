import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';

/**
 * usePageMeta — título, descripción y canonical por ruta.
 *
 * El SPA sirve el mismo index.html en todas las rutas, así que sin esto cada
 * página comparte el título genérico. Los tags base (og:image, twitter) viven
 * en index.html; aquí solo se ajusta lo que cambia por página e idioma.
 *
 * Nota: los scrapers de OG (LinkedIn, WhatsApp) no ejecutan JS — ellos leen lo
 * de index.html. Este hook es para el navegador y los crawlers que sí lo
 * ejecutan (Google). Por eso el default de index.html debe ser bueno por sí
 * solo, y aquí no se duplican los og: por ruta.
 */
export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `https://renderdevo.com${pathname}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://renderdevo.com${pathname === '/' ? '' : pathname}`;

    document.documentElement.lang = locale;
  }, [title, description, pathname, locale]);
}
