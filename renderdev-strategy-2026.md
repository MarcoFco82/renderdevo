# renderdev — Estrategia 2026

> Documento vivo. Sesión de scoping inicial: **2026-04-25**.
> Este es el plano estratégico para el reposicionamiento profesional de Marco para 2026, capturando contexto interno, hallazgos del mercado y un roadmap accionable.
>
> **Lo que NO es:** un plan de UI todavía. La rediseño del sitio renderdevo.com viene en sesión posterior, alimentado por decisiones tomadas aquí.

---

## 1. Contexto y momento

2026 es un año bisagra. Tres fuerzas convergen:

1. **La IA dejó de ser feature y pasó a ser sustrato.** La demanda de skills AI-aplicado en marketplaces creció **+109% YoY** según Upwork, con AI video generation/editing liderando a **+329%** ([Upwork In-Demand Skills 2026][src1]). Los freelancers que dirigen IA ganan **~40% más por hora** que los que no.
2. **El solopreneur con stack moderno se volvió una unidad económica viable.** En 2026, **38% de los negocios 7-figure están operados por solos** apalancados con IA, con stacks tech de $3K–$12K/año (Base44 vendió por $80M, HeadshotPro factura $3.6M ARR como operación de una persona) ([Solo Founder Renaissance 2026][src7]).
3. **El conocimiento en infra moderna + dirección de IA + producción cinematográfica/3D es escaso en LATAM.** Mexico es nearshore hub favorito de US, pero la oferta de talento AI está sub-desarrollada — gap explícito de mercado ([Mismo Hiring Guide][src6]).

**El momento es ahora porque:** la barrera técnica para construir productos completos colapsó, pero la barrera de **dirección, criterio y verificación de outputs** se volvió premium. Marco ya está del otro lado de esa barrera.

---

## 2. Punto de partida (estado real, abril 2026)

### 2.1 Activos construidos

**eljardinperdido.com** — producción, 93 sesiones:
- Engine 3D propio sobre React + Vite + Three.js + R3F.
- **Modo Arquitecto**: editor visual de biomas (terreno FBM noise, scatter InstancedMesh, atmósfera, agua, sombras).
- **Asset Architect**: editor de assets low-poly (primitives + splines + GLB export).
- **Sistema multi-character** con 35 animaciones Mixamo, pipeline FBX→Blender→GLB documentado.
- **NPCs** con awareness machine (proximity + behavior graph runtime).
- **Quest Manager** node-graph (ReactFlow) con schema declarativo + runtime + console panel.
- Auth completo (PBKDF2 + JWT + TOTP 2FA), multi-user con roles, storage limits.
- Combat camera OTS + collision system + per-character shadows.
- **234 tests vitest passing.**
- Infra 100% Cloudflare: Pages, Workers, D1 (~20 migraciones), R2, KV, Resend.
- Monorepo pnpm con `@ashur/engine` + `@ashur/worker-core` como **packages reusables** → ya conectado a `defensadepuebla.com`.

**defensadepuebla.com** — primer "cliente" del engine, conectado y funcional. Vehículo de validación del modelo de portabilidad.

**apartalafecha.vip** — SaaS de invitaciones digitales, **Live**, SEO implementado, sin ventas todavía.

**D-animgator** — motor de animación, en desarrollo con buenos resultados, demo funcional integrado en eljardinperdido.

**Guardians (ADR-030)** — diseño aprobado (DOs SQLite + Cloudflare Queues + AI Gateway + Vectorize), bindings en `wrangler.toml`, **executor pendiente — 9 sesiones sin disparar**. Riesgo identificado: feature creep. Decisión necesaria abajo (sección 6, capa 3).

### 2.2 Capacidad demostrada

- Dirige IA end-to-end para desarrollo: prompt → output → verificación → integración en producto.
- Stack ejecutado: Next.js / React / Three.js / TypeScript / Cloudflare full / Adobe CC / Anthropic API.
- Idiomas: ES nativo, EN conversacional.

### 2.3 Histórico comercial

