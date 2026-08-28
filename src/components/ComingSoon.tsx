import { useLocale } from '@/i18n/LocaleProvider';
import { MeshBackdrop, type MeshVariant } from '@/components/MeshBackdrop';

interface ComingSoonProps {
  title: string;
  description?: string;
  /** Forma del fondo paramétrico. Cada página stub puede usar la suya. */
  mesh?: MeshVariant;
}

export function ComingSoon({ title, description, mesh = 'corner' }: ComingSoonProps) {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden min-h-[60vh]">
      <MeshBackdrop variant={mesh} />
      <div className="relative container-base py-[var(--spacing-section-lg)]">
      <span className="inline-block text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] mb-6">
        {t.common.comingSoon}
      </span>
      <h1
        className="font-display tracking-[0.02em] leading-[0.95] text-[clamp(3rem,7vw,6rem)] mb-6"
        style={{ color: 'var(--color-ink)' }}
      >
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl">{description}</p>
      )}
      </div>
    </section>
  );
}
