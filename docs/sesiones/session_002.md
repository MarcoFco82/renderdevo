# Session 002 — 2026-05-28

## Summary

Sesión larga de tres fases: (1) arreglo de mail, (2) ingestión estratégica de 13 docs, (3) wipe + reescritura v2 del sitio con vestido de Home y deploy a producción.

**Fase 1 — Mail.** `contacto@renderdevo.com` no recibía correos (silent black hole). Diagnóstico: el alias no existía en Zoho. Se creó como alias del usuario Marco Ramos. En el camino se detectó y limpió un split-brain DNS: la zona de Cloudflare tenía NS records huérfanos `ns1/ns2.vercel-dns.com` (residuo de cuando el dominio estuvo en Vercel) que causaban respuestas inconsistentes y un SPF aparentemente duplicado en `dig`. Al borrar los NS huérfanos, `dig` quedó limpio (1 SPF + 1 zoho-verification).

**Fase 2 — Ingestión estratégica.** Marco alimentó 13 documentos uno por uno (4 proyectos + intel brief + 8 docs de modelos de negocio/tendencias/tarifas 2026) con la regla explícita de "no armar plan hasta integrar cada documento". De ahí salió el modelo de renderdevo: estudio boutique de Interactive Motion, 3 líneas de servicio (Experiencias Interactivas Web / Motion Sistémico / Producto Digital), 3 modos de engagement, reglas locked. Se definieron aclaraciones críticas: Marco NO es developer, 3D no se ofrece explícito, engines en backstage, Guardians va a marcomotion no renderdevo, pricing al final con anchor universidad.

**Fase 3 — Reescritura v2.** Wipe total del stack Next.js (tag `pre-wipe-v1` para rollback). Rebuild en Vite 7 + React 19 + TS 5.7 + Tailwind 4 + CF Pages. Sistema de tokens centralizado, i18n ES/EN, Home con bloques estructurales. Después se "vistió": WorkGrid con tabs + lightbox + 4 loops de Envato (procesados en HandBrake a 720×1280 MP4, servidos desde nuevo custom domain `media.renderdevo.com`). Header + CTA migrados a dark mode (gris recio gradient diagonal) con LED glow azul de 5 capas estilo After Effects (iterado ~6 veces con dirección visual de Marco). Deploy a producción.

Course corrections: (1) Tailwind 4 no registraba las @utility — el reset `*` sin layer aplastaba `container-base`; fix moviendo todo a @layer. (2) `--container-max` colisionaba con namespace reservado de Tailwind; renombrado a `--site-max-width`. (3) CTA rechazado 2 veces antes del approach dark. (4) Admin panel diferido tras argumento de feature-creep.

## Files Modified
- `CLAUDE.md` — reescrito completo: stack v2, dialecto visual, reglas locked, ruta a marcomotionv2 brain, hazards, session history; agregada regla locked español MX
- `README.md` — reescrito a stack Vite
- `.gitignore` — limpiado de Next.js/Vercel, agregado Wrangler/Vite
- `public/robots.txt` — limpiado
- `src/styles/tokens.css` — (creado y luego) warm→cool, tokens dark agregados, `--container-max`→`--site-max-width`
- `src/styles/global.css` — fix layers (reset a @layer base, utilities en @layer)
- `src/components/Header.tsx` — migrado a dark gradient diagonal
- `src/components/LanguageToggle.tsx` — variant light/dark
- `src/i18n/strings.ts` — namespace work agregado, fix voseo cta.title
- `src/pages/Home.tsx` — WorkGrid integrado, CTA reescrito a dark + LED glow 5 capas