- **0 clientes desde la salida de Envato (~2024).**
- Benchmark histórico Envato: **34k MXN/mes** en motion design.
- Sin presencia comercial actual fuera de amistades. GA del sitio vigente: nulo. Redes: ninguna activa. Newsletter: no existe.

### 2.4 Restricciones críticas

- **Cero runway.** Cero colchón financiero.
- 40 hrs/semana disponibles.
- **NO hacer QA** (preferencia explícita).
- ES nativo, EN conversacional limita pricing en mercados anglo premium.

### 2.5 El problema del sitio actual

[src/app/layout.tsx](src/app/layout.tsx) y [src/components/Hero.js](src/components/Hero.js) muestran el desfase: el sitio promete **"Estrategias Digitales para PyMEs"** con foco en video corporativo y diseño web. El portfolio ([src/components/PortfolioShowcase.js](src/components/PortfolioShowcase.js)) son 4 piezas: 1 reel personal + 3 book trailers de la misma editorial.

**Nada del sitio refleja:** el game engine, los SaaS Live, la infra Cloudflare, la capacidad de dirigir IA, ni el roadmap de productos. El sitio es un CV de motion designer freelancer disfrazado de agencia. La nueva renderdevo es algo distinto.

---

## 3. Hallazgos del mercado externo

### 3.1 Freelance + IA

- **AI skills demand +109% YoY** en Upwork; AI video generation/editing **+329%** ([src1]).
- **Freelancers AI-augmented ganan ~40% más por hora** que sin IA ([src1]).
- **Human + AI productivity boost: hasta 70%** en completion rate de proyectos ([src1]).
- McKinsey: **60–70% del tiempo de empleados es automatizable** con generative AI; impacto disproporcionado en knowledge workers de mayor educación ("reverse skill bias") ([src2]).
- **Adoption gap**: 94% de empleados conoce IA, sólo 13% la usa para >30% de su día → mercado de "ayuda a usar IA bien" todavía abierto ([src2]).

### 3.2 Motion graphics + redes sociales

- **80% de videos en redes en 2026 se ven sin sonido** → motion design = formato nativo de la plataforma ([src5]).
- Short-form animado genera **2.5x más engagement** que long-form ([src5]).
- **62% de marketers que usan AI para video reducen tiempo de producción >50%** ([src5]).
- Tendencia 2026: motion graphics se aleja del "clean corporate" hacia **textura, mood, ritmo, hechura artesanal cinematográfica** mezclada con AI workflows ([src5]). Este es exactamente el sweet spot de Marco.

### 3.3 Serious games / juegos educativos B2B

- Mercado **serious games: $16.91B (2025) → $44.58B (2031)**, CAGR **16.7%** ([src3]).
- Mercado **game-based learning: $24.5B (2025) → $88.6B (2034)**, CAGR **14.59%** ([src4]).
- Driver principal: **demanda de instituciones por experiencias inmersivas medibles** que reduzcan tiempos de training y mejoren retención.
- LATAM Asia-Pacific es el segmento de mayor crecimiento (CAGR 17.68%). Norteamérica todavía concentra 34.92% del mercado.

### 3.4 LATAM como mercado

- **México = nearshore hub favorito de US** (timezone, idioma, costos).
- **Talento AI sub-desarrollado en LATAM** → oferta escasa, demanda creciente.
- Senior LATAM AI engineer **$65K–$75K/año vs. $165K+ en US** → posicionarse como "AI-native LATAM" tiene arbitraje real ([src6]).

### 3.5 Solo founder + AI

- En 2026, **38% de negocios 7-figure operados por una sola persona** ([src7]).
- Stack tech típico solo founder AI-augmented: $3K–$12K/año ([src7]).
- Ejemplos validados: Base44 ($80M exit en 8 meses), HeadshotPro ($3.6M ARR), Sarah Chen design agency ($420K rev en 8 meses con stack mínimo).
- **Insight táctico**: los que ganan combinan **ejecución técnica + un canal de adquisición claro** (SEO, comunidad, contenido). Marco tiene la primera, falta la segunda.

### 3.6 Fractional CTO / AI advisor pricing

