import { useLocale } from '@/i18n/LocaleProvider';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  const { t } = useLocale();

  return (
    <section className="container-base py-[var(--spacing-section-lg)] min-h-[60vh]">
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
    </section>
  );
}
