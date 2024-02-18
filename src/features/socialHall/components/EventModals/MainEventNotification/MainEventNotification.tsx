import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import {
  Wrapper,
  ButtonWrapper,
  Section,
  IconWrapper,
  DeclineButton,
  IconChild,
} from './styles';
import { type MainEventNotificationProps } from './types';

export const MainEventNotification = ({
  isOpen,
  onDecline,
  onConfirm,
  description,
  icon,
  showButtons,
  showUserJoined,
  showUserLeave,
}: MainEventNotificationProps) => {
  if (!isOpen) return null;
  return (
    <Wrapper
      data-testid="main-event-notification"
      showUserJoined={showUserJoined}
      showUserLeave={showUserLeave}
    >
      <Section>
        {icon && (
          <IconWrapper>
            <IconChild>{icon}</IconChild>
          </IconWrapper>
        )}
        <div>
          <Trans
            i18nKey={description}
            components={{
              span: (
                <TSpan
                  font="body-m-bold"
                  colorToken="--text-card-neutral-alt-default"
                />
              ),
            }}
          />
        </div>
      </Section>
      {showButtons && (
        <ButtonWrapper>
          <DeclineButton
            size="small"
            primary
            onClick={onDecline}
            data-testid="decline-button"
          >
            {t('noumena.chamber.decline_button')}
          </DeclineButton>
          <Button
            secondary
            size="small"
            onClick={onConfirm}
            data-testid="confirm-button"
          >
            {t('noumena.social_hall.join_as_speaker')}
          </Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};
