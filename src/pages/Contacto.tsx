import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Contacto() {
  const { t } = useLocale();
  return <ComingSoon title={t.nav.contact} description={t.cta.sub} mesh="low" />;
}
