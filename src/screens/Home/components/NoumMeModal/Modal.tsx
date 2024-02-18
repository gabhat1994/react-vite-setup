import { memo } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints, useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import { ChamberCompleteness } from '@/screens/Chamber/components/ChamberCompleteness';
import { ChamberProvider } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import routes from '@/constants/routes';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { NoumUserConnectionProvider } from '@/features/noums/contexts/NoumUserConnectionContext';
import { StyledChamberCompletenessWrapper } from './styles';

interface NoumMeModalProps {
  open: boolean;
  onClose: () => void;
}

export const NoumMeModal = memo(({ open, onClose }: NoumMeModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { isMobile, isDesktop } = useBreakpoints();

  const { masterId: id } = useAuth();

  return (
    <Modal
      open={open}
      onClose={onClose}
      enableAnimation
      isFullScreen={isMobile}
      testId="testNoumMeModal"
      enableCloseButton
      closeButtonStyles={{
        primary: true,
        color: '--icon-button-neutral-alt-default',
      }}
      style={{
        width: isDesktop ? 654 : width <= 802 ? '100%' : 802,
        background:
          'linear-gradient(180deg,rgba(49,13,117,1) 0%,rgba(102,63,186,1) 42%,rgba(255,255,255,1) 42%,rgba(255,255,255,1) 100%)',
      }}
      disableBackdropClick
    >
      <ModalHeader
        tSpanProps={{
          colorToken: '--text-modal-header-neutral-alt-default',
        }}
        isFullScreen={isMobile}
      >
        {t('noumena.home.noum_me_modal.title')}
      </ModalHeader>

      <ModalBody mobileFlex isFullScreen={isMobile} align="center">
        <TSpan
          colorToken="--text-modal-brand-secondary-default"
          font="body-l"
          textAlign={isDesktop ? 'center' : 'left'}
        >
          {t('noumena.home.noum_me_modal.description')}
        </TSpan>
        <Spacer height={isDesktop ? 24 : 16} />
        <StyledChamberCompletenessWrapper>
          <ChamberProvider noumId={id}>
            <NoumUserConnectionProvider>
              <ChamberCompleteness />
            </NoumUserConnectionProvider>
          </ChamberProvider>
        </StyledChamberCompletenessWrapper>
      </ModalBody>
      <ModalFooter
        isFullScreen={isMobile}
        justifyContent="center"
        marginTop={24}
      >
        <Button
          secondary
          data-testid="action_button"
          size={isMobile ? 'full' : 'small'}
          onClick={() => navigate(routes.HOME_NOUM)}
        >
          {t('noumena.home.go_to_your_home_noum')}
        </Button>
      </ModalFooter>
    </Modal>
  );
});
