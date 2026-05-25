import { ComingSoon } from '@/components/ComingSoon';
import { useLocale } from '@/i18n/LocaleProvider';

export function LoQueNoHacemos() {
  const { t } = useLocale();
  return <ComingSoon title={t.notDoing.title} description={t.notDoing.sub} />;
}