- AI-specialist fractional CTO: **$300–$500/hora** en US, **$8K–$25K/mes** retainer ([src8]).
- **AI-specialist commands 2x premium** sobre generalista.
- LATAM tiene espacio para tier intermedio: **$80–$150/hora** ó $3K–$8K/mes con valor diferencial de "AI-native fullstack" para startups y PyMEs LATAM.

---

## 4. Tesis estratégica 2026

### 4.1 La apuesta en una frase

> **Marco construye productos completos, dirigiendo IA, en infra moderna — y lo enseña, lo aplica para terceros, y lo lleva al mercado.**

renderdevo es el paraguas con rostro que vehicula esa apuesta en tres formatos: **servicio, producto, autoridad.**

### 4.2 Tres hipótesis de posicionamiento (con tradeoffs)

**H1 — "El estudio del solo-builder con engine propio"** *(foco productos)*
- Mensaje: "renderdevo construye juegos educativos 3D y experiencias interactivas con engine propio."
- Pros: aprovecha el activo más sofisticado (game engine). Mercado serious games crece 16.7% CAGR. Diferencia clara en LATAM.
- Contras: ciclo de venta B2B largo (3–9 meses). Cero cashflow inmediato. Necesita primer caso ganador para arrancar.
- Verdict: capa de futuro, no de presente.

**H2 — "Motion + interactivos + IA para marcas LATAM"** *(foco servicios)*
- Mensaje: "renderdevo produce contenido para redes sociales con IA + craft cinematográfico."
- Pros: cashflow inmediato (recupera benchmark Envato 34k MXN/mes en 8–12 semanas). Mercado validado (motion +2.5x engagement, AI video +329%). Aprovecha skills core.
- Contras: commodity-ish si no se diferencia bien. Compite con freelancers globales más baratos.
- Verdict: capa de presente. Es el motor de cashflow.

**H3 — "Híbrido escalonado: servicios pagan productos, productos generan autoridad"** *(recomendada)*
- Mensaje: "renderdevo es un estudio solo-operado que produce contenido para marcas LATAM, construye productos propios para nichos verticales, y comparte cómo se hace."
- Pros: respeta restricción de cashflow cero. Cada capa alimenta a la siguiente. Es la realidad operacional, no una postura forzada.
- Contras: requiere disciplina de comunicación para no lucir disperso. Primer trimestre debe ser **80% capa 1, 20% el resto** o se rompe.
- Verdict: **la apuesta principal.** Las siguientes secciones desarrollan H3.

### 4.3 Por qué no "consultor IA / fractional CTO"

Es tentador (rates $300–$500/hr en US, $80–$150/hr realista en LATAM), pero:
- **EN conversacional limita** acceso a clientes US tier-1 que pagan top dollar.
- Sin presencia ni casos públicos, posicionarse como "AI advisor" hoy es competir contra ruido.
- La **ventaja real** de Marco no es opinar sobre IA, es **construir cosas terminadas**. La autoridad debe salir de los productos lanzados, no de declararla.

Reservar este formato para **capa 3 (Q3–Q4)** cuando ya haya casos visibles.

---

## 5. Arquitectura de marcas y rostro

| Marca | Función | Audiencia | Cara |
|---|---|---|---|
| **renderdevo.com** | Paraguas profesional. Producto + servicio + contenido. | Clientes B2B/B2C de servicios, prospects de productos, comunidad. | **CON rostro** (Marco visible). |
| **marcomotion.com** | Perfil de freelancer / CV. Sigue siendo el destino de LinkedIn y reclutadores. | Reclutadores, headhunters. | Marco persona. |
| **eljardinperdido.com** | Producto/proyecto + demo del engine + futuro vehículo de Guardians. | Usuarios finales del jardín, organizaciones interesadas en juegos custom. | Producto, no Marco. |
| **apartalafecha.vip** | Producto SaaS independiente (invitaciones). | B2C novios, eventos. | Producto. |
| **defensadepuebla.com** | Caso de uso del engine, comercial o cultural. | Audiencia específica del proyecto. | Producto. |
| **D-animgator** | Eventualmente producto/herramienta o feature dentro de renderdevo. | Creadores, agencias, marcas. | Producto. |

