import { useEffect, useRef, useState, useCallback } from 'react';
import { t } from 'i18next';
import lottie from 'lottie-web';
import { Spacer } from '@/layout';
import {
  AnmiatedTSpan,
  TokenCount,
  TokenCountContainer,
  TokenNotificationContainer,
  Animation,
  AnimationContainer,
} from './styles';
import { type TokenNotificationProps } from './types';
import { Button } from '../Button';
import animationData from './animationDate.json';
import { Modal } from '../ExtendedModal';

const ANIMATION_DELAY = 100;

const PROFILE_COMPLETION = `100% profile completion`;

lottie.setLocationHref(window.location.href);

export const TokenNotification = ({
  isOpen = true,
  tokens,
  reason,
  handleClose,
}: TokenNotificationProps) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<number>(0);
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setStep(0);
    handleClose();
    setStartAnimation(false);
  }, [handleClose, setStep]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => (step === 3 ? setStartAnimation(true) : setStep(step + 1)),
        ANIMATION_DELAY,
      );
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (startAnimation && animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData,
      });

      setTimeout(() => {
        lottie.destroy();
      }, 1000);
    }
  }, [startAnimation, animationRef]);

  return (
    <Modal
      isFullScreen={false}
      testId="tokenNotificationModal"
      open={isOpen}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      style={{ background: 'transparent' }}
    >
      <AnimationContainer>
        <Animation ref={animationRef} data-testid="animationRef" />
        <TokenNotificationContainer data-testid="token-notification">
          {step > 0 && (
            <TokenCountContainer data-testid="token-count">
              {step > 1 && (
                <TokenCount
                  font="heading-xxl-bold"
                  colorToken="--text-card-neutral-alt-default"
                >
                  {tokens}
                </TokenCount>
              )}
            </TokenCountContainer>
          )}
          <Spacer height={17} />
          {step > 1 && (
            <AnmiatedTSpan
              font="body-xl-bold"
              colorToken="--text-card-neutral-alt-default"
            >
              {t('noumena.token.tokens_added_to_wallet')}
            </AnmiatedTSpan>
          )}
          <Spacer height={16} />
          {step === 3 && (
            <>
              <AnmiatedTSpan
                font="body-m-bold"
                colorToken="--text-card-neutral-alt-default"
              >
                {t('noumena.token.award_reason')}
              </AnmiatedTSpan>
              <Spacer height={4} />
              <AnmiatedTSpan
                font="body-l-bold"
                colorToken="--text-card-neutral-alt-default"
              >
                {reason?.toLocaleLowerCase().includes(PROFILE_COMPLETION)
                  ? t('noumena.noumprogress.profile_complete_100')
                  : reason}
              </AnmiatedTSpan>
            </>
          )}
          <Spacer height={24} />
          {step === 3 && (
            <Button
              size="full"
              secondary
              onClick={onClose}
              testId="close-notification"
            >
              {t('noumena.close')}
            </Button>
          )}
        </TokenNotificationContainer>
      </AnimationContainer>
    </Modal>
  );
};
