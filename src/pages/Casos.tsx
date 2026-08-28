import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Casos() {
  const { t } = useLocale();
  return <ComingSoon title={t.cases.title} mesh="orbit" />;
}