**Decisión clave revisada en sesión:** renderdevo va **con rostro**. La economía de creadores 2026 castiga marcas anónimas y premia operadores visibles ([src7]). Marco aparece en home, en "Acerca de", en charlas, en cápsulas de redes.

---

## 6. Oferta 2026 — tres capas escalonadas

### Capa 1 — Cashflow (Q2 2026, semanas 1–8) **[80% del tiempo este trimestre]**

**Producto/servicio:** *Motion para redes con AI-augmented workflow.*

**Pitch:** "Animaciones cortas optimizadas para Reels / TikTok / Shorts en español, producidas con un workflow IA + craft que entrega 4× la velocidad y mantiene autoría visual."

**Pricing target (México, B2B/B2C/PyME):**
- Pack mensual de 8 piezas cortas: **$25,000–$35,000 MXN/mes** (recupera benchmark Envato).
- Pack project-based una sola pieza premium: **$8,000–$15,000 MXN.**
- Onboarding inicial / branded motion system: **$30,000–$60,000 MXN** (única vez).

**Diferencial real:**
- Workflow propio AI + Adobe CC documentado → entregables más rápidos.
- Capacidad de **interactivos web** además de video (raro en motion designers).
- Estética 2026: textura/mood/cinematográfico + AI, no "clean corporate" genérico.

**Canales de adquisición Q2:**
1. **LinkedIn personal** (Marco) — 3 posts/semana mostrando proceso. No vender, mostrar.
2. **Caso de estudio público** — la propia rediseño de renderdevo.com como demo de qué hace.
3. **Outbound dirigido** — 20 marcas LATAM/semana en categorías "más necesitan motion": fintech, e-commerce, edtech, hospitalidad. Mensaje muy concreto, no genérico.
4. **Comunidad** — entrar a 2–3 comunidades de marketers LATAM (Slacks, grupos) y aportar valor antes de vender.

**KPI Q2:** 3 clientes pagando, 1 retainer mensual, primer revenue $30K+ MXN en mes 2, $50K+ en mes 3.

### Capa 2 — Producto-mercado (Q2–Q3 2026) **[15% del tiempo Q2, 40% del tiempo Q3]**

**A. apartalafecha.vip — primer producto al mercado**
- Está Live, SEO implementado, sin ventas. **Diagnóstico:** falta canal y posicionamiento, no producto.
- Acción Q2: 2 sesiones de marketing focalizado (SEO de cola larga "invitación digital boda", partnerships con wedding planners LATAM, contenido en TikTok con la propia herramienta).
- KPI: **primer cliente pagando antes de fin Q2.** Si después de 8 semanas con esfuerzo dedicado no convierte, se pausa el push y se reduce a "asset durmiente con SEO orgánico".

**B. defensadepuebla.com — case study del engine**
- Acción Q3: terminar y publicar. No es revenue todavía, es **portfolio físico** del engine para vender el formato a organizaciones.
- KPI: launch público + 1 mención en prensa local + 1 conversación con una organización potencial cliente.

**C. Game engine como producto B2B (siembra Q3, cosecha Q4)**
- Pitch: "Diseñamos juegos 3D educativos custom para tu organización. Te entregamos un mundo navegable, quests editables, 35 animaciones, en infra Cloudflare con costos predecibles."
- Cliente target: ONGs de educación, museos, gobiernos estatales con programas educativos, edtechs LATAM, fundaciones culturales.
- Pricing piloto: **$80K–$200K MXN** por proyecto (según scope).
- KPI Q3: 1 conversación seria de venta. Q4: 1 piloto firmado.

### Capa 3 — Autoridad y escala (Q3–Q4 2026) **[20% del tiempo Q3, 40% del tiempo Q4]**

