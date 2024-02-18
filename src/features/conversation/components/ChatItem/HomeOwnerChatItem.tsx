import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { UserUtil } from '@/utils/user';
import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ActiveConversationContext } from '../../contexts/ActiveConversationContext';
import { ConversationViewContext } from '../../contexts/ConversationViewContext';
import { NewConversationContext } from '../../contexts/NewConversationContext';
import { ViewMode } from '../../types';
import { ChatItemWrapper, AvatarWrapper, Content, TitleTSPan } from './styles';
import { type ChatItemProps } from './types';

export const HomeOwnerChatItem = ({
  sid = CREAT_CONVERSATION_WITH_HOME_OWNER,
}: Partial<ChatItemProps>) => {
  const { space } = useNoumContext();
  const deviceType = useDeviceType();
  const { setViewMode, setIsNewConversation } = useContext(
    ConversationViewContext,
  );
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );
  const { setSelectedUsers } = useContext(NewConversationContext);

  const avatarUrl = UserUtil.getProfilePicture(space?.uid);
  const userFullName = UserUtil.renderFullName(space?.uid);

  const active = useMemo(
    () => sid === activeConversationSid && deviceType !== DeviceTypeEnum.MOBILE,
    [activeConversationSid, deviceType, sid],
  );

  const handleClick = useCallback(() => {
    if (!space?.uid) return;

    setActiveConversationSid(CREAT_CONVERSATION_WITH_HOME_OWNER);
    setSelectedUsers([space.uid]);

    setViewMode(ViewMode.FULLCONVERSATION);
    setIsNewConversation(false);
  }, [
    setActiveConversationSid,
    setIsNewConversation,
    setSelectedUsers,
    setViewMode,
    space?.uid,
  ]);

  useEffect(() => {
    if (
      activeConversationSid === CREAT_CONVERSATION_WITH_HOME_OWNER &&
      space?.uid
    ) {
      setSelectedUsers([space.uid]);
    }
  }, [activeConversationSid, setSelectedUsers, space?.uid]);

  return (
    <ChatItemWrapper
      data-testid="chatitem-testid"
      active={active}
      onClick={handleClick}
    >
      <AvatarWrapper>
        <Avatar data-testid="avatar-testid" url={avatarUrl || ''} size="M" />
      </AvatarWrapper>
      <Content>
        <TitleTSPan
          font="body-m-bold"
          overflow="ellipsis"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {userFullName}
        </TitleTSPan>
      </Content>
    </ChatItemWrapper>
  );
};
