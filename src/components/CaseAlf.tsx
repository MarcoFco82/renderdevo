import { useLocale } from '@/i18n/LocaleProvider';
import { useTheme } from '@/theme/ThemeProvider';
import { MeshBackdrop } from '@/components/MeshBackdrop';
import { alfInvitations, alfPanel } from '@/data/apartala';

/**
 * CaseAlf — ficha técnica de Aparta La Fecha VIP.
 *
 * Va dentro de Trabajo Seleccionado (no es una pestaña aparte): es el caso de
 * producto digital, con ejemplos reales de invitaciones y el panel de control.
 *
 * Las capturas se sirven del R2 del propio ALF; la identidad viene del repo de
 * ALF, ya vectorizada. El panel espera captura (el editor requiere login).
 */
export function CaseAlf() {
  const { t, locale } = useLocale();
  const { theme } = useTheme();
  const a = t.alf;

  return (
    <section className="relative overflow-hidden py-[var(--spacing-section)]">
      <MeshBackdrop variant="corner" intensity={0.9} />

      <div className="relative container-base">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          {/* ── Columna de texto ── */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-5">
              {a.eyebrow}
            </span>

            <img
              src={`/brand/apartalafecha-logo-${theme === 'dark' ? 'dark' : 'light'}.svg`}
              alt={a.name}
              className="h-16 w-auto mb-5"
            />

            <h3 className="font-heading text-2xl font-semibold mb-3">{a.tagline}</h3>
            <p className="text-[var(--color-ink-soft)] mb-8 max-w-xl">{a.body}</p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 mb-8 max-w-md">
              {a.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-3xl leading-none mb-1">{m.value}</dt>
                  <dd className="text-xs text-[var(--color-muted)] leading-snug">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="font-mono text-xs text-[var(--color-muted)] mb-8 max-w-md leading-relaxed">
              {a.stack}
            </p>

            <a
              href="https://apartalafecha.vip"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[var(--color-bg)] font-medium hover:opacity-90 transition"
            >
              {a.visit}
            </a>
          </div>

          {/* ── Columna visual ── */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
                {a.invitationsTitle}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {alfInvitations.map((shot) => (
                  <figure key={shot.id} className="flex flex-col gap-2">
                    {/* Las capturas son 500x1600 (móvil completo). Se encuadran
                        a 9:16 desde arriba: la cabecera de la invitación es lo
                        que identifica el tono, y evita tiras larguísimas. */}
                    <img
                      src={shot.src}
                      alt={shot.caption[locale]}
                      loading="lazy"
                      className="w-full rounded-[var(--radius-md)] aspect-[9/16] object-cover object-top"
                      style={{ background: 'var(--color-bg-deep)' }}
                    />
                    <figcaption className="text-[10px] leading-tight text-[var(--color-muted)]">
                      {shot.caption[locale]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
                {a.panelTitle}
              </p>
              {alfPanel ? (
                <img
                  src={alfPanel.src}
                  alt={alfPanel.caption[locale]}
                  loading="lazy"
                  className="w-full rounded-[var(--radius-md)]"
                  style={{ background: 'var(--color-bg-deep)' }}
                />
              ) : (
                <div
                  className="flex items-center justify-center rounded-[var(--radius-md)] aspect-[16/9]"
                  style={{
                    background: 'var(--color-bg-deep)',
                    border: '1px dashed var(--color-border)',
                  }}
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
                    {a.panelPending}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
