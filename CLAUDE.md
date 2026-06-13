# renderdev01 — Project Context

Sitio web **renderdevo.com** — Interactive Motion Studio.

> **Estado:** v2 reescritura en curso (2026-05-25). Stack legacy (Next.js+Vercel)
> wipeado en sesión 002. Tag `pre-wipe-v1` conserva HEAD anterior si necesitás rollback.

---

## Stack actual (v2)

- **Vite 7** + **React 19** + **TypeScript 5.7** (strict mode, sin `any` salvo casos justificados)
- **Tailwind 4** (CSS-first config vía `@theme` block en `src/styles/tokens.css`)
- **React Router v7** para SPA routing
- **i18n custom** (ES + EN, JSON-driven, sin libs externas)
- **100% Cloudflare Pages** — deploy via Wrangler

## Deploy

- **Plataforma:** Cloudflare Pages (NO Vercel).
- **Comando:** `npm run deploy`
- **Output:** `dist/`
- **Domain apex** y `www` apuntan a `renderdevo.pages.dev` (CNAME proxied en CF).
- **Nameservers:** `steven.ns.cloudflare.com` + `norah.ns.cloudflare.com`.

## Scripts

```bash
npm run dev          # vite dev server
npm run build        # tsc -b && vite build
npm run preview      # preview del build local
npm run typecheck    # tsc --noEmit
npm run deploy       # build + wrangler pages deploy dist
```

---

## Dialecto visual (locked)

**"Neo-Tactile + Warm Light"**. Diferencia renderdevo de las agencies dark+cyan
genéricas y refuerza el pedigree motion (cinematografía cálida).

- **Light mode** dominante, off-white cremoso (no blanco médico)
- **Tinta navy** muy oscura como contraste (no negro puro)
- **Glow cálido ámbar/peach** como acento de luz (NO cyan, NO neón eléctrico)
- **Glassmorphism sutil** en cards
- **Neumorphism evolucionado** (relieves táctiles, sombras blandas)
- **Bordes muy redondeados** (pills, capsules)
- **Tipografías:**
  - **Bebas Neue** — wordmark `RENDERDEVO` (negro tinta, solo)
  - **General Sans** — body + headings (200–700)
- **Sistema de tokens centralizado:** todo en `src/styles/tokens.css`.
  Para cambiar tema completo: editar `:root` ahí. No hardcodear colores/fonts
  en componentes — siempre via tokens.

## Reglas locked (no transgredir nunca)

🔒 **Marco NO se presenta como developer / dev / fullstack.** Usar:
"Product Builder", "Director técnico del proyecto", "Build partner", "dirigir IA".
La capacidad técnica se atribuye a "infraestructura propia de renderdevo", no a Marco
escribiendo código.

🔒 **3D NO se ofrece explícitamente como servicio.** El engine (Ashur) habilita 3D
en el output ("experiencias inmersivas") pero nunca se vende como capacidad ("modelado 3D").
Si un proyecto lo necesita, Marco contrata operativos 3D externos sin documentarlo.

🔒 **Guardians / Sargón Cerebro NO van en renderdevo.com.** Esa narrativa
(IA personal de Marco, "Jarvis") vive en marcomotion.com.

🔒 **NO pricing público en v1.** El sitio dice "Cotización a partir de discovery call".
Anchor pendiente: cliente universidad. Tabla interna en
`marcomotionv2/docs/ref/09-12-tarifas-*.md`.

🔒 **Ashur Engine y D-Anim-Gator son productos públicos y reconocibles de
RENDERDEVO** (decisión 2026-06-12, ver `docs/decisions.md`). Ashur Engine tiene
marca y sitio propios (**ashurengine.com**, repo separado
`Playground/Apps/ashurengine/`); todo adelanto visual de Marco lleva splash
"Developed with Ashur Engine". En renderdevo.com ambos motores se nombran como
tecnología propia de la casa, con link. NO se venden ni ofrecen como
producto/licencia/editor todavía — son marcas de tecnología propietaria.
Sin early access ni captura de emails en ashurengine.com.

🔒 **Sin emojis decorativos en UI/copy** (regla global).

🔒 **Sin Wordpress, Wix, Webflow, Unity, Unreal** en el stack —
ni para presumir que no los usamos en v1.

🔒 **Copy del sitio en español de MÉXICO**, no rioplatense.
- "Tienes" / "Quieres" / "Puedes", **NUNCA** "tenés" / "querés" / "podés".
- "Construir" sobre "armar", "platicar" sobre "charlar" cuando aplique.
- Marco está en Guadalajara, target principal LATAM con anclaje MX.
- Las conversaciones internas (este chat) pueden usar voseo informal,
  pero `src/i18n/strings.ts` siempre va en ES-MX neutro.

---

## Intel y briefs estratégicos

Los briefs de mercado, tarifas, análisis de competencia y proyectos previos
viven en **otro repo** (no en este):

```
/Users/markof/Desktop/Journey/marcomotionv2/docs/ref/
```

