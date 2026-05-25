# renderdevo

Sitio web de **renderdevo.com** — Interactive Motion Studio.

Stack: Vite 7 · React 19 · TypeScript 5.7 · Tailwind 4 · Cloudflare Pages.

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

```bash
npm run dev          # dev server
npm run build        # typecheck + production build → dist/
npm run preview      # preview de dist/ local
npm run typecheck    # tsc --noEmit, sin generar archivos
npm run deploy       # build + deploy a Cloudflare Pages
```

## Estructura

```
src/
├── main.tsx               entry (BrowserRouter + LocaleProvider)
├── App.tsx                routes
├── styles/
│   ├── tokens.css         ÚNICA fuente de tokens (Tailwind 4 @theme)
│   └── global.css         reset + utilities
├── i18n/
│   ├── strings.ts         toda la copy ES + EN
│   └── LocaleProvider.tsx hook useLocale()
├── components/            Layout, Header, Footer, Wordmark, LanguageToggle, ComingSoon
└── pages/                 Home + 7 stubs
```

## Sistema de tokens

Toda la dirección visual del sitio vive en `src/styles/tokens.css`. Cambiar
los valores en el `@theme` block actualiza el sitio entero — colores, fonts,
sombras, radios, glass.

Para experimentar con paletas: descomentar uno de los "presets" en el final
del archivo o sobreescribir los `--color-*` directamente.

## Reglas de proyecto

Ver `CLAUDE.md` para contexto completo de operación, reglas locked, integración
con marcomotionv2 (brain estratégico) y hazards conocidos.
