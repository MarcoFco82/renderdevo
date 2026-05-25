import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import { strings, type Locale, type StringsShape } from './strings';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: StringsShape;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'renderdevo:locale';

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'es';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'es' || saved === 'en') return saved;
  return window.navigator.language.startsWith('en') ? 'en' : 'es';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: strings[locale],
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}