**A. Contenido educativo recurrente**
- Newsletter quincenal: **"Construyendo Solo"** — bitácora real del proceso (productos, errores, ingresos transparentes). Modelo: Lenny / Pieter Levels en español LATAM.
- 1 video YouTube/mes mostrando build real con IA + motion + Three.js.
- Tema: "cómo dirigir IA para construir productos completos solo." Es la autoridad real.

**B. Charlas / talleres (formato pago bajo)**
- Workshop online "AI-augmented motion para marcas" — pricing $1,500–$3,000 MXN, 4hrs.
- Charla en eventos locales (Mexico Web Conf, Pixelatl, etc.) gratis pero con captura de email.

**C. Decisión Guardians (ADR-030)** — **el momento de la verdad**
- 9 sesiones sin disparar es señal clara. Tres caminos:
  - **(a) Spike de 1 semana** dedicada exclusiva, MVP funcional o muere.
  - **(b) Simplificar a v0** — un solo guardian, un solo cron, sin Vectorize ni human-in-the-loop, solo "report diario por email."
  - **(c) Retiro narrativo** — sacar de roadmap activo, dejar como concepto futuro.
- **Recomendación:** **(b) v0 simplificado en Q3.** Tiene valor real (reportes automáticos = lead magnet para newsletter) sin la complejidad del diseño completo.

---

## 7. Segmentos prioritarios

### Capa 1 (motion redes) — primeros 10 clientes ideales

1. Fintech LATAM serie A–B (necesitan explainers, tienen budget).
2. E-commerce DTC mexicano (Mercado Libre sellers premium, marcas Shopify).
3. Edtechs LATAM (Crehana, Platzi, Buk, Coderhouse) — explainers de cursos.
4. Hospitalidad / restaurantes premium en CDMX/GDL/MTY con presencia digital.
5. Marcas de moda LATAM con foco redes (Cuyana-style).
6. Agencias de marketing que necesiten partner motion AI-augmented.
7. Startups B2B SaaS LATAM (necesitan demo videos para landing).
8. Editoriales independientes (book trailers — ya tiene 3 casos).
9. Eventos / festivales culturales con presencia digital.
10. Coaches / cursos / creators LATAM con audiencia >50K que necesiten producción.

### Capa 2 (engine B2B) — primeros 3 prospects

1. Una ONG educativa LATAM (Ashoka, Fundación Televisa, Sin Limites).
2. Un museo / centro cultural mediano (regional).
3. Un gobierno estatal con programa educativo digital.

### Capa 3 (autoridad) — audiencia objetivo del contenido

- Otros desarrolladores LATAM curiosos sobre AI-augmented dev.
- Motion designers que quieren modernizar su workflow.
- Founders solo/early-stage que necesitan producción de contenido.

---

## 8. Narrativa y mensaje

### 8.1 Anti-posicionamientos (lo que renderdevo NO es)

- ❌ "Otra agencia de marketing digital."
- ❌ "Otro freelancer de motion graphics."
- ❌ "Otro consultor de IA opinando."
- ❌ "Una startup buscando seed."

### 8.2 Posicionamiento real

> renderdevo es **un estudio operado por una persona** que produce contenido y construye productos, dirigiendo IA con criterio, en infra moderna. **Hace cosas terminadas. Las muestra. Y las vende.**

### 8.3 Diferenciales únicos articulables

1. **"Construyo productos completos solo."** Pruebas: eljardinperdido (engine 3D + auth + multi-character + 234 tests), apartalafecha (SaaS Live), D-animgator.
2. **"Dirijo IA, no la sirvo."** El output pasa por mi criterio. Esto es lo que justifica el pricing.
3. **"Infra moderna, costos predecibles."** Cloudflare nativo. No "cloud caro mal entendido."
4. **"En español. Para LATAM. Pero global-ready."** Mexico-anchored, pero los productos viajan.

### 8.4 Tono

- Directo, sin fluff. Sin emojis en producción. Sin claims de IA mágica.
- Mostrar trabajo, no opinar sobre el futuro.
- Transparencia operativa (la newsletter "Construyendo Solo" como vehículo principal de tono).

---

## 9. Roadmap accionable Q2–Q4 2026

