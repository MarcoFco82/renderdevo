import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Sobre() {
  const { t } = useLocale();
  return <ComingSoon title={t.nav.about} />;
}
