import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Capacidades() {
  const { t } = useLocale();
  return <ComingSoon title={t.nav.capabilities} description={t.capabilities.title} mesh="dense" />;
}