### Q2 2026 (mayo–junio) — **Cashflow primero**

- [ ] **Semana 1–2:** rediseño de renderdevo.com alineado a H3 (sesión separada, no esta sesión). Hero nuevo, 3 capas visibles, portfolio honesto, captura de email. Quitar "Estrategias Digitales para PyMEs" como mensaje principal.
- [ ] **Semana 1:** primer post LinkedIn personal anunciando pivote. Cara visible.
- [ ] **Semana 2–8:** 3 posts/semana en LinkedIn mostrando proceso real.
- [ ] **Semana 2:** lista de 80 marcas LATAM target capa 1, segmentadas. 20/semana outbound.
- [ ] **Semana 4:** primer cliente pagando capa 1.
- [ ] **Semana 6:** newsletter "Construyendo Solo" emisión 1.
- [ ] **Semana 8:** $30K+ MXN cobrado, 1 retainer activo.
- [ ] **Decisión apartalafecha:** 8 semanas de push focalizado o se pausa.

**Criterio de éxito Q2:** cashflow positivo (≥$30K MXN), 1 cliente recurrente, sitio renovado, newsletter publicado 4 veces.

### Q3 2026 (julio–septiembre) — **Producto al mercado**

- [ ] **Mes 4:** capa 1 estable a $40–60K MXN/mes con 2–3 clientes recurrentes.
- [ ] **Mes 4:** publicar defensadepuebla.com como case study.
- [ ] **Mes 5:** decisión Guardians ejecutada (recomendado: v0 simplificado en una semana).
- [ ] **Mes 5–6:** primer outbound dirigido a ONGs/museos para capa 2 (engine B2B). 1 conversación seria.
- [ ] **Mes 6:** primer workshop pago online.
- [ ] Nueva pieza de producto/contenido cada mes.

**Criterio de éxito Q3:** $50K+ MXN/mes recurrente, 1 conversación B2B engine activa, newsletter ≥200 suscriptores.

### Q4 2026 (octubre–diciembre) — **Autoridad y siguiente nivel**

- [ ] Q4: 1 piloto de engine firmado.
- [ ] Q4: charla pública en evento sectorial.
- [ ] Q4: $60–80K MXN/mes consolidado.
- [ ] Q4: roadmap 2027 con visibilidad de revenue por capa.

**Criterio de éxito Q4:** revenue diversificado entre 3 capas, 1 piloto B2B en ejecución, presencia pública establecida.

---

## 10. Riesgos y supuestos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **Cero runway** se acaba antes de cashflow | Crítico | Capa 1 es 80% del tiempo Q2. No tocar capa 2/3 hasta tener primer pago. |
| **Fragmentación de marcas** confunde mercado | Alto | Una sola narrativa pública (renderdevo CON rostro). Otros productos = subproductos visibles desde renderdevo. |
| **Feature creep en Guardians** consume sesiones | Medio | Decisión binaria Q3: v0 simplificado o retiro narrativo. |
| **Outbound a marcas frío no convierte** sin caso visible | Alto | Sitio renovado + caso de estudio público (la propia rediseño) ANTES del primer outbound. |
| **B2B engine ciclo de venta largo** sin fondos | Medio | No depender de capa 2 para subsistir. Capa 1 debe sostener todo en 2026. |
| **EN conversacional limita pricing premium** | Medio | Aceptarlo. Atacar tier intermedio LATAM, no tier 1 US. |
| **Apartalafecha asset durmiente** consume energía mental | Bajo | Decisión binaria fin Q2: push focalizado o pausa total. |
| **No QA preference choca con B2B serious games** que requieren entregables pulidos | Medio | Sub-contratar QA externo cuando llegue capa 2 (testing de juegos para org públicas). Mantener foco en dirección creativa. |

### Supuestos que pueden romperse

1. Que Marco efectivamente recupere el ritmo de outbound y publicación 3x/semana — **es cambio de hábito, no técnico**.
2. Que el mercado mexicano de PyMEs/startups acepte pricing $25K+/mes en motion — **falta validar**.
3. Que el engine sea suficientemente único para ganar en B2B vs. soluciones genéricas (Unity educativo, Construct, etc.) — **necesita primer caso para confirmar**.

