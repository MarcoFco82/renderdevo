# Changelog — renderdevo01

Newest first.

---

## [2026-09-01]

### Sesión nocturna: quota Fable — CV + páginas + SEO + wishlist Ashur + tracker

**Objetivo:** gastar la quota de Fable 5 antes del reset en trabajo autónomo
aprobado por Marco (durmiendo): perfil profesional + sitio + presencia.

- **docs(cv):** CV bilingüe ES/EN + one-pager para convocatorias (.md + PDF) en
  `docs/estrategia-agosto-2026/cv/`. Encuadre locked (motion designer +
  desarrollador creativo). Fechas/puestos de Envato-HBO-Natura quedan como
  campos por completar — no se inventaron.
- **feat(pages):** Capacidades, Casos, Sobre y Lo Que No Hacemos dejan de ser
  stubs — copy real ES-MX/EN en strings.ts, mallas por página. (`41fba19`)
- **feat(seo):** og_image v2 (la anterior era de la era "Estrategias
  Digitales"), og absoluto + twitter card + JSON-LD, sitemap.xml que robots.txt
  prometía, y usePageMeta con título/canonical por ruta. (`6466181`)
- **feat(work):** rotación de tabs a 4 s (`67e166b`) y reloj virtual para que
  los loops continúen donde estarían al volver a una pestaña (`bf931f5`).
- **fix(routing):** 404 real — no había catch-all y las URLs muertas daban
  página en blanco, también en producción. (`d009f7b`)
- **feat(brand):** Aparta La Fecha entra al kit vectorizado con 4 variantes
  reconstruidas con <mask> (las letras del sello no calaban). (`4f0e281`)
- **deploy:** renderdevo.com actualizado y verificado en producción.
- **[repo ashurengine] feat(wishlist):** early access D-003 implementado —
  sección en Home, POST /api/wishlist con honeypot + rate limit sobre la D1
  del devlog, GET con sesión de /studio. Probado contra preview real y
  deployado. CLAUDE.md de ese repo actualizado (regla vieja derogada).
- **docs(estrategia):** tracker y estrategia verificados contra la web el
  01-sep: IGF confirmado (waiver 7-sep, submit 13-sep), A MAZE confirmado
  (31-oct), Pictoplasma resuelto (1-feb-2027, sin fee), EVA Play cerró sin
  prórroga (objetivo pasa a 2027), ONX sin call visible.

**Pendiente de Marco:** campos naranjas del CV; IGF fee waiver antes del
7-sep (quedan 6 días); decidir si el Diario lote 3 se queda completo.

---

## [2026-05-28]

### Sesion 002: Mail setup + wipe Next.js + reescritura v2 + Home vestido + deploy

**Objetivo:** arreglar mail, reestructurar renderdevo.com como estudio Interactive Motion, vestir el Home y deployar.

- **fix(mail):** crea alias `contacto@renderdevo.com` en Zoho; limpia split-brain DNS (NS huérfanos de Vercel en CF)
- **feat(v2):** wipe total stack Next.js → reescritura Vite 7 + React 19 + TS 5.7 + Tailwind 4 + CF Pages
- **feat(tokens):** sistema de tokens centralizado en `tokens.css` (oklch, modulable); dialecto Neo-Tactile
- **feat(i18n):** sistema ES + EN custom con LocaleProvider + strings tipadas
- **feat(home):** Home con hero, 3 capacidades, método, WorkGrid, por qué, CTA
- **feat(workgrid):** grid de loops por tabs + modal lightbox + IntersectionObserver; 4 loops Envato
- **feat(dark):** Header + CTA en dark gris recio con gradient diagonal; LED glow azul 5 capas estilo AE
- **chore(r2):** custom domain `media.renderdevo.com` → bucket renderdevo-files
- **fix(i18n):** voseo → español MX en cta.title; regla locked agregada a CLAUDE.md

**Archivos:** ~30 created / ~10 modified, ~40 deleted (wipe) — see session file for full list.

**Deploys:**
- `2c9533a` — Cloudflare Pages production (https://renderdevo.com)

**Pendiente:** hero still, foto Marco, Calendly, Resend domain, case studies deep, deep-dives capacidades, OG image, pricing (anchor universidad).

→ Detalle completo: `docs/sesiones/session_002.md`

---

## [2026-04-26]

### Sesion 001: Project bootstrap + estrategia 2026

**Objetivo:** crear contexto inicial del proyecto y documento estratégico para reposicionamiento 2026.

- **docs(claude):** crea CLAUDE.md del proyecto con stack, deploy y nota de Pre-Deploy Triangle (no aplica)
- **docs(strategy):** crea `renderdev-strategy-2026.md` con investigación, 3 hipótesis y roadmap Q2–Q4
- **docs(meta):** crea estructura `docs/` (changelog, professional_logs, sesiones)
- **chore(audit):** audita Pre-Deploy Automation Triangle — concluye que NO aplica (cero env vars públicas en bundle)

**Archivos:** 4 created — see session file for full list.

**Deploys:** ninguno (sesión solo de docs).

**Pendiente:** rediseño UI del sitio alineado a H3 (sesión separada). Validación de pricing motion con 3 conversaciones reales. Decisión Guardians (a/b/c).

→ Detalle completo: `docs/sesiones/session_001.md`