## Files Created
- Stack base: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/vite-env.d.ts`
- `src/main.tsx`, `src/App.tsx`
- `src/styles/tokens.css`, `src/styles/global.css`
- `src/i18n/strings.ts`, `src/i18n/LocaleProvider.tsx`
- `src/components/`: Layout, Header, Footer, Wordmark, LanguageToggle, ComingSoon, WorkGrid
- `src/pages/`: Home + 7 stubs (Capacidades, Casos, Metodo, Diario, Sobre, Contacto, LoQueNoHacemos)
- `src/data/work.ts`, `src/lib/r2.ts`
- `public/_headers`, `public/_redirects`
- `docs/sitemap.md`, `docs/design-tokens.md`
- `marcomotionv2/docs/ref/renderdevo_estado_001.md` — brief de estado para agente coordinador (fuera de este repo)

## Files Deleted (wipe Next.js)
- Todo `src/app/`, componentes `.js` legacy (Hero, Footer, Header, ContactForm, QuoteGenerator, Seasonal*, ParticleBackground, etc.), `src/styles/` legacy CSS, configs Next (`next.config.ts`, `eslint.config.mjs`), SVGs de Vercel/Next. ~40 archivos.

## Decisions
1. **Wipe total Next.js → Vite + React + CF Pages.** Razón: coherencia (el sitio debe correr el stack que renderdevo vende), mismo stack que ALF/EJP, sin SSR innecesario. Costo: ~3 días extra de setup vs refactor incremental. Tag `pre-wipe-v1` conserva rollback.
2. **Tokens centralizados en oklch.** Razón: modulación instantánea ("3 valores → sitio entero"). oklch es perceptualmente uniforme, mejor para modular chroma.
3. **MP4-only (sin WebM) para v1.** Razón: HandBrake VP9 underperforma; H.264 cubre 99% de browsers; WebM solo da ~30% mejor compresión. Workflow simple > optimización extrema.
4. **R2 custom domain `media.renderdevo.com`.** Razón: subdomain dedicado para assets, NO `www` (que rompería el sitio). El record específico gana sobre el wildcard `*.renderdevo.com`.
5. **Admin panel diferido a Fase 2 (o nunca).** Razón: 0 clientes hoy; Notion/Slack/Loom cubren 1-2 proyectos; el admin no trae un solo cliente nuevo. Construir después de tener operación real.
6. **Dark mode header + CTA, light body + footer.** Razón estética (sandwich visual) y de contraste para que el azul resalte. Decisión de Marco mid-sesión.
7. **Click behavior WorkGrid = modal lightbox (opción A).** Para piezas Envato sin caso narrable.

## Deploys
- `2c9533a` — Cloudflare Pages production, `--branch=main`, https://renderdevo.com (apex + www sirviendo v2 verificado)

## Tests
N/A automatizados. Verificación manual: `tsc --noEmit` limpio, `npm run build` exitoso (79.92 KB gzip), production apex HTTP 200 con title nuevo, 4 loops R2 HTTP 200.

## Lessons / Flags
- **Tailwind 4 reserva `--container-*` namespace.** Custom vars con ese prefijo colisionan. Usar prefijos propios (`--site-*`).
- **Reset CSS unlayered aplasta @utility.** En Tailwind 4, todo lo custom debe ir dentro de un `@layer` o gana sobre las utilities (cascade layers: unlayered > layered).
- **HandBrake VP9 es malo.** Para WebM serio, usar ffmpeg libvpx-vp9. Para v1, MP4-only es decisión válida.
- **Mail silent black hole = alias inexistente** con dominio verificado (Zoho acepta y descarta sin bounce claro).
- **Dirección visual de Marco es el moat.** Itera con lenguaje de motion designer; el resultado supera lo que CSS-blur-solo produce.

## Unresolved / Next
1. Hero still (2880×1620 webp) → `hero/main.webp` en R2
2. Foto profesional Marco → `profile/marco.webp`, armar `/sobre`
3. Calendly URL → embeber en `/contacto`
4. Resend sending domain `renderdevo.com` (DNS records)
5. Case studies deep `/casos/{slug}` (4 casos) + frames a R2
6. Deep-dives `/capacidades/{interactivo,motion,producto}`
7. OG image 1200×630
8. Loops tabs Experimental (D-Anim-Gator) + Interactive (frames EJP)
9. Newsletter Diario (Beehiiv) — diferido
10. Pricing público — esperando anchor universidad
11. Push a origin/main (no hecho — regla: no push sin pedido)
