# Changelog — renderdevo01

Newest first.

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
