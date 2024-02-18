import UnsubscribeImage from '@/assets/images/unsubscribe.svg';
import { Header } from '@/components/Header';
import { UnauthenticatedHeader } from '@/layout/UnauthenticatedHeader';
import { AppLayout } from '@/layout/AppLayout';
import { Separator } from '@/components/Separator/Separator';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import routes from '@/constants/routes';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { useTranslation } from 'react-i18next';
import S from './styles';
import { useUserPreferences } from '../CoreSettings/NotificationsSettings/useUserPreferences';
import { type EmailSubscriptionType } from '../CoreSettings/NotificationsSettings/types';

const EmailUnsubscribe = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const unsubscribeFrom = params.get(
    'unsubscribeFrom',
  ) as EmailSubscriptionType | null;

  const { isMobile } = useBreakpoints();
  const { updatePreference, loading, loadingUpdate, error } =
    useUserPreferences({ disableQuery: true });

  const { addErrorToast } = useToast();

  useEffect(() => {
    async function handleUpdate() {
      if (unsubscribeFrom && !error) {
        try {
          await updatePreference(unsubscribeFrom, false);
        } catch {
          addErrorToast(t('noumena.unsubscribe.error'));
        }
      }
    }

    handleUpdate();
  }, [addErrorToast, error, t, unsubscribeFrom, updatePreference]);

  const handleResubscribe = async () => {
    if (unsubscribeFrom) {
      try {
        await updatePreference(unsubscribeFrom, true);
        navigate(routes.EMAIL_RESUBSCRIBED, {
          replace: true,
        });
      } catch {
        addErrorToast(t('noumena.unsubscribe.error'));
      }
    }
  };

  if (!unsubscribeFrom || !user?._id) {
    return <Navigate to={routes.HOME} replace />;
  }

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
              <S.Image src={UnsubscribeImage} alt="unsubscribe-image" />

              <S.MessageTitle>{t('noumena.unsubscribe.title')}</S.MessageTitle>
              <S.SpinnerContainer>
                {(loading || loadingUpdate) && <Spinner />}
              </S.SpinnerContainer>
              <S.MessageDescription textAlign="center">
                {t('noumena.unsubscribe.description')}
              </S.MessageDescription>

              <S.ManageButton
                neutral
                onClick={() => navigate(routes.NOTIFICATIONS_SETTINGS)}
              >
                {t('noumena.unsubscribe.manager_preferences_button')}
              </S.ManageButton>
            </Stack>
            <Separator fullWidth />

            <Stack align="center" vertical={isMobile}>
              <S.ResubscribeText>
                {t('noumena.unsubscribe.helper_text')}
              </S.ResubscribeText>
              <S.ManageButton neutral onClick={handleResubscribe}>
                {t('noumena.unsubscribe.resubscribe_button')}
              </S.ManageButton>
            </Stack>
          </S.Content>
        </S.ContentWrapper>
      </S.Layout>
    </AppLayout.Layout>
  );
};

export default EmailUnsubscribe;
