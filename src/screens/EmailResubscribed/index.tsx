import UnsubscribeImage from '@/assets/images/unsubscribe.svg';
import { Header } from '@/components/Header';
import { UnauthenticatedHeader } from '@/layout/UnauthenticatedHeader';
import { Stack } from '@/layout';
import { AppLayout } from '@/layout/AppLayout';
import { useTranslation } from 'react-i18next';
import S from './styles';

const EmailResubscribed = () => {
  const { t } = useTranslation();

  return (
    <AppLayout.Layout
      topNavbar={
        <Header isBorderRadius={false}>
          <UnauthenticatedHeader title="" />
        </Header>
      }
    >
      <S.Layout>
        <S.ContentWrapper>
          <S.Content>
            <Stack gap={16} vertical fullWidth align="center">
              <S.Image src={UnsubscribeImage} alt="resubscribed-image" />

              <S.MessageTitle>{t('noumena.resubscribed.title')}</S.MessageTitle>

              <S.MessageDescription textAlign="center">
                {t('noumena.resubscribed.description')}
              </S.MessageDescription>
            </Stack>
          </S.Content>
        </S.ContentWrapper>
      </S.Layout>
    </AppLayout.Layout>
  );
};

export default EmailResubscribed;
