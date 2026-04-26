# renderdev01 — Project Context

Sitio web de renderdevo.com. Next.js 15 (App Router) + React 19, deploy en Vercel.

## Stack actual
- Next.js 15.5.9 con `--turbopack` (dev y build)
- React 19.1.0, TypeScript estricto
- EmailJS (browser SDK) para formularios de contacto y cotizaciones
- Sin Tailwind (CSS modules + globals.css)
- Sin backend propio: el sitio es estático/SSR contra servicios externos (EmailJS, Vimeo, Google Analytics)

## Deploy
- Plataforma: **Vercel** (rama `main` → producción)
- Comando: `next build --turbopack`
- Output: `.next/`

### Pre-Deploy Automation Triangle — NO aplica (audit 2026-04-25)
Patrón de 3 capas (.env.production + verify-bundle script + gate en /done) que previene "deploy con env vars incorrectas bakeadas en el bundle".

**No aplica acá porque:**
- El proyecto no consume ninguna env var pública (cero `process.env.*` y cero `NEXT_PUBLIC_*` en `src/`).
- Todas las URLs prod (`https://renderdevo.com`, Vimeo, Fonts, GA ID) están como string literal en código → no hay riesgo de "bundle apunta a localhost en prod".
- Vercel además inyecta env vars desde el dashboard, lo que haría redundante la Capa 1 incluso si existieran.

**Trigger para reactivarlo:** mover las claves EmailJS de `QuoteGenerator.js` / `ContactForm.js` a `NEXT_PUBLIC_EMAILJS_*`, o agregar cualquier `NEXT_PUBLIC_*` que apunte a un backend propio. En ese momento implementar el Triangle adaptado a Next.js (bundle en `.next/`, no `dist/`).

## Hazards conocidos
- Claves EmailJS (`PUBLIC_KEY`, `SERVICE_ID`, `TEMPLATE_ID`, `USER_ID`) hardcoded en `src/components/QuoteGenerator.js` y `src/components/ContactForm.js`. Son claves públicas de EmailJS (no secrets reales) pero deberían moverse a env vars por higiene y para habilitar el Triangle.
- Existen `src/app/globals.css` y `src/app/globals_new.css` simultáneos — verificar cuál está activo y borrar el otro antes de tocar estilos globales.

## Convenciones (heredadas del CLAUDE.md global)
- Commits: `type(scope): description`
- Nunca borrar archivos sin confirmación
- `npx tsc --noEmit` después de cambios
- Respuestas en español
- En este proyecto: commit directo a `main` sin preguntar (memory `feedback_commit_main.md`). NO incluye `push` ni acciones destructivas.

## Session History
- **001 — 2026-04-26:** bootstrap — CLAUDE.md, audit Pre-Deploy Triangle (no aplica), `renderdev-strategy-2026.md` (estrategia 2026 con 8 fuentes, 3 hipótesis, roadmap Q2–Q4). Ver `docs/sesiones/session_001.md`.
