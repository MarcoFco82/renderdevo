import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function Diario() {
  const { t } = useLocale();
  return <ComingSoon title={t.diary.title} description={t.diary.sub} />;
}
