import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Metodo() {
  const { t } = useLocale();
  return <ComingSoon title={t.method.title} />;
}
