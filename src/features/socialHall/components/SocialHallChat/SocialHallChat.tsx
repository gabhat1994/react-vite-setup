import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';

import { TSpan } from '@/components/Typography';
import { useSocialHallCallContext } from '@/providers';
import { MessageInput } from '@/features/conversation/components/MessageInput';
import {
  ChatWrapper,
  ChatHeader,
  TitleSpan,
  MessageInputWrapper,
  MessageListWrapper,
  CloseButton,
  NoMessageWrapper,
} from './styles';
import { MessageList } from './MessageList';

type SocialHallChatProps = {
  show: boolean;
  disabled: boolean;
  onClose: () => void;
};

export const SocialHallChat = ({
  onClose,
  show,
  disabled,
}: SocialHallChatProps) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { messages, onSendMessage } = useSocialHallCallContext();
  const isTablet = width < breakpoints.LAPTOP;
  const messageScrollRef = useRef<HTMLDivElement>(null);
  const {
    flags: { socialHallVideoCall },
  } = useLaunchDarkly();

  useEffect(() => {
    setTimeout(() => {
      if (messageScrollRef.current && show) {
        messageScrollRef.current.scrollTo({
          top: messageScrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 200);
  }, [messages, show]);

  const handleSendMessage = (message: string, files: File[]) => {
    const isFile = files.length > 0;
    if (isFile && message) {
      files.forEach((file, index) =>
        onSendMessage(index === 0 ? message : '', file),
      );
    } else if (isFile) {
      files.forEach((file) => onSendMessage('', file));
    } else {
      onSendMessage(message);
    }
  };

  return (
    <ChatWrapper show={show}>
      <ChatHeader>
        <TitleSpan colorToken="--text-appbar-neutral-default">
          {t('noumena.social_hall.chat')}
        </TitleSpan>
        {isTablet && !socialHallVideoCall && (
          <CloseButton onClick={onClose}>
            <Icon
              color="--icon-card-neutral-highlighted"
              name="close_m"
              size={24}
            />
          </CloseButton>
        )}
        {socialHallVideoCall && (
          <CloseButton
            onClick={onClose}
            socialHallVideoCall={socialHallVideoCall}
          >
            <Icon
              color="--icon-card-neutral-highlighted"
              name="close_m"
              size={24}
            />
          </CloseButton>
        )}
      </ChatHeader>
      <MessageListWrapper ref={messageScrollRef}>
        {messages && messages.length ? (
          <MessageList messages={messages} />
        ) : (
          <NoMessageWrapper>
            <Icon
              color="--icon-card-placeholder-neutral-default"
              name="message_outline_m"
              size={144}
            />
            <TSpan
              colorToken="--text-placeholder-neutral-default"
              font="body-xl"
            >
              {t('noumena.social_hall.chat.no_message')}
            </TSpan>
          </NoMessageWrapper>
        )}
      </MessageListWrapper>
      <MessageInputWrapper disabled={disabled}>
        <MessageInput
          withLeftPadding
          onSendMessage={handleSendMessage}
          disabled={disabled}
        />
      </MessageInputWrapper>
    </ChatWrapper>
  );
};
