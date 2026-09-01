import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleProvider';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { BrandMark } from '@/components/BrandMark';
import { usePageMeta } from '@/lib/seo';

/**
 * D-Anim-Gator — página del segundo motor propio.
 *
 * Estado real: EN OPERACIÓN (produce trabajo real), no "en desarrollo".
 * Copy verificado con la sesión de marcomotion contra el doc del proyecto.
 *
 * NO publicar: wgpu (descartado) ni 3D nativo (D-Anim es 2D-native; el 3D
 * entra como import desde Blender). Tampoco casos/clientes: no hay ninguno
 * documentado todavía.
 */
export function DAnimGator() {
  const { t } = useLocale();
  usePageMeta(t.seo.danim.title, t.seo.danim.description);
  const d = t.danim;

  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <MeshBackdrop variant="dense" />
        <div className="relative container-base pt-20 pb-24 md:pt-28 md:pb-32">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
            {d.tagline}
          </span>

          <BrandMark
            piece="danimgator-lockup"
            height="clamp(80px, 13vw, 150px)"
            alt={t.products.danimgator.name}
            className="mb-8 max-w-full"
          />

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-3xl mb-10">
            {d.sub}
          </p>

          <Link
            to="/contacto"
            className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] font-medium hover:opacity-90 transition"
          >
            {d.ctaPrimary}
          </Link>
        </div>
      </section>

      {/* === QUÉ HACE === */}
      <section className="relative overflow-hidden py-[var(--spacing-section)]">
        <MeshBackdrop variant="wide" />
        <div className="relative container-base">
          <div className="flex flex-col gap-3 mb-10">
            <h2 className="font-display text-4xl md:text-5xl">{d.capabilities.title}</h2>
            <p className="text-[var(--color-muted)] max-w-2xl">
              {d.capabilities.subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {d.capabilities.items.map((item) => (
              <div key={item.title} className="p-8 tactile-card">
                <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--color-ink-soft)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
