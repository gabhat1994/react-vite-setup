import { Icon } from '@/components/Icon';
import { t } from 'i18next';
import { type InvitationButtonProps } from './types';
import {
  InvitationButtonsWrapper,
  EventButton,
  EventButtonAccepted,
} from './styles';

export const InvitationButton = ({
  width,
  flex,
  isLoadingAccept,
  isLoadingDecline,
  onDecline,
  onAccept,
}: InvitationButtonProps) => (
  <InvitationButtonsWrapper
    data-testid="invitation-buttons-wrapper"
    width={width}
    flex={flex}
  >
    <EventButton
      testId="decline-invitation-button"
      tertiary
      iconOnly
      flex={1}
      icon={
        <Icon name="close_m" color="--icon-button-neutral-default" size={24} />
      }
      loading={isLoadingDecline}
      disabled={isLoadingDecline}
      onClick={onDecline}
    />
    <EventButtonAccepted
      testId="accept-invitation-button"
      secondary
      withLabel
      iconOnly
      flex={1}
      icon={
        <Icon
          name="tick_m"
          color="--icon-button-brand-secondary-default"
          size={24}
        />
      }
      loading={isLoadingAccept}
      disabled={isLoadingAccept}
      onClick={onAccept}
    >
      {t('noumena.editor.event.button.Accept')}
    </EventButtonAccepted>
  </InvitationButtonsWrapper>
);

export default InvitationButton;
