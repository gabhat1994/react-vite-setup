import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Infinite } from '@/components/Infinite';
import { breakpoints } from '@/constants/devices';
import ChatItem from '@/features/conversation/components/ChatItem';
import { useWindowDimensions } from '@/hooks';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import useChatList from '../ChatList/useChatList';

type ChatListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChatListModal: FC<ChatListModalProps> = ({ isOpen, onClose }) => {
  const windowDimensions = useWindowDimensions();
  const isMobile = windowDimensions.width < breakpoints.TABLET;
  const { t } = useTranslation();

  const {
    handleItemClick,
    cids,
    onFetchMore,
    activeConversationSid,
    infiniteStatus,
  } = useChatList();

  return (
    <Modal
      open={isOpen}
      size={ModalSize.L}
      onClose={onClose}
      testId="chat-list-modal"
      disableBackdropClick
      enableCloseButton
      isFullScreen={isMobile}
      noPaddingNoBorder={isMobile}
      isScrollableContent
    >
      <ModalHeader>{t('noumena.chat.conversations_modal.title')}</ModalHeader>
      <ModalBody noFooter>
        <Infinite
          onFetchMore={onFetchMore}
          status={infiniteStatus}
          width="100%"
          scrollbarWidth={4}
          isSpinnerRelative
        >
          {cids.map((cid, index) => (
            <ChatItem
              index={index}
              key={cid}
              sid={cid}
              isActive={cid === activeConversationSid && !isMobile}
              isMarginRight={index !== cids.length - 1}
              onClick={handleItemClick}
              size={isMobile ? 'L' : 'S'}
            />
          ))}
        </Infinite>
      </ModalBody>
    </Modal>
  );
};
