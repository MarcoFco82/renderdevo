import { useLocale } from '@/i18n/LocaleProvider';
import { MeshBackdrop } from '@/components/MeshBackdrop';

const EMAIL = 'contacto@renderdevo.com';
const LINKEDIN = 'https://www.linkedin.com/in/marcofranciscoramos/';

/**
 * Contacto — por ahora solo el correo, para que la página no quede vacía.
 * Cuando exista el link de Calendly, se agrega aquí como CTA primario.
 */
export function Contacto() {
  const { t } = useLocale();
  const c = t.contact;

  return (
    <section className="relative overflow-hidden min-h-[70vh]">
      <MeshBackdrop variant="low" />

      <div className="relative container-base py-[var(--spacing-section-lg)]">
        <header className="max-w-3xl mb-14">
          <h1
            className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(3rem,7vw,6rem)] mb-5"
            style={{ color: 'var(--color-ink)' }}
          >
            {c.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-ink-soft)]">{c.sub}</p>
        </header>

        {/* El correo como pieza principal, no como dato al pie */}
        <a
          href={`mailto:${EMAIL}`}
          className="group inline-flex flex-col gap-2 p-8 md:p-10 tactile-card transition hover:translate-y-[-2px] mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {c.emailLabel}
          </span>
          <span
            className="font-heading font-semibold text-[clamp(1.5rem,4vw,2.5rem)] leading-tight break-all transition group-hover:text-[var(--color-glow-deep)]"
            style={{ color: 'var(--color-ink)' }}
          >
            {EMAIL}
          </span>
        </a>

        <p className="text-[var(--color-ink-soft)] max-w-2xl mb-12">{c.note}</p>

        <dl className="grid gap-8 sm:grid-cols-2 max-w-2xl text-sm">
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-[0.2em] text-xs text-[var(--color-muted)]">
              {c.linkedinLabel}
            </dt>
            <dd>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-glow-deep)] transition"
              >
                Marco Francisco Ramos
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="uppercase tracking-[0.2em] text-xs text-[var(--color-muted)]">
              {c.locationLabel}
            </dt>
            <dd className="text-[var(--color-ink-soft)]">{c.location}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
