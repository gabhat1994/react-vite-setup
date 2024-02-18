import { memo, useCallback } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import * as Sentry from '@sentry/react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { useGenerateOneTimeTokenMutation } from '@/apollo/graphql';
// import { getCqUrl } from '@/screens/Money/Payments/CapitalQuotient/Constants';
// import getStoryblokEnv from '@/services/rest/utils/getStoryblokEnv';
import useEvent from '@/hooks/useEvent';
import { Button } from '@/components/Button';
import { type ScheduleACall } from '../types';
import { Highlight, StyledStep } from './styles';

interface TellUsYourStoryModalProps {
  open: boolean;
  onClose: () => void;
  calendlyData: ScheduleACall | undefined;
}

export const TellUsYourStoryModal = memo((props: TellUsYourStoryModalProps) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [generateOneTimeTokenMutation] = useGenerateOneTimeTokenMutation();
  const { open, onClose, calendlyData } = props;
  const redirectToCQ = false;
  const isMobile = width < breakpoints.TABLET;
  const isTablet = width < breakpoints.LAPTOP;

  const handleCalendlyRedirect = useEvent(() => {
    const calendlyUrl = calendlyData?.url;
    window.open(calendlyUrl, '_blank');
  });

  const handleCQRedirect = useCallback(async () => {
    const res = await generateOneTimeTokenMutation({
      variables: {},
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'Home Page - Tell Us Your Story Modal',
          },
        });
      },
      onCompleted: () => {},
    });
    const token = res.data?.generateOneTimeToken;
    // const { env } = getStoryblokEnv();
    const cqUrl = process.env.VITE_CQ_URL;
    const formedUrl: string = `${cqUrl}?access_token=${token}`;
    window.open(formedUrl, '_blank');
  }, [generateOneTimeTokenMutation]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      enableCloseButton
      enableAnimation
      size={ModalSize.L}
      testId="testTellUsYourStoryModal"
      isFullScreen={isTablet}
      disableBackdropClick
    >
      <ModalHeader
        isFullScreen={isTablet}
        justifyContent={isMobile ? 'flex-start' : 'center'}
      >
        {t('noumena.home.tell_us_your_story_modal.title')}
      </ModalHeader>
      <ModalBody isFullScreen={isTablet} mobileFlex>
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          {t('noumena.home.tell_us_your_story_modal.description')}
        </TSpan>
        <StyledStep>
          <div className="step-number">1</div>
          <div className="step-content">
            {t('noumena.home.tell_us_your_story_modal.step_1')}
          </div>
        </StyledStep>
        <StyledStep>
          <div className="step-number">2</div>
          <div className="step-content">
            {t('noumena.home.tell_us_your_story_modal.step_2')}
          </div>
        </StyledStep>
        <StyledStep>
          <div className="step-number">3</div>
          <div className="step-content">
            <Trans
              i18nKey="noumena.home.tell_us_your_story_modal.step_3"
              components={{
                highlight: (
                  <Highlight
                    onClick={redirectToCQ ? handleCQRedirect : () => {}}
                  />
                ),
                u: <u />,
              }}
            />
          </div>
        </StyledStep>
      </ModalBody>

      <ModalFooter
        isFullScreen={isTablet}
        justifyContent="center"
        marginTop={isTablet ? 100 : 24}
      >
        <Button
          data-testid="action_button"
          size="full"
          primary
          onClick={handleCalendlyRedirect}
        >
          {t('noumena.home.tell_us_your_story_modal.action_button')}
        </Button>
      </ModalFooter>
    </Modal>
  );
});
