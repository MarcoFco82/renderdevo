# Decisions — renderdev01

Architecture y strategy decisions del proyecto renderdevo.com. Newest first.

---

## D-003 — 2026-08-02 — Ashur Engine abre wishlist / early access (enmienda a D-002)

**Contexto:** al planear la estrategia de perfil social (Reddit/TikTok/LinkedIn/Instagram,
ver `renderdevo/docs/estrategia-perfil-social.md`), Marco decidió que el **wishlist es para
Ashur Engine**, no para un juego. Esto choca con D-002, que definía ashurengine.com como
*showcase puro, sin waitlist, sin early access, sin captura de emails*.

**Decisión:** el motor pasa de "showcase puro, no ofrecido como producto" a **"producto con
un camino de early access"**. Ashur Engine tendrá **wishlist / captura de interés**. Se deroga
la cláusula "sin early access ni captura de emails" de D-002.

**Alcance:**
- Solo **Ashur Engine**. D-Anim-Gator sigue sin wishlist por ahora.
- **No** implica venta/licencia de pago todavía — es captura de interés para un early access futuro.
- **Mecanismo y ubicación por definir** (captura en ashurengine.com vs landing aparte). Implicará
  que el sitio de Ashur deje de ser estático: backend de captura (Pages Function + KV/D1/R2,
  anti-spam, doble opt-in vía Resend) — mismo patrón que el admin del Journal.

**Razón:** el wishlist es el objeto de conversión de la estrategia social — TikTok y Reddit
construyen audiencia que aterriza en las demos jugables y se apunta al early access. Sin un
objeto de captura, el alcance no se convierte en nada medible.

**Pendiente:** definir mecanismo/ubicación y construir la captura.

---

## D-002 — 2026-06-12 — Ashur Engine y D-Anim-Gator pasan a ser productos públicos

**Contexto:** la regla locked original decía que los nombres internos de los
engines no iban al cliente ("tecnología propia" únicamente). Marco decidió
revertirla: ambos motores son productos completos y funcionales, y la marca
Ashur Engine se convierte en vehículo de marketing — todos los adelantos
visuales de Marco (Reddit, LinkedIn, Instagram) llevan splash de entrada
"Developed with Ashur Engine", al estilo Unity/Unreal al arrancar un juego.

**Decisión:**
- Ashur Engine es marca pública separada con sitio propio: **ashurengine.com**
  (dominio comprado 2026-06-12 en Cloudflare Registrar).
- Sitio en repo separado: `Playground/Apps/ashurengine/`. Stack idéntico a
  renderdev01 (Vite + React 19 + TS + Tailwind 4 + CF Pages), bilingüe ES/EN
  desde día 1.
- Identidad visual: **Neo-Tactile Dark** — dark glass + acento azul + glow
  cyan + pills (referencia visual aprobada por Marco). Deliberadamente
  distinta del warm light de renderdevo.com.
- Modelo de sitio: **showcase puro** (patrón Three.js/Hytale). SIN waitlist,
  SIN early access, SIN captura de emails. Demos jugables reales
  (eljardinperdido.com, defensadepuebla.pages.dev) + clips desde R2.
- Línea de estatus honesta: tecnología propietaria que impulsa producciones
  de renderdevo, no disponible para licenciamiento — todavía.
- RenderDevo aparece como "built by renderdevo" (footer + estatus), no
  protagonista. La relación es: producto reconocible DE renderdevo, pero
  con marca que respira sola.
- D-Anim-Gator también puede nombrarse públicamente como motor propio de
  renderdevo (sin sitio propio por ahora).
- Sin cambio: Guardians/Sargón siguen fuera de ambos sitios. 3D sigue sin
  ofrecerse como servicio en renderdevo.com. No pricing público.

**Razón:** la marca del engine genera curiosidad orgánica (splash → google →
sitio) y legitimidad institucional. El engine NO se vende; la marca sí
trabaja. Sin modelo comercial definido aún — deliberadamente abierto.

---

## D-001 — 2026-05-25 — Wipe de Next.js/Vercel, rebuild en Vite + CF Pages

Registrada retroactivamente. Stack legacy Next.js+Vercel eliminado por
completo (tag `pre-wipe-v1` conserva el HEAD anterior). Razones: alineación
con stack 100% Cloudflare de Marco, simplicidad SPA (no se necesita SSR),
control total de tokens visuales con Tailwind 4 CSS-first.
