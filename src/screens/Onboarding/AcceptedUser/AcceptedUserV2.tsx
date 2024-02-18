import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Stack } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints } from '@/hooks';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main, Body, Footer } from '@/layout/NewAuthLayout/childrenStyles';
import { Icon } from '@/components';
import { Title, Description, ContinueButton, OutlineBox } from './styles';

const AcceptedUserV2 = () => {
  const { isMobile } = useBreakpoints();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleContinue = useCallback(() => {
    trackEvent(EVENTS.ONBOARDING.MORE_VERIFICATION.CONTINUE_APPROVED_USER, {
      UUID: user?._id,
    });
    navigate('/');
  }, [navigate, user]);

  return (
    <NewAuthLayout>
      <Main justify="center">
        <OutlineBox>
          <Body>
            <Icon size={144} name="success_cq_xxxl" />
            <Title
              colorToken="--text-body-header-neutral-default"
              font={isMobile ? 'heading-s-bold' : 'heading-m-bold'}
              textAlign="center"
            >
              {t('noumena.onboarding.account_is_activated_title_v2')}
            </Title>
            <Stack vertical align="center" gap={20}>
              <Description
                colorToken="--text-body-neutral-default"
                font="body-l"
                textAlign="center"
              >
                {t('noumena.onboarding.account_is_activated_description_1_v2')}
              </Description>
              <Description
                colorToken="--text-body-neutral-default"
                font="body-l"
                textAlign="center"
              >
                <Trans
                  i18nKey="noumena.onboarding.account_is_activated_description_v2"
                  components={{ newline: <br /> }}
                />
              </Description>
            </Stack>
          </Body>
          <Footer>
            <ContinueButton
              primary
              testId="continue_button"
              onClick={handleContinue}
            >
              {t('noumena.onboarding.account_is_activated_continue_button')}
            </ContinueButton>
          </Footer>
        </OutlineBox>
      </Main>
    </NewAuthLayout>
  );
};
export default AcceptedUserV2;