**Al iniciar sesión nueva, leer:**
- `intel_renderdevo_brief_001.md` — perfil Marco + market intel
- `apartalafecha-vip-proyecto.md` — case ALF (prueba SaaS comercial)
- `eljardinperdido_for_renderdevo.md` — case EJP (flagship técnico, demo público)
- `D-Anim-Gator-project.md` — motor de motion multi-formato propio
- `01-08-*` — modelos de negocio, tendencias, posicionamiento 2026
- `09-12-tarifas-*` — pricing benchmarks calibrados a LATAM

**Por qué viven aparte:** la inteligencia estratégica es transversal a marcomotion
y renderdevo. Duplicarla mantenerla sincronizada es dolor. marcomotionv2 = brain.
renderdev01 = output renderdevo.com.

---

## Arquitectura del sitio v2

```
src/
├── main.tsx               # entry (BrowserRouter + LocaleProvider)
├── App.tsx                # rutas
├── styles/
│   ├── tokens.css         # ÚNICA fuente de tokens (Tailwind 4 @theme)
│   └── global.css         # base + utilities (glass-card, tactile-card, glow-warm)
├── i18n/
│   ├── strings.ts         # toda la copy ES + EN, tipada
│   └── LocaleProvider.tsx # hook useLocale()
├── components/
│   ├── Layout.tsx         # Header + main + Footer
│   ├── Header.tsx         # nav + LanguageToggle
│   ├── Footer.tsx         # secciones + contacto
│   ├── Wordmark.tsx       # RENDERDEVO en Bebas Neue, sizes sm/md/lg/hero
│   ├── LanguageToggle.tsx # ES/EN switch
│   └── ComingSoon.tsx     # placeholder uniforme para pages no-listas
└── pages/
    ├── Home.tsx           # one-page: hero / capacidades / método / casos / why / cta
    ├── Capacidades.tsx    # stub
    ├── Casos.tsx          # stub
    ├── Metodo.tsx         # stub
    ├── Diario.tsx         # stub
    ├── Sobre.tsx          # stub
    ├── Contacto.tsx       # stub
    └── LoQueNoHacemos.tsx # stub
```

## Servicios externos conectados

- **R2 bucket:** `renderdevo-files` (Cloudflare Object Storage) — assets visuales
  (hero image, frames de casos, screenshots, foto profesional). Marco sube
  directamente al bucket; el sitio referencia via URL pública.
- **Resend:** sending domain `renderdevo.com` configurado en misma cuenta de ALF.
  Mismo API key. Mandar desde `contacto@renderdevo.com` / `hola@renderdevo.com`.
- **Zoho Mail:** `contacto@renderdevo.com` como alias de Marco Ramos (config sesión 002).
- **Calendly:** pendiente, Marco lo crea para discovery calls 30 min.
- **Beehiiv (futuro):** newsletter "Diario" — pendiente, no es prioridad v1.

---

## Convenciones (heredadas + project-specific)

- **Commits:** `type(scope): description` (feat, fix, refactor, docs, chore)
- **Commit + push directo a `main` sin preguntar** (memory `feedback_commit_main.md`).
  Flujo solo-dev sin PRs. Acciones destructivas (force-push, reset --hard, branch -D)
  SIGUEN requiriendo confirmación explícita.
- **Typecheck obligatorio post-cambios:** `npm run typecheck`
- **Respuestas en español** (regla global).
- **ES Modules** siempre, jamás CommonJS.
- **TypeScript strict**, evitar `any`.
- **Funcional components con hooks**, no class components.
- **i18n:** toda copy en `src/i18n/strings.ts`, jamás hardcoded en JSX.
- **Tokens:** colores/fonts/sombras/radios solo desde `src/styles/tokens.css`.

---

## Hazards conocidos

- Repo aún sin `npm install` ejecutado tras wipe. `node_modules` ausente.
  Primer comando obligatorio antes de `npm run dev`.
- Calendly URL faltante: `Header.tsx` y `Footer.tsx` apuntan a `/contacto` (página
  stub). Cuando Marco genere link Calendly, embeber en `pages/Contacto.tsx`.
- Hero image pendiente: `Home.tsx` hero tiene radial gradient ambient pero
  no still real todavía. Subir `hero/main.webp` (2880×1620) a R2 cuando esté.
- Fotos de casos pendientes: en `Home.tsx` los 4 casos son cards vacías con
  título. Reemplazar con `<img>` de R2 cuando Marco suba assets.

---

## Session History

- **001 — 2026-04-26:** bootstrap — CLAUDE.md inicial, audit Pre-Deploy Triangle (no aplica),
  `renderdev-strategy-2026.md`. Ver `docs/sesiones/session_001.md`.
- **002 — 2026-05-28:** mail setup (contacto@renderdevo.com alias en Zoho, split-brain
  DNS Vercel limpiado), ingestión de 13 docs estratégicos de marcomotionv2, **wipe total
  del stack Next.js**, reescritura v2 (Vite + React 19 + TS + Tailwind 4 + CF Pages),
  tokens centralizados, i18n ES/EN, Home vestido (WorkGrid tabs+lightbox, 4 loops Envato),
  Header+CTA dark con LED glow 5 capas, R2 custom domain media.renderdevo.com,
  **deploy a producción** (`2c9533a` → https://renderdevo.com). Ver `docs/sesiones/session_002.md`.
