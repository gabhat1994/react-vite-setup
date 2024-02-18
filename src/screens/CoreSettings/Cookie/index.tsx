import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { TSpan } from '@/components';
import { t } from 'i18next';
import S from '../NotificationsSettings/styles';
import { CookePageContent } from '../../Cookie';

function NotificationsSettings() {
  const { isDesktop } = useBreakpoints();

  return (
    <S.Layout>
      <S.Container>
        <Stack vertical gap={24} padding="24px">
          {isDesktop && (
            <TSpan font="heading-m-bold">
              {t('noumena.cookie-policy-page.header')}
            </TSpan>
          )}
          <CookePageContent />
        </Stack>
      </S.Container>
    </S.Layout>
  );
}

export default NotificationsSettings;
