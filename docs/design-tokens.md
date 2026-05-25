# Design Tokens — Referencia

> Documentación de qué representa cada token y cómo usarlo.
> Implementación en `src/styles/tokens.css`.

## Filosofía

**Un solo archivo decide el sitio entero.** Para experimentar con paletas,
solo se editan valores en `tokens.css`. Los componentes nunca hardcodean
colores ni fonts.

Cuando Marco diga "probemos con estos tonos / esta font", el cambio es
3–5 líneas en `tokens.css` — todo el sitio se actualiza.

## Tokens disponibles

### Colores base

| Token | Uso |
|---|---|
| `--color-bg` | Fondo principal del sitio (off-white cremoso) |
| `--color-bg-deep` | Variante hundida sutil para cards / secciones nested |
| `--color-ink` | Texto principal, headings, wordmark (navy oscuro) |
| `--color-ink-soft` | Texto secundario, párrafos largos |
| `--color-muted` | Captions, metadata, labels |

### Glow cálido (signature del dialecto)

| Token | Uso |
|---|---|
| `--color-glow` | Acento de luz principal (ámbar peach) — hover, focus, glow shadows |
| `--color-glow-soft` | Fondos cálidos sutiles, radial gradients |
| `--color-glow-deep` | Coral profundo para estados hover en links |

### Acento opcional (interactivo)

| Token | Uso |
|---|---|
| `--color-accent` | Royal blue para estados "active" / selected |
| `--color-accent-soft` | Variante suave para hover de elementos blue |

### Tipografía

| Token | Uso |
|---|---|
| `--font-display` | Bebas Neue. Wordmark RENDERDEVO + headings hero. SOLO display. |
| `--font-heading` | General Sans. H1–H6 secundarios. |
| `--font-body` | General Sans. Body, párrafos, UI. |
| `--font-mono` | UI monospace. Solo para numeración, código, metadata. |

### Radios

| Token | Valor | Uso típico |
|---|---|---|
| `--radius-pill` | 9999px | Pills, capsule buttons, language toggle |
| `--radius-card` | 24px | Cards principales, CTAs grandes |
| `--radius-md` | 16px | Secciones medias |
| `--radius-sm` | 12px | Inputs, mini-cards |
| `--radius-xs` | 8px | Tags, chips |

### Sombras

| Token | Uso |
|---|---|
| `--shadow-tactile-sm` | Cards pequeñas, hover sutil |
| `--shadow-tactile` | Default neo-tactile depth |
| `--shadow-tactile-lg` | Hero cards, CTAs elevados |
| `--shadow-glow` | Acentos cálidos, CTA destacado |
| `--shadow-glow-strong` | Hero hover, momentos signature |

### Glass

| Token | Uso |
|---|---|
| `--glass-bg` | Cards con frosted glass sutil |
| `--glass-bg-deep` | Variante con mayor opacidad |
| `--glass-blur` | 20px backdrop-filter default |
| `--glass-blur-strong` | 32px para hero cards |
| `--glass-border` | Borde white translúcido típico de glass |

### Spacing

| Token | Uso |
|---|---|
| `--spacing-section` | 6rem gap vertical entre secciones |
| `--spacing-section-lg` | 9rem para hero / primer scroll |

### Container

| Token | Uso |
|---|---|
| `--container-max` | 1280px ancho máximo del contenido |
| `--container-narrow` | 880px para texto largo / artículos |

## Cómo cambiar el tema

### Cambiar el glow cálido a frío

```css
/* en :root de tokens.css */
--color-glow: oklch(78% 0.15 220);          /* azul */
--color-glow-soft: oklch(92% 0.06 220);
--color-glow-deep: oklch(65% 0.18 230);
```

### Cambiar la tipografía body

```css
--font-heading: 'Geist Sans', sans-serif;
--font-body: 'Geist Sans', sans-serif;
```

Y en `index.html` cambiar el `<link>` de la font.

### Cambiar el bg a más blanco

```css
--color-bg: oklch(99% 0.005 80);   /* más blanco, menos cálido */
```

## Por qué oklch

oklch es perceptualmente uniforme. Cuando bajás el chroma de un color cálido,
se ve realmente más sutil sin saltos visuales. Mucho mejor que hex/rgb/hsl para
sistemas de diseño donde necesitás modular variantes.

## Utilities personalizadas en `global.css`

Definidas con Tailwind 4 `@utility`:

- `glass-card` — frosted glass card con shadow tactile
- `tactile-card` — solid card con shadow neo-tactile
- `glow-warm` — sombra cálida ambient
- `container-base` — wrapper con max-width + padding lateral responsive