---

## 11. Próximos pasos inmediatos (esta semana)

Acciones concretas, ordenadas:

1. **Decidir el nuevo home de renderdevo.com** (mensaje principal + 3 capas visibles + portfolio honesto). Sesión separada de diseño UI con base en este doc.
2. **Hacer una pieza pública de "anuncio del pivote"** — primer post LinkedIn, 1 video corto. Cara visible.
3. **Construir la lista de 80 marcas target capa 1** — investigación 1 día.
4. **Borrador del primer email de outbound** — 1 versión genérica, 3 variantes por industria.
5. **Definir el formato y nombre de la newsletter** — preparar emisión 1 dentro de 2 semanas.

### Pendientes que el usuario puede iterar sobre este doc

- [pendiente] Pricing exacto del pack mensual de motion (validar con 3 conversaciones).
- [pendiente] Decisión real sobre Guardians (a / b / c).
- [pendiente] Lista concreta de 10 ONGs/museos/edtechs target para capa 2.
- [pendiente] Calendario editorial de la newsletter (12 emisiones Q2–Q3).
- [pendiente] Criterios para sub-contratar QA cuando llegue capa 2.

---

## 12. Fuentes citadas

[src1]: https://www.upwork.com/research/in-demand-skills-2026
[src2]: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier
[src3]: https://www.mordorintelligence.com/industry-reports/serious-games-market
[src4]: https://www.imarcgroup.com/game-based-learning-market
[src5]: https://www.superside.com/blog/short-form-video-trends
[src6]: https://mismo.team/latam-ai-hiring-guide-build-nearshore-team/
[src7]: https://bythemag.com/the-solo-founder-renaissance-in-2026/
[src8]: https://www.groovyweb.co/blog/ai-consulting-rates-2026

1. **Upwork** — "In-Demand Skills 2026" — https://www.upwork.com/research/in-demand-skills-2026 (acceso 2026-04-25). AI freelance skills demand +109% YoY, AI video gen +329%, AI freelancers ganan +40%/hr.
2. **McKinsey** — "The Economic Potential of Generative AI" — https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier (acceso 2026-04-25). 60–70% del tiempo automatizable; $2.6T–4.4T economic value annual.
3. **Mordor Intelligence** — "Serious Games Market" — https://www.mordorintelligence.com/industry-reports/serious-games-market (acceso 2026-04-25). $16.91B (2025) → $44.58B (2031), CAGR 16.7%.
4. **IMARC Group** — "Game-Based Learning Market Size 2034" — https://www.imarcgroup.com/game-based-learning-market (acceso 2026-04-25). $24.5B (2025) → $88.6B (2034), CAGR 14.59%.
5. **Superside** — "Short-Form Video Trends 2026" — https://www.superside.com/blog/short-form-video-trends (acceso 2026-04-25). 80% videos sin sonido, 2.5x engagement vs long-form, 62% AI cuts production time >50%.
6. **Mismo Team** — "LATAM AI Hiring Guide 2026" — https://mismo.team/latam-ai-hiring-guide-build-nearshore-team/ (acceso 2026-04-25). LATAM AI talent underdeveloped, México nearshore hub, $65–75K vs $165K US senior.
7. **ByTheMag** — "The Solo-Founder Renaissance in 2026" — https://bythemag.com/the-solo-founder-renaissance-in-2026/ (acceso 2026-04-25). 38% de 7-fig businesses son solos, stack $3K–$12K/año, casos Base44 / HeadshotPro.
8. **GroovyWeb** — "AI Consulting Rates 2026" — https://www.groovyweb.co/blog/ai-consulting-rates-2026 (acceso 2026-04-25). AI fractional CTO $300–$500/hr, $8K–$25K/mes; AI specialists 2x premium.

---

*Doc vivo. Iteramos cada vez que valide o cambie un supuesto. Próxima revisión sugerida: fin de mayo 2026 (post-primer cliente capa 1).*
