import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { BadgeContainer, BadgeNotification, ControlPanelIcon } from './styles';

type ChatControlProps = {
  onToggleChat: () => void;
  isNewMessage: boolean | undefined;
  showChatPanel: boolean | undefined;
};

export const ChatControl = ({
  onToggleChat,
  isNewMessage,
  showChatPanel,
}: ChatControlProps) => (
  <ControlPanelIcon
    cursorAllowed
    onClick={onToggleChat}
    data-title={t('noumena.social_hall.Control_panel.Chat')}
  >
    {!showChatPanel && isNewMessage && (
      <BadgeContainer>
        <BadgeNotification />
      </BadgeContainer>
    )}
    <Icon
      size={24}
      name="message_outline_m"
      color="--icon-button-neutral-default"
    />
  </ControlPanelIcon>
);
