import { ViewMode } from '@/features/conversation/types';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useContext, type FC } from 'react';
import { SpaceUtils } from '@/utils/space';
import FilterDropDown from '../ChatHeader/FilterDropDown';
import { SeeAllButton } from '../ChatList/SeeAllButton';
import useChatList from '../ChatList/useChatList';
import { ChatListModal } from '../ChatListModal/ChatListModal';
import { MessageElementContext } from '../contexts/MessageElementProvider';

type ModalType = 'chat-list-modal';

export const ChatFooter: FC = () => {
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const { space, isOwner } = useNoumContext();

  const { isNoumLayoutSmallViewMode, isNoumLayoutCompactViewMode } = useContext(
    MessageElementContext,
  );

  const showFilterButton =
    !SpaceUtils.isMasterNoum(space) && isOwner && isNoumLayoutCompactViewMode;

  const { cids, cidsToRender, setViewMode } = useChatList();

  const onSeeAllClick = () => {
    if (isNoumLayoutSmallViewMode) {
      openModal('chat-list-modal');
      return;
    }
    setViewMode(ViewMode.FULLCHAT);
  };

  return (
    <Stack fullWidth>
      {showFilterButton && (
        <Stack padding="12px 8px">
          <FilterDropDown placement="top-start" />
        </Stack>
      )}

      <Stack fullWidth justify="center">
        {cids.length > cidsToRender.length && (
          <SeeAllButton onClick={onSeeAllClick} />
        )}
      </Stack>

      {modalType === 'chat-list-modal' && (
        <ChatListModal isOpen onClose={closeModal} />
      )}
    </Stack>
  );
};
