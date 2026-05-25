# renderdevo.com — Sitemap v2

> Fuente de verdad para la arquitectura de rutas del sitio v2.
> Cualquier cambio acá debe reflejarse en `src/App.tsx` (routes) y
> `src/components/Header.tsx` + `Footer.tsx` (navegación).

## Rutas

```
renderdevo.com
├── /                        Home (one-page largo, scroll narrativo)
├── /capacidades             Index de las 3 capacidades
│   ├── /capacidades/interactivo   Deep-dive Experiencias Interactivas Web
│   ├── /capacidades/motion        Deep-dive Motion Sistémico
│   └── /capacidades/producto      Deep-dive Producto Digital Completo
├── /casos                   Portfolio index
│   ├── /casos/jardin-perdido       Case study (flagship, demo jugable embebido)
│   ├── /casos/defensa-de-puebla    Case study (prueba portabilidad engine)
│   ├── /casos/aparta-la-fecha      Case study (SaaS comercial)
│   └── /casos/book-trailers        Capability piece editorial/literario
├── /metodo                  Discovery-led process documentado
├── /diario                  Blog / newsletter del founder (build in public)
├── /sobre                   Marco como persona (NO como dev)
├── /contacto                Form corto + Calendly embedded
└── /lo-que-no-hacemos       Honest limitations (trust signal)
```

## Estado v1 (post-wipe)

| Ruta | Estado | Notas |
|---|---|---|
| `/` | ✅ Estructura completa (Home.tsx) | Casos como placeholders; falta hero image |
| `/capacidades` | 🟡 Stub | Falta deep-dive de las 3 sub-rutas |
| `/capacidades/{x}` | ❌ No implementado todavía | Próxima iteración |
| `/casos` | 🟡 Stub | Próxima iteración: index + 4 case studies |
| `/casos/{x}` | ❌ No implementado | Por case study deep, con templates uniformes |
| `/metodo` | 🟡 Stub | Reusar copy del bloque "Método" del Home, expandir |
| `/diario` | 🟡 Stub | Bloqueado hasta decidir Beehiiv vs custom |
| `/sobre` | 🟡 Stub | Bloqueado hasta foto profesional + copy bio |
| `/contacto` | 🟡 Stub | Bloqueado hasta Calendly URL |
| `/lo-que-no-hacemos` | 🟡 Stub | Lista lista, falta layout |

## Convenciones

- Rutas en **español** en URL (queda más natural en LATAM y el sitio es bilingüe vía UI toggle, no via path).
- NO usamos `/es/*` y `/en/*` — el idioma vive en el client (localStorage + context).
- Si en el futuro necesitamos SEO bilingüe agresivo, evaluar `hreflang` con prerendering en CF Pages.

## Footer / sitemap.xml

Cuando lleguemos a producción real:
- Generar `public/sitemap.xml` con las rutas finales.
- Submitir a Google Search Console (cuenta ya verificada según session_001).
- Mantener `public/robots.txt` con referencia al sitemap.
